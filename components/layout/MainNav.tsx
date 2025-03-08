'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Info, MessageSquare, PlusCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomConnectButton } from '../wallet/CustomConnectWallet';

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

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
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <svg
              version="1.1"
              id="Calque_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 360 360"
              enable-background="new 0 0 360 360"
              width="48"
              height="48"
              data-uid="o-b6402f89ff7e46baafaded683aaedb22"
            >
              <g data-uid="o-0cf95da753b844b797570d4fbd4e28fe">
                <path
                  className="st0"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
                  data-type="polygon"
                  d="M107.05 214.51L107.05 136.11L160.94 136.11L160.94 108.37L79.3 108.37L79.3 242.25L160.94 242.25L160.94 214.51Z"
                  data-uid="o-f1d953b0e8bc4d259ffd640149b886d4"
                ></path>
                <path
                  className="st0"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
                  data-type="polygon"
                  d="M282.33 80.62L160.94 80.63L160.94 108.37L254.59 108.37L254.59 214.51L192.15 214.51L160.94 242.25L160.94 279.38L202.7 242.25L282.33 242.25Z"
                  data-uid="o-ba5e0c46d588479d810156a0e91d2c1c"
                ></path>
                <path
                  className="st0"
                  d="M138.4 160.83c-7.66 0-13.87 6.21-13.87 13.87s6.21 13.87 13.87 13.87c7.66 0 13.87-6.21 13.87-13.87
                S146.06 160.83 138.4 160.83z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
                  data-uid="o-efa6826bc6664c28b77ed4235232d2f6"
                ></path>
                <path
                  className="st0"
                  d="M180.82 160.83c-7.66 0-13.87 6.21-13.87 13.87s6.21 13.87 13.87 13.87c7.66 0 13.87-6.21 13.87-13.87
                S188.48 160.83 180.82 160.83z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
                  data-uid="o-d4d5a17884574a83886ff630205d099a"
                ></path>
                <path
                  className="st0"
                  d="M223.24 188.57c7.66 0 13.87-6.21 13.87-13.87s-6.21-13.87-13.87-13.87c-7.66 0-13.87 6.21-13.87 13.87
                S215.58 188.57 223.24 188.57z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
                  data-uid="o-b931500078cc4f1596193a224765a123"
                ></path>
              </g>
            </svg>

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
          <Button asChild size="sm">
            <Link href="/questions/ask">
              <PlusCircle className="h-4 w-4 mr-2" />
              Ask Question
            </Link>
          </Button>

          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
}
