"use client"

import { QuestionCard } from './QuestionCard'

export default function QuestionsList() {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  )
}

const questions = [
  {
    id: '1',
    title: 'How to implement authentication in Next.js 13 with Supabase?',
    content: 'I\'m trying to implement authentication in my Next.js 13 application using Supabase. I\'ve followed the documentation but I\'m running into issues with the server components...',
    bounty: 50,
    answers: 3,
    votes: 12,
    tags: ['next.js', 'supabase', 'authentication'],
    author: 'johndoe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '2',
    title: 'Best practices for handling state in React components',
    content: 'What are the current best practices for managing state in React components? I\'m specifically interested in complex forms and data fetching scenarios...',
    bounty: 30,
    answers: 5,
    votes: 8,
    tags: ['react', 'javascript', 'state-management'],
    author: 'janedoe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '3',
    title: 'Understanding TypeScript generics with React',
    content: 'I\'m having trouble understanding how to properly use TypeScript generics with React components. Specifically, I\'m trying to create a reusable form component...',
    bounty: 45,
    answers: 2,
    votes: 6,
    tags: ['typescript', 'react', 'generics'],
    author: 'alexsmith',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  }
]