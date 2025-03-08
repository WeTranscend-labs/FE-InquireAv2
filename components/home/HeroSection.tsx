'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CircleDollarSign } from 'lucide-react';
import { Pacifico } from 'next/font/google';
import Link from 'next/link';
import { FloatingPaths } from '../kokonutui/hero-bg';
import { ShimmerButton } from '../magicui/shimmer-button';
import { TypewriterEffect } from '../ui/typewriter-effect';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

// Remove the Three.js components and replace with CSS version

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  // ... existing code ...
}

export function HeroSection() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto  text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Banner Thông Báo */}
            <div className="inline-flex items-center rounded-full px-6 py-2 border border-border mb-8 bg-secondary/50 backdrop-blur-sm">
              <CircleDollarSign className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-foreground">
                Earn tokens by helping others
              </span>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tiêu đề & Mô tả */}
            <h1 className="font-black tracking-tight mb-6 text-foreground">
              <TypewriterEffect
                words={[
                  { text: 'Where' },
                  { text: 'Knowledge', className: 'text-primary' },
                  { text: 'Meets' },
                  { text: 'Rewards', className: 'text-primary' },
                ]}
              />
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-[1.3rem] text-foreground mb-8 leading-relaxed shimmer-text font-medium">
              Ask questions with token bounties, provide valuable answers, and
              earn rewards. Join InquireA's blockchain-powered Q&A community
              today.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex  flex-col sm:flex-row items-center justify-center gap-4 mt-11"
          >
            <Link href="/questions" passHref>
              <ShimmerButton className="px-8 py-3 font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                Explore Questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </ShimmerButton>
            </Link>

            <Link href="/questions/ask" passHref>
              <motion.button className="px-8 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-all">
                Ask a Question
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Add shimmer effect styles */}
      <style jsx global>{`
        .shimmer-text {
          --shimmer-color-start: #ccc; /* Xám sáng hơn */
          --shimmer-color-mid: #fff; /* Trắng */
          background: linear-gradient(
            90deg,
            var(--shimmer-color-start) 0%,
            var(--shimmer-color-start) 40%,
            var(--shimmer-color-mid) 50%,
            var(--shimmer-color-start) 60%,
            var(--shimmer-color-start) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 2.5s infinite linear;
        }

        /* Điều chỉnh theo theme */
        :root[data='light'] .shimmer-text {
          --shimmer-color-start: #ddd; /* Gần trắng */
          --shimmer-color-mid: #fff; /* Trắng sáng */
        }

        :root[data='dark'] .shimmer-text {
          --shimmer-color-start: #eee; /* Trắng nhạt */
          --shimmer-color-mid: #fff; /* Trắng sáng nhất */
        }

        @keyframes shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
    </div>
  );
}
