"use client"

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award, Zap, BookOpen, MessageCircle, Star } from 'lucide-react'
import { ReputationBadge } from '@/components/features/ReputationBadge'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProgressBar } from '../ui/progress'

export function LeaderboardTable() {
  return (
    <Card className="p-6 border-0 shadow-lg overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Top Contributors</h2>
        <p className="text-muted-foreground mt-1">Leaders making an impact in our community</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Contributions</TableHead>
            <TableHead className="text-right">Badges</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((user, index) => (
            <TableRow
              key={user.id}
              className={cn(
                "group hover:bg-muted/50 transition-colors",
                index < 3 ? "bg-muted/20" : ""
              )}
            >
              <TableCell className="font-medium w-16">
                <div className="flex justify-center">
                  {index < 3 ? (
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <RankIcon rank={index + 1} />
                    </motion.div>
                  ) : (
                    <span className="text-muted-foreground font-bold">{index + 1}</span>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className={cn(
                    "h-10 w-10 ring-2 ring-offset-2 transition-all group-hover:ring-primary",
                    index === 0 ? "ring-yellow-500" :
                      index === 1 ? "ring-gray-400" :
                        index === 2 ? "ring-amber-600" : "ring-transparent"
                  )}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary/10">{user.name[0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {user.name}
                      <ReputationBadge points={user.reputation} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <ActivityIcons answers={user.questionsAnswered} solutions={user.questionsSolved} />
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Contribution level</span>
                    <span className="font-medium">{getContributionLevel(user.reputation)}</span>
                  </div>
                  <ProgressBar
                    value={getProgressValue(user.reputation)}

                  />
                  <div className="flex text-xs text-muted-foreground">
                    <span>{user.questionsAnswered} answers</span>
                    <span className="mx-1">•</span>
                    <span>{user.questionsSolved} solutions</span>
                    <span className="mx-1">•</span>
                    <span>{user.reputation.toLocaleString()} rep</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  {user.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="outline"
                      className="bg-background group-hover:bg-primary/5 transition-colors"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

function RankIcon({ rank }: { rank: number }) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500 drop-shadow-md" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-400 drop-shadow-md" />
    case 3:
      return <Award className="h-6 w-6 text-amber-600 drop-shadow-md" />
    default:
      return null
  }
}

function ActivityIcons({ answers, solutions }: { answers: number; solutions: number }) {
  return (
    <>
      <MessageCircle className="h-3.5 w-3.5" />
      <span>{answers}</span>
      <span>•</span>
      <Zap className="h-3.5 w-3.5" />
      <span>{solutions}</span>
    </>
  )
}

function getContributionLevel(reputation: number): string {
  if (reputation >= 15000) return "Expert";
  if (reputation >= 10000) return "Advanced";
  if (reputation >= 5000) return "Intermediate";
  return "Beginner";
}

function getProgressValue(reputation: number): number {
  if (reputation >= 15000) return 100;
  if (reputation >= 10000) return 75;
  if (reputation >= 5000) return 50;
  return 25;
}

const leaderboardData = [
  {
    id: '1',
    name: 'Sarah Chen',
    reputation: 15420,
    questionsAnswered: 342,
    questionsSolved: 289,
    badges: ['Smart Contracts', 'Security'],
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Alex Kumar',
    reputation: 12350,
    questionsAnswered: 256,
    questionsSolved: 198,
    badges: ['React', 'TypeScript'],
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    reputation: 11280,
    questionsAnswered: 198,
    questionsSolved: 167,
    badges: ['PostgreSQL', 'Backend'],
    avatar: 'https://i.pravatar.cc/150?u=maria'
  },
  {
    id: '4',
    name: 'James Wilson',
    reputation: 9340,
    questionsAnswered: 178,
    questionsSolved: 143,
    badges: ['JavaScript', 'Frontend'],
    avatar: 'https://i.pravatar.cc/150?u=james'
  },
  {
    id: '5',
    name: 'Aisha Patel',
    reputation: 8750,
    questionsAnswered: 165,
    questionsSolved: 132,
    badges: ['Python', 'Data Science'],
    avatar: 'https://i.pravatar.cc/150?u=aisha'
  },
  // Add more users if needed...
]