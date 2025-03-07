'use client';

import { motion } from 'framer-motion';
import { Pacifico } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ShimmerButton } from '../magicui/shimmer-button';

import { ArrowRight, CircleDollarSign } from 'lucide-react';
import Link from 'next/link';
import { TypewriterEffect } from '../ui/typewriter-effect';
import QuestionBubble from './QuestionBubble';
import { SparklesText } from '../magicui/sparkles-text';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

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
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-linear-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px] border-2 border-white/[0.15]',
            'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
          )}
        />
      </motion.div>
    </motion.div>
  );
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
    <div className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden ">

      <div className="absolute inset-0 overflow-hidden">
        <QuestionBubble
          question="Why is JavaScript passing functions as arguments so powerful?"
          delay={0.3}
          width={380}
          height={60}
          rotate={6}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-%] top-[15%] md:top-[25%]"
          avatar="/avatars/user-1.png"
          reputation={2453}
        />

        <QuestionBubble
          question="What are the best practices for React state management in 2025?"
          delay={0.5}
          width={420}
          height={60}
          rotate={-8}
          gradient="from-rose-500/[0.15]"
          className="right-[-15%] md:right-[2%] top-[70%] md:top-[75%]"
          avatar="/avatars/user-2.png"
          reputation={3812}
        />

        <QuestionBubble
          question="How do recursive algorithms compare to iterative approaches?"
          delay={0.4}
          width={320}
          height={60}
          rotate={-4}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          avatar="/avatars/user-3.png"
          reputation={1895}
        />

        <QuestionBubble
          question="Is TypeScript really worth the extra development overhead?"
          delay={0.6}
          width={330}
          height={60}
          rotate={10}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[5%] top-[10%] md:top-[15%]"
          avatar="/avatars/user-4.png"
          reputation={5321}
        />

        <QuestionBubble
          question="When should you choose SQL over NoSQL databases?"
          delay={0.7}
          width={260}
          height={60}
          rotate={-12}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[-5%] md:top-[10%]"
          avatar="/avatars/user-5.png"
          reputation={4167}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
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
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
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
    </div>
  );
}