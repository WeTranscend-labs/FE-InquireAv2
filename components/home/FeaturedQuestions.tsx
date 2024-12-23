"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CircleDollarSign, MessageSquare, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export function FeaturedQuestions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Questions</h2>
        <Button variant="ghost" asChild>
          <Link href="/questions">View All</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <Card key={question.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-6">
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <div className="text-center">
                  <CircleDollarSign className="h-5 w-5 mx-auto text-primary" />
                  <span className="text-sm font-medium">{question.bounty}</span>
                </div>
                <div className="text-center">
                  <MessageSquare className="h-5 w-5 mx-auto" />
                  <span className="text-sm">{question.answers}</span>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <Link 
                  href={`/questions/${question.id}`}
                  className="text-xl font-semibold hover:text-primary transition-colors"
                >
                  {question.title}
                </Link>

                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Asked by {question.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDistanceToNow(question.createdAt)} ago</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

const questions = [
  {
    id: '1',
    title: 'How to implement authentication in Next.js 13 with Supabase?',
    bounty: 50,
    answers: 3,
    tags: ['next.js', 'supabase', 'authentication'],
    author: 'johndoe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '2',
    title: 'Best practices for handling state in React components',
    bounty: 30,
    answers: 5,
    tags: ['react', 'javascript', 'state-management'],
    author: 'janedoe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
]