'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { growthMessage, formatDuration } from '@/lib/scoring';
import { useSettings } from '@/context/SettingsContext';

interface CompletionCardProps {
  title: string;
  duration: number;
  score?: number;
  message?: string;
  onTryAgain: () => void;
  onBackToArea: () => void;
  onHome: () => void;
}

export default function CompletionCard({
  title,
  duration,
  score,
  message,
  onTryAgain,
  onBackToArea,
  onHome,
}: CompletionCardProps) {
  const { settings } = useSettings();

  return (
    <Card className="mx-auto max-w-md text-center">
      <div className="mb-4 text-4xl" aria-hidden="true">
        ✓
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Nice work
      </h3>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        {title} — {formatDuration(duration)}
      </p>
      {settings.showScores && score !== undefined && (
        <p className="mb-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          {score}
        </p>
      )}
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        {message || growthMessage(score)}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button onClick={onTryAgain} size="sm">
          Try again
        </Button>
        <Button variant="secondary" size="sm" onClick={onBackToArea}>
          Back to area
        </Button>
        <Button variant="ghost" size="sm" onClick={onHome}>
          Home
        </Button>
      </div>
    </Card>
  );
}
