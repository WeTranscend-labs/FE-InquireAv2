'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, MessageSquare, Info } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CustomConnectButton } from '../wallet/CustomConnectWallet';

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <CircleDollarSign className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">InquireA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Button
              variant={pathname === '/questions' ? 'secondary' : 'ghost'}
              size="sm"
              asChild
            >
              <Link href="/questions">
                <MessageSquare className="h-4 w-4 mr-2" />
                Questions
              </Link>
            </Button>

            <Button
              variant={pathname === '/about' ? 'secondary' : 'ghost'}
              size="sm"
              asChild
            >
              <Link href="/about">
                <Info className="h-4 w-4 mr-2" />
                About
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/questions/ask">Ask Question</Link>
          </Button>

          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
}
