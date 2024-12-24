'use client';

import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  NetworkIcon,
  PlugIcon,
  Wallet2Icon,
  WalletIcon,
} from 'lucide-react';

export function CustomConnectButton() {
  const { theme } = useTheme();

  useEffect(() => {
    // Đảm bảo RainbowKit tuân theo theme của ứng dụng
    document.documentElement.classList.toggle('dark', theme === 'light');
  }, [theme]);

  // Hàm để chọn variant dựa trên theme
  function formatAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

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
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={openConnectModal}
                      variant="default"
                      className="flex items-center justify-center"
                    >
                      <PlugIcon className="mr-2 h-4 w-4" />
                      <span className="truncate">Connect Wallet</span>
                    </Button>
                  </div>
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
                <div className="flex items-center">
                  <Button
                    onClick={openChainModal}
                    variant="outline"
                    className="rounded-r-none border-r-0 flex items-center gap-2"
                  >
                    <NetworkIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{chain.name}</span>
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    variant="default"
                    className="rounded-l-none flex items-center gap-2 max-w-[250px]"
                  >
                    <Wallet2Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium truncate max-w-[150px]">
                        {account.displayBalance}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatAddress(account.address)}
                      </span>
                    </div>
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
