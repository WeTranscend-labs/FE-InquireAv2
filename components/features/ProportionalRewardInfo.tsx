'use client';

import { PieChart, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ContractAnswer } from '@/lib/hooks/useGetAnswersByQuestionId';

interface RewardDistributionProps {
  bountyAmount: number;
  answers: ContractAnswer[];
}

export function ProportionalRewardInfo({
  bountyAmount,
  answers,
}: RewardDistributionProps) {
  const totalVotes = answers.reduce(
    (sum: any, answer: any) => sum + Math.max(0, answer.votes),
    0
  );

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <PieChart className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Reward Distribution</h3>
      </div>

      <div className="space-y-3">
        {answers.map((answer) => {
          const percentage = totalVotes
            ? (Math.max(0, Number(answer?.upvotes)) / totalVotes) * 100
            : 0;
          const reward = Math.round((Number(bountyAmount) * percentage) / 100);

          return (
            <div key={answer.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{answer.responder}</span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4" />
                  {reward}
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="text-xs text-muted-foreground text-right">
                {percentage.toFixed(1)}% of total votes
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-sm text-muted-foreground pt-2 border-t">
        Rewards are distributed proportionally based on upvotes
      </div>
    </Card>
  );
}
