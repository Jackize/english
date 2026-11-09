import Link from "next/link";
import type { getVocabularyReview } from "@/lib/vocab-review";

type ReviewData = Awaited<ReturnType<typeof getVocabularyReview>>;

const LEVELS = [1, 2, 3, 4, 5] as const;

// 5 cột – 5 màu riêng, không dùng chung màu thương hiệu để dễ phân biệt.
const BAR_COLORS = ["#d97757", "#e0a03a", "#c8b23c", "#4e9f78", "#3f7fc4"];

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}

export function VocabularyReview({ data }: { data: ReviewData }) {
  const { stats } = data;
  const maxCount = Math.max(1, ...LEVELS.map((level) => stats.counts[level]));
  const nextDueLabel = formatDate(stats.nextDueAt);

  if (stats.total === 0) {
    return (
      <div className="card p-8 text-center md:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <span className="material-symbols-outlined text-[30px]">style</span>
        </span>
        <h2 className="display mt-4 text-3xl text-ink">Chưa có từ vựng trong lịch ôn</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Khi bạn học xong phần lý thuyết hoặc làm bài kiểm tra từ vựng, các từ sẽ tự động vào lịch
          ôn và được nhắc lại đúng lúc.
        </p>
        <Link
          href="/vocabulary"
          className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
        >
          Học từ vựng
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="card p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Tiến độ ghi nhớ
            </div>
            <h2 className="display mt-1 text-xl text-ink md:text-2xl">
              Phân bố từ vựng theo chu kỳ ôn
            </h2>
          </div>
          <span className="text-xs text-muted">{stats.total} từ đang theo dõi</span>
        </div>

        <div className="mt-7 flex items-end justify-between gap-2 sm:gap-4">
          {LEVELS.map((level, index) => {
            const count = stats.counts[level];
            const height = count === 0 ? 3 : Math.max(10, Math.round((count / maxCount) * 100));

            return (
              <div key={level} className="flex min-w-0 flex-1 flex-col items-center">
                <span className="mb-2 text-sm font-bold text-ink">{count}</span>
                <div className="flex h-36 w-full items-end rounded-lg bg-surface-muted/60 p-1 sm:h-44">
                  <div
                    className="w-full rounded-md transition-[height]"
                    style={{ height: `${height}%`, backgroundColor: BAR_COLORS[index] }}
                  />
                </div>
                <span className="mt-2 text-[11px] font-semibold text-muted">{level}</span>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-muted">
          Năm cột tương ứng năm nhóm ôn tập, từ nhóm mới gặp đến nhóm đã nhớ lâu. Hệ thống tự chọn
          từ và chiều bài tập phù hợp cho bạn.
        </p>
      </div>

      <div className="card mt-5 overflow-hidden">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
              Cần ôn hôm nay
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="display text-4xl text-ink">{stats.dueCount}</span>
              <span className="text-sm text-muted">từ</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {stats.dueCount > 0
                ? "Bài ôn được chọn riêng cho bạn, không cần chọn nhóm hay chiều làm bài."
                : nextDueLabel
                  ? `Hôm nay chưa có từ nào đến hạn. Lần ôn tiếp theo: ${nextDueLabel}.`
                  : "Hãy học thêm từ vựng để bắt đầu lịch ôn."}
            </p>
          </div>

          {stats.dueCount > 0 ? (
            <Link
              href="/review/vocab"
              className="btn-primary inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Bắt đầu ôn tập
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          ) : (
            <Link
              href="/vocabulary"
              className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand/30 hover:text-brand"
            >
              Học từ mới
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
