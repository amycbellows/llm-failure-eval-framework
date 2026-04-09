'use client';

import { useCallback, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const EXAMPLE_TASKS = [
  'Clean the apartment',
  'Do my taxes',
  'Start a new project',
  'Write an essay',
  'Organize the garage',
  'Meal prep for the week',
];

const PROMPTS = [
  'What\'s a smaller piece of that task?',
  'Can you make that even smaller?',
  'What\'s the very first physical action you\'d take?',
];

interface SmallestStepProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function SmallestStep({ onComplete }: SmallestStepProps) {
  const [bigTask, setBigTask] = useState('');
  const [customTask, setCustomTask] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [phase, setPhase] = useState<'choose' | 'breakdown' | 'review'>('choose');

  const promptIndex = Math.min(steps.length, PROMPTS.length - 1);

  const handleChooseTask = useCallback(() => {
    const task = customTask.trim() || bigTask;
    if (!task) return;
    setBigTask(task);
    setPhase('breakdown');
  }, [bigTask, customTask]);

  const handleAddStep = useCallback(() => {
    if (!currentInput.trim()) return;
    const newSteps = [...steps, currentInput.trim()];
    setSteps(newSteps);
    setCurrentInput('');

    if (newSteps.length >= 3) {
      setPhase('review');
    }
  }, [currentInput, steps]);

  const handleFinish = useCallback(() => {
    onComplete(
      {
        bigTask,
        breakdownSteps: steps,
        smallestStep: steps[steps.length - 1],
      },
      undefined,
      'You took something overwhelming and found a way in. That\'s a real skill.',
    );
  }, [bigTask, steps, onComplete]);

  if (phase === 'choose') {
    return (
      <div className="space-y-6">
        <Card>
          <h3 className="mb-3 font-semibold text-foreground">
            What task feels overwhelming right now?
          </h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {EXAMPLE_TASKS.map((task) => (
              <button
                key={task}
                onClick={() => { setBigTask(task); setCustomTask(''); }}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  bigTask === task
                    ? 'bg-accent text-white'
                    : 'bg-surface-border text-foreground hover:bg-accent-light'
                }`}
              >
                {task}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={customTask}
            onChange={(e) => { setCustomTask(e.target.value); setBigTask(''); }}
            placeholder="Or type your own overwhelming task..."
            className="mb-4 w-full rounded-lg border border-surface-border bg-surface px-4 py-2 text-foreground placeholder-muted
              focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            aria-label="Custom task"
          />
          <Button onClick={handleChooseTask} disabled={!bigTask && !customTask.trim()} className="w-full">
            Start breaking it down
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === 'breakdown') {
    return (
      <div className="space-y-6">
        <Card>
          <p className="mb-1 text-sm text-muted">The big task</p>
          <p className="mb-4 text-lg font-semibold text-foreground">{bigTask}</p>

          {/* Previous steps */}
          {steps.length > 0 && (
            <div className="mb-4 space-y-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>
          )}

          {/* Current prompt */}
          <p className="mb-3 font-medium text-accent">{PROMPTS[promptIndex]}</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddStep()}
              placeholder="Type a smaller step..."
              className="flex-1 rounded-lg border border-surface-border bg-surface px-4 py-2 text-foreground placeholder-muted
                focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              aria-label="Your breakdown step"
              autoFocus
            />
            <Button onClick={handleAddStep} disabled={!currentInput.trim()}>
              Add
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Review phase
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Your breakdown</h3>
        <p className="mb-2 text-sm text-muted">
          {bigTask} →
        </p>
        <div className="mb-4 space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                {i + 1}
              </span>
              <span className="text-foreground">{step}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-accent-light p-4">
          <p className="text-sm font-medium text-accent">
            Your smallest first step:
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {steps[steps.length - 1]}
          </p>
        </div>
        <p className="mt-4 text-sm text-muted">
          Does that feel doable? If it still feels too big, that&apos;s okay — you can always break it down further.
        </p>
        <Button onClick={handleFinish} className="mt-4 w-full">
          Continue
        </Button>
      </Card>
    </div>
  );
}
