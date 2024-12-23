"use client"

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

export function TeamSection() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-16">Meet Our Team</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <div className="text-center mb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {member.bio}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    skills: ["Blockchain", "Architecture", "Leadership"],
    bio: "Former tech lead at major Web3 projects, passionate about decentralized knowledge sharing."
  },
  {
    name: "Alex Kumar",
    role: "CTO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    skills: ["Smart Contracts", "Backend", "Security"],
    bio: "Blockchain security expert with 10+ years of experience in distributed systems."
  },
  {
    name: "Maria Garcia",
    role: "Head of Community",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    skills: ["Community", "Marketing", "Strategy"],
    bio: "Community builder focused on creating engaging developer ecosystems."
  }
]