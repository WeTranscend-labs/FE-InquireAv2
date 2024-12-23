"use client"

import { motion } from 'framer-motion'
import { CircleDollarSign } from 'lucide-react'

export function AboutHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-primary/10 -z-10" />
      <div className="container mx-auto px-4 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-8">
            <CircleDollarSign className="h-6 w-6 text-primary mr-2" />
            <span className="font-medium">Empowering Developers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Building the Future of Developer Q&A
          </h1>
          <p className="text-xl text-muted-foreground">
            We're creating a community where knowledge sharing is rewarded and quality answers are incentivized through blockchain technology.
          </p>
        </motion.div>
      </div>
    </div>
  )
}