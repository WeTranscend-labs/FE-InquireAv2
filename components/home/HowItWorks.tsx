"use client"

import { Card } from '@/components/ui/card'
import { CircleDollarSign, MessageSquare, Award, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeroHighlight } from '@/components/ui/hero-highlight'

export function HowItWorks() {
  return (
    <HeroHighlight containerClassName="py-24 bg-white  transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            How It Works
          </h2>
          <p className="text-black dark:text-white text-lg md:text-xl max-w-2xl mx-auto">
            Discover how our platform simplifies getting help and earning rewards
          </p>
        </motion.div>

        {/* Steps Section */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <motion.div
            className="absolute hidden lg:block left-1/2 top-0 w-px bg-black/20 dark:bg-white/20 transform -translate-x-1/2"
            style={{ height: "calc(100% - 80px)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <div className="grid lg:grid-cols-1 gap-16 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className={`lg:flex items-center gap-12 ${isEven ? 'justify-start' : 'justify-end'}`}>
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 top-0 lg:top-auto w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shadow-sm z-10">
                      {index + 1}
                    </div>

                    {/* Card */}
                    <Card className={`p-8 w-full lg:w-[480px] bg-white dark:bg-black border border-black/20 dark:border-white/20 shadow-sm hover:shadow-md transition-all duration-300 ${isEven ? 'lg:ml-12' : 'lg:mr-12'}`}>
                      <div className="flex items-start gap-6">
                        <div className="p-3 rounded-xl bg-blue-500 flex-shrink-0">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-black dark:text-white leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    >
                      <svg className="w-6 h-6 text-black/40 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </HeroHighlight>
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