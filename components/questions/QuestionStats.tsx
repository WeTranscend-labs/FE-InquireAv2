'use client';

import { cn } from '@/lib/utils';
import { ChevronsUp, CircleDollarSign, MessageSquare } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface QuestionStatsProps {
  votes: number;
  answers: number;
  bounty: number;
}

export function QuestionStats({ votes, answers, bounty }: QuestionStatsProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-muted-foreground">
      <StatItem icon={ChevronsUp} value={votes + ''} label="votes" />
      <StatItem
        icon={MessageSquare}
        value={answers + ''}
        label="answers"
        className={cn(answers > 0 && 'text-primary')}
      />
      <StatItem
        icon={CircleDollarSign}
        value={bounty.toFixed(2)}
        fullValue={bounty.toFixed(20).replace(/\.?0+$/, '')} // Bỏ số 0 dư
        label="bounty"
        className="text-primary"
      />
    </div>
  );
}

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  fullValue?: string;
  label: string;
  className?: string;
}

function StatItem({
  icon: Icon,
  value,
  fullValue,
  label,
  className,
}: StatItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'text-center transition-colors duration-200',
              className
            )}
          >
            <Icon className="h-5 w-5 mx-auto mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="text-sm font-medium">{value}</span>
            <span className="sr-only">{label}</span>
          </div>
        </TooltipTrigger>
        {fullValue && (
          <TooltipContent>
            <span>{fullValue}</span>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
