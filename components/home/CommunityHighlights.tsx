"use client"

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ReputationBadge } from '@/components/reputation/ReputationBadge'

export function CommunityHighlights() {
  return (
    <div className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-primary/5" />
      
      <div className="relative container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-16">Community Highlights</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight) => (
            <Card key={highlight.id} className="p-6 text-left hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={highlight.avatar} />
                  <AvatarFallback>{highlight.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{highlight.name}</div>
                  <ReputationBadge reputation={highlight.reputation} className="mt-1" />
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{highlight.contribution}</p>
              
              <div className="flex flex-wrap gap-2">
                {highlight.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const highlights = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    reputation: 1250,
    contribution: "Provided comprehensive guide on smart contract security best practices",
    tags: ["blockchain", "security", "solidity"],
  },
  {
    id: 2,
    name: "Alex Kumar",
    avatar: "https://i.pravatar.cc/150?u=alex",
    reputation: 980,
    contribution: "Created detailed tutorial series on Next.js 13 features",
    tags: ["next.js", "react", "typescript"],
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?u=maria",
    reputation: 875,
    contribution: "Helped optimize database queries for high-traffic applications",
    tags: ["postgresql", "optimization", "database"],
  },
]