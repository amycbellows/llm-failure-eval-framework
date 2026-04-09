'use client';

import { use } from 'react';
import Link from 'next/link';
import { EF_AREAS, type EFArea } from '@/types/exercise';
import { getExercisesByArea } from '@/exercises/registry';
import Card from '@/components/ui/Card';
import { useProgress } from '@/context/ProgressContext';

export default function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = use(params);
  const areaInfo = EF_AREAS.find((a) => a.id === areaSlug);
  const exercises = getExercisesByArea(areaSlug as EFArea);
  const { getExerciseHistory } = useProgress();

  if (!areaInfo) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Area not found</h1>
        <Link href="/" className="text-accent hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Area header */}
      <div>
        <div className="mb-2 text-4xl" aria-hidden="true">
          {areaInfo.icon}
        </div>
        <h1 className="text-2xl font-bold text-foreground">{areaInfo.title}</h1>
        <p className="text-muted">{areaInfo.description}</p>
      </div>

      {/* Exercise list */}
      <div className="space-y-4">
        {exercises.map((exercise) => {
          const history = getExerciseHistory(exercise.id);
          const completions = history.length;
          return (
            <Link
              key={exercise.id}
              href={`/exercises/${areaSlug}/${exercise.id}`}
              className="block group"
            >
              <Card className="transition-shadow hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-accent">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded-full bg-accent-light px-2 py-0.5 text-xs font-medium text-accent">
                        {exercise.type === 'mini-game' ? 'Mini-game' : 'Guided practice'}
                      </span>
                      <span className="text-xs text-muted">
                        ~{exercise.estimatedMinutes} min
                      </span>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted">
                        {exercise.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {exercise.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{exercise.description}</p>
                  </div>
                  {completions > 0 && (
                    <div className="ml-4 text-right">
                      <span className="text-sm font-medium text-accent">
                        {completions}x
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Area navigation */}
      <nav aria-label="EF areas" className="flex flex-wrap gap-2 pt-4 border-t border-surface-border">
        {EF_AREAS.map((a) => (
          <Link
            key={a.id}
            href={`/exercises/${a.id}`}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              a.id === areaSlug
                ? 'bg-accent text-white font-medium'
                : 'bg-surface text-muted hover:text-accent'
            }`}
          >
            {a.icon} {a.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
