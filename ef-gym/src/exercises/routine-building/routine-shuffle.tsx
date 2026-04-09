'use client';

import { useCallback, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const ROUTINES = [
  {
    name: 'Morning routine',
    steps: [
      'Wake up',
      'Brush teeth',
      'Shower',
      'Get dressed',
      'Make breakfast',
      'Eat breakfast',
      'Pack bag',
      'Leave house',
    ],
  },
  {
    name: 'Evening wind-down',
    steps: [
      'Finish work tasks',
      'Tidy up workspace',
      'Prepare tomorrow\'s clothes',
      'Eat dinner',
      'Wash dishes',
      'Relax / read',
      'Brush teeth',
      'Go to bed',
    ],
  },
  {
    name: 'Getting out the door',
    steps: [
      'Check weather',
      'Choose outfit',
      'Get dressed',
      'Eat something',
      'Gather keys/wallet/phone',
      'Check bag contents',
      'Put on shoes',
      'Lock door',
    ],
  },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface RoutineShuffleProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function RoutineShuffle({ onComplete }: RoutineShuffleProps) {
  const routine = useMemo(() => ROUTINES[Math.floor(Math.random() * ROUTINES.length)], []);
  const [items, setItems] = useState(() => shuffle(routine.steps));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleTap = useCallback(
    (index: number) => {
      if (submitted) return;
      if (selectedIndex === null) {
        setSelectedIndex(index);
      } else {
        // Swap
        setItems((prev) => {
          const next = [...prev];
          [next[selectedIndex], next[index]] = [next[index], next[selectedIndex]];
          return next;
        });
        setSelectedIndex(null);
      }
    },
    [selectedIndex, submitted],
  );

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const handleFinish = useCallback(() => {
    // Score based on how many items are in their "common" position
    let matchCount = 0;
    items.forEach((item, i) => {
      if (item === routine.steps[i]) matchCount++;
    });
    const score = Math.round((matchCount / routine.steps.length) * 100);

    onComplete(
      {
        routine: routine.name,
        userOrder: items,
        commonOrder: routine.steps,
        matchCount,
      },
      score,
      'There\'s no single "right" order — what matters is what works for you.',
    );
  }, [items, routine, onComplete]);

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="mb-1 font-semibold text-foreground">{routine.name}</h3>
        <p className="mb-4 text-sm text-muted">
          {submitted
            ? 'Here\'s how your order compares to a common pattern.'
            : 'Tap two items to swap them. Put them in the order that makes sense to you.'}
        </p>

        <div className="space-y-2">
          {items.map((item, i) => {
            const isCommonPosition = item === routine.steps[i];
            return (
              <button
                key={`${item}-${i}`}
                onClick={() => handleTap(i)}
                disabled={submitted}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left transition-colors ${
                  selectedIndex === i
                    ? 'bg-accent text-white'
                    : submitted
                    ? isCommonPosition
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'bg-surface text-foreground'
                    : 'bg-surface-border/30 text-foreground hover:bg-accent-light'
                }`}
                aria-label={`${item}, position ${i + 1}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-border text-xs font-medium text-muted">
                  {i + 1}
                </span>
                <span className="flex-1">{item}</span>
                {submitted && (
                  <span className="text-xs text-muted">
                    {isCommonPosition ? 'same' : `common: #${routine.steps.indexOf(item) + 1}`}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
          {!submitted ? (
            <Button onClick={handleSubmit}>See comparison</Button>
          ) : (
            <Button onClick={handleFinish}>Continue</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
