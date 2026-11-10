import Link from "next/link";
import type { DailyTask } from "@/lib/daily-plan";

export function DailyTaskRow({ task }: { task: DailyTask }) {
  const { lesson } = task;
  const completed = lesson.completed;
  const started = !completed && lesson.bestScore > 0;
  const label = task.kind === "grammar" ? "Ngữ pháp" : "Từ vựng";
  const icon = completed ? "check" : task.kind === "grammar" ? "rule" : "auto_stories";

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_14px_30px_-24px_rgba(21,37,27,0.45)]"
    >
      <span
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
          completed ? "bg-brand text-white" : "bg-brand-soft text-brand"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
            {label}
          </span>
          {task.topicName ? (
            <span className="truncate text-[10px] text-muted">{task.topicName}</span>
          ) : null}
          {completed ? (
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[9px] font-semibold text-brand">
              Hoàn thành
            </span>
          ) : started ? (
            <span className="rounded-full bg-[#fdf3e2] px-2 py-0.5 text-[9px] font-semibold text-gold">
              Đang học
            </span>
          ) : null}
        </div>
        <div className="truncate text-sm font-semibold text-ink group-hover:text-brand">
          {lesson.title}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] text-muted">
          {task.kind === "vocabulary" ? <span>{lesson.wordCount} từ</span> : null}
          <span>{lesson.questionCount} câu</span>
          <span>·</span>
          <span>{lesson.estimatedMinutes} phút</span>
          <span>·</span>
          <span>+{lesson.xp} XP</span>
        </div>
      </div>

      <span className="material-symbols-outlined flex-shrink-0 text-[18px] text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
        arrow_forward
      </span>
    </Link>
  );
}
