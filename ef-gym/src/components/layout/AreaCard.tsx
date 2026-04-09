'use client';

import Link from 'next/link';
import type { EFAreaInfo } from '@/types/exercise';
import Card from '@/components/ui/Card';
import { useProgress } from '@/context/ProgressContext';

interface AreaCardProps {
  area: EFAreaInfo;
}

export default function AreaCard({ area }: AreaCardProps) {
  const { getAreaCompletions } = useProgress();
  const completions = getAreaCompletions(area.id);

  return (
    <Link href={`/exercises/${area.id}`} className="block group">
      <Card className="h-full transition-shadow hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-accent">
        <div className="mb-3 text-3xl" aria-hidden="true">
          {area.icon}
        </div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          {area.title}
        </h3>
        <p className="mb-3 text-sm text-muted">{area.description}</p>
        {completions > 0 && (
          <p className="text-xs text-accent">
            {completions} {completions === 1 ? 'session' : 'sessions'} completed
          </p>
        )}
      </Card>
    </Link>
  );
}
