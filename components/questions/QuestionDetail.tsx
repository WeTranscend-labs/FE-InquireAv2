"use client"

import { QuestionContent } from './QuestionContent'
import { QuestionMetadata } from './QuestionMetadata'
import { QuestionTags } from './QuestionTags'
import { QuestionBounty } from './QuestionBounty'
import { QuestionGuidelines } from './QuestionGuidelines'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Question {
  id: string
  asker: string
  questionText: string
  rewardAmount: number
  createdAt: number
  isClosed: boolean
  chosenAnswerId: number
  deadline: string
  tags?: string[]
}

interface QuestionDetailProps {
  question: Question
  answersCount: number
}

export default function QuestionDetail({ question, answersCount }: QuestionDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 shadow-lg border-t-4 border-t-primary">
        <div className="space-y-8">
          {/* Question Header */}
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">
                Best practices for smart contract development
              </h1>
              <QuestionMetadata
                author={{
                  address: question.asker,
                  reputation: 750,
                  avatar: 'https://i.pravatar.cc/150?u=asker'
                }}
                createdAt={question.createdAt}
              />
            </div>
            <QuestionBounty amount={question.rewardAmount} />
          </div>

          <Separator />

          {/* Question Content */}
          <QuestionContent content={question.questionText} />

          {/* Tags */}
          <QuestionTags 
            tags={question.tags || [
              'solidity',
              'ethereum',
              'smart-contracts',
              'security',
              'gas-optimization'
            ]} 
          />

          <Separator />

          {/* Guidelines */}
          <QuestionGuidelines />
        </div>
      </Card>
    </div>
  )
}