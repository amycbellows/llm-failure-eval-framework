'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type TaskType = 'categorize' | 'math';

interface Trial {
  type: TaskType;
  prompt: string;
  correctAnswer: string;
  startTime: number;
  endTime?: number;
  userAnswer?: string;
  isSwitch: boolean;
}

const WORDS = [
  { word: 'Dog', category: 'animal' },
  { word: 'Car', category: 'object' },
  { word: 'Cat', category: 'animal' },
  { word: 'Table', category: 'object' },
  { word: 'Bird', category: 'animal' },
  { word: 'Chair', category: 'object' },
  { word: 'Fish', category: 'animal' },
  { word: 'Book', category: 'object' },
  { word: 'Horse', category: 'animal' },
  { word: 'Lamp', category: 'object' },
];

function generateMathProblem(): { prompt: string; answer: string } {
  const a = Math.floor(Math.random() * 12) + 2;
  const b = Math.floor(Math.random() * 12) + 2;
  return { prompt: `${a} + ${b}`, answer: String(a + b) };
}

function generateCategorizePrompt(): { prompt: string; answer: string } {
  const item = WORDS[Math.floor(Math.random() * WORDS.length)];
  return { prompt: `"${item.word}" — animal or object?`, answer: item.category };
}

const TOTAL_TRIALS = 16;

// Pattern: AABB AABB ... forces 2 switches per block
function generateTrialSequence(): TaskType[] {
  const seq: TaskType[] = [];
  for (let block = 0; block < TOTAL_TRIALS / 4; block++) {
    const first: TaskType = block % 2 === 0 ? 'categorize' : 'math';
    const second: TaskType = first === 'categorize' ? 'math' : 'categorize';
    seq.push(first, first, second, second);
  }
  return seq;
}

interface SwitchCostProps {
  onComplete: (data: Record<string, unknown>, score?: number, message?: string) => void;
}

export default function SwitchCost({ onComplete }: SwitchCostProps) {
  const [phase, setPhase] = useState<'ready' | 'trial' | 'done'>('ready');
  const [trials, setTrials] = useState<Trial[]>([]);
  const [currentTrial, setCurrentTrial] = useState<Trial | null>(null);
  const [userInput, setUserInput] = useState('');
  const [trialIndex, setTrialIndex] = useState(0);
  const sequenceRef = useRef<TaskType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const startSession = useCallback(() => {
    sequenceRef.current = generateTrialSequence();
    setTrialIndex(0);
    setTrials([]);
    startTrial(0, []);
    setPhase('trial');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startTrial(index: number, prevTrials: Trial[]) {
    const type = sequenceRef.current[index];
    const prevType = index > 0 ? sequenceRef.current[index - 1] : type;
    const isSwitch = index > 0 && type !== prevType;

    const { prompt, answer } =
      type === 'categorize' ? generateCategorizePrompt() : generateMathProblem();

    setCurrentTrial({
      type,
      prompt,
      correctAnswer: answer,
      startTime: Date.now(),
      isSwitch,
    });
    setUserInput('');
  }

  useEffect(() => {
    if (phase === 'trial' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, currentTrial]);

  const handleAnswer = useCallback(() => {
    if (!currentTrial || !userInput.trim()) return;

    const completed: Trial = {
      ...currentTrial,
      endTime: Date.now(),
      userAnswer: userInput.trim().toLowerCase(),
    };

    const newTrials = [...trials, completed];
    setTrials(newTrials);

    const nextIndex = trialIndex + 1;
    setTrialIndex(nextIndex);

    if (nextIndex >= TOTAL_TRIALS) {
      // Done
      setPhase('done');

      const switchTrials = newTrials.filter((t) => t.isSwitch && t.endTime);
      const stayTrials = newTrials.filter((t) => !t.isSwitch && t.endTime);

      const avgSwitch =
        switchTrials.length > 0
          ? Math.round(switchTrials.reduce((s, t) => s + ((t.endTime ?? 0) - t.startTime), 0) / switchTrials.length)
          : 0;
      const avgStay =
        stayTrials.length > 0
          ? Math.round(stayTrials.reduce((s, t) => s + ((t.endTime ?? 0) - t.startTime), 0) / stayTrials.length)
          : 0;
      const costMs = Math.max(0, avgSwitch - avgStay);

      onComplete(
        {
          totalTrials: TOTAL_TRIALS,
          avgSwitchMs: avgSwitch,
          avgStayMs: avgStay,
          switchCostMs: costMs,
        },
        undefined,
        costMs > 0
          ? `Your switch cost: ~${Math.round(costMs / 100) / 10}s extra per transition. That's normal — everyone pays a cost to switch. Knowing yours helps you plan.`
          : 'Interesting — your switch cost was minimal this session. That can vary day to day.',
      );
    } else {
      startTrial(nextIndex, newTrials);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrial, userInput, trials, trialIndex, onComplete]);

  if (phase === 'ready') {
    return (
      <Card className="text-center">
        <p className="mb-4 text-muted">
          You&apos;ll alternate between two tasks: categorizing words and solving simple addition.
          Answer as naturally as you can — speed isn&apos;t the point, awareness is.
        </p>
        <Button onClick={startSession}>Begin</Button>
      </Card>
    );
  }

  if (phase === 'trial' && currentTrial) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_TRIALS }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < trialIndex ? 'bg-accent' : i === trialIndex ? 'bg-accent/40' : 'bg-surface-border'
              }`}
            />
          ))}
        </div>

        <Card className="text-center">
          <span
            className={`mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
              currentTrial.type === 'categorize'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
            }`}
          >
            {currentTrial.type === 'categorize' ? 'Categorize' : 'Math'}
          </span>
          {currentTrial.isSwitch && (
            <span className="ml-2 text-xs text-muted">(switched!)</span>
          )}
          <p className="my-4 text-2xl font-semibold text-foreground">{currentTrial.prompt}</p>
          <div className="flex justify-center gap-2">
            {currentTrial.type === 'categorize' ? (
              <>
                <Button
                  variant={userInput === 'animal' ? 'primary' : 'secondary'}
                  onClick={() => { setUserInput('animal'); }}
                >
                  Animal
                </Button>
                <Button
                  variant={userInput === 'object' ? 'primary' : 'secondary'}
                  onClick={() => { setUserInput('object'); }}
                >
                  Object
                </Button>
              </>
            ) : (
              <input
                ref={inputRef}
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnswer()}
                className="w-24 rounded-lg border border-surface-border bg-surface px-4 py-2 text-center font-mono text-lg text-foreground
                  focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                aria-label="Your answer"
                autoFocus
              />
            )}
          </div>
          <Button
            onClick={handleAnswer}
            disabled={!userInput.trim()}
            className="mt-4"
          >
            Next
          </Button>
        </Card>
      </div>
    );
  }

  return null;
}
