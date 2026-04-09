'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ExerciseDefinition, ExerciseResult } from '@/types/exercise';
import { useProgress } from '@/context/ProgressContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ReflectionPrompt from './ReflectionPrompt';
import CompletionCard from './CompletionCard';

type Phase = 'instructions' | 'active' | 'reflection' | 'complete';

interface ExerciseShellProps {
  definition: ExerciseDefinition;
  reflectionPrompt?: string;
  children: (props: {
    onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
  }) => React.ReactNode;
}

export default function ExerciseShell({
  definition,
  reflectionPrompt,
  children,
}: ExerciseShellProps) {
  const [phase, setPhase] = useState<Phase>('instructions');
  const startTimeRef = useRef<number>(0);
  const resultRef = useRef<{ data: Record<string, unknown>; score?: number; message?: string }>({
    data: {},
  });
  const router = useRouter();
  const { recordCompletion } = useProgress();

  const handleStart = useCallback(() => {
    startTimeRef.current = Date.now();
    setPhase('active');
  }, []);

  const handleExerciseComplete = useCallback(
    (data: Record<string, unknown>, score?: number, message?: string) => {
      resultRef.current = { data, score, message };
      if (reflectionPrompt) {
        setPhase('reflection');
      } else {
        finalize();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reflectionPrompt],
  );

  const finalize = useCallback(
    (reflection?: string) => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      const result: ExerciseResult = {
        exerciseId: definition.id,
        completedAt: new Date().toISOString(),
        duration,
        score: resultRef.current.score,
        data: resultRef.current.data,
        reflection,
      };
      recordCompletion(result);
      setPhase('complete');
    },
    [definition.id, recordCompletion],
  );

  const handleTryAgain = useCallback(() => {
    resultRef.current = { data: {} };
    setPhase('instructions');
  }, []);

  if (phase === 'instructions') {
    return (
      <div className="mx-auto max-w-lg">
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              {definition.type === 'mini-game' ? 'Mini-game' : 'Guided practice'}
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              ~{definition.estimatedMinutes} min
            </span>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
            {definition.title}
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">{definition.description}</p>
          <div className="mb-6 space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              How it works
            </h3>
            <ol className="list-inside list-decimal space-y-1 text-gray-700 dark:text-gray-300">
              {definition.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
          <Button onClick={handleStart} size="lg" className="w-full">
            Start exercise
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === 'active') {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {definition.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              finalize();
            }}
          >
            Finish early
          </Button>
        </div>
        {children({ onComplete: handleExerciseComplete })}
      </div>
    );
  }

  if (phase === 'reflection' && reflectionPrompt) {
    return (
      <ReflectionPrompt
        prompt={reflectionPrompt}
        onSubmit={(text) => finalize(text)}
        onSkip={() => finalize()}
      />
    );
  }

  // Complete phase
  const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
  return (
    <CompletionCard
      title={definition.title}
      duration={duration}
      score={resultRef.current.score}
      message={resultRef.current.message}
      onTryAgain={handleTryAgain}
      onBackToArea={() => router.push(`/exercises/${definition.area}`)}
      onHome={() => router.push('/')}
    />
  );
}
