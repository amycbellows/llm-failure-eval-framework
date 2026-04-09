'use client';

import { EF_AREAS } from '@/types/exercise';
import AreaCard from '@/components/layout/AreaCard';
import Card from '@/components/ui/Card';
import { useProgress } from '@/context/ProgressContext';

export default function Home() {
  const { progress } = useProgress();
  const totalCompletions = progress.history.length;
  const { current: streak } = progress.streaks;

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Executive Function Gym
        </h1>
        <p className="text-lg text-muted">
          Build real-world skills at your own pace. No pressure, just practice.
        </p>
      </div>

      {/* Quick stats */}
      {totalCompletions > 0 && (
        <div className="flex gap-4">
          <Card className="flex-1 text-center">
            <p className="text-2xl font-bold text-accent">{totalCompletions}</p>
            <p className="text-sm text-muted">
              {totalCompletions === 1 ? 'Session' : 'Sessions'}
            </p>
          </Card>
          {streak > 0 && (
            <Card className="flex-1 text-center">
              <p className="text-2xl font-bold text-accent">{streak}</p>
              <p className="text-sm text-muted">Day streak</p>
            </Card>
          )}
        </div>
      )}

      {/* EF Area cards */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Choose an area to practice
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EF_AREAS.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
      </div>

      {/* Encouragement */}
      {totalCompletions === 0 && (
        <Card className="text-center">
          <p className="text-muted">
            Pick any area that feels right today. There&apos;s no wrong place to start.
          </p>
        </Card>
      )}
    </div>
  );
}
