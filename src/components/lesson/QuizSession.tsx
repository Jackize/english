"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProgressBar } from "@/components/ui/Progress";
import { useToast } from "@/components/ui/Toast";
import { speakEnglish } from "@/lib/speech";
import { buildExercises, type ExerciseWord } from "@/lib/flashcard-exercises";

interface VocabQuizResult {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  xpAwarded: number;
  details: {
    vocabId: string;
    word: string;
    meaningVi: string;
    kind: "mcq" | "fill";
    correct: boolean;
    answer: string;
    expected: string;
  }[];
}

type Answer = { vocabId: string; kind: "mcq" | "fill"; answer: string };

export function QuizSession({
  vocab,
  lessonId,
}: {
  vocab: ExerciseWord[];
  lessonId: string;
}) {
  const router = useRouter();
  const { showToast } = useToast();

  const exercises = useMemo(() => buildExercises(vocab), [vocab]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [phase, setPhase] = useState<"quiz" | "reading" | "result">("quiz");
  const [readingIndex, setReadingIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<VocabQuizResult | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const answersRef = useRef<Answer[]>([]);
  const submittingRef = useRef(false);

  const exercise = exercises[index];
  const isLast = index === vocab.length - 1;

  const canSubmit =
    exercise.kind === "mcq" ? selected !== null : typed.trim().length > 0;
  const isCorrect =
    exercise.kind === "mcq"
      ? selected === exercise.correctIndex
      : typed.trim().toLowerCase() === exercise.word.toLowerCase();

  // Tự đọc từ SAU khi người dùng bấm kiểm tra (không đọc trước để tránh lộ đáp án).
  useEffect(() => {
    if (phase === "quiz" && checked) speakEnglish(vocab[index].word);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, index, phase]);

  useEffect(() => {
    if (phase === "quiz" && exercise.kind === "fill") {
      inputRef.current?.focus();
    }
  }, [phase, exercise]);

  function choose(choiceIndex: number) {
    if (checked) return;
    setSelected(choiceIndex);
  }

  function next() {
    if (!checked) {
      if (!canSubmit) return;
      const answer =
        exercise.kind === "mcq" ? (exercise.choices[selected ?? -1] ?? "") : typed;
      answersRef.current = [
        ...answersRef.current,
        { vocabId: vocab[index].id, kind: exercise.kind, answer },
      ];
      setChecked(true);
      return;
    }
    if (isLast) {
      setPhase("reading");
      setReadingIndex(0);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setTyped("");
    setChecked(false);
  }

  async function doSubmit() {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const response = await fetch(`/api/lessons/${lessonId}/vocab-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answersRef.current }),
      });
      if (!response.ok) throw new Error("Không thể nộp bài");
      const data = (await response.json()) as VocabQuizResult;
      setResult(data);
      setPhase("result");
      router.refresh();
    } catch {
      showToast({
        variant: "error",
        title: "Chưa nộp được bài",
        description: "Bài làm của bạn vẫn được giữ. Hãy thử lại.",
        action: { label: "Thử lại", onClick: () => void doSubmit() },
      });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  // Phần đọc lại: đọc từng từ, xong thì tự nộp bài.
  useEffect(() => {
    if (phase !== "reading") return;
    if (readingIndex >= vocab.length) {
      void doSubmit();
      return;
    }
    speakEnglish(vocab[readingIndex].word);
    const timer = window.setTimeout(() => setReadingIndex((value) => value + 1), 1600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, readingIndex, vocab.length]);

  // Bàn phím: 1–4 chọn đáp án, Enter kiểm tra / sang câu, Shift nghe lại.
  const keyHandlerRef = useRef<(event: KeyboardEvent) => void>(() => {});
  useEffect(() => {
    keyHandlerRef.current = (event: KeyboardEvent) => {
      if (phase !== "quiz") return;
      const target = event.target as HTMLElement | null;
      const inField =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (event.key === "Shift") {
        if (!event.repeat && !inField) speakEnglish(vocab[index].word);
        return;
      }
      if (/^[1-9]$/.test(event.key)) {
        const choiceIndex = Number(event.key) - 1;
        if (exercise.kind === "mcq" && !checked && !inField && choiceIndex < exercise.choices.length) {
          event.preventDefault();
          choose(choiceIndex);
        }
        return;
      }
      if (event.key === "Enter") {
        if (inField) {
          if (exercise.kind === "fill") {
            event.preventDefault();
            next();
          }
          return;
        }
        event.preventDefault();
        next();
      }
    };
  });

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      keyHandlerRef.current(event);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function restart() {
    setResult(null);
    setIndex(0);
    setSelected(null);
    setTyped("");
    setChecked(false);
    setPhase("quiz");
    setReadingIndex(0);
    answersRef.current = [];
  }

  if (phase === "result" && result) {
    const wrong = result.details.filter((detail) => !detail.correct);
    return (
      <div className="animate-rise">
        <div className="card p-6 text-center md:p-8">
          <div
            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold ${
              result.passed ? "bg-brand-soft text-brand" : "bg-[#fdf3e2] text-gold"
            }`}
          >
            {result.percent}%
          </div>
          <h2 className="display mt-4 text-3xl text-ink">
            {result.passed ? "Hoàn thành bài học!" : "Cố thêm một chút nhé"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Bạn trả lời đúng {result.score}/{result.total} từ.{" "}
            {result.passed
              ? "Điểm đạt từ 70% trở lên — bài học đã được ghi nhận."
              : "Cần đạt ít nhất 70% để hoàn thành bài."}
          </p>
          {result.xpAwarded > 0 ? (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              +{result.xpAwarded} XP
            </div>
          ) : null}

          {wrong.length > 0 ? (
            <div className="mx-auto mt-5 max-w-md text-left">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Từ cần ôn lại
              </div>
              <ul className="mt-2 space-y-1.5">
                {wrong.map((detail) => (
                  <li
                    key={detail.vocabId}
                    className="rounded-lg bg-surface-muted/50 px-3 py-2 text-sm"
                  >
                    <span className="font-semibold text-ink">{detail.word}</span>
                    <span className="text-muted"> — {detail.meaningVi}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand/30 hover:text-brand"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Làm lại
            </button>
            <Link
              href={result.passed ? "/roadmap" : "/review"}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              {result.passed ? "Về lộ trình" : "Ôn câu sai"}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "reading") {
    return (
      <div className="card p-6 md:p-8">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <span className="material-symbols-outlined text-[28px]">volume_up</span>
          </span>
          <h2 className="display mt-3 text-2xl text-ink">Nghe lại các từ</h2>
          <p className="mt-1 text-sm text-muted">
            Hệ thống đang đọc lại từng từ. Bạn có thể bỏ qua để xem kết quả.
          </p>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-2">
          {vocab.map((word, wordIndex) => (
            <li
              key={word.id}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                wordIndex === readingIndex
                  ? "bg-brand-soft text-brand"
                  : wordIndex < readingIndex
                    ? "bg-surface-muted/40 text-muted"
                    : "bg-surface-muted/20 text-ink"
              }`}
            >
              <span className="font-semibold">{word.word}</span>
              <span className="text-muted"> — {word.meaningVi}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => void doSubmit()}
            disabled={submitting}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-60"
          >
            {submitting ? "Đang nộp bài..." : "Xem kết quả"}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between text-[11px] font-semibold text-muted">
          <span>
            Câu {index + 1}/{vocab.length}
          </span>
          <span>
            {exercise.kind === "mcq" ? "Bấm 1–4 để chọn" : "Gõ từ rồi nhấn Enter"} · Shift để
            nghe lại
          </span>
        </div>
        <ProgressBar value={((index + (checked ? 1 : 0)) / vocab.length) * 100} className="mt-2" />
      </div>

      <div className="card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            {exercise.kind === "mcq" ? "Trắc nghiệm" : "Điền vào chỗ trống"}
          </div>
        </div>

        {exercise.kind === "mcq" ? (
          <>
            <h2 className="display mt-4 text-3xl leading-snug text-ink md:text-4xl">
              {exercise.word}
            </h2>
            <div className="mt-5 space-y-2.5">
              {exercise.choices.map((choice, choiceIndex) => {
                const isCorrectChoice = choiceIndex === exercise.correctIndex;
                const isPicked = selected === choiceIndex;
                const tone = checked
                  ? isCorrectChoice
                    ? "border-brand bg-brand-soft/60"
                    : isPicked
                      ? "border-danger/40 bg-[#fde8e6]"
                      : "border-line bg-surface opacity-60"
                  : isPicked
                    ? "border-brand bg-brand-soft/60"
                    : "border-line bg-surface hover:border-brand/30";
                return (
                  <button
                    key={choiceIndex}
                    type="button"
                    onClick={() => choose(choiceIndex)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${tone}`}
                  >
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        checked && isCorrectChoice
                          ? "bg-brand text-white"
                          : checked && isPicked
                            ? "bg-danger text-white"
                            : "bg-surface-muted text-muted"
                      }`}
                    >
                      {choiceIndex + 1}
                    </span>
                    <span className="text-sm text-ink">{choice}</span>
                    {checked && isCorrectChoice ? (
                      <span className="material-symbols-outlined ml-auto text-[18px] text-brand">
                        check_circle
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="display mt-4 text-3xl leading-snug text-ink md:text-4xl">
              {exercise.meaningVi}
            </h2>
            {exercise.blank ? (
              <p className="mt-2 text-sm italic leading-relaxed text-muted">“{exercise.blank}”</p>
            ) : null}
            <input
              ref={inputRef}
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              autoFocus
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Gõ từ tiếng Anh..."
              className="mt-4 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand"
            />
          </>
        )}

        {checked ? (
          <div
            className={`mt-4 flex items-start gap-2.5 rounded-xl p-4 ${
              isCorrect ? "bg-brand-soft text-brand" : "bg-[#fde8e6] text-danger"
            }`}
          >
            <span className="material-symbols-outlined mt-0.5 text-[18px]">
              {isCorrect ? "check_circle" : "cancel"}
            </span>
            <div className="text-sm leading-relaxed">
              {isCorrect ? (
                "Chính xác!"
              ) : (
                <>
                  Chưa đúng. Đáp án: <strong>{exercise.word}</strong> — {exercise.meaningVi}
                </>
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-[11px] text-muted">
            {checked
              ? isLast
                ? "Nhấn Enter để xem phần nghe lại."
                : "Nhấn Enter để sang câu tiếp theo."
              : canSubmit
                ? "Nhấn Enter để kiểm tra đáp án."
                : exercise.kind === "mcq"
                  ? "Bấm 1–4 để chọn đáp án."
                  : "Gõ đáp án rồi nhấn Enter."}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={!canSubmit}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
          >
            {checked ? (isLast ? "Nghe lại" : "Câu tiếp theo") : "Kiểm tra"}
            <span className="material-symbols-outlined text-[18px]">
              {checked ? (isLast ? "volume_up" : "arrow_forward") : "check"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
