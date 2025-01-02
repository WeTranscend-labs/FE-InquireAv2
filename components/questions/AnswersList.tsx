'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/lib/hooks/use-toast';
import { ContractAnswer } from '@/lib/hooks/useGetAnswersByQuestionId';
import { useSelectBestAnswer } from '@/lib/hooks/useSelectBestAnswer';
import { useVoteForAnswer } from '@/lib/hooks/useVoteForAnswer';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, ChevronsUp, Crown, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import { AnswerContent } from './AnswerContent';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

interface AnswersListProps {
  answers: ContractAnswer[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  error?: Error | null;
  questionAsker: string;
  questionId: bigint;
  questionIsClosed: boolean;
  bestAnswer: bigint;
  onUpvote?: (answerId: bigint) => void;
  onAccept?: (answerId: bigint) => void;
}

export default function AnswersList({
  answers,
  totalPages,
  currentPage,
  onPageChange,
  isLoading,
  error,
  onUpvote,
  bestAnswer,
  questionAsker,
  questionId,
  questionIsClosed,
}: AnswersListProps) {
  const [votedAnswers, setVotedAnswers] = useState<Set<bigint>>(new Set());
  const {
    voteForAnswer,
    isPending,
    hash,
    isConfirming,
    isConfirmed,
    error: voteError,
  } = useVoteForAnswer();
  const { selectBestAnswer, isSelecting, isSuccess } = useSelectBestAnswer();
  const { address } = useAccount();
  const { toast } = useToast();

  const handleUpvote = async (answerId: bigint) => {
    if (!votedAnswers.has(answerId)) {
      setVotedAnswers(new Set([...Array.from(votedAnswers), answerId]));
      try {
        await voteForAnswer({ questionId, answerId });
      } catch (err) {
        console.error('Error voting for answer:', err);
        toast({
          title: 'Vote Failed',
          description: 'There was an issue voting for this answer.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleSelectBestAnswer = async (answerId: bigint) => {
    try {
      await selectBestAnswer(questionId, answerId);

      toast({
        title: 'Best Answer Selected',
        description: 'The best answer has been chosen successfully.',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Selection Failed',
        description: 'Unable to select the best answer. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Tách best answer ra khỏi danh sách
  const bestAnswerObj = bestAnswer
    ? answers.find((answer) => answer.id === bestAnswer)
    : null;

  const otherAnswers = bestAnswer
    ? answers.filter((answer) => answer.id !== bestAnswer)
    : answers;

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">Loading answers...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">
          Error loading answers: {error.message}
        </p>
      </Card>
    );
  }

  if (answers.length === 0) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No Answers Yet</h3>
        <p className="text-muted-foreground">
          Be the first to help by providing an answer to this question.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <span>
            {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
          </span>
          <div className="h-px flex-1 bg-border ml-4" />
        </h2>
      </div>

      {/* Best Answer Section */}
      {bestAnswerObj && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Crown className="h-6 w-6 " />
            Best Answer
          </h3>
          <AnswerCard
            key={bestAnswerObj.id.toString()}
            answer={bestAnswerObj}
            hasVoted={votedAnswers.has(bestAnswerObj.id)}
            onUpvote={() => handleUpvote(bestAnswerObj.id)}
            canSelectBestAnswer={false} // Không cho chọn lại best answer
            isBestAnswer={true} // Prop mới để styling
          />
        </div>
      )}

      {/* Other Answers Section */}
      <div className="space-y-6">
        {otherAnswers.map((answer) => (
          <AnswerCard
            key={answer.id.toString()}
            answer={answer}
            hasVoted={votedAnswers.has(answer.id)}
            onUpvote={() => handleUpvote(answer.id)}
            canSelectBestAnswer={
              address?.toLowerCase() === questionAsker?.toLowerCase() &&
              !questionIsClosed
            }
            onSelectBestAnswer={() => handleSelectBestAnswer(answer.id)}
            isSelecting={isSelecting}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

interface AnswerCardProps {
  answer: ContractAnswer;
  hasVoted: boolean;
  onUpvote: () => void;
  canSelectBestAnswer?: boolean;
  onSelectBestAnswer?: () => void;
  isSelecting?: boolean;
  isBestAnswer?: boolean;
}

export function AnswerCard({
  answer,
  hasVoted,
  onUpvote,
  canSelectBestAnswer = false,
  onSelectBestAnswer,
  isSelecting = false,
  isBestAnswer = false,
}: AnswerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card
        className={cn(
          'p-6 transition-all duration-500 relative overflow-hidden group border',
          isBestAnswer
            ? 'border-2 border-emerald-500/70 bg-transparent shadow-2xl'
            : 'hover:shadow-lg border-transparent hover:border-gray-200',
          'transform-gpu hover:scale-[1.01] transition-transform duration-300'
        )}
      >
        {/* Best Answer Badge with Animation */}
        <AnimatePresence>
          {isBestAnswer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-0 right-0 z-10"
            >
              <motion.div
                initial={{ rotate: -45, x: 50, y: -50 }}
                animate={{ rotate: 0, x: 0, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                }}
                className="absolute top-0 right-0 w-0 h-0 
                  border-l-[60px] border-l-transparent 
                  border-b-[60px] border-emerald-500/90
                  shadow-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-6">
          {/* Upvote Section with Animation */}
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant={hasVoted ? 'default' : 'outline'}
              size="sm"
              onClick={onUpvote}
              className={cn(
                'rounded-full h-12 w-12 p-0 transition-all duration-300',
                isBestAnswer
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md'
                  : 'hover:shadow-md',
                hasVoted && 'bg-opacity-90'
              )}
              disabled={hasVoted}
            >
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronsUp className="h-5 w-5" />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <Button variant="link">Upvote</Button>
                </TooltipContent>
              </Tooltip>
            </Button>
            <motion.span
              className={cn(
                'font-medium text-lg',
                isBestAnswer && ' font-bold'
              )}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              {answer.upvotes.toString()}
            </motion.span>
          </motion.div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <motion.div
                className={cn(
                  'text-sm',
                  isBestAnswer ? '' : 'text-muted-foreground'
                )}
              >
                By <span className="font-bold">{answer.responder}</span>
                <span className="mx-2">•</span>
                {formatDistanceToNow(
                  new Date(Number(answer.createdAt) * 1000)
                )}{' '}
                ago
              </motion.div>
            </div>

            {/* Answer Text */}
            <motion.div
              className={cn(isBestAnswer ? '' : '')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <AnswerContent content={answer.answerText} />
            </motion.div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm pt-4">
              <motion.span
                className={cn(
                  'text-muted-foreground font-medium',
                  isBestAnswer && ''
                )}
                whileHover={{ scale: 1.02 }}
              >
                Reward: {formatEther(answer.rewardAmount)} tokens
              </motion.span>

              {/* Select Best Answer Button */}
              {canSelectBestAnswer && (
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant={isBestAnswer ? 'default' : 'outline'}
                    size="sm"
                    onClick={onSelectBestAnswer}
                    disabled={isSelecting}
                    className={cn(
                      'flex items-center gap-2 transition-all duration-300',
                      isBestAnswer
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md'
                        : 'hover:bg-yellow-50 hover:border-yellow-200'
                    )}
                  >
                    <Award
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isBestAnswer ? 'text-white' : ''
                      )}
                    />
                    {isSelecting ? (
                      <motion.span
                        animate={{ opacity: [0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        Selecting...
                      </motion.span>
                    ) : (
                      'Select Best Answer'
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Ambient Gradient Animation */}
        {isBestAnswer && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-emerald-100/10 via-transparent to-emerald-200/20 pointer-events-none"
            // animate={{
            //   backgroundPosition: ['0% 0%', '100% 100%'],
            // }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        )}
      </Card>
    </motion.div>
  );
}
