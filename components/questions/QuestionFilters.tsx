"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, TrendingUp, Award, MessageSquare } from 'lucide-react'

export function QuestionFilters() {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Filter By</h3>
          <div className="space-y-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-secondary text-sm"
              >
                <filter.icon className="h-4 w-4" />
                <span>{filter.name}</span>
                <Badge variant="secondary" className="ml-auto">
                  {filter.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge key={tag.name} variant="secondary" className="cursor-pointer">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

const filters = [
  { name: 'Recent', icon: Clock, count: 124 },
  { name: 'Most Voted', icon: TrendingUp, count: 89 },
  { name: 'Highest Bounty', icon: Award, count: 56 },
  { name: 'Unanswered', icon: MessageSquare, count: 23 },
]

const popularTags = [
  { name: 'react' },
  { name: 'next.js' },
  { name: 'typescript' },
  { name: 'javascript' },
  { name: 'tailwindcss' },
]