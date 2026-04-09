'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const SUGGESTED_TASKS = [
  'Reply to one email',
  'Put away 5 things',
  'Write the first sentence of something',
  'Open that tab you\'ve been avoiding',
  'Sort one pile of papers',
  'Text someone back',
  'Start a load of laundry',
  'Write a to-do list for tomorrow',
];

const SPRINT_SECONDS = 120;

interface TwoMinuteSprintProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function TwoMinuteSprint({ onComplete }: TwoMinuteSprintProps) {
  const [chosenTask, setChosenTask] = useState('');
  const [customTask, setCustomTask] = useState('');
  const [phase, setPhase] = useState<'choose' | 'sprinting' | 'done'>('choose');
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase !== 'sprinting' || paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= SPRINT_SECONDS) {
          setPhase('done');
          return SPRINT_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase, paused]);

  const handleStart = useCallback(() => {
    const task = customTask.trim() || chosenTask;
    if (!task) return;
    setChosenTask(task);
    setPhase('sprinting');
  }, [chosenTask, customTask]);

  const handleFinish = useCallback(() => {
    onComplete(
      { task: chosenTask, elapsedSeconds: elapsed },
      undefined,
      elapsed >= SPRINT_SECONDS
        ? 'You did the full 2 minutes. The hardest part is starting — and you did it.'
        : `You spent ${Math.floor(elapsed / 60)}m ${elapsed % 60}s on it. Starting is the win.`,
    );
  }, [chosenTask, elapsed, onComplete]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  if (phase === 'choose') {
    return (
      <div className="space-y-6">
        <Card>
          <h3 className="mb-3 font-semibold text-foreground">Pick a task to start</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {SUGGESTED_TASKS.map((task) => (
              <button
                key={task}
                onClick={() => { setChosenTask(task); setCustomTask(''); }}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  chosenTask === task
                    ? 'bg-accent text-white'
                    : 'bg-surface-border text-foreground hover:bg-accent-light'
                }`}
              >
                {task}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={customTask}
              onChange={(e) => { setCustomTask(e.target.value); setChosenTask(''); }}
              placeholder="Or type your own..."
              className="w-full rounded-lg border border-surface-border bg-surface px-4 py-2 text-foreground placeholder-muted
                focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              aria-label="Custom task"
            />
          </div>
          <Button onClick={handleStart} disabled={!chosenTask && !customTask.trim()} className="w-full">
            Start 2-minute sprint
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === 'sprinting') {
    const progress = (elapsed / SPRINT_SECONDS) * 100;
    return (
      <div className="space-y-6 text-center">
        <Card>
          <p className="mb-2 text-sm text-muted">Working on</p>
          <p className="mb-6 text-lg font-semibold text-foreground">{chosenTask}</p>

          {/* Timer */}
          <p
            className="mb-4 font-mono text-5xl font-bold tabular-nums text-foreground"
            role="timer"
            aria-live="polite"
            aria-label={`${mins} minutes ${secs} seconds`}
          >
            {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
          </p>

          {/* Progress bar */}
          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-surface-border">
            <div
              className="h-full rounded-full bg-accent transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mb-4 text-sm text-muted">
            Just keep going. The timer is counting — you don&apos;t have to.
          </p>

          <div className="flex justify-center gap-3">
            <Button variant="secondary" onClick={() => setPaused((p) => !p)}>
              {paused ? 'Resume' : 'Pause'}
            </Button>
            <Button variant="ghost" onClick={() => { setPhase('done'); }}>
              I&apos;m done
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Done
  return (
    <div className="space-y-6 text-center">
      <Card>
        <div className="mb-4 text-4xl" aria-hidden="true">
          ✓
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">You started.</h3>
        <p className="mb-1 text-muted">
          That&apos;s the hardest part, and you did it.
        </p>
        <p className="mb-4 text-sm text-muted">
          {mins > 0 ? `${mins}m ${secs}s` : `${secs}s`} on &ldquo;{chosenTask}&rdquo;
        </p>
        <Button onClick={handleFinish}>Continue</Button>
      </Card>
    </div>
  );
}
