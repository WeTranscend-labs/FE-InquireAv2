// components/leaderboard-table.tsx
'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Zap, MessageCircle } from 'lucide-react';
import { ReputationBadge } from '@/components/features/ReputationBadge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProgressBar } from '../ui/progress';
import { useGetUsers } from '@/lib/hooks/useGetUsers';
import { Button } from '@/components/ui/button';

export function LeaderboardTable() {
  const { users, error, isLoading, pagination, changePage } = useGetUsers(5);

  if (isLoading) {
    return (
      <Card className="p-8 border-0 shadow-2xl bg-card/90 backdrop-blur-md rounded-2xl">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-center text-muted-foreground font-medium">
            Loading leaderboard data...
          </p>
        </div>
      </Card>
    );
  }

  if (error || !users || users.length === 0) {
    return (
      <Card className="p-8 border-0 shadow-2xl bg-card/90 backdrop-blur-md rounded-2xl">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-destructive/10">
            <span className="text-destructive text-2xl">!</span>
          </div>
          <p className="text-center text-destructive font-medium">
            Error loading leaderboard or no data available.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-muted/50 backdrop-blur-md rounded-2xl overflow-hidden">
      <div className="p-8 pb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          Top Contributors
        </h2>
        <p className="text-muted-foreground mt-2 ml-10">
          Recognizing our community's leading innovators and problem solvers
        </p>
      </div>

      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-border">
              <TableHead className="w-16 text-foreground font-bold">
                Rank
              </TableHead>
              <TableHead className="text-foreground font-bold">User</TableHead>
              <TableHead className="text-foreground font-bold">
                Contributions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.userAddress}
                className={cn(
                  'group transition-all duration-300 hover:bg-primary/5',
                  index < 3
                    ? 'bg-gradient-to-r from-primary/10 to-transparent'
                    : ''
                )}
              >
                <TableCell className="font-medium w-16">
                  <div className="flex justify-center">
                    {index < 3 ? (
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.2,
                        }}
                        transition={{ duration: 0.5 }}
                        className="drop-shadow-lg"
                      >
                        <RankIcon rank={index + 1} />
                      </motion.div>
                    ) : (
                      <span className="text-muted-foreground font-semibold text-lg">
                        {index + 1}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Avatar
                        className={cn(
                          'h-14 w-14 ring-2 ring-offset-2 transition-all duration-300 group-hover:ring-offset-4 shadow-md',
                          index === 0
                            ? 'ring-primary/70 group-hover:ring-primary'
                            : index === 1
                            ? 'ring-secondary/70 group-hover:ring-secondary'
                            : index === 2
                            ? 'ring-accent/70 group-hover:ring-accent'
                            : 'ring-muted-foreground/30 group-hover:ring-muted-foreground/50'
                        )}
                      >
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.userAddress}`}
                          alt="User avatar"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-muted to-muted/70 text-muted-foreground font-bold">
                          {user.userAddress.slice(2, 4).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>

                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2 text-lg">
                        {user.userAddress.slice(0, 6) +
                          '...' +
                          user.userAddress.slice(-4)}
                        <ReputationBadge points={Number(user.reputation)} />
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                        <ActivityIcons
                          answers={Number(user.answerCount)}
                          solutions={Number(user.bestSolutionCount)}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">
                        Contribution Level
                      </span>
                      <span
                        className={cn(
                          'font-bold px-3 py-1 rounded-full text-xs',
                          getLevelColor(Number(user.reputation))
                        )}
                      >
                        {getContributionLevel(Number(user.reputation))}
                      </span>
                    </div>
                    <ProgressBar
                      value={getProgressValue(Number(user.reputation))}
                      // className={cn(
                      //   'h-2 rounded-full',
                      //   getLevelProgressColor(Number(user.reputation))
                      // )}
                    />
                    <div className="flex text-xs text-muted-foreground gap-4 font-medium">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {Number(user.answerCount)} answers
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {Number(user.bestSolutionCount)} solutions
                      </span>
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        {Number(user.reputation).toLocaleString()} rep
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8 flex justify-between items-center">
          <Button
            onClick={() => changePage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            variant="outline"
            className="px-5 py-2 bg-card hover:bg-muted text-foreground rounded-lg shadow-sm border border-border hover:border-input disabled:bg-muted disabled:text-muted-foreground transition-colors duration-200 font-medium"
          >
            <span className="mr-2">←</span> Previous
          </Button>
          <span className="text-muted-foreground font-medium bg-muted px-4 py-2 rounded-lg">
            Page {pagination.currentPage} of {Number(pagination.totalPages)}
          </span>
          <Button
            onClick={() => changePage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === Number(pagination.totalPages)}
            variant="outline"
            className="px-5 py-2 bg-card hover:bg-muted text-foreground rounded-lg shadow-sm border border-border hover:border-input disabled:bg-muted disabled:text-muted-foreground transition-colors duration-200 font-medium"
          >
            Next <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function RankIcon({ rank }: { rank: number }) {
  switch (rank) {
    case 1:
      return <Trophy className="h-8 w-8 text-primary filter drop-shadow-md" />;
    case 2:
      return <Medal className="h-7 w-7 text-secondary filter drop-shadow-md" />;
    case 3:
      return <Award className="h-7 w-7 text-accent filter drop-shadow-md" />;
    default:
      return null;
  }
}

function ActivityIcons({
  answers,
  solutions,
}: {
  answers: number;
  solutions: number;
}) {
  return (
    <>
      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
        <MessageCircle className="h-4 w-4 text-primary" />
        <span>{answers}</span>
      </span>
      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
        <Zap className="h-4 w-4 text-accent" />
        <span>{solutions}</span>
      </span>
    </>
  );
}

function getContributionLevel(reputation: number): string {
  if (reputation >= 15000) return 'Expert';
  if (reputation >= 10000) return 'Advanced';
  if (reputation >= 5000) return 'Intermediate';
  return 'Beginner';
}

function getProgressValue(reputation: number): number {
  if (reputation >= 15000) return 100;
  if (reputation >= 10000) return 75;
  if (reputation >= 5000) return 50;
  return 25;
}

function getLevelColor(reputation: number): string {
  if (reputation >= 15000) return 'bg-accent/20 text-accent';
  if (reputation >= 10000) return 'bg-primary/20 text-primary';
  if (reputation >= 5000) return 'bg-secondary/20 text-secondary';
  return 'bg-muted text-muted-foreground';
}

function getLevelProgressColor(reputation: number): string {
  if (reputation >= 15000) return 'bg-accent';
  if (reputation >= 10000) return 'bg-primary';
  if (reputation >= 5000) return 'bg-secondary';
  return 'bg-muted-foreground';
}
