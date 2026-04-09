'use client';

import { useCallback, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type Bucket = 'do-now' | 'do-later' | 'drop';

interface TaskItem {
  name: string;
  idealBucket: Bucket;
  explanation: string;
}

const ALL_TASKS: TaskItem[] = [
  { name: 'Reply to boss\'s urgent email', idealBucket: 'do-now', explanation: 'Urgent and important — your boss is waiting.' },
  { name: 'Organize desktop icons', idealBucket: 'drop', explanation: 'Low impact. Nice-to-have but not worth prioritizing.' },
  { name: 'Submit expense report (due today)', idealBucket: 'do-now', explanation: 'Has a hard deadline today.' },
  { name: 'Research vacation destinations', idealBucket: 'drop', explanation: 'Fun but not urgent or important right now.' },
  { name: 'Schedule annual checkup', idealBucket: 'do-later', explanation: 'Important but not time-sensitive today.' },
  { name: 'Fix broken link on team wiki', idealBucket: 'do-later', explanation: 'Helpful but can wait for a less busy time.' },
  { name: 'Prepare for tomorrow\'s meeting', idealBucket: 'do-now', explanation: 'Time-sensitive and impacts your performance.' },
  { name: 'Unsubscribe from spam emails', idealBucket: 'drop', explanation: 'Minor annoyance, not worth priority time.' },
  { name: 'Review and sign lease renewal', idealBucket: 'do-now', explanation: 'Important and often has a deadline attached.' },
  { name: 'Update LinkedIn profile', idealBucket: 'do-later', explanation: 'Good to do eventually, no urgency.' },
  { name: 'Buy birthday gift for friend (party Saturday)', idealBucket: 'do-later', explanation: 'Important but you have a few days.' },
  { name: 'Clean out fridge', idealBucket: 'do-later', explanation: 'Useful but flexible timing.' },
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

interface InboxTriageProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function InboxTriage({ onComplete }: InboxTriageProps) {
  const tasks = useMemo(() => pickRandom(ALL_TASKS, 8), []);
  const [assignments, setAssignments] = useState<Record<string, Bucket | null>>(
    () => Object.fromEntries(tasks.map((t) => [t.name, null])),
  );
  const [submitted, setSubmitted] = useState(false);

  const allAssigned = Object.values(assignments).every((v) => v !== null);
  const matchCount = tasks.filter((t) => assignments[t.name] === t.idealBucket).length;

  const handleAssign = useCallback((taskName: string, bucket: Bucket) => {
    if (submitted) return;
    setAssignments((prev) => ({ ...prev, [taskName]: bucket }));
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const handleFinish = useCallback(() => {
    const score = Math.round((matchCount / tasks.length) * 100);
    onComplete(
      {
        tasks: tasks.map((t) => ({
          name: t.name,
          assigned: assignments[t.name],
          ideal: t.idealBucket,
          match: assignments[t.name] === t.idealBucket,
        })),
        matchCount,
        total: tasks.length,
      },
      score,
      score >= 75
        ? 'Strong instincts. You\'re good at reading priority signals.'
        : 'Prioritization is a practice, not a talent. Each round sharpens your sense of what matters.',
    );
  }, [tasks, assignments, matchCount, onComplete]);

  const bucketLabels: Record<Bucket, { label: string; color: string }> = {
    'do-now': { label: 'Do Now', color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
    'do-later': { label: 'Do Later', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
    drop: { label: 'Drop', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' },
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Sort each task into a bucket. Trust your gut — then see the reasoning.
      </p>

      {tasks.map((task) => {
        const assigned = assignments[task.name];
        const isCorrect = assigned === task.idealBucket;
        return (
          <Card key={task.name} as="article">
            <div className="mb-2 flex items-start justify-between">
              <p className="font-medium text-foreground">{task.name}</p>
              {submitted && (
                <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${
                  isCorrect
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                }`}>
                  {isCorrect ? 'Match' : 'Different'}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {(Object.entries(bucketLabels) as [Bucket, { label: string; color: string }][]).map(
                ([bucket, { label, color }]) => (
                  <button
                    key={bucket}
                    onClick={() => handleAssign(task.name, bucket)}
                    disabled={submitted}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      assigned === bucket ? color : 'bg-surface-border text-muted hover:bg-surface'
                    }`}
                    aria-pressed={assigned === bucket}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
            {submitted && (
              <p className="mt-2 text-sm text-muted">
                {!isCorrect && (
                  <span className="font-medium text-accent">Suggested: {bucketLabels[task.idealBucket].label}. </span>
                )}
                {task.explanation}
              </p>
            )}
          </Card>
        );
      })}

      <div className="flex justify-center pt-2">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!allAssigned}>
            Check my sorting
          </Button>
        ) : (
          <div className="text-center">
            <p className="mb-3 text-foreground">
              {matchCount}/{tasks.length} matched the suggested sorting
            </p>
            <Button onClick={handleFinish}>Continue</Button>
          </div>
        )}
      </div>
    </div>
  );
}
