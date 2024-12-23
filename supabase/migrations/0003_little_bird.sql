/*
  # Advanced Forum Features Schema

  1. New Tables
    - `arbitration_cases` - For DAO dispute resolution
    - `dao_members` - For DAO membership tracking
    - `dao_votes` - For tracking arbitration votes

  2. Updates
    - Add auto-select deadline to questions
    - Add reputation points system
    - Add minimum fee requirements
    - Add proportional reward distribution

  3. Security
    - RLS policies for new tables
    - Secure arbitration system access
*/

-- Add new columns to questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS auto_select_deadline TIMESTAMPTZ;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS minimum_fee INTEGER DEFAULT 10;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS proportional_reward BOOLEAN DEFAULT false;

-- Add reputation points to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS reputation_points INTEGER DEFAULT 0;

-- Create arbitration cases table
CREATE TABLE IF NOT EXISTS arbitration_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) NOT NULL,
  created_by UUID REFERENCES users(id) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'resolved')) DEFAULT 'pending',
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Create DAO members table
CREATE TABLE IF NOT EXISTS dao_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  reputation_threshold INTEGER DEFAULT 1000,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Create DAO votes table
CREATE TABLE IF NOT EXISTS dao_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES arbitration_cases(id) NOT NULL,
  member_id UUID REFERENCES dao_members(id) NOT NULL,
  vote TEXT CHECK (vote IN ('accept', 'reject')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(case_id, member_id)
);

-- Enable RLS
ALTER TABLE arbitration_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE dao_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE dao_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read arbitration cases"
  ON arbitration_cases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create arbitration cases"
  ON arbitration_cases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Anyone can read DAO members"
  ON dao_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "DAO members can vote"
  ON dao_votes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM dao_members
      WHERE user_id = auth.uid()
    )
  );

-- Function to auto-select best answer
CREATE OR REPLACE FUNCTION auto_select_best_answer()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if deadline has passed and no answer is selected
  IF NEW.auto_select_deadline < now() AND NOT EXISTS (
    SELECT 1 FROM answers
    WHERE question_id = NEW.id AND is_accepted = true
  ) THEN
    -- Select answer with highest votes
    WITH best_answer AS (
      SELECT id
      FROM answers
      WHERE question_id = NEW.id
      ORDER BY vote_count DESC
      LIMIT 1
    )
    UPDATE answers
    SET is_accepted = true
    WHERE id = (SELECT id FROM best_answer);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-selecting best answer
CREATE TRIGGER check_auto_select_trigger
  AFTER UPDATE ON questions
  FOR EACH ROW
  EXECUTE FUNCTION auto_select_best_answer();

-- Function to distribute rewards proportionally
CREATE OR REPLACE FUNCTION distribute_proportional_rewards()
RETURNS TRIGGER AS $$
DECLARE
  total_votes INTEGER;
  reward_per_vote INTEGER;
BEGIN
  IF NEW.proportional_reward = true THEN
    -- Calculate total votes
    SELECT COALESCE(SUM(NULLIF(vote_count, 0)), 1)
    INTO total_votes
    FROM answers
    WHERE question_id = NEW.id;

    -- Calculate reward per vote
    reward_per_vote := NEW.bounty_amount / total_votes;

    -- Distribute rewards
    INSERT INTO transactions (from_user_id, to_user_id, amount, transaction_type, question_id)
    SELECT 
      NEW.user_id,
      answers.user_id,
      GREATEST(answers.vote_count * reward_per_vote, 0),
      'reward',
      NEW.id
    FROM answers
    WHERE question_id = NEW.id AND vote_count > 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for proportional reward distribution
CREATE TRIGGER distribute_rewards_trigger
  AFTER UPDATE ON questions
  FOR EACH ROW
  WHEN (NEW.is_solved = true AND OLD.is_solved = false)
  EXECUTE FUNCTION distribute_proportional_rewards();