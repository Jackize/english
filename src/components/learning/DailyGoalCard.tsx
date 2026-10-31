import Link from "next/link";
import type { DailyGoalProgress } from "@/lib/learning";
import { ProgressBar } from "@/components/ui/Progress";

export function DailyGoalCard({
  goal,
  streak,
  xp,
  className = "",
}: {
  goal: DailyGoalProgress;
  streak: number;
  xp: number;
  className?: string;
}) {
  return (
    <div className={`card p-5 md:p-6 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            Tiến độ hôm nay
          </div>
          <h3 className="display mt-1 text-2xl text-ink">
            {goal.done ? "Đã hoàn thành mục tiêu!" : "Giữ nhịp học mỗi ngày"}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {goal.done
              ? "Bạn có thể học thêm hoặc dành thời gian ôn tập."
              : "Mục tiêu nhỏ, đều đặn sẽ giúp kiến thức ở lại lâu hơn."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0d9b5] bg-[#fdf3e2] px-3 py-1.5 text-xs font-semibold text-gold">
            <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
            {streak} ngày
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted">
            <span className="material-symbols-outlined text-[16px] text-brand">bolt</span>
            {xp} XP
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-ink">
            {goal.completedLessons}/{goal.targetLessons} bài
          </span>
          <span className="text-muted">
            {goal.completedMinutes}/{goal.targetMinutes} phút
          </span>
        </div>
        <ProgressBar value={goal.percent} />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
          <span>
            {goal.done
              ? "Mục tiêu đã đạt — nghỉ ngơi hoặc ôn thêm đều tốt."
              : goal.completedLessons < goal.targetLessons
                ? `Còn ${goal.targetLessons - goal.completedLessons} bài để chạm mục tiêu.`
                : `Còn ${Math.max(0, goal.targetMinutes - goal.completedMinutes)} phút để chạm mục tiêu.`}
          </span>
          <Link href="/daily" className="font-semibold text-brand hover:underline">
            Xem kế hoạch hôm nay →
          </Link>
        </div>
      </div>
    </div>
  );
}
