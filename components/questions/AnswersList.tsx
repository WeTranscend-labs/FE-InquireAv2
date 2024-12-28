'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, Check, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { ContractAnswer } from '@/lib/hooks/useGetAnswersByQuestionId';

interface AnswersListProps {
  answers: ContractAnswer[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  error?: Error | null;
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
  onAccept,
}: AnswersListProps) {
  const [votedAnswers, setVotedAnswers] = useState<Set<bigint>>(new Set());

  const handleUpvote = (answerId: bigint) => {
    if (!votedAnswers.has(answerId)) {
      setVotedAnswers(new Set([...votedAnswers, answerId]));
      onUpvote?.(answerId);
    }
  };

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

      <div className="space-y-6">
        {answers.map((answer) => (
          <AnswerCard
            key={answer.id.toString()}
            answer={answer}
            hasVoted={votedAnswers.has(answer.id)}
            onUpvote={() => handleUpvote(answer.id)}
            onAccept={() => onAccept?.(answer.id)}
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
  onAccept?: () => void;
}

function AnswerCard({ answer, hasVoted, onUpvote, onAccept }: AnswerCardProps) {
  return (
    <Card className="p-6 transition-shadow hover:shadow-md">
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-3">
          <Button
            variant={hasVoted ? 'default' : 'outline'}
            size="sm"
            onClick={onUpvote}
            className="rounded-full h-12 w-12 p-0 transition-transform hover:scale-105"
            disabled={hasVoted}
          >
            <ThumbsUp className="h-5 w-5" />
          </Button>
          <span className="font-medium text-lg">
            {answer.upvotes.toString()}
          </span>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              By {answer.responder}
              <span className="mx-2">•</span>
              {formatDistanceToNow(answer.createdAt)} ago
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: answer.answerText }} />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Reward: {answer.rewardAmount.toString()} tokens</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
