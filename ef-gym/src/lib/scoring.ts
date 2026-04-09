import type { ExerciseResult } from '@/types/exercise';

/**
 * Calculate calibration accuracy for time estimation exercises.
 * Returns a 0-100 score where 100 = perfect estimate.
 * Uses a generous curve: within 20% = 90+, within 50% = 70+.
 */
export function timeCalibrationScore(estimated: number, actual: number): number {
  if (actual === 0) return 100;
  const ratio = Math.abs(estimated - actual) / actual;
  if (ratio <= 0.1) return 100;
  if (ratio <= 0.2) return 90;
  if (ratio <= 0.35) return 80;
  if (ratio <= 0.5) return 70;
  if (ratio <= 0.75) return 55;
  return Math.max(30, Math.round(100 - ratio * 80));
}

/**
 * Get a growth-focused message based on score.
 * Never punitive — always forward-looking.
 */
export function growthMessage(score: number | undefined): string {
  if (score === undefined) return 'Nice work completing that exercise.';
  if (score >= 90) return 'Your calibration is really strong here.';
  if (score >= 75) return 'Solid practice — you\'re building a good feel for this.';
  if (score >= 55) return 'Each round helps you calibrate. You\'re making progress.';
  return 'This is how calibration works — the more you practice, the sharper it gets.';
}

/**
 * Format a duration in seconds to a readable string.
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

/**
 * Calculate improvement trend from recent results.
 * Returns a percentage change (positive = improving).
 */
export function calculateTrend(results: ExerciseResult[], exerciseId: string): number | null {
  const relevant = results
    .filter((r) => r.exerciseId === exerciseId && r.score !== undefined)
    .slice(-10);

  if (relevant.length < 3) return null;

  const midpoint = Math.floor(relevant.length / 2);
  const earlier = relevant.slice(0, midpoint);
  const later = relevant.slice(midpoint);

  const avgEarlier = earlier.reduce((sum, r) => sum + (r.score ?? 0), 0) / earlier.length;
  const avgLater = later.reduce((sum, r) => sum + (r.score ?? 0), 0) / later.length;

  if (avgEarlier === 0) return null;
  return Math.round(((avgLater - avgEarlier) / avgEarlier) * 100);
}
