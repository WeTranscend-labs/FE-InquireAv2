"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ThumbsUp, Check, User, Clock, MessageSquare, Code2, Share2, Flag } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ReputationBadge } from '@/components/features/ReputationBadge'
import { useState } from 'react'
import { AnswerContent } from './AnswerContent'
import { CodeBlock } from './CodeBlock'
import { AnswerActions } from './AnswerActions'
import { AnswerMetadata } from './AnswerMetadata'

interface Answer {
  id: string
  author: {
    name: string
    avatar: string
    reputation: number
  }
  content: string
  code?: string
  upvotes: number
  rewardAmount: number
  createdAt: number
  isAccepted?: boolean
  comments?: {
    id: string
    author: string
    content: string
    createdAt: number
  }[]
}

interface AnswersListProps {
  answers: Answer[]
  onUpvote?: (answerId: string) => void
  onAccept?: (answerId: string) => void
}

export default function AnswersList({ answers, onUpvote, onAccept }: AnswersListProps) {
  const [votedAnswers, setVotedAnswers] = useState<Set<string>>(new Set())

  const handleUpvote = (answerId: string) => {
    if (!votedAnswers.has(answerId)) {
      setVotedAnswers(new Set([...votedAnswers, answerId]))
      onUpvote?.(answerId)
    }
  }

  if (answers.length === 0) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No Answers Yet</h3>
        <p className="text-muted-foreground">
          Be the first to help by providing an answer to this question.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <span>{answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}</span>
          <div className="h-px flex-1 bg-border ml-4" />
        </h2>
      </div>

      <div className="space-y-6">
        {answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            hasVoted={votedAnswers.has(answer.id)}
            onUpvote={() => handleUpvote(answer.id)}
            onAccept={() => onAccept?.(answer.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface AnswerCardProps {
  answer: Answer
  hasVoted: boolean
  onUpvote: () => void
  onAccept?: () => void
}

function AnswerCard({ answer, hasVoted, onUpvote, onAccept }: AnswerCardProps) {
  const [showComments, setShowComments] = useState(false)

  return (
    <Card className={`p-6 transition-shadow hover:shadow-md ${
      answer.isAccepted ? 'border-2 border-green-500 dark:border-green-400' : ''
    }`}>
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-3">
          <Button
            variant={hasVoted ? "default" : "outline"}
            size="sm"
            onClick={onUpvote}
            className="rounded-full h-12 w-12 p-0 transition-transform hover:scale-105"
            disabled={hasVoted}
          >
            <ThumbsUp className="h-5 w-5" />
          </Button>
          <span className="font-medium text-lg">{answer.upvotes}</span>
          {answer.isAccepted && (
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <AnswerMetadata author={answer.author} createdAt={answer.createdAt} />
          
          <AnswerContent content={answer.content} />
          
          {answer.code && (
            <CodeBlock code={answer.code} language="typescript" />
          )}

          <AnswerActions
            hasComments={Boolean(answer.comments?.length)}
            onToggleComments={() => setShowComments(!showComments)}
            rewardAmount={answer.rewardAmount}
          />

          {showComments && answer.comments && (
            <div className="mt-4 space-y-3 pl-4 border-l-2">
              {answer.comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-muted-foreground mx-2">•</span>
                  <span className="text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                  </span>
                  <p className="mt-1">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}