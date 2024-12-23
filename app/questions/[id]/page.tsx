import { Suspense } from 'react'
import QuestionDetailWrapper from '@/components/questions/QuestionDetailWrapper'
import { questions, mockAnswers } from '@/lib/data/mock-questions'

// Required for static site generation
export async function generateStaticParams() {
  // Generate routes for all questions
  return questions.map((question) => ({
    id: question.id,
  }))
}

// Add metadata generation
export async function generateMetadata({ params }: { params: { id: string } }) {
  const question = questions.find(q => q.id === params.id)
  
  return {
    title: question ? `${question.questionText.slice(0, 60)}... - DevForum` : 'Question - DevForum',
    description: question?.questionText.slice(0, 160),
  }
}

export default function QuestionPage({ params }: { params: { id: string } }) {
  const question = questions.find(q => q.id === params.id)
  const answers = mockAnswers[params.id as keyof typeof mockAnswers] || []

  if (!question) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Question not found</h1>
        <p className="text-muted-foreground">The question you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionDetailWrapper 
        question={question}
        answers={answers}
      />
    </Suspense>
  )
}