"use client"

import { Card } from '@/components/ui/card'
import { CircleDollarSign, MessageSquare, Award, Zap } from 'lucide-react'
import { ParallaxSection } from './ParallaxSection'

export function HowItWorks() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our platform makes it easy to get help and earn rewards
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <ParallaxSection key={step.title} delay={index * 0.1}>
              <Card className="p-6 relative group hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            </ParallaxSection>
          )
        })}
      </div>
    </div>
  )
}

const steps = [
  {
    title: "Ask Questions",
    description: "Post your programming questions with a token bounty to incentivize quality answers",
    icon: MessageSquare,
  },
  {
    title: "Set Bounty",
    description: "Allocate tokens as a reward for the best answer to your question",
    icon: CircleDollarSign,
  },
  {
    title: "Get Answers",
    description: "Receive detailed answers from experienced developers in the community",
    icon: Zap,
  },
  {
    title: "Earn Rewards",
    description: "Help others by answering questions and earn tokens and reputation",
    icon: Award,
  },
]