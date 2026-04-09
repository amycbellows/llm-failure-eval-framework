'use client';

import { EF_AREAS } from '@/types/exercise';
import { useProgress } from '@/context/ProgressContext';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import { formatDuration } from '@/lib/scoring';

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress();
  const totalCompletions = progress.history.length;

  // Recent sessions (last 10)
  const recent = [...progress.history].reverse().slice(0, 10);

  // Area coverage: what % of areas have been practiced
  const areasPracticed = EF_AREAS.filter(
    (a) => progress.areaStats[a.id].completions > 0,
  ).length;
  const coveragePercent = Math.round((areasPracticed / EF_AREAS.length) * 100);

  if (totalCompletions === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Progress</h1>
        <Card className="text-center">
          <p className="text-muted">
            No sessions yet. Complete an exercise to start tracking your progress.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Progress</h1>

      {/* Overview stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-accent">{totalCompletions}</p>
          <p className="text-sm text-muted">Total sessions</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-accent">{progress.streaks.current}</p>
          <p className="text-sm text-muted">Day streak</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-accent">{progress.streaks.longest}</p>
          <p className="text-sm text-muted">Best streak</p>
        </Card>
      </div>

      {/* Area coverage */}
      <Card>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Area Coverage</h2>
        <ProgressBar value={coveragePercent} label={`${areasPracticed} of ${EF_AREAS.length} areas practiced`} color="bg-accent" />
        <div className="mt-4 space-y-3">
          {EF_AREAS.map((area) => {
            const stats = progress.areaStats[area.id];
            return (
              <div key={area.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true">{area.icon}</span>
                  <span className="text-foreground">{area.title}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-accent">
                    {stats.completions} {stats.completions === 1 ? 'session' : 'sessions'}
                  </span>
                  {stats.averageScore !== undefined && (
                    <span className="ml-2 text-sm text-muted">
                      avg: {stats.averageScore}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent sessions */}
      <Card>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Recent Sessions</h2>
        <div className="space-y-2">
          {recent.map((result, i) => (
            <div
              key={`${result.exerciseId}-${result.completedAt}-${i}`}
              className="flex items-center justify-between rounded-lg bg-surface-border/30 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{result.exerciseId}</p>
                <p className="text-xs text-muted">
                  {new Date(result.completedAt).toLocaleDateString()} —{' '}
                  {formatDuration(result.duration)}
                </p>
              </div>
              {result.score !== undefined && (
                <span className="text-sm font-medium text-accent">{result.score}</span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Reset */}
      <div className="pt-4 text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.confirm('Reset all progress? This cannot be undone.')) {
              resetProgress();
            }
          }}
        >
          Reset all progress
        </Button>
      </div>
    </div>
  );
}
