/*
  # Initial Forum Schema Setup

  1. New Tables
    - users
      - Stores user information and token balance
    - questions
      - Stores questions with bounty amounts
    - answers
      - Stores answers with vote counts
    - votes
      - Tracks user votes on answers
    - transactions
      - Tracks token transactions (bounties, rewards)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  token_balance INTEGER DEFAULT 100,
  reputation INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  bounty_amount INTEGER NOT NULL CHECK (bounty_amount > 0),
  is_solved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  tags TEXT[] DEFAULT '{}'::TEXT[]
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Answers table
CREATE TABLE IF NOT EXISTS answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  is_accepted BOOLEAN DEFAULT false,
  vote_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id UUID REFERENCES answers(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  vote_type INTEGER CHECK (vote_type IN (1, -1)), -- 1 for upvote, -1 for downvote
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(answer_id, user_id)
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES users(id),
  to_user_id UUID REFERENCES users(id),
  amount INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('bounty', 'reward')),
  question_id UUID REFERENCES questions(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Questions policies
CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create questions if they have enough tokens"
  ON questions FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT token_balance >= bounty_amount FROM users WHERE id = auth.uid())
  );

-- Answers policies
CREATE POLICY "Anyone can read answers"
  ON answers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create answers"
  ON answers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Votes policies
CREATE POLICY "Users can read all votes"
  ON votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can vote once per answer"
  ON votes FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    NOT EXISTS (
      SELECT 1 FROM votes
      WHERE answer_id = NEW.answer_id AND user_id = auth.uid()
    )
  );

-- Transactions policies
CREATE POLICY "Users can read own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    auth.uid() = from_user_id OR
    auth.uid() = to_user_id
  );

-- Functions

-- Function to handle bounty payment when creating a question
CREATE OR REPLACE FUNCTION handle_question_bounty()
RETURNS TRIGGER AS $$
BEGIN
  -- Deduct tokens from user
  UPDATE users
  SET token_balance = token_balance - NEW.bounty_amount
  WHERE id = NEW.user_id;
  
  -- Create transaction record
  INSERT INTO transactions (from_user_id, amount, transaction_type, question_id)
  VALUES (NEW.user_id, NEW.bounty_amount, 'bounty', NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for bounty handling
CREATE TRIGGER question_bounty_trigger
  AFTER INSERT ON questions
  FOR EACH ROW
  EXECUTE FUNCTION handle_question_bounty();

-- Function to handle accepting an answer
CREATE OR REPLACE FUNCTION handle_accept_answer()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_accepted = true AND OLD.is_accepted = false THEN
    -- Get question details
    WITH question_data AS (
      SELECT bounty_amount, user_id as question_user_id
      FROM questions
      WHERE id = NEW.question_id
    )
    -- Award bounty to answer author
    UPDATE users
    SET token_balance = token_balance + (SELECT bounty_amount FROM question_data),
        reputation = reputation + 15
    WHERE id = NEW.user_id;
    
    -- Create transaction record
    INSERT INTO transactions (from_user_id, to_user_id, amount, transaction_type, question_id)
    SELECT 
      question_user_id,
      NEW.user_id,
      bounty_amount,
      'reward',
      NEW.question_id
    FROM question_data;
    
    -- Mark question as solved
    UPDATE questions
    SET is_solved = true
    WHERE id = NEW.question_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for answer acceptance
CREATE TRIGGER accept_answer_trigger
  AFTER UPDATE ON answers
  FOR EACH ROW
  WHEN (NEW.is_accepted IS DISTINCT FROM OLD.is_accepted)
  EXECUTE FUNCTION handle_accept_answer();