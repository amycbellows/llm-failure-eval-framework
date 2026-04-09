'use client';

import { useCallback, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface TaskItem {
  name: string;
  typicalMinutes: number;
}

const TASKS: TaskItem[] = [
  { name: 'Reply to 5 emails', typicalMinutes: 25 },
  { name: 'Prepare lunch', typicalMinutes: 20 },
  { name: 'Exercise / walk', typicalMinutes: 30 },
  { name: 'Work on a report', typicalMinutes: 45 },
  { name: 'Tidy the kitchen', typicalMinutes: 15 },
  { name: 'Call the dentist', typicalMinutes: 10 },
];

const BUDGET_MINUTES = 120;

interface TaskAuctionProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function TaskAuction({ onComplete }: TaskAuctionProps) {
  const [bids, setBids] = useState<Record<string, string>>(() =>
    Object.fromEntries(TASKS.map((t) => [t.name, ''])),
  );
  const [submitted, setSubmitted] = useState(false);

  const totalBid = Object.values(bids).reduce(
    (sum, v) => sum + (parseInt(v, 10) || 0),
    0,
  );
  const overBudget = totalBid > BUDGET_MINUTES;
  const allFilled = Object.values(bids).every(
    (v) => v !== '' && parseInt(v, 10) > 0,
  );

  const handleBidChange = useCallback((name: string, value: string) => {
    setBids((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const handleFinish = useCallback(() => {
    const results = TASKS.map((t) => ({
      task: t.name,
      bid: parseInt(bids[t.name], 10) || 0,
      typical: t.typicalMinutes,
    }));
    const totalError = results.reduce(
      (sum, r) => sum + Math.abs(r.bid - r.typical),
      0,
    );
    const maxError = TASKS.reduce((sum, t) => sum + t.typicalMinutes, 0);
    const score = Math.round(Math.max(0, (1 - totalError / maxError) * 100));

    let message: string;
    if (!overBudget && score >= 70) {
      message = 'Great budget awareness — your estimates fit well and were accurate.';
    } else if (!overBudget) {
      message = 'You fit within budget. Each time you practice, your estimates will sharpen.';
    } else {
      message = 'Fitting everything in is the hard part. Recognizing the squeeze is a skill in itself.';
    }

    onComplete({ results, totalBid, budget: BUDGET_MINUTES }, score, message);
  }, [bids, totalBid, overBudget, onComplete]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Your time budget</h3>
            <p className="text-sm text-muted">Fit these tasks into 2 hours</p>
          </div>
          <div className="text-right">
            <p
              className={`text-2xl font-bold font-mono ${
                overBudget
                  ? 'text-red-500'
                  : totalBid > BUDGET_MINUTES * 0.9
                  ? 'text-amber-500'
                  : 'text-accent'
              }`}
            >
              {totalBid}/{BUDGET_MINUTES}
            </p>
            <p className="text-xs text-muted">minutes used</p>
          </div>
        </div>

        {/* Budget bar */}
        <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-surface-border">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              overBudget ? 'bg-red-500' : 'bg-accent'
            }`}
            style={{ width: `${Math.min(100, (totalBid / BUDGET_MINUTES) * 100)}%` }}
          />
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {TASKS.map((task) => {
            const bid = parseInt(bids[task.name], 10) || 0;
            return (
              <div key={task.name} className="flex items-center justify-between gap-4">
                <span className="flex-1 text-foreground">{task.name}</span>
                {submitted ? (
                  <div className="flex items-center gap-3">
                    <span className="w-16 text-right font-mono text-foreground">
                      {bid}m
                    </span>
                    <span className="w-16 text-right text-sm text-muted">
                      typical: {task.typicalMinutes}m
                    </span>
                    {Math.abs(bid - task.typicalMinutes) <= 5 ? (
                      <span className="w-16 text-right text-sm text-emerald-600 dark:text-emerald-400">
                        Close
                      </span>
                    ) : bid < task.typicalMinutes ? (
                      <span className="w-16 text-right text-sm text-amber-600 dark:text-amber-400">
                        Under
                      </span>
                    ) : (
                      <span className="w-16 text-right text-sm text-amber-600 dark:text-amber-400">
                        Over
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={bids[task.name]}
                      onChange={(e) => handleBidChange(task.name, e.target.value)}
                      className="w-20 rounded-lg border border-surface-border bg-surface px-3 py-1.5 text-right font-mono text-foreground
                        focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="min"
                      aria-label={`Time estimate for ${task.name}`}
                    />
                    <span className="text-sm text-muted">min</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {overBudget && !submitted && (
        <p className="text-center text-sm text-amber-600 dark:text-amber-400">
          Over budget by {totalBid - BUDGET_MINUTES} minutes. Can you trim anything?
        </p>
      )}

      <div className="flex justify-center">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!allFilled}>
            {overBudget ? 'Submit anyway' : 'Submit bids'}
          </Button>
        ) : (
          <Button onClick={handleFinish}>Continue</Button>
        )}
      </div>
    </div>
  );
}
