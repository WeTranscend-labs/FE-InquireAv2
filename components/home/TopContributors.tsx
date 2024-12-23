"use client"

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Shield } from 'lucide-react'

export function TopContributors() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Top Contributors</h2>
      </div>

      <div className="space-y-4">
        {contributors.map((contributor, index) => (
          <div key={contributor.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={contributor.avatar} />
                <AvatarFallback>{contributor.name[0]}</AvatarFallback>
              </Avatar>
              {index < 3 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                  {index + 1}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="font-medium">{contributor.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" />
                {contributor.reputation} reputation
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-medium">{contributor.answers}</div>
              <div className="text-xs text-muted-foreground">answers</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

const contributors = [
  {
    id: '1',
    name: 'John Doe',
    reputation: 1250,
    answers: 42,
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    reputation: 980,
    answers: 38,
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    reputation: 856,
    answers: 31,
    avatar: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    reputation: 742,
    answers: 27,
    avatar: 'https://i.pravatar.cc/150?u=4',
  },
]