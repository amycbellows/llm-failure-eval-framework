'use client';

import { useCallback, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type Quadrant = 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';

interface TaskPlacement {
  task: string;
  quadrant: Quadrant | null;
}

const QUADRANT_INFO: Record<Quadrant, { label: string; action: string; color: string }> = {
  'urgent-important': {
    label: 'Urgent + Important',
    action: 'Do it now',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  },
  'not-urgent-important': {
    label: 'Not Urgent + Important',
    action: 'Schedule it',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  },
  'urgent-not-important': {
    label: 'Urgent + Not Important',
    action: 'Delegate or quick-do',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  },
  'not-urgent-not-important': {
    label: 'Not Urgent + Not Important',
    action: 'Drop or defer',
    color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  },
};

interface EisenhowerSortProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function EisenhowerSort({ onComplete }: EisenhowerSortProps) {
  const [tasks, setTasks] = useState<TaskPlacement[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [phase, setPhase] = useState<'input' | 'sort' | 'review'>('input');
  const [currentIndex, setCurrentIndex] = useState(0);

  const addTask = useCallback(() => {
    if (!inputValue.trim() || tasks.length >= 6) return;
    setTasks((prev) => [...prev, { task: inputValue.trim(), quadrant: null }]);
    setInputValue('');
  }, [inputValue, tasks.length]);

  const assignQuadrant = useCallback(
    (quadrant: Quadrant) => {
      setTasks((prev) =>
        prev.map((t, i) => (i === currentIndex ? { ...t, quadrant } : t)),
      );
      if (currentIndex + 1 >= tasks.length) {
        setPhase('review');
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentIndex, tasks.length],
  );

  const handleFinish = useCallback(() => {
    onComplete(
      {
        placements: tasks.map((t) => ({
          task: t.task,
          quadrant: t.quadrant,
          action: t.quadrant ? QUADRANT_INFO[t.quadrant].action : 'unassigned',
        })),
      },
      undefined,
      'Sorting your own real tasks is where this skill becomes practical. Nice work.',
    );
  }, [tasks, onComplete]);

  if (phase === 'input') {
    return (
      <div className="space-y-6">
        <Card>
          <h3 className="mb-2 font-semibold text-foreground">
            What&apos;s on your plate right now?
          </h3>
          <p className="mb-4 text-sm text-muted">
            Add 4-6 real tasks you&apos;re currently dealing with.
          </p>

          {tasks.length > 0 && (
            <div className="mb-4 space-y-1">
              {tasks.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm text-muted">{i + 1}.</span>
                  <span className="text-foreground">{t.task}</span>
                  <button
                    onClick={() => setTasks((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-muted hover:text-red-500"
                    aria-label={`Remove ${t.task}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Type a task..."
              className="flex-1 rounded-lg border border-surface-border bg-surface px-4 py-2 text-foreground placeholder-muted
                focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              aria-label="Add a task"
              autoFocus
            />
            <Button variant="secondary" onClick={addTask} disabled={!inputValue.trim() || tasks.length >= 6}>
              Add
            </Button>
          </div>

          <Button
            onClick={() => setPhase('sort')}
            disabled={tasks.length < 3}
            className="mt-4 w-full"
          >
            Sort these tasks ({tasks.length}/6)
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === 'sort') {
    const current = tasks[currentIndex];
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          {tasks.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < currentIndex ? 'bg-accent' : i === currentIndex ? 'bg-accent/40' : 'bg-surface-border'
              }`}
            />
          ))}
        </div>

        <Card className="text-center">
          <p className="mb-1 text-sm text-muted">
            Task {currentIndex + 1} of {tasks.length}
          </p>
          <p className="mb-6 text-xl font-semibold text-foreground">{current.task}</p>

          <div className="grid grid-cols-2 gap-3">
            {(Object.entries(QUADRANT_INFO) as [Quadrant, typeof QUADRANT_INFO[Quadrant]][]).map(
              ([quadrant, info]) => (
                <button
                  key={quadrant}
                  onClick={() => assignQuadrant(quadrant)}
                  className={`rounded-lg p-4 text-left transition-colors hover:ring-2 hover:ring-accent/30 ${info.color}`}
                >
                  <p className="text-sm font-semibold">{info.label}</p>
                  <p className="mt-0.5 text-xs opacity-75">{info.action}</p>
                </button>
              ),
            )}
          </div>
        </Card>
      </div>
    );
  }

  // Review
  const grouped = tasks.reduce(
    (acc, t) => {
      if (t.quadrant) {
        acc[t.quadrant] = acc[t.quadrant] || [];
        acc[t.quadrant].push(t.task);
      }
      return acc;
    },
    {} as Record<Quadrant, string[]>,
  );

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Your Eisenhower Matrix</h3>
        <div className="grid grid-cols-2 gap-3">
          {(Object.entries(QUADRANT_INFO) as [Quadrant, typeof QUADRANT_INFO[Quadrant]][]).map(
            ([quadrant, info]) => (
              <div key={quadrant} className={`rounded-lg p-3 ${info.color}`}>
                <p className="mb-1 text-xs font-semibold">{info.label}</p>
                <p className="mb-2 text-xs opacity-75">{info.action}</p>
                {(grouped[quadrant] || []).map((task) => (
                  <p key={task} className="text-sm">
                    • {task}
                  </p>
                ))}
                {!(grouped[quadrant]?.length) && (
                  <p className="text-xs italic opacity-50">None</p>
                )}
              </div>
            ),
          )}
        </div>
        <Button onClick={handleFinish} className="mt-4 w-full">
          Continue
        </Button>
      </Card>
    </div>
  );
}
