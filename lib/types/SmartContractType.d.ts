enum DeadlinePeriod {
  OneWeek,
  TwoWeeks,
  OneMonth,
}

interface Question {
  asker: address;
  questionText: string;
  category: string;
  rewardAmount: uint256;
  createdAt: uint256;
  deadline: uint256;
  isClosed: boolean;
  chosenAnswerId: uint256;
}

interface Answer {
  responder: address;
  answerText: string;
  upvotes: uint256;
  rewardAmount: uint256;
  createdAt: uint256;
}

interface PaginationParams {
  pageIndex: uint256;
  pageSize: uint256;
}

interface AskQuestionParams {
  questionText: string;
  category: string;
  deadlinePeriod: DeadlinePeriod;
}

interface SubmitAnswerParams {
  questionId: uint256;
  answerText: string;
}

interface VoteParams {
  questionId: uint256;
  answerId: uint256;
}

interface CloseQuestionParams {
  questionId: uint256;
  answerId: uint256;
}

interface QuestionAskedEvent {
  questionId: uint256;
  asker: address;
  questionText: string;
  rewardAmount: uint256;
  category: string;
}

interface AnswerSubmittedEvent {
  questionId: uint256;
  answerId: uint256;
  responder: address;
  answerText: string;
}

interface VotedEvent {
  questionId: uint256;
  answerId: uint256;
  voter: address;
}

interface QuestionClosedEvent {
  questionId: uint256;
  chosenAnswerId: uint256;
}
