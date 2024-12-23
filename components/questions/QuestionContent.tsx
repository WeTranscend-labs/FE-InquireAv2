"use client"

import { AnswerContent } from './AnswerContent'

interface QuestionContentProps {
  content: string
}

export function QuestionContent({ content }: QuestionContentProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <AnswerContent content={content} />
    </div>
  )
}