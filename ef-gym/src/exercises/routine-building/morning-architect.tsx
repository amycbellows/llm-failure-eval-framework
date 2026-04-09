'use client';

import { useCallback, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface RoutineStep {
  name: string;
  minutes: number;
  friction: 'low' | 'medium' | 'high';
}

const SUGGESTED_STEPS = [
  'Wake up / get out of bed',
  'Brush teeth',
  'Shower',
  'Get dressed',
  'Make breakfast',
  'Eat breakfast',
  'Make coffee / tea',
  'Check phone',
  'Feed pets',
  'Take medication',
  'Exercise / stretch',
  'Pack bag',
  'Leave the house',
];

interface MorningArchitectProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function MorningArchitect({ onComplete }: MorningArchitectProps) {
  const [steps, setSteps] = useState<RoutineStep[]>([]);
  const [customStep, setCustomStep] = useState('');
  const [phase, setPhase] = useState<'build' | 'time' | 'friction' | 'review'>('build');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const totalMinutes = steps.reduce((sum, s) => sum + s.minutes, 0);

  const addStep = useCallback((name: string) => {
    if (steps.some((s) => s.name === name)) return;
    setSteps((prev) => [...prev, { name, minutes: 5, friction: 'low' }]);
  }, [steps]);

  const removeStep = useCallback((index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveStep = useCallback((from: number, direction: 'up' | 'down') => {
    setSteps((prev) => {
      const next = [...prev];
      const to = direction === 'up' ? from - 1 : from + 1;
      if (to < 0 || to >= next.length) return prev;
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }, []);

  const updateMinutes = useCallback((index: number, minutes: number) => {
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, minutes } : s)),
    );
  }, []);

  const updateFriction = useCallback((index: number, friction: RoutineStep['friction']) => {
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, friction } : s)),
    );
  }, []);

  const handleFinish = useCallback(() => {
    const frictionCount = steps.filter((s) => s.friction === 'high').length;
    const message = frictionCount > 0
      ? `You identified ${frictionCount} high-friction point${frictionCount > 1 ? 's' : ''}. Knowing where friction lives is the first step to working around it.`
      : 'Your routine looks smooth. Nice design.';

    onComplete(
      { steps, totalMinutes },
      undefined,
      message,
    );
  }, [steps, totalMinutes, onComplete]);

  if (phase === 'build') {
    return (
      <div className="space-y-6">
        <Card>
          <h3 className="mb-3 font-semibold text-foreground">Build your morning routine</h3>
          <p className="mb-4 text-sm text-muted">Add steps in the order you do them (or want to).</p>

          {/* Current steps */}
          {steps.length > 0 && (
            <div className="mb-4 space-y-2">
              {steps.map((step, i) => (
                <div key={step.name} className="flex items-center gap-2 rounded-lg bg-surface-border/30 px-3 py-2">
                  <span className="text-sm text-muted">{i + 1}.</span>
                  <span className="flex-1 text-foreground">{step.name}</span>
                  <button onClick={() => moveStep(i, 'up')} disabled={i === 0} className="text-muted hover:text-foreground disabled:opacity-30" aria-label={`Move ${step.name} up`}>↑</button>
                  <button onClick={() => moveStep(i, 'down')} disabled={i === steps.length - 1} className="text-muted hover:text-foreground disabled:opacity-30" aria-label={`Move ${step.name} down`}>↓</button>
                  <button onClick={() => removeStep(i)} className="text-muted hover:text-red-500" aria-label={`Remove ${step.name}`}>×</button>
                </div>
              ))}
            </div>
          )}

          {/* Add from suggestions */}
          <div className="mb-4 flex flex-wrap gap-2">
            {SUGGESTED_STEPS.filter((s) => !steps.some((st) => st.name === s)).map((name) => (
              <button
                key={name}
                onClick={() => addStep(name)}
                className="rounded-lg bg-surface-border px-3 py-1.5 text-sm text-foreground hover:bg-accent-light hover:text-accent"
              >
                + {name}
              </button>
            ))}
          </div>

          {/* Custom step */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customStep}
              onChange={(e) => setCustomStep(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customStep.trim()) {
                  addStep(customStep.trim());
                  setCustomStep('');
                }
              }}
              placeholder="Add your own step..."
              className="flex-1 rounded-lg border border-surface-border bg-surface px-4 py-2 text-foreground placeholder-muted
                focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            <Button
              variant="secondary"
              onClick={() => {
                if (customStep.trim()) {
                  addStep(customStep.trim());
                  setCustomStep('');
                }
              }}
              disabled={!customStep.trim()}
            >
              Add
            </Button>
          </div>

          <Button onClick={() => setPhase('time')} disabled={steps.length < 2} className="mt-4 w-full">
            Next: set times
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === 'time') {
    return (
      <div className="space-y-6">
        <Card>
          <h3 className="mb-3 font-semibold text-foreground">How long does each step take?</h3>
          <p className="mb-4 text-sm text-muted">
            Total so far: <span className="font-mono font-medium text-accent">{totalMinutes} min</span>
          </p>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={step.name} className="flex items-center justify-between gap-4">
                <span className="flex-1 text-foreground">{step.name}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={step.minutes}
                    onChange={(e) => updateMinutes(i, parseInt(e.target.value, 10) || 1)}
                    className="w-16 rounded-lg border border-surface-border bg-surface px-2 py-1.5 text-right font-mono text-foreground
                      focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                    aria-label={`Minutes for ${step.name}`}
                  />
                  <span className="text-sm text-muted">min</span>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => setPhase('friction')} className="mt-4 w-full">
            Next: identify friction
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === 'friction') {
    return (
      <div className="space-y-6">
        <Card>
          <h3 className="mb-3 font-semibold text-foreground">Where&apos;s the friction?</h3>
          <p className="mb-4 text-sm text-muted">
            Mark how hard each step feels to actually do.
          </p>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={step.name} className="flex items-center justify-between gap-4">
                <span className="flex-1 text-foreground">{step.name}</span>
                <div className="flex gap-1">
                  {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => updateFriction(i, level)}
                      className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                        step.friction === level
                          ? level === 'high'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            : level === 'medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                          : 'bg-surface-border text-muted hover:bg-surface'
                      }`}
                      aria-label={`${level} friction for ${step.name}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => setPhase('review')} className="mt-4 w-full">
            Review routine
          </Button>
        </Card>
      </div>
    );
  }

  // Review
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Your morning routine</h3>
        <p className="mb-4 text-sm text-muted">
          Total time: <span className="font-mono font-medium text-accent">{totalMinutes} min</span>
        </p>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={step.name} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-medium text-white">
                {i + 1}
              </span>
              <span className="flex-1 text-foreground">{step.name}</span>
              <span className="font-mono text-sm text-muted">{step.minutes}m</span>
              {step.friction === 'high' && (
                <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700 dark:bg-red-900 dark:text-red-300">
                  high friction
                </span>
              )}
            </div>
          ))}
        </div>
        <Button onClick={handleFinish} className="mt-4 w-full">
          Continue
        </Button>
      </Card>
    </div>
  );
}
