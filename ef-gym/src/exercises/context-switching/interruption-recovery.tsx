'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface ListItem {
  text: string;
  category: 'fruit' | 'vegetable' | 'grain';
}

const GROCERY_ITEMS: ListItem[] = [
  { text: 'Apples', category: 'fruit' },
  { text: 'Broccoli', category: 'vegetable' },
  { text: 'Rice', category: 'grain' },
  { text: 'Bananas', category: 'fruit' },
  { text: 'Carrots', category: 'vegetable' },
  { text: 'Pasta', category: 'grain' },
  { text: 'Oranges', category: 'fruit' },
  { text: 'Spinach', category: 'vegetable' },
  { text: 'Bread', category: 'grain' },
  { text: 'Grapes', category: 'fruit' },
  { text: 'Peppers', category: 'vegetable' },
  { text: 'Oats', category: 'grain' },
];

const INTERRUPTIONS = [
  { title: 'Phone call!', message: 'Your friend is calling about dinner plans tonight. Quick: what day of the week is it, and what are you doing for dinner tonight?', inputLabel: 'What are you doing for dinner?' },
  { title: 'Doorbell!', message: 'A package just arrived. Before you get back to your task, count backwards from 20 to 10.', inputLabel: 'Type the numbers (20, 19, 18...)' },
  { title: 'Text message!', message: 'Your coworker needs to know the name of the restaurant you went to last week. Try to remember.', inputLabel: 'Restaurant name (or your best guess)' },
];

const STRATEGIES = [
  'I left myself a note about where I was',
  'I mentally rehearsed my place before handling the interruption',
  'I tried to quickly handle the interruption and get back',
  'I had trouble remembering where I was',
  'I used the category labels to re-orient myself',
];

interface InterruptionRecoveryProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function InterruptionRecovery({ onComplete }: InterruptionRecoveryProps) {
  const [phase, setPhase] = useState<'sorting' | 'bookmark' | 'interruption' | 'recovery' | 'debrief'>('sorting');
  const [sorted, setSorted] = useState<Record<string, string>>({});
  const [itemIndex, setItemIndex] = useState(0);
  const [bookmark, setBookmark] = useState('');
  const [interruptionAnswer, setInterruptionAnswer] = useState('');
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [correctAfter, setCorrectAfter] = useState(0);
  const [totalAfter, setTotalAfter] = useState(0);
  const interruptionRef = useRef(INTERRUPTIONS[Math.floor(Math.random() * INTERRUPTIONS.length)]);
  const interruptAt = useRef(Math.floor(GROCERY_ITEMS.length * 0.4) + Math.floor(Math.random() * 3));

  const currentItem = GROCERY_ITEMS[itemIndex];

  const handleSort = useCallback(
    (category: string) => {
      const wasInterrupted = itemIndex >= interruptAt.current;
      const isCorrect = category === currentItem.category;

      if (wasInterrupted) {
        setTotalAfter((prev) => prev + 1);
        if (isCorrect) setCorrectAfter((prev) => prev + 1);
      }

      setSorted((prev) => ({ ...prev, [currentItem.text]: category }));

      const nextIndex = itemIndex + 1;
      if (nextIndex >= GROCERY_ITEMS.length) {
        setPhase('debrief');
        return;
      }

      // Trigger interruption
      if (nextIndex === interruptAt.current) {
        setPhase('bookmark');
        setItemIndex(nextIndex);
        return;
      }

      setItemIndex(nextIndex);
    },
    [itemIndex, currentItem],
  );

  const handleBookmark = useCallback(() => {
    setPhase('interruption');
  }, []);

  const handleInterruptionDone = useCallback(() => {
    setPhase('recovery');
  }, []);

  const handleRecovery = useCallback(() => {
    setPhase('sorting');
  }, []);

  const toggleStrategy = useCallback((strategy: string) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategy)
        ? prev.filter((s) => s !== strategy)
        : [...prev, strategy],
    );
  }, []);

  const handleFinish = useCallback(() => {
    onComplete(
      {
        totalItems: GROCERY_ITEMS.length,
        interruptedAt: interruptAt.current,
        bookmark,
        correctAfterInterruption: correctAfter,
        totalAfterInterruption: totalAfter,
        strategies: selectedStrategies,
      },
      undefined,
      'Interruptions are a fact of life. Practicing recovery makes you more resilient, not more perfect.',
    );
  }, [bookmark, correctAfter, totalAfter, selectedStrategies, onComplete]);

  if (phase === 'sorting') {
    if (itemIndex >= GROCERY_ITEMS.length) {
      setPhase('debrief');
      return null;
    }

    const progress = (itemIndex / GROCERY_ITEMS.length) * 100;
    return (
      <div className="space-y-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-border">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>

        <Card className="text-center">
          <p className="mb-1 text-sm text-muted">Sort this item</p>
          <p className="mb-4 text-2xl font-semibold text-foreground">{currentItem.text}</p>
          <div className="flex justify-center gap-3">
            {(['fruit', 'vegetable', 'grain'] as const).map((cat) => (
              <Button
                key={cat}
                variant="secondary"
                onClick={() => handleSort(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            {itemIndex + 1} of {GROCERY_ITEMS.length}
          </p>
        </Card>
      </div>
    );
  }

  if (phase === 'bookmark') {
    return (
      <Card className="text-center">
        <p className="mb-2 text-lg font-semibold text-amber-600 dark:text-amber-400">
          Heads up — an interruption is coming
        </p>
        <p className="mb-4 text-muted">
          Before you switch, take a moment to note where you are. What were you just doing?
        </p>
        <input
          type="text"
          value={bookmark}
          onChange={(e) => setBookmark(e.target.value)}
          placeholder="Leave yourself a mental note..."
          className="mb-4 w-full rounded-lg border border-surface-border bg-surface px-4 py-2 text-foreground placeholder-muted
            focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          aria-label="Your mental bookmark"
        />
        <Button onClick={handleBookmark}>Handle the interruption</Button>
      </Card>
    );
  }

  if (phase === 'interruption') {
    const interruption = interruptionRef.current;
    return (
      <Card className="text-center">
        <p className="mb-2 text-lg font-semibold text-red-600 dark:text-red-400">
          {interruption.title}
        </p>
        <p className="mb-4 text-muted">{interruption.message}</p>
        <input
          type="text"
          value={interruptionAnswer}
          onChange={(e) => setInterruptionAnswer(e.target.value)}
          placeholder={interruption.inputLabel}
          className="mb-4 w-full rounded-lg border border-surface-border bg-surface px-4 py-2 text-foreground placeholder-muted
            focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          aria-label={interruption.inputLabel}
          autoFocus
        />
        <Button onClick={handleInterruptionDone} disabled={!interruptionAnswer.trim()}>
          Done — get back to my task
        </Button>
      </Card>
    );
  }

  if (phase === 'recovery') {
    return (
      <Card className="text-center">
        <p className="mb-2 text-lg font-semibold text-foreground">Back to it</p>
        <p className="mb-2 text-muted">
          You were sorting grocery items into categories.
        </p>
        {bookmark && (
          <p className="mb-4 text-sm text-accent">
            Your note: &ldquo;{bookmark}&rdquo;
          </p>
        )}
        <p className="mb-4 text-sm text-muted">
          Take a breath, re-orient, then continue when ready.
        </p>
        <Button onClick={handleRecovery}>Continue sorting</Button>
      </Card>
    );
  }

  // Debrief
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="mb-3 text-lg font-semibold text-foreground">How did that feel?</h3>
        <p className="mb-2 text-sm text-muted">
          After the interruption, you got {correctAfter} of {totalAfter} correct.
        </p>
        <p className="mb-4 text-sm text-muted">
          Which strategies did you notice yourself using? (Pick all that apply)
        </p>
        <div className="space-y-2">
          {STRATEGIES.map((strategy) => (
            <button
              key={strategy}
              onClick={() => toggleStrategy(strategy)}
              className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                selectedStrategies.includes(strategy)
                  ? 'bg-accent-light text-accent font-medium'
                  : 'bg-surface-border/30 text-foreground hover:bg-surface-border'
              }`}
            >
              {strategy}
            </button>
          ))}
        </div>
        <Button onClick={handleFinish} className="mt-4 w-full">
          Continue
        </Button>
      </Card>
    </div>
  );
}
