'use client';

import { Button } from '@/components/ui/button';
import { CircleDollarSign, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ParallaxBackground } from './ParallaxBackground';

export function HeroSection() {
  return (
    <ParallaxBackground className="py-24 rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full px-6 py-2 border border-zinc-800 mb-8 bg-zinc-900/50 backdrop-blur-sm">
              <CircleDollarSign className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-zinc-300">
                Earn tokens by helping others
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Where Knowledge Meets Rewards
            </h1>

            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
              Ask questions with token bounties, provide valuable answers, and
              earn rewards. Join InquireA's blockchain-powered Q&A community
              today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Button
                size="lg"
                className="min-w-[200px] bg-white text-black hover:bg-zinc-200 transition-colors relative z-10"
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
                className="min-w-[200px] group border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white relative z-10"
                asChild
              >
                <Link href="/questions">
                  Browse Questions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="space-y-2 p-4 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800"
                >
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ParallaxBackground>
  );
}

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50K+', label: 'Questions Solved' },
  { value: '100K+', label: 'Tokens Awarded' },
];
