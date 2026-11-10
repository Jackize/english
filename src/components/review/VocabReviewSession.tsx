"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { getVocabularyReview } from "@/lib/vocab-review";
import type { WrittenDirection } from "@/lib/vocabulary-quiz";
import { ProgressBar } from "@/components/ui/Progress";
import { useToast } from "@/components/ui/Toast";
import { speakEnglish } from "@/lib/speech";

type ReviewData = Awaited<ReturnType<typeof getVocabularyReview>>;
type ReviewItem = ReviewData["items"][number];

interface Feedback {
  correct: boolean;
  direction: WrittenDirection;
  expectedAnswer: string;
  explanation: string;
}

export function VocabReviewSession({ items }: { items: ReviewItem[] }) {
  const { showToast } = useToast();
  const [remaining, setRemaining] = useState<ReviewItem[]>(items);
  const [round, setRound] = useState<ReviewItem[]>(items);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [sending, setSending] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(items.length === 0);

  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<() => void>(() => {});
  const sendRef = useRef<() => void>(() => {});

  const item = round[index];

  async function sendAnswer() {
    if (!item || feedback || sending) return;

    setSending(true);
    try {
      const response = await fetch("/api/review/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, answer }),
      });
      if (!response.ok) throw new Error("Vocabulary review failed");

      const result = (await response.json()) as Feedback;
      setFeedback(result);
      // Đọc từ tiếng Anh sau khi bấm kiểm tra (tránh lộ đáp án trước).
      speakEnglish(item.direction === "vi-en" ? result.expectedAnswer : item.prompt);

      if (result.correct) {
        setCorrectCount((value) => value + 1);
        setRemaining((value) => value.filter((row) => row.id !== item.id));
      }
    } catch {
      showToast({
        variant: "error",
        title: "Không gửi được câu trả lời",
        description: "Kiểm tra kết nối mạng rồi thử lại.",
        action: { label: "Thử lại", onClick: () => void sendAnswer() },
      });
    } finally {
      setSending(false);
    }
  }

  function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendAnswer();
  }

  function next() {
    setFeedback(null);
    setAnswer("");
    if (index + 1 >= round.length) {
      setFinished(true);
    } else {
      setIndex((value) => value + 1);
    }
  }

  function startRound() {
    setRound(remaining);
    setIndex(0);
    setAnswer("");
    setFeedback(null);
    setCorrectCount(0);
    setFinished(false);
  }

  nextRef.current = next;
  sendRef.current = () => void sendAnswer();

  // Enter để kiểm tra / sang từ tiếp theo; tự focus ô điền khi chuyển từ.
  useEffect(() => {
    if (!finished && !feedback) inputRef.current?.focus();
  }, [index, feedback, finished, round]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Enter" || finished || sending) return;
      const target = event.target as HTMLElement | null;
      const inField =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (feedback) {
        // Input bị disable sau khi kiểm tra nên bắt Enter ở window.
        event.preventDefault();
        nextRef.current();
        return;
      }
      if (!inField && answer.trim()) {
        event.preventDefault();
        sendRef.current();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer, feedback, finished, sending]);

  if (items.length === 0) {
    return (
      <div className="card p-8 text-center md:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <span className="material-symbols-outlined text-[30px]">event_available</span>
        </span>
        <h2 className="display mt-4 text-3xl text-ink">Hôm nay chưa có từ nào đến hạn</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Bạn đã ôn xong hoặc các từ chưa tới lịch. Hãy quay lại khi có từ mới đến hạn.
        </p>
        <Link
          href="/review"
          className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
        >
          Về trang ôn tập
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    );
  }

  if (finished) {
    const stillWrong = remaining.length;
    return (
      <div className="card animate-rise p-8 text-center md:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <span className="material-symbols-outlined text-[30px]">
            {stillWrong === 0 ? "celebration" : "refresh"}
          </span>
        </span>
        <h2 className="display mt-4 text-3xl text-ink">
          {stillWrong === 0 ? "Hoàn thành lượt ôn!" : "Hết một vòng ôn"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          Vòng này bạn trả lời đúng {correctCount}/{round.length} từ.
          {stillWrong > 0
            ? ` Còn ${stillWrong} từ cần ôn lại ngay.`
            : " Các từ đã đúng sẽ được hẹn lịch ôn tiếp theo."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {stillWrong > 0 ? (
            <button
              type="button"
              onClick={startRound}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Ôn lại {stillWrong} từ còn sai
            </button>
          ) : null}
          <Link
            href="/review"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand/30 hover:text-brand"
          >
            Về trang ôn tập
          </Link>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const isVietnameseToEnglish = item.direction === "vi-en";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs text-muted">
        <span>
          Từ {index + 1}/{round.length}
        </span>
        <span>Còn {remaining.length} từ trong lượt này</span>
      </div>
      <ProgressBar value={((index + (feedback ? 1 : 0)) / round.length) * 100} />

      <div className="card mt-4 p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-muted px-2.5 py-1 text-[11px] font-semibold text-muted">
            <span className="material-symbols-outlined text-[14px]">translate</span>
            {isVietnameseToEnglish ? "Việt → Anh" : "Anh → Việt"}
          </span>
        </div>

        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
          {isVietnameseToEnglish ? "Gõ lại từ tiếng Anh" : "Gõ lại nghĩa tiếng Việt"}
        </div>
        <h2 className="display mt-2 text-2xl leading-snug text-ink md:text-[30px]">
          {item.prompt}
        </h2>
        {item.direction === "en-vi" && item.ipa ? (
          <p className="mt-1 text-sm text-muted">{item.ipa}</p>
        ) : null}
        {item.direction === "en-vi" && item.wordForm ? (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            {item.wordForm}
          </p>
        ) : null}

        <form onSubmit={submitAnswer} className="mt-6">
          <label htmlFor="vocab-review-answer" className="sr-only">
            Câu trả lời
          </label>
          <input
            ref={inputRef}
            id="vocab-review-answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            disabled={Boolean(feedback) || sending}
            autoFocus
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder={isVietnameseToEnglish ? "Gõ từ tiếng Anh..." : "Gõ nghĩa tiếng Việt..."}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand disabled:bg-surface-muted/50"
          />

          {!feedback ? (
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={!answer.trim() || sending}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? "Đang kiểm tra..." : "Kiểm tra"}
                <span className="material-symbols-outlined text-[18px]">check</span>
              </button>
            </div>
          ) : null}
        </form>

        {feedback ? (
          <div
            className={`mt-5 rounded-xl border p-4 ${
              feedback.correct ? "border-brand/20 bg-brand-soft/50" : "border-danger/20 bg-[#fdf2f1]"
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
            <p className="mt-1 text-xs text-ink">
              Đáp án đúng: <span className="font-semibold">{feedback.expectedAnswer}</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{feedback.explanation}</p>
            <p className="mt-2 text-[11px] font-semibold text-muted">
              {feedback.correct
                ? "Đã ghi nhận. Từ sẽ được hẹn ôn tiếp theo."
                : "Từ sẽ xuất hiện lại trong lượt ôn hôm nay."}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={next}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                {index + 1 >= round.length ? "Xem kết quả" : "Từ tiếp theo"}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
