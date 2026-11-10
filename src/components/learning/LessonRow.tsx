import Link from "next/link";
import type { LessonCard } from "@/lib/learning";
import { LevelBadge, ProgressBar } from "@/components/ui/Progress";

export function LessonStatus({ lesson }: { lesson: LessonCard }) {
  if (lesson.completed) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
        <span className="material-symbols-outlined text-[14px]">check_circle</span>
        Hoàn thành
      </span>
    );
  }
  if (lesson.bestScore > 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#fdf3e2] px-2.5 py-1 text-[11px] font-semibold text-gold">
        <span className="material-symbols-outlined text-[14px]">progress_activity</span>
        Đang học
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted">
      Chưa học
    </span>
  );
}

export function LessonRow({
  lesson,
  levelCode,
  topicName,
  index,
}: {
  lesson: LessonCard;
  levelCode: string;
  topicName?: string;
  index?: number;
}) {
  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className="group flex items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_14px_30px_-24px_rgba(21,37,27,0.45)]"
    >
      <span
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
          lesson.completed
            ? "bg-brand text-white"
            : lesson.bestScore > 0
              ? "bg-brand-soft text-brand"
              : "bg-surface-muted text-muted"
        }`}
      >
        {lesson.completed ? (
          <span className="material-symbols-outlined text-[18px]">check</span>
        ) : (
          String(index ?? lesson.order).padStart(2, "0")
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-semibold text-ink group-hover:text-brand">
            {lesson.title}
          </span>
          <LevelBadge code={levelCode} />
          {topicName ? (
            <span className="hidden truncate text-[11px] text-muted sm:inline">· {topicName}</span>
          ) : null}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
          <span>{lesson.questionCount} câu hỏi</span>
          <span>·</span>
          <span>{lesson.estimatedMinutes} phút</span>
          <span>·</span>
          <span>+{lesson.xp} XP</span>
          {lesson.bestScore > 0 ? (
            <>
              <span>·</span>
              <span className="text-brand">
                Điểm cao nhất {lesson.bestScore}/{lesson.quizTotal}
              </span>
            </>
          ) : null}
        </div>
      </div>

      <div className="hidden w-28 flex-shrink-0 sm:block">
        <ProgressBar value={lesson.quizTotal ? (lesson.bestScore / lesson.quizTotal) * 100 : 0} />
        <div className="mt-1.5 text-right text-[10px] text-muted">
          {lesson.quizTotal ? `${Math.round((lesson.bestScore / lesson.quizTotal) * 100)}%` : "—"}
        </div>
      </div>

      <span className="material-symbols-outlined text-[20px] text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
        arrow_forward
      </span>
    </Link>
  );
}
