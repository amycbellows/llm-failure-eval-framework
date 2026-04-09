'use client';

import { useCallback, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { timeCalibrationScore } from '@/lib/scoring';

interface Task {
  name: string;
  typicalMinutes: number;
  range: [number, number]; // min-max typical range
}

const TASKS: Task[] = [
  { name: 'Write a thank-you email', typicalMinutes: 10, range: [5, 15] },
  { name: 'Take a shower', typicalMinutes: 10, range: [5, 20] },
  { name: 'Wash the dishes (a full sink)', typicalMinutes: 15, range: [10, 25] },
  { name: 'Fold a load of laundry', typicalMinutes: 15, range: [10, 25] },
  { name: 'Tidy up one room', typicalMinutes: 20, range: [10, 30] },
  { name: 'Cook a simple meal', typicalMinutes: 30, range: [20, 45] },
  { name: 'Grocery shop for the week', typicalMinutes: 45, range: [30, 60] },
  { name: 'Read 20 pages of a book', typicalMinutes: 30, range: [20, 45] },
  { name: 'Pay bills and review bank account', typicalMinutes: 20, range: [10, 30] },
  { name: 'Write a one-page document', typicalMinutes: 30, range: [15, 45] },
  { name: 'Pack a bag for a day trip', typicalMinutes: 15, range: [10, 25] },
  { name: 'Call a friend and catch up', typicalMinutes: 25, range: [15, 45] },
  { name: 'Clean the bathroom', typicalMinutes: 20, range: [15, 30] },
  { name: 'Sort through a week of mail', typicalMinutes: 10, range: [5, 15] },
  { name: 'Make a doctor appointment', typicalMinutes: 10, range: [5, 20] },
];

const ROUNDS_PER_SESSION = 5;

interface Round {
  task: Task;
  guess: number;
  score: number;
}

interface TimeGuessProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function TimeGuess({ onComplete }: TimeGuessProps) {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>(() => pickRandom(TASKS));
  const [guess, setGuess] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const roundNumber = rounds.length + 1;
  const isLastRound = rounds.length >= ROUNDS_PER_SESSION;

  function pickRandom(tasks: Task[]): Task {
    const used = new Set(rounds.map((r) => r.task.name));
    const available = tasks.filter((t) => !used.has(t.name));
    const pool = available.length > 0 ? available : tasks;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  const handleGuess = useCallback(() => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num <= 0) return;
    setShowResult(true);
  }, [guess]);

  const handleNext = useCallback(() => {
    const num = parseInt(guess, 10);
    const score = timeCalibrationScore(num, currentTask.typicalMinutes);
    const newRounds = [...rounds, { task: currentTask, guess: num, score }];
    setRounds(newRounds);

    if (newRounds.length >= ROUNDS_PER_SESSION) {
      const avgScore = Math.round(
        newRounds.reduce((sum, r) => sum + r.score, 0) / newRounds.length,
      );
      onComplete(
        {
          rounds: newRounds.map((r) => ({
            task: r.task.name,
            guess: r.guess,
            actual: r.task.typicalMinutes,
            score: r.score,
          })),
        },
        avgScore,
      );
      return;
    }

    setCurrentTask(pickRandom(TASKS));
    setGuess('');
    setShowResult(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guess, currentTask, rounds, onComplete]);

  const guessNum = parseInt(guess, 10);
  const isWithinRange =
    !isNaN(guessNum) &&
    guessNum >= currentTask.range[0] &&
    guessNum <= currentTask.range[1];

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {Array.from({ length: ROUNDS_PER_SESSION }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < rounds.length
                ? 'bg-accent'
                : i === rounds.length
                ? 'bg-accent/40'
                : 'bg-surface-border'
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="text-sm text-muted">
          {roundNumber}/{ROUNDS_PER_SESSION}
        </span>
      </div>

      {/* Task card */}
      <Card className="text-center">
        <p className="mb-1 text-sm text-muted">How long does this take?</p>
        <p className="text-xl font-semibold text-foreground">{currentTask.name}</p>
      </Card>

      {/* Guess input */}
      {!showResult ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="480"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
              placeholder="Minutes"
              className="w-28 rounded-lg border border-surface-border bg-surface px-4 py-2 text-center text-lg font-mono text-foreground
                focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              aria-label="Your time estimate in minutes"
              autoFocus
            />
            <span className="text-muted">minutes</span>
          </div>
          <Button onClick={handleGuess} disabled={!guess || isNaN(parseInt(guess, 10)) || parseInt(guess, 10) <= 0}>
            Submit guess
          </Button>
        </div>
      ) : (
        /* Result display */
        <Card className="text-center">
          <p className="mb-2 text-sm text-muted">Your guess</p>
          <p className="text-3xl font-bold text-foreground">{guess} min</p>
          <div className="my-4 h-px bg-surface-border" />
          <p className="mb-2 text-sm text-muted">Typical range</p>
          <p className="text-xl font-semibold text-accent">
            {currentTask.range[0]}–{currentTask.range[1]} min
          </p>
          <p className="mt-1 text-sm text-muted">
            (Most common: {currentTask.typicalMinutes} min)
          </p>
          <div className="mt-4">
            {isWithinRange ? (
              <p className="font-medium text-emerald-600 dark:text-emerald-400">
                Right in the range. Nice calibration.
              </p>
            ) : guessNum < currentTask.range[0] ? (
              <p className="font-medium text-amber-600 dark:text-amber-400">
                You underestimated this one — very common with ADHD time blindness.
              </p>
            ) : (
              <p className="font-medium text-amber-600 dark:text-amber-400">
                You overestimated — which is actually a useful skill for planning buffer time.
              </p>
            )}
          </div>
          <Button onClick={handleNext} className="mt-4">
            {rounds.length + 1 >= ROUNDS_PER_SESSION ? 'See results' : 'Next task'}
          </Button>
        </Card>
      )}

      {/* Previous rounds summary */}
      {rounds.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted">Previous rounds</p>
          {rounds.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-foreground">{r.task.name}</span>
              <span className="text-muted">
                {r.guess}m vs {r.task.typicalMinutes}m
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
