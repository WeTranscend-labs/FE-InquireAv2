"use client"

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ReputationBadge } from '@/components/features/ReputationBadge'
import Link from 'next/link'

export function UsersGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="p-6">
          <div className="text-center mb-4">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{user.title}</p>
            <ReputationBadge points={user.reputation} className="mx-auto" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {user.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div>
              <p className="font-semibold">{user.answers}</p>
              <p className="text-sm text-muted-foreground">Answers</p>
            </div>
            <div>
              <p className="font-semibold">{user.solutions}</p>
              <p className="text-sm text-muted-foreground">Solutions</p>
            </div>
          </div>

          <Button asChild className="w-full">
            <Link href={`/users/${user.id}`}>View Profile</Link>
          </Button>
        </Card>
      ))}
    </div>
  )
}

const users = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Blockchain Developer',
    reputation: 15420,
    answers: 342,
    solutions: 289,
    tags: ['Smart Contracts', 'Security', 'Solidity'],
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Alex Kumar',
    title: 'Frontend Architect',
    reputation: 12350,
    answers: 256,
    solutions: 198,
    tags: ['React', 'TypeScript', 'Next.js'],
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  // Add more users...
]