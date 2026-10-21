interface DailyGoalBarProps {
  reviewedToday: number;
  dailyGoal: number;
  streak: number;
}

export function DailyGoalBar({ reviewedToday, dailyGoal, streak }: DailyGoalBarProps) {
  const pct = Math.min(100, Math.round((reviewedToday / dailyGoal) * 100));

  return (
    <div className="mb-xl w-full max-w-md">
      <div className="mb-xs flex items-center justify-between">
        <span className="text-sm font-medium text-on-surface-variant">Daily Goal</span>
        <span className="text-sm font-bold text-primary">
          {reviewedToday} / {dailyGoal} words
        </span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-surface-variant">
        <div className="h-full rounded-full bg-accent-green transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-xs flex justify-end">
        <div className="flex items-center gap-1 rounded-full bg-accent-green-light px-2 py-1 text-xs font-semibold text-accent-green-dark">
          <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
          {streak} Day Streak
        </div>
      </div>
    </div>
  );
}
