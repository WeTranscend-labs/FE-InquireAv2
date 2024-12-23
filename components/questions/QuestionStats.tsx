"use client"

import { CircleDollarSign, MessageSquare, ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuestionStatsProps {
  votes: number
  answers: number
  bounty: number
}

export function QuestionStats({ votes, answers, bounty }: QuestionStatsProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-muted-foreground">
      <StatItem
        icon={ThumbsUp}
        value={votes}
        label="votes"
      />
      <StatItem
        icon={MessageSquare}
        value={answers}
        label="answers"
        className={cn(answers > 0 && "text-primary")}
      />
      <StatItem
        icon={CircleDollarSign}
        value={bounty}
        label="bounty"
        className="text-primary"
      />
    </div>
  )
}

interface StatItemProps {
  icon: React.ElementType
  value: number
  label: string
  className?: string
}

function StatItem({ icon: Icon, value, label, className }: StatItemProps) {
  return (
    <div className={cn("text-center transition-colors duration-200", className)}>
      <Icon className="h-5 w-5 mx-auto mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
      <span className="text-sm font-medium">{value}</span>
      <span className="sr-only">{label}</span>
    </div>
  )
}