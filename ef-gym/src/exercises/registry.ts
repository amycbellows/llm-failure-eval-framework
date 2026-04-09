import type { EFArea, ExerciseDefinition } from '@/types/exercise';

// Exercise definitions (components are loaded lazily in the exercise page)
export const exercises: ExerciseDefinition[] = [
  // Time Estimation
  {
    id: 'time-guess',
    area: 'time-estimation',
    type: 'mini-game',
    title: 'Time Guess',
    description:
      'How long does a task really take? Guess, then see the typical range. No wrong answers — just calibration.',
    instructions: [
      'You\'ll see a common everyday task.',
      'Estimate how many minutes it takes.',
      'See the typical range and how your guess compares.',
      'Do several rounds to build your calibration.',
    ],
    estimatedMinutes: 3,
    difficulty: 'gentle',
    tags: ['calibration', 'quick'],
  },
  {
    id: 'task-auction',
    area: 'time-estimation',
    type: 'guided-scenario',
    title: 'Task Auction',
    description:
      'You have 2 hours. Bid time on each task and see if your budget fits. Teaches that time is finite.',
    instructions: [
      'You\'ll see a list of 6 tasks for the day.',
      'Assign a time estimate (in minutes) to each task.',
      'See if your total fits in 2 hours.',
      'Adjust your bids until it works, then reflect.',
    ],
    estimatedMinutes: 5,
    difficulty: 'moderate',
    tags: ['planning', 'reflection'],
  },

  // Task Initiation
  {
    id: 'two-minute-sprint',
    area: 'task-initiation',
    type: 'mini-game',
    title: 'Two-Minute Sprint',
    description:
      'Pick a task, start a 2-minute timer, and just begin. The goal is starting, not finishing.',
    instructions: [
      'Choose a task from the list (or type your own).',
      'Press Start — the timer counts up for 2 minutes.',
      'Do whatever you can on that task.',
      'When the timer ends, celebrate that you started.',
    ],
    estimatedMinutes: 3,
    difficulty: 'gentle',
    tags: ['momentum', 'timed'],
  },
  {
    id: 'smallest-step',
    area: 'task-initiation',
    type: 'guided-scenario',
    title: 'Smallest Step',
    description:
      'Take a daunting task and break it down until the first step feels truly doable.',
    instructions: [
      'Pick a task that feels overwhelming.',
      'Answer guided prompts to break it into smaller pieces.',
      'Keep breaking down until you find one tiny first step.',
      'Reflect on what made it feel doable.',
    ],
    estimatedMinutes: 5,
    difficulty: 'gentle',
    tags: ['breakdown', 'reflection'],
  },

  // Routine Building
  {
    id: 'morning-architect',
    area: 'routine-building',
    type: 'guided-scenario',
    title: 'Morning Architect',
    description:
      'Design your ideal morning routine step by step, with realistic time estimates.',
    instructions: [
      'Add steps to your morning routine.',
      'Estimate how long each step takes.',
      'Identify potential friction points.',
      'Review your total time and adjust.',
    ],
    estimatedMinutes: 7,
    difficulty: 'moderate',
    tags: ['planning', 'personalized'],
  },
  {
    id: 'routine-shuffle',
    area: 'routine-building',
    type: 'mini-game',
    title: 'Routine Shuffle',
    description:
      'A scrambled routine appears. Put it back in order — there\'s no single right answer.',
    instructions: [
      'You\'ll see a scrambled set of routine steps.',
      'Drag (or tap) to reorder them.',
      'Compare your order to common patterns.',
      'There\'s no single "right" answer — it\'s about what works for you.',
    ],
    estimatedMinutes: 3,
    difficulty: 'gentle',
    tags: ['ordering', 'quick'],
  },

  // Prioritization
  {
    id: 'inbox-triage',
    area: 'prioritization',
    type: 'mini-game',
    title: 'Inbox Triage',
    description:
      'Sort a pile of tasks into Do Now, Do Later, and Drop. Practice deciding what matters most.',
    instructions: [
      'You\'ll see 8-10 tasks of varying urgency.',
      'Sort each into: Do Now, Do Later, or Drop.',
      'See how your choices compare to Eisenhower-style logic.',
      'Every choice is explained — no trick answers.',
    ],
    estimatedMinutes: 4,
    difficulty: 'moderate',
    tags: ['sorting', 'decision-making'],
  },
  {
    id: 'eisenhower-sort',
    area: 'prioritization',
    type: 'guided-scenario',
    title: 'Eisenhower Sort',
    description:
      'Use the Eisenhower matrix with your own real tasks. Reflect on what "urgent" and "important" mean to you.',
    instructions: [
      'Type in 4-6 of your real current tasks.',
      'Place each one in the Eisenhower matrix (urgent/important grid).',
      'Reflect on what makes something urgent vs important for you.',
      'Review your priorities and next steps.',
    ],
    estimatedMinutes: 7,
    difficulty: 'moderate',
    tags: ['personalized', 'reflection'],
  },

  // Context Switching
  {
    id: 'switch-cost',
    area: 'context-switching',
    type: 'mini-game',
    title: 'Switch Cost',
    description:
      'Alternate between two simple tasks and discover your personal "switch cost." Everyone has one.',
    instructions: [
      'You\'ll alternate between two quick tasks (categorizing + math).',
      'Complete each as quickly as you\'re comfortable.',
      'See your transition times between tasks.',
      'Track how your switch cost changes over sessions.',
    ],
    estimatedMinutes: 4,
    difficulty: 'moderate',
    tags: ['timed', 'awareness'],
  },
  {
    id: 'interruption-recovery',
    area: 'context-switching',
    type: 'guided-scenario',
    title: 'Interruption Recovery',
    description:
      'Practice noting where you were, handling an interruption, and returning to your task.',
    instructions: [
      'Start a focused task.',
      'An "interruption" will appear midway through.',
      'Practice your recovery strategy: note, handle, return.',
      'Debrief on what strategies helped.',
    ],
    estimatedMinutes: 5,
    difficulty: 'challenging',
    tags: ['focus', 'strategy'],
  },
];

export function getExercisesByArea(area: EFArea): ExerciseDefinition[] {
  return exercises.filter((e) => e.area === area);
}

export function getExerciseById(id: string): ExerciseDefinition | undefined {
  return exercises.find((e) => e.id === id);
}

export function getAreaFromExerciseId(id: string): EFArea | undefined {
  return exercises.find((e) => e.id === id)?.area;
}
