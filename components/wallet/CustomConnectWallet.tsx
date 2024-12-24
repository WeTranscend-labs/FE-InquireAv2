'use client';

import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export function CustomConnectButton() {
  const { theme } = useTheme();

  useEffect(() => {
    // Đảm bảo RainbowKit tuân theo theme của ứng dụng
    document.documentElement.classList.toggle('dark', theme === 'light');
  }, [theme]);

  // Hàm để chọn variant dựa trên theme

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} variant="default">
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} variant="destructive">
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <Button onClick={openChainModal} variant="outline">
                    {chain.name}
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    variant="default"
                    className="flex items-center gap-2 max-w-[200px]"
                  >
                    <span className="truncate max-w-[150px]">
                      {account.displayName}
                    </span>
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
