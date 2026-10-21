"use client";

import Link from "next/link";
import { useState } from "react";
import type { getReviewItems } from "@/lib/learning";
import { ProgressBar } from "@/components/ui/Progress";

type ReviewItem = Awaited<ReturnType<typeof getReviewItems>>[number];

interface Feedback {
  correct: boolean;
  correctLabel: string;
  selectedLabel: string;
  explanation: string | null;
}

export function ReviewPractice({ items: initialItems }: { items: ReviewItem[] }) {
  const [remaining, setRemaining] = useState(initialItems);
  const [round, setRound] = useState(initialItems);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [sending, setSending] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(initialItems.length === 0);

  const item = round[index];

  async function choose(choiceId: string) {
    if (!item || feedback || sending) return;
    setSelected(choiceId);
    setSending(true);
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, choiceId }),
      });
      if (!response.ok) throw new Error("Review failed");
      const data = (await response.json()) as {
        correct: boolean;
        correctLabel: string;
        selectedLabel: string;
        explanation: string | null;
      };
      setFeedback(data);
      if (data.correct) {
        setCorrectCount((value) => value + 1);
        setRemaining((value) => value.filter((row) => row.id !== item.id));
      }
    } catch {
      setSelected(null);
    } finally {
      setSending(false);
    }
  }

  function next() {
    setFeedback(null);
    setSelected(null);
    if (index + 1 >= round.length) {
      setFinished(true);
    } else {
      setIndex((value) => value + 1);
    }
  }

  function startRound() {
    setRound(remaining);
    setIndex(0);
    setSelected(null);
    setFeedback(null);
    setCorrectCount(0);
    setFinished(false);
  }

  if (initialItems.length === 0) {
    return (
      <div className="card mx-auto max-w-2xl p-8 text-center md:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <span className="material-symbols-outlined text-[30px]">verified</span>
        </span>
        <h2 className="display mt-4 text-3xl text-ink">Không có câu nào cần ôn</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Những câu bạn trả lời sai trong bài kiểm tra sẽ xuất hiện ở đây. Hãy tiếp tục học và quay
          lại sau.
        </p>
        <Link
          href="/roadmap"
          className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
        >
          Tiếp tục lộ trình
        </Link>
      </div>
    );
  }

  if (finished) {
    const stillWrong = remaining.length;
    return (
      <div className="card mx-auto max-w-2xl animate-rise p-8 text-center md:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <span className="material-symbols-outlined text-[30px]">
            {stillWrong === 0 ? "celebration" : "refresh"}
          </span>
        </span>
        <h2 className="display mt-4 text-3xl text-ink">
          {stillWrong === 0 ? "Đã xử lý hết câu sai!" : "Hết một vòng ôn tập"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          Vòng này bạn trả lời đúng {correctCount}/{round.length} câu.
          {stillWrong > 0 ? ` Còn ${stillWrong} câu cần ôn lại.` : ""}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {stillWrong > 0 ? (
            <button
              type="button"
              onClick={startRound}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Ôn lại {stillWrong} câu còn sai
            </button>
          ) : null}
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink hover:border-brand/30 hover:text-brand"
          >
            Về lộ trình
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between text-xs text-muted">
        <span>
          Câu {index + 1}/{round.length}
        </span>
        <span>Còn {remaining.length} câu chưa xử lý</span>
      </div>
      <ProgressBar value={((index + (feedback ? 1 : 0)) / round.length) * 100} />

      <div className="card mt-4 p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand">
            {item.lesson.levelCode} · {item.lesson.title}
          </span>
          <span className="rounded-md bg-[#fdf3e2] px-2 py-0.5 text-[11px] font-semibold text-gold">
            Đã sai {item.wrongCount} lần
          </span>
        </div>

        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
          Ôn lại câu sai
        </div>
        <h2 className="display mt-2 text-2xl leading-snug text-ink md:text-[28px]">
          {item.question.prompt}
        </h2>

        <div className="mt-6 space-y-2.5">
          {item.question.choices.map((choice, choiceIndex) => {
            const isSelected = selected === choice.id;
            const isCorrectChoice = feedback?.correctLabel === choice.label;
            const showCorrect = Boolean(feedback) && isCorrectChoice;
            const showWrong = Boolean(feedback) && isSelected && !isCorrectChoice;

            return (
              <button
                key={choice.id}
                type="button"
                disabled={Boolean(feedback) || sending}
                onClick={() => choose(choice.id)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  showCorrect
                    ? "border-brand bg-brand-soft"
                    : showWrong
                      ? "border-danger/40 bg-[#fde8e6]"
                      : isSelected
                        ? "border-brand bg-brand-soft/60"
                        : "border-line bg-surface hover:border-brand/30 hover:bg-surface-muted/40"
                } disabled:cursor-default`}
              >
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    showCorrect
                      ? "bg-brand text-white"
                      : showWrong
                        ? "bg-danger text-white"
                        : isSelected
                          ? "bg-brand text-white"
                          : "bg-surface-muted text-muted"
                  }`}
                >
                  {String.fromCharCode(65 + choiceIndex)}
                </span>
                <span className="text-sm text-ink">{choice.label}</span>
                {showCorrect ? (
                  <span className="material-symbols-outlined ml-auto text-[18px] text-brand">
                    check_circle
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {feedback ? (
          <div
            className={`mt-5 rounded-xl border p-4 ${
              feedback.correct
                ? "border-brand/20 bg-brand-soft/50"
                : "border-danger/20 bg-[#fdf2f1]"
            }`}
          >
            <div
              className={`flex items-center gap-2 text-sm font-semibold ${
                feedback.correct ? "text-brand" : "text-danger"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {feedback.correct ? "check_circle" : "cancel"}
              </span>
              {feedback.correct ? "Chính xác!" : "Chưa đúng"}
            </div>
            {!feedback.correct ? (
              <p className="mt-1 text-xs text-ink">
                Đáp án đúng: <span className="font-semibold">{feedback.correctLabel}</span>
              </p>
            ) : null}
            {feedback.explanation ? (
              <p className="mt-2 text-xs leading-relaxed text-muted">{feedback.explanation}</p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={next}
            disabled={!feedback}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
          >
            {index + 1 >= round.length ? "Xem kết quả" : "Câu tiếp theo"}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
