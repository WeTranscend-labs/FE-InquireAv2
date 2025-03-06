'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import CustomAvatar from '../users/CustomAvatar';
import { QuestionContent } from './QuestionContent';
import { QuestionStats } from './QuestionStats';

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    content: string;
    bounty: number;
    answers: number;
    votes: number;
    tags: string[];
    author: string;
    createdAt: Date;
  };
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="group p-6 transition-all duration-300 bg-background hover:bg-accent/50 shadow-sm hover:shadow-md rounded-lg border border-border">
      <div className="flex gap-6">
        <QuestionStats
          votes={question.votes}
          answers={question.answers}
          bounty={question.bounty}
        />

        <Link
          href={`/questions/${question.id}`}
          className="cursor-pointer block w-full"
        >
          <div className="space-y-4">
            <div>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-xl font-semibold text-foreground/90 hover:text-primary transition-colors duration-200 overflow-hidden text-ellipsis whitespace-nowrap">
                    {question.title}
                  </span>
                </TooltipTrigger>
                <TooltipContent align="start">
                  <Button variant="default" className="py-2 px-4">
                    {question.title}
                  </Button>
                </TooltipContent>
              </Tooltip>
              {/* <p className="text-sm text-muted-foreground mt-2 line-clamp-2 group-hover:text-muted-foreground/80 transition-all duration-200">
              {question.content}
            </p> */}

              <QuestionContent
                content={question.content}
                className="line-clamp-3 font-medium text-muted-foreground text-sm "
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {question.tags?.map((tag) => (
                <Link key={tag} href={`/questions/tagged/${tag}`}>
                  <Badge
                    variant="secondary"
                    className="bg-secondary/50 hover:bg-secondary/70 transition-colors duration-200 px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground w-full">
              <div className="flex items-center gap-2 flex-1">
                <CustomAvatar address={question.author} size={32} />
                <Link
                  href={`/users/${question.author}`}
                  className="hover:text-foreground font-medium transition-colors duration-200"
                >
                  {question.author.substring(0, 6)}...
                  {question.author.slice(-4)}
                </Link>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Clock className="h-4 w-4" />
                <span>
                  {question.createdAt &&
                    formatDistanceToNow(question.createdAt)}{' '}
                  ago
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Card>
  );
}
