'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

type TimerMode = 'count-up' | 'count-down';

interface TimerProps {
  mode?: TimerMode;
  initialSeconds?: number;
  autoStart?: boolean;
  pausable?: boolean;
  onComplete?: () => void;
  onTick?: (seconds: number) => void;
  className?: string;
}

export default function Timer({
  mode = 'count-up',
  initialSeconds = 0,
  autoStart = false,
  pausable = true,
  onComplete,
  onTick,
  className = '',
}: TimerProps) {
  const [seconds, setSeconds] = useState(mode === 'count-down' ? initialSeconds : 0);
  const [running, setRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!running) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        const next = mode === 'count-down' ? prev - 1 : prev + 1;
        onTick?.(next);

        if (mode === 'count-down' && next <= 0) {
          setRunning(false);
          onComplete?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return clearTimer;
  }, [running, mode, onComplete, onTick, clearTimer]);

  const toggle = useCallback(() => setRunning((r) => !r), []);
  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(mode === 'count-down' ? initialSeconds : 0);
  }, [mode, initialSeconds]);

  const mins = Math.floor(Math.abs(seconds) / 60);
  const secs = Math.abs(seconds) % 60;
  const display = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className="font-mono text-3xl font-bold tabular-nums text-gray-800 dark:text-gray-100"
        role="timer"
        aria-live="polite"
        aria-label={`${mins} minutes ${secs} seconds`}
      >
        {display}
      </span>
      {pausable && (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={toggle} aria-label={running ? 'Pause timer' : 'Start timer'}>
            {running ? 'Pause' : seconds > 0 || mode === 'count-down' ? 'Resume' : 'Start'}
          </Button>
          {seconds > 0 && (
            <Button variant="ghost" size="sm" onClick={reset} aria-label="Reset timer">
              Reset
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
