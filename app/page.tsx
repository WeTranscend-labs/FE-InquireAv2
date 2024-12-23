import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CircleDollarSign, TrendingUp, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import QuestionsList from '@/components/questions-list'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Knowledge Has Value
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ask questions with token bounties, provide valuable answers, and earn rewards.
          Join InquireA's blockchain-powered Q&A community today.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="min-w-[160px]" asChild>
            <Link href="/questions/ask">
              Ask Question
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="min-w-[160px] group" asChild>
            <Link href="/questions">
              Browse
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">1,234</h3>
              <p className="text-muted-foreground">Active Users</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <CircleDollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">5,678</h3>
              <p className="text-muted-foreground">Tokens Awarded</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">9,012</h3>
              <p className="text-muted-foreground">Questions Solved</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Recent Questions */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Recent Questions</h2>
          <Button variant="ghost" className="group" asChild>
            <Link href="/questions">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <QuestionsList />
      </section>
    </div>
  )
}