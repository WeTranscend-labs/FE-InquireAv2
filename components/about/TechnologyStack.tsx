"use client"

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Code2, Database, Shield, Cpu } from 'lucide-react'

export function TechnologyStack() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-16">Our Technology Stack</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <tech.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{tech.name}</h3>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const technologies = [
  {
    name: "Next.js & React",
    description: "Modern frontend framework for optimal performance and SEO",
    icon: Code2
  },
  {
    name: "Supabase",
    description: "Scalable database with real-time capabilities",
    icon: Database
  },
  {
    name: "Smart Contracts",
    description: "Secure token distribution and rewards system",
    icon: Shield
  },
  {
    name: "AI Integration",
    description: "Advanced answer quality validation",
    icon: Cpu
  }
]