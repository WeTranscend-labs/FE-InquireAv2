"use client"

import { Trophy } from 'lucide-react'

export function LeaderboardHeader() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Leaderboard</h1>
      </div>
      <p className="text-muted-foreground">
        Top contributors and their achievements in our community
      </p>
    </div>
  )
}