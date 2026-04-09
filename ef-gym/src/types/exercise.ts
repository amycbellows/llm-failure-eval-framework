export type EFArea =
  | 'task-initiation'
  | 'time-estimation'
  | 'routine-building'
  | 'prioritization'
  | 'context-switching';

export type ExerciseType = 'mini-game' | 'guided-scenario';

export type Difficulty = 'gentle' | 'moderate' | 'challenging';

export interface ExerciseDefinition {
  id: string;
  area: EFArea;
  type: ExerciseType;
  title: string;
  description: string;
  instructions: string[];
  estimatedMinutes: number;
  difficulty: Difficulty;
  tags: string[];
}

export interface ExerciseResult {
  exerciseId: string;
  completedAt: string;
  duration: number;
  score?: number;
  data: Record<string, unknown>;
  reflection?: string;
}

export interface EFAreaInfo {
  id: EFArea;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const EF_AREAS: EFAreaInfo[] = [
  {
    id: 'task-initiation',
    title: 'Task Initiation',
    description: 'Overcome "getting started" paralysis and build momentum',
    icon: '🚀',
    color: 'emerald',
  },
  {
    id: 'time-estimation',
    title: 'Time Estimation',
    description: 'Calibrate your sense of how long things actually take',
    icon: '⏱️',
    color: 'blue',
  },
  {
    id: 'routine-building',
    title: 'Routine Building',
    description: 'Create and maintain daily routines that work for you',
    icon: '🔄',
    color: 'violet',
  },
  {
    id: 'prioritization',
    title: 'Prioritization',
    description: 'Decide what matters most and what can wait',
    icon: '📋',
    color: 'amber',
  },
  {
    id: 'context-switching',
    title: 'Context Switching',
    description: 'Transition between tasks with less friction',
    icon: '🔀',
    color: 'rose',
  },
];
