"use client"

import { Card } from '@/components/ui/card'
import { Award, Star, Target, TrendingUp } from 'lucide-react'

export function LeaderboardStats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

const stats = [
  {
    title: "Total Reputation",
    value: "1.2M",
    icon: Award
  },
  {
    title: "Questions Solved",
    value: "45.3K",
    icon: Target
  },
  {
    title: "Active Users",
    value: "12.5K",
    icon: TrendingUp
  },
  {
    title: "Expert Users",
    value: "2.8K",
    icon: Star
  }
]