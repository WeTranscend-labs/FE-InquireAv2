"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare, Github, Twitter } from 'lucide-react'

export function ContactSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Get in Touch</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <form className="space-y-4">
              <div>
                <Input placeholder="Your email" type="email" />
              </div>
              <div>
                <Input placeholder="Subject" />
              </div>
              <div>
                <Textarea placeholder="Your message" className="min-h-[150px]" />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Mail className="h-5 w-5" />
                  <span>support@devforum.com</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <MessageSquare className="h-5 w-5" />
                  <span>Join our Discord</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                  <span>Follow on GitHub</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                  <span>Follow on Twitter</span>
                </a>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Office Location</h3>
              <p className="text-muted-foreground">
                123 Tech Street<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}