import Link from "next/link";
import type { HomeMotivation } from "@/lib/motivation";
import { VOCAB_REVIEW_LEVELS } from "@/lib/vocab-review";

// Mức hộp càng cao, màu càng đậm: độ đậm thể hiện độ bền trí nhớ.
const LEVEL_TONE = ["bg-brand/20", "bg-brand/35", "bg-brand/55", "bg-brand/80", "bg-brand"];

function formatNextDue(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
  });
}

export function ReviewMomentumCard({
  review,
  memory,
  mistakesFixed,
}: Pick<HomeMotivation, "review" | "memory" | "mistakesFixed">) {
  const due = review.dueVocab + review.dueQuestions;
  const hasWords = memory.total > 0;

  return (
    <div className="card-elevated flex flex-col overflow-hidden">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between md:p-6">
        <div>
          <h2 className="display text-2xl text-ink md:text-[28px]">
            {due > 0
              ? `${due} mục đang chờ bạn ôn`
              : hasWords || mistakesFixed > 0
                ? "Không còn mục nào đến hạn"
                : "Lịch ôn của bạn đang trống"}
          </h2>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
            {due > 0
              ? [
                  review.dueVocab > 0 ? `${review.dueVocab} từ vựng` : null,
                  review.dueQuestions > 0 ? `${review.dueQuestions} câu từng làm sai` : null,
                ]
                  .filter(Boolean)
                  .join(" và ") +
                ". Ôn đúng hạn để từ được đẩy lên hộp có chu kỳ dài hơn."
              : review.nextDueAt
                ? `Lượt ôn tiếp theo: ${formatNextDue(review.nextDueAt)}.`
                : "Hoàn thành một bài từ vựng, các từ trong bài sẽ tự vào lịch ôn."}
          </p>
          {review.reviewedToday > 0 ? (
            <p className="mt-2 text-xs font-semibold text-brand">
              Hôm nay bạn đã ôn {review.reviewedToday} mục.
            </p>
          ) : null}
        </div>
        {due > 0 ? (
          <Link
            href="/review"
            className="btn-primary inline-flex w-fit flex-shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          >
            Ôn ngay
          </Link>
        ) : !hasWords ? (
          <Link
            href="/vocabulary"
            className="inline-flex w-fit flex-shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
          >
            Học từ vựng
          </Link>
        ) : null}
      </div>

      {hasWords ? (
        <div className="mt-auto border-t border-line p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold text-ink">Độ bền trí nhớ · {memory.total} từ</h3>
            <span className="text-xs text-muted">
              <strong className="font-semibold text-brand">{memory.longTerm}</strong> từ đã vào
              trí nhớ dài hạn (hộp 4–5)
            </span>
          </div>

          {/* Thanh xếp chồng: mỗi đoạn là một hộp Leitner, rộng theo số từ. */}
          <div
            className="mt-3 flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full bg-line/80"
            aria-hidden="true"
          >
            {VOCAB_REVIEW_LEVELS.map((meta, index) =>
              memory.counts[meta.level] > 0 ? (
                <div
                  key={meta.level}
                  className={LEVEL_TONE[index]}
                  style={{ width: `${(memory.counts[meta.level] / memory.total) * 100}%` }}
                />
              ) : null,
            )}
          </div>

          <ol className="mt-4 grid grid-cols-5 gap-2">
            {VOCAB_REVIEW_LEVELS.map((meta, index) => (
              <li key={meta.level} className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 flex-shrink-0 rounded-sm ${LEVEL_TONE[index]}`} />
                  <span className="display text-lg text-ink">{memory.counts[meta.level]}</span>
                </div>
                <div className="mt-0.5 truncate text-[11px] font-semibold text-ink" title={meta.name}>
                  {meta.shortName}
                </div>
                <div className="text-[11px] text-muted">
                  {meta.intervalDays === 1 ? "ôn mỗi ngày" : `${meta.intervalDays} ngày/lần`}
                </div>
              </li>
            ))}
          </ol>

          {mistakesFixed > 0 ? (
            <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
              Bạn đã sửa xong <strong className="font-semibold text-ink">{mistakesFixed}</strong>{" "}
              câu từng làm sai. Các câu này đã trả lời đúng qua đủ các chu kỳ ôn nên không còn trong lịch.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
