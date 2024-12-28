'use client';

import { useState } from 'react';
import QuestionDetail from './QuestionDetail';
import AnswersList from './AnswersList';
import { AutoSelectTimer } from '@/components/features/AutoSelectTimer';
import { ProportionalRewardInfo } from '@/components/features/ProportionalRewardInfo';
import { ArbitrationCase } from '@/components/features/ArbitrationCase';
import { ReputationBadge } from '@/components/features/ReputationBadge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockAnswers } from '@/lib/data/mock-answers';
import { AnswerEditor } from './AnswerEditor';

interface Question {
  id: string;
  asker: string;
  questionText: string;
  rewardAmount: number;
  createdAt: number;
  isClosed: boolean;
  chosenAnswerId: number;
  deadline: string;
}

interface QuestionDetailWrapperProps {
  question: any;
}

export default function QuestionDetailWrapper({ question }: any) {
  const [isSubmittingCase, setIsSubmittingCase] = useState(false);
  const answers = mockAnswers;

  const handleArbitrationSubmit = async (description: string) => {
    try {
      setIsSubmittingCase(true);
      // Add your arbitration submission logic here
      console.log('Submitting arbitration case:', description);
    } finally {
      setIsSubmittingCase(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-[1fr,300px] gap-6">
        <QuestionDetail question={question} answersCount={answers.length} />

        <div className="space-y-4">
          <Card className="p-4 bg-primary/5">
            <AutoSelectTimer
              deadline={question.deadline}
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
            bountyAmount={question.rewardAmount}
            answers={answers.map((a) => ({
              id: a.id,
              votes: a.upvotes,
              author: a.author.name,
            }))}
          />
        </Card>
      )}

      <Separator className="my-8" />

      {!question.isClosed && (
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <AnswerEditor
            questionId={question.id}
            onSubmit={handleArbitrationSubmit}
          />
        </Card>
      )}

      {!question.isClosed && (
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <ArbitrationCase
            questionId={question.id}
            onSubmit={handleArbitrationSubmit}
          />
        </Card>
      )}

      <AnswersList
        answers={answers}
        // chosenAnswerId={question.chosenAnswerId}
      />
    </div>
  );
}
