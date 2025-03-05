'use client';

import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Progress } from '../ui/progress';

interface AutoSelectTimerProps {
  deadline: string;
  onDeadlineReached?: () => void;
}

export function AutoSelectTimer({
  deadline,
  onDeadlineReached,
}: AutoSelectTimerProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const deadlineTime = new Date(deadline).getTime();
      const distance = deadlineTime - now;
      const totalDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      const elapsed = totalDuration - distance;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Time expired');
        setProgress(1);
        onDeadlineReached?.();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      setProgress((distance / totalDuration) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline, onDeadlineReached]);

  console.log(progress);

  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Auto-select deadline</span>
      </div>
      <div className="flex items-center gap-4">
        <Progress value={progress} max={100} className="flex-1" />
        <span className="text-sm font-medium">{timeLeft}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Best answer will be auto-selected when timer expires
      </p>
    </Card>
  );
}
