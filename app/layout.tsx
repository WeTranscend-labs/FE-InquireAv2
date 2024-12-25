import { MainNav } from '@/components/layout/MainNav';
import { Sidebar } from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import '@rainbow-me/rainbowkit/styles.css';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';

const ContextProvider = dynamic(
  () => import('@/contexts/providers/ContextProvider'),
  {
    ssr: true,
    loading: () => <div>Loading Context...</div>,
  }
);

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InquireA - Ask, Answer & Earn',
  description:
    'A blockchain-powered Q&A platform where knowledge meets rewards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme={'system'}
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <ContextProvider>
              <div className="min-h-screen flex flex-col bg-background">
                <MainNav />
                <div className="flex-1 flex">
                  <Sidebar />
                  <main className="flex-1 pt-6">
                    <div className="container mx-auto px-4">{children}</div>
                  </main>
                </div>
              </div>
              <Toaster />
            </ContextProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
