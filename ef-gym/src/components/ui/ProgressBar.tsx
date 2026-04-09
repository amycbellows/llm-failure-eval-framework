interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  color?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  label,
  color = 'bg-indigo-500',
  showLabel = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      {showLabel && label && (
        <div className="mb-1 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{label}</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `${Math.round(clamped)}% complete`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
