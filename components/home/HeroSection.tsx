"use client"

import { Button } from '@/components/ui/button'
import { CircleDollarSign, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ParallaxBackground } from './ParallaxBackground'

export function HeroSection() {
  return (
    <ParallaxBackground className="py-24 rounded-3xl overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full px-6 py-2 border border-primary/20 mb-8 bg-background/50 backdrop-blur-sm">
              <CircleDollarSign className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">Earn tokens by helping others</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Where Knowledge Meets Rewards
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our community of developers helping each other while earning tokens.
              Get expert answers and build your reputation in the process.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="min-w-[200px] animate-pulse"
                asChild
              >
                <Link href="/questions/ask">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Ask a Question
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="min-w-[200px] group"
                asChild
              >
                <Link href="/questions">
                  Browse Questions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ParallaxBackground>
  )
}

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Questions Solved" },
  { value: "100K+", label: "Tokens Awarded" },
]