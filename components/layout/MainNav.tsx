'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, MessageSquare, Info } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { usePathname } from 'next/navigation';
import { CustomConnectButton } from '../wallet/CustomConnectWallet';

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Lắng nghe sự kiện scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Set trạng thái khi scrollY > 0
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo và Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <CircleDollarSign className="h-6 w-6 text-primary dark:text-gray-100" />
            <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
              InquireA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Button
              variant={pathname === '/questions' ? 'secondary' : 'ghost'}
              size="sm"
              className=" dark:text-gray-200"
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
              className=" dark:text-gray-200"
              asChild
            >
              <Link href="/about">
                <Info className="h-4 w-4 mr-2" />
                About
              </Link>
            </Button>
          </nav>
        </div>

        {/* Công cụ và nút hành động */}
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
