'use client';

import { use } from 'react';
import Link from 'next/link';
import { getExerciseById } from '@/exercises/registry';
import ExerciseShell from '@/components/exercises/ExerciseShell';
import TimeGuess from '@/exercises/time-estimation/time-guess';
import TaskAuction from '@/exercises/time-estimation/task-auction';
import TwoMinuteSprint from '@/exercises/task-initiation/two-minute-sprint';
import SmallestStep from '@/exercises/task-initiation/smallest-step';
import MorningArchitect from '@/exercises/routine-building/morning-architect';
import RoutineShuffle from '@/exercises/routine-building/routine-shuffle';
import InboxTriage from '@/exercises/prioritization/inbox-triage';
import EisenhowerSort from '@/exercises/prioritization/eisenhower-sort';
import SwitchCost from '@/exercises/context-switching/switch-cost';
import InterruptionRecovery from '@/exercises/context-switching/interruption-recovery';

const exerciseComponents: Record<
  string,
  {
    component: React.ComponentType<{
      onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
    }>;
    reflectionPrompt?: string;
  }
> = {
  'time-guess': {
    component: TimeGuess,
    reflectionPrompt: 'What surprised you about how long tasks actually take?',
  },
  'task-auction': {
    component: TaskAuction,
    reflectionPrompt: 'What was hardest about fitting everything into 2 hours?',
  },
  'two-minute-sprint': {
    component: TwoMinuteSprint,
    reflectionPrompt: 'How did it feel once you actually started?',
  },
  'smallest-step': {
    component: SmallestStep,
    reflectionPrompt: 'What made the first step feel doable?',
  },
  'morning-architect': {
    component: MorningArchitect,
    reflectionPrompt: 'Which part of your routine has the most friction?',
  },
  'routine-shuffle': {
    component: RoutineShuffle,
  },
  'inbox-triage': {
    component: InboxTriage,
    reflectionPrompt: 'Was it hard to "drop" any tasks? Why?',
  },
  'eisenhower-sort': {
    component: EisenhowerSort,
    reflectionPrompt: 'How do you tell the difference between urgent and important in your life?',
  },
  'switch-cost': {
    component: SwitchCost,
    reflectionPrompt: 'What did you notice about your transition time between tasks?',
  },
  'interruption-recovery': {
    component: InterruptionRecovery,
    reflectionPrompt: 'What strategy helped you get back on track after the interruption?',
  },
};

export default function ExercisePage({
  params,
}: {
  params: Promise<{ area: string; exerciseId: string }>;
}) {
  const { exerciseId } = use(params);
  const definition = getExerciseById(exerciseId);
  const entry = exerciseComponents[exerciseId];

  if (!definition || !entry) {
    return (
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Exercise not found</h1>
        <Link href="/" className="text-accent hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const ExerciseComponent = entry.component;

  return (
    <ExerciseShell definition={definition} reflectionPrompt={entry.reflectionPrompt}>
      {({ onComplete }) => <ExerciseComponent onComplete={onComplete} />}
    </ExerciseShell>
  );
}
