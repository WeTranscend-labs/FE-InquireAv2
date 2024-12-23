"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function FeaturedProjects() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <p className="text-muted-foreground">Discover projects built by our community</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full flex flex-col">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                      </Link>
                    )}
                    {project.demo && (
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                      </Link>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const projects = [
  {
    title: "Smart Contract Auditor",
    description: "AI-powered tool for automated smart contract security analysis",
    technologies: ["Solidity", "Python", "Machine Learning"],
    github: "#",
    demo: "#"
  },
  {
    title: "DeFi Dashboard",
    description: "Real-time analytics dashboard for DeFi protocols",
    technologies: ["React", "Web3.js", "TailwindCSS"],
    github: "#",
    demo: "#"
  },
  {
    title: "NFT Marketplace",
    description: "Decentralized marketplace for trading NFTs",
    technologies: ["Next.js", "Ethereum", "IPFS"],
    github: "#",
    demo: "#"
  }
]