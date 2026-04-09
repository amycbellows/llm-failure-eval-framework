import type { EFArea, ExerciseResult } from './exercise';

export type Theme = 'light' | 'dark' | 'high-contrast';
export type FontSize = 'default' | 'large' | 'extra-large';

export interface UserSettings {
  theme: Theme;
  reduceMotion: boolean;
  fontSize: FontSize;
  pausableTimers: boolean;
  showScores: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  reduceMotion: false,
  fontSize: 'default',
  pausableTimers: true,
  showScores: true,
};

export interface AreaStats {
  completions: number;
  averageScore?: number;
  lastCompleted?: string;
}

export interface UserProgress {
  history: ExerciseResult[];
  streaks: {
    current: number;
    longest: number;
    lastActiveDate: string;
  };
  areaStats: Record<EFArea, AreaStats>;
}

export const DEFAULT_PROGRESS: UserProgress = {
  history: [],
  streaks: {
    current: 0,
    longest: 0,
    lastActiveDate: '',
  },
  areaStats: {
    'task-initiation': { completions: 0 },
    'time-estimation': { completions: 0 },
    'routine-building': { completions: 0 },
    'prioritization': { completions: 0 },
    'context-switching': { completions: 0 },
  },
};
