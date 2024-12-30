"use client"

import { useState } from "react"
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
    Shield,
    ChevronLeft,
    ChevronRight
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

export function CollapsibleSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative border-r transition-all duration-300 bg-background",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >


      <div className="sticky top-[65px] h-[calc(100vh-65px)]">
        <ScrollArea className="h-full py-6 px-2">
          <div className="space-y-6">
            {!isCollapsed && (
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
            )}

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full flex items-center",
                    isCollapsed ? "justify-center" : "justify-start",
                    pathname === item.href && "bg-secondary",
                    isCollapsed && "px-2"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">{item.title}</span>}
                  </Link>
                </Button>
              ))}
            </nav>
                  </div>
                  <div className="sticky top-4 flex items-center justify-center h-12">
                      <Button
                          variant="ghost"
                          size="icon"
                          className="z-10 h-8 w-8 "
                          onClick={() => setIsCollapsed(!isCollapsed)}
                      >
                          {isCollapsed ? (
                              <ChevronRight className="h-4 w-4" />
                          ) : (
                              <ChevronLeft className="h-4 w-4" />
                          )}
                      </Button>
                  </div>
        </ScrollArea>
      </div>
    </div>
  );
}
