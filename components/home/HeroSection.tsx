'use client';

import { Button } from '@/components/ui/button';
import { CircleDollarSign, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ParallaxBackground } from './ParallaxBackground';
import { ShimmerButton } from '../magicui/shimmer-button';
import { SparklesText } from '../magicui/sparkles-text';
import { TypewriterEffect } from '../ui/typewriter-effect';


export function HeroSection() {
  return (
    <ParallaxBackground className="py-24 rounded-3xl overflow-hidden border border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Banner Thông Báo */}
            <div className="inline-flex items-center rounded-full px-6 py-2 border border-border mb-8 bg-secondary/50 backdrop-blur-sm">
              <CircleDollarSign className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-foreground">
                Earn tokens by helping others
              </span>
            </div>

            {/* Tiêu đề & Mô tả */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
              <TypewriterEffect
                words={[
                  { text: "Where" },
                  { text: "Knowledge", className: "text-primary" },
                  { text: "Meets" },
                  { text: "Rewards", className: "text-primary" },
                ]}
              />
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Ask questions with token bounties, provide valuable answers, and
              earn rewards. Join InquireA's blockchain-powered Q&A community
              today.
            </p>

            {/* Nút CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Button
                size="lg"
                className="min-w-[200px] animate-pulse"
                asChild
                variant="default"
              >
                <Link href="/questions/ask">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Ask a Question
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] group border-border text-foreground hover:bg-accent hover:text-primary relative z-10"
                asChild
              >
                <Link href="/questions">
                  Browse Questions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Thống kê */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="space-y-2 p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-border"
                >
                  <div className="text-3xl font-bold text-primary">
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
  );
}

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50K+', label: 'Questions Solved' },
  { value: '100K+', label: 'Tokens Awarded' },
];
