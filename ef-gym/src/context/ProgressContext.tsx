'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { UserProgress } from '@/types/progress';
import { DEFAULT_PROGRESS } from '@/types/progress';
import type { EFArea, ExerciseResult } from '@/types/exercise';
import { loadFromStorage, saveToStorage } from '@/lib/storage';

interface ProgressContextValue {
  progress: UserProgress;
  recordCompletion: (result: ExerciseResult) => void;
  getAreaCompletions: (area: EFArea) => number;
  getExerciseHistory: (exerciseId: string) => ExerciseResult[];
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

function updateStreaks(streaks: UserProgress['streaks']): UserProgress['streaks'] {
  const today = todayString();
  if (streaks.lastActiveDate === today) {
    return streaks;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const newCurrent = streaks.lastActiveDate === yesterdayStr ? streaks.current + 1 : 1;

  return {
    current: newCurrent,
    longest: Math.max(streaks.longest, newCurrent),
    lastActiveDate: today,
  };
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage<UserProgress>('progress', DEFAULT_PROGRESS);
    setProgress(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveToStorage('progress', progress);
  }, [progress, loaded]);

  const recordCompletion = useCallback((result: ExerciseResult) => {
    setProgress((prev) => {
      // Find the area for this exercise from the registry
      const area = result.exerciseId.includes('sprint') || result.exerciseId.includes('smallest-step')
        ? 'task-initiation'
        : result.exerciseId.includes('time') || result.exerciseId.includes('auction')
        ? 'time-estimation'
        : result.exerciseId.includes('morning') || result.exerciseId.includes('routine')
        ? 'routine-building'
        : result.exerciseId.includes('inbox') || result.exerciseId.includes('eisenhower')
        ? 'prioritization'
        : 'context-switching';

      const areaStats = { ...prev.areaStats };
      const current = areaStats[area as EFArea];
      const newCompletions = current.completions + 1;
      const newAvg =
        result.score !== undefined
          ? current.averageScore !== undefined
            ? (current.averageScore * current.completions + result.score) / newCompletions
            : result.score
          : current.averageScore;

      areaStats[area as EFArea] = {
        completions: newCompletions,
        averageScore: newAvg !== undefined ? Math.round(newAvg) : undefined,
        lastCompleted: result.completedAt,
      };

      return {
        history: [...prev.history, result],
        streaks: updateStreaks(prev.streaks),
        areaStats,
      };
    });
  }, []);

  const getAreaCompletions = useCallback(
    (area: EFArea) => progress.areaStats[area].completions,
    [progress],
  );

  const getExerciseHistory = useCallback(
    (exerciseId: string) => progress.history.filter((r) => r.exerciseId === exerciseId),
    [progress],
  );

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  return (
    <ProgressContext.Provider
      value={{ progress, recordCompletion, getAreaCompletions, getExerciseHistory, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
