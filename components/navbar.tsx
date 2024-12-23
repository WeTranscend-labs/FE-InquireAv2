"use client"

import Link from 'next/link'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { CircleDollarSign, Home, PlusCircle, User } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <CircleDollarSign className="h-6 w-6" />
            <span className="font-bold text-xl">DevForum</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/questions" className="text-muted-foreground hover:text-foreground">Questions</Link>
            <Link href="/tags" className="text-muted-foreground hover:text-foreground">Tags</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/questions/ask">
              <PlusCircle className="h-4 w-4 mr-2" />
              Ask Question
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}