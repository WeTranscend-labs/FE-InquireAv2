'use client';

// import { AutoSelectTimer } from '@/components/features/AutoSelectTimer';
import { ProportionalRewardInfo } from '@/components/features/ProportionalRewardInfo';
import { ReputationBadge } from '@/components/features/ReputationBadge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/lib/hooks/use-toast';
import { useAnswer } from '@/lib/hooks/useAnswer';
import { useGetAnswersByQuestionId } from '@/lib/hooks/useGetAnswersByQuestionId';
import { ContractQuestion } from '@/lib/hooks/useGetQuestions';
import { useState } from 'react';
import { formatEther } from 'viem';
import { AnswerEditor } from './AnswerEditor';
import AnswersList from './AnswersList';
import QuestionDetail from './QuestionDetail';
import dynamic from 'next/dynamic';

const AutoSelectTimer = dynamic(
  () =>
    import('@/components/features/AutoSelectTimer').then(
      (mod) => mod.AutoSelectTimer
    ),
  { ssr: false }
);

interface QuestionDetailWrapperProps {
  question: ContractQuestion;
}

export default function QuestionDetailWrapper({
  question,
}: QuestionDetailWrapperProps) {
  const { toast } = useToast();
  const { submitAnswer } = useAnswer();
  const [isSubmittingCase, setIsSubmittingCase] = useState(false);

  // Sử dụng hook để lấy danh sách answers
  const {
    answers,
    totalAnswers,
    totalPages,
    currentPage,
    isLoading,
    error,
    changePage,
  } = useGetAnswersByQuestionId(BigInt(question.id));

  const handleSubmitAnswer = async (content: string) => {
    try {
      await submitAnswer({
        questionId: BigInt(question.id),
        answerText: content,
      });

      toast({
        title: 'Answer Submitted Successfully',
        description: 'Your answer has been posted to the blockchain.',
        variant: 'default',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Unable to submit your answer. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  const handleArbitrationSubmit = async (description: string) => {
    try {
      setIsSubmittingCase(true);
      console.log('Submitting arbitration case:', description);

      toast({
        title: 'Arbitration Case Submitted',
        description: 'Your arbitration case is being processed.',
        variant: 'default',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Unable to submit arbitration case. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setIsSubmittingCase(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-[1fr,300px] gap-6">
        <QuestionDetail question={question} answersCount={totalAnswers} />

        <div className="space-y-4">
          <Card className="p-4 bg-primary/5">
            <AutoSelectTimer
              deadline={new Date(
                Number(question.deadline) * 1000
              ).toISOString()}
              onDeadlineReached={() => console.log('Deadline reached')}
            />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Reputation</span>
              <ReputationBadge points={750} />
            </div>
          </Card>
        </div>
      </div>

      {!question.isClosed && answers.length > 0 && (
        <Card className="p-6 bg-primary/5">
          <ProportionalRewardInfo
            bountyAmount={Number(formatEther(question.rewardAmount))}
            answers={answers}
          />
        </Card>
      )}

      <Separator className="my-8" />

      {!question.isClosed && (
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <AnswerEditor
            questionId={question.id + ''}
            onSubmit={handleSubmitAnswer}
          />
        </Card>
      )}

      {/* {!question.isClosed && (
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <ArbitrationCase
            questionId={question.id + ''}
            onSubmit={handleArbitrationSubmit}
          />
        </Card>
      )} */}

      {/* Hiển thị danh sách answers */}
      <AnswersList
        answers={answers}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={changePage}
        isLoading={isLoading}
        error={error}
        bestAnswer={question.chosenAnswerId}
        questionAsker={question.asker}
        questionId={BigInt(question.id)}
        questionIsClosed={question.isClosed}
      />
    </div>
  );
}
