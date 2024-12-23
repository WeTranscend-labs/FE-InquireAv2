"use client"

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award } from 'lucide-react'
import { ReputationBadge } from '@/components/features/ReputationBadge'

export function LeaderboardTable() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {leaderboardData.map((user, index) => (
          <div key={user.id} className="flex items-center gap-4">
            <div className="w-8 text-center font-bold">
              {index < 3 ? (
                <RankIcon rank={index + 1} />
              ) : (
                <span className="text-muted-foreground">{index + 1}</span>
              )}
            </div>
            
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{user.name}</span>
                <ReputationBadge points={user.reputation} />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{user.questionsAnswered} answers</span>
                <span>•</span>
                <span>{user.questionsSolved} solutions</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {user.badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function RankIcon({ rank }: { rank: number }) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />
    default:
      return null
  }
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
  // Add more users...
]