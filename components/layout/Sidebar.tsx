"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { 
  Home, 
  MessageSquare, 
  Tags, 
  Trophy, 
  Users, 
  Settings,
  CircleDollarSign,
  Shield
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Questions",
    icon: MessageSquare,
    href: "/questions",
  },
  {
    title: "Tags",
    icon: Tags,
    href: "/tags",
  },
  {
    title: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:block w-[240px] shrink-0 border-r">
      <div className="sticky top-[65px] h-[calc(100vh-65px)]">
        <ScrollArea className="h-full py-6 px-4">
          <div className="space-y-6">
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm">Balance</span>
                  </div>
                  <span className="font-medium">250 tokens</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Reputation</span>
                  </div>
                  <span className="font-medium">1,234 pts</span>
                </div>
              </div>
            </Card>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    pathname === item.href && "bg-secondary"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}