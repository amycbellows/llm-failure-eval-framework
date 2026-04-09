'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface ReflectionPromptProps {
  prompt: string;
  onSubmit: (reflection: string) => void;
  onSkip: () => void;
}

export default function ReflectionPrompt({ prompt, onSubmit, onSkip }: ReflectionPromptProps) {
  const [text, setText] = useState('');

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        A moment to reflect
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{prompt}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400
          focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200
          dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500
          dark:focus:ring-indigo-800"
        rows={4}
        placeholder="No pressure — this is just for you."
        aria-label="Your reflection"
      />
      <div className="flex gap-3">
        <Button onClick={() => onSubmit(text)} disabled={text.trim().length === 0}>
          Save reflection
        </Button>
        <Button variant="ghost" onClick={onSkip}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
