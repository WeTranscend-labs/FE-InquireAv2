"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert } from '@/components/ui/alert'

interface AnswerEditorProps {
  questionId: string
  onSubmit: (content: string) => Promise<void>
  minimumLength?: number
}

export function AnswerEditor({ 
  questionId, 
  onSubmit,
  minimumLength = 100
}: AnswerEditorProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (content.length < minimumLength) {
      setError(`Answer must be at least ${minimumLength} characters long`)
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      await onSubmit(content)
      setContent('')
    } catch (err) {
      setError('Failed to submit answer. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Your Answer</h3>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <span className="ml-2">{error}</span>
        </Alert>
      )}

      <div className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your answer here..."
          className="min-h-[200px]"
        />
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {content.length} / {minimumLength} characters minimum
          </span>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || content.length < minimumLength}
          >
            {isSubmitting ? 'Submitting...' : 'Post Answer'}
          </Button>
        </div>
      </div>
    </Card>
  )
}