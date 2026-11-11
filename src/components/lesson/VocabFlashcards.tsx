"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProgressBar } from "@/components/ui/Progress";
import { useToast } from "@/components/ui/Toast";
import { speakEnglish } from "@/lib/speech";
import { buildExercises, type ExerciseWord } from "@/lib/flashcard-exercises";

export function VocabFlashcards({
  vocab,
  lessonId,
  canSave = false,
}: {
  vocab: ExerciseWord[];
  lessonId: string;
  canSave?: boolean;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stage, setStage] = useState<"card" | "quiz">("card");
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const completedRef = useRef(false);

  const exercises = useMemo(() => buildExercises(vocab), [vocab]);
  const entry = vocab[index];
  const exercise = exercises[index];
  const isLast = index === vocab.length - 1;

  const canSubmit =
    exercise.kind === "mcq" ? selected !== null : typed.trim().length > 0;
  const isCorrect =
    exercise.kind === "mcq"
      ? selected === exercise.correctIndex
      : typed.trim().toLowerCase() === exercise.word.toLowerCase();

  // Tự động đọc từ mới khi mở thẻ.
  useEffect(() => {
    if (!finished) speakEnglish(vocab[index].word);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Học xong toàn bộ thẻ + bài tập => tự ghi nhận hoàn thành (nếu đã đăng nhập).
  useEffect(() => {
    if (!finished || !canSave || completedRef.current) return;
    completedRef.current = true;
    let cancelled = false;
    async function complete() {
      setCompleting(true);
      try {
        const response = await fetch(`/api/lessons/${lessonId}/complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Không thể ghi nhận");
        const data = (await response.json()) as { xpAwarded: number };
        if (!cancelled) {
          setXpAwarded(data.xpAwarded);
          router.refresh();
        }
      } catch {
        if (!cancelled) {
          showToast({
            variant: "error",
            title: "Chưa ghi nhận được tiến độ",
            description: "Bài học vẫn được hoàn thành trên máy bạn. Hãy kiểm tra kết nối.",
          });
        }
      } finally {
        if (!cancelled) setCompleting(false);
      }
    }
    void complete();
    return () => {
      cancelled = true;
    };
  }, [finished, canSave, lessonId, showToast, router]);

  // Tự động focus ô điền khi sang bài điền vào chỗ trống.
  useEffect(() => {
    if (stage === "quiz" && exercise.kind === "fill") {
      inputRef.current?.focus();
    }
  }, [stage, exercise]);

  function goToExercise() {
    setFlipped(false);
    setStage("quiz");
  }

  function choose(choiceIndex: number) {
    if (checked) return;
    setSelected(choiceIndex);
  }

  function next() {
    if (stage === "card") {
      goToExercise();
      return;
    }
    if (!checked) {
      if (!canSubmit) return;
      setChecked(true);
      return;
    }
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setFlipped(false);
    setStage("card");
    setSelected(null);
    setTyped("");
    setChecked(false);
  }

  // Bàn phím: Space lật thẻ, Enter sang bước kế tiếp / từ tiếp theo.
  const keyHandlerRef = useRef<(event: KeyboardEvent) => void>(() => {});

  useEffect(() => {
    keyHandlerRef.current = (event: KeyboardEvent) => {
      if (finished) return;
      const target = event.target as HTMLElement | null;
      const inField =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      const onControl =
        target instanceof HTMLElement &&
        (target.tagName === "BUTTON" || target.tagName === "A");

      if (event.key === "Shift") {
        // Nhấn Shift (không kèm phím khác) để nghe lại từ.
        if (!event.repeat && !inField) {
          speakEnglish(vocab[index].word);
        }
        return;
      }

      // Phím số 1–4 để chọn nhanh đáp án trắc nghiệm.
      if (/^[1-9]$/.test(event.key)) {
        const choiceIndex = Number(event.key) - 1;
        if (
          stage === "quiz" &&
          exercise.kind === "mcq" &&
          !checked &&
          !inField &&
          choiceIndex < exercise.choices.length
        ) {
          event.preventDefault();
          choose(choiceIndex);
        }
        return;
      }

      if (event.code === "Space") {
        if (stage === "card" && !inField && !onControl) {
          event.preventDefault();
          setFlipped((value) => !value);
        }
        return;
      }

      if (event.key === "Enter") {
        if (inField) {
          // Trong ô điền từ, Enter nộp đáp án rồi chuyển sang từ tiếp theo.
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

  if (finished) {
    return (
      <div className="card p-8 text-center md:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <span className="material-symbols-outlined text-[32px]">celebration</span>
        </span>
        <h2 className="display mt-5 text-3xl text-ink">
          Đã học xong {vocab.length} từ!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          {completing
            ? "Đang ghi nhận tiến độ..."
            : xpAwarded > 0
              ? `Bạn đã nhận +${xpAwarded} XP. Các từ đã vào lịch ôn tập.`
              : "Các từ vừa học sẽ xuất hiện trong mục Ôn tập để bạn ghi nhớ lâu hơn."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setFlipped(false);
              setStage("card");
              setSelected(null);
              setTyped("");
              setChecked(false);
              setFinished(false);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-semibold text-ink hover:border-brand/30 hover:text-brand"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Học lại
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
          >
            Quay lại
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
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
            Từ {index + 1}/{vocab.length}
          </span>
          <span>
            {stage === "card"
              ? flipped
                ? "Bấm \"Làm bài tập\" để tiếp tục · Shift để nghe lại"
                : "Bấm thẻ để lật · Shift để nghe lại"
              : "Bấm nút để tiếp tục · Shift để nghe lại"}
          </span>
        </div>
        <ProgressBar
          value={((index + (stage === "quiz" ? 1 : 0)) / vocab.length) * 100}
          className="mt-2"
        />
      </div>

      {stage === "card" ? (
        <div className="flashcard-scene">
          <div
            className="flashcard-inner"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            onClick={() => setFlipped((value) => !value)}
            role="button"
            tabIndex={0}
            aria-label="Lật thẻ từ vựng"
          >
            <div className="flashcard-face card flex min-h-[340px] flex-col items-center justify-center gap-4 p-8 text-center md:min-h-[380px] md:p-10">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                Từ vựng
              </div>
              <div className="display text-4xl leading-tight text-ink md:text-5xl">
                {entry.word}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {entry.wordForm ? (
                  <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    {entry.wordForm}
                  </span>
                ) : null}
                {entry.ipa ? <span className="text-sm text-muted">{entry.ipa}</span> : null}
              </div>
              <button
                type="button"
                aria-label={`Nghe ${entry.word}`}
                onClick={(event) => {
                  event.stopPropagation();
                  speakEnglish(entry.word);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand transition-colors hover:bg-brand hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setFlipped((value) => !value);
                }}
                className="btn-primary mt-1 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Xem nghĩa
                <span className="material-symbols-outlined text-[18px]">sync_alt</span>
              </button>
              <p className="text-xs text-muted">
                Bấm thẻ hoặc nút để xem nghĩa.
              </p>
            </div>

            <div className="flashcard-face flashcard-face--back card flex min-h-[340px] flex-col items-center justify-center gap-4 p-8 text-center md:min-h-[380px] md:p-10">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[15px]">translate</span>
                Nghĩa
              </div>
              <div className="display text-3xl leading-tight text-brand md:text-4xl">
                {entry.meaningVi}
              </div>
              {entry.meaningEn ? (
                <p className="text-sm text-muted">{entry.meaningEn}</p>
              ) : null}
              {entry.example ? (
                <p className="max-w-lg text-sm italic leading-relaxed text-muted">
                  “{entry.example}”
                </p>
              ) : null}
              <p className="text-xs text-muted">Bấm nút bên dưới để làm bài tập.</p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToExercise();
                }}
                className="btn-primary mt-1 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Làm bài tập
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              {exercise.kind === "mcq" ? "Trắc nghiệm" : "Điền vào chỗ trống"}
            </div>
            <span className="text-[11px] text-muted">
              {exercise.kind === "mcq" ? "Chọn nghĩa đúng" : "Gõ từ tiếng Anh"}
            </span>
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
                <p className="mt-2 text-sm italic leading-relaxed text-muted">
                  “{exercise.blank}”
                </p>
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
                    {exercise.kind === "fill" && exercise.example ? (
                      <span className="mt-1 block text-xs italic">“{exercise.example}”</span>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted">
              {checked
                ? isLast
                  ? "Đã xong từ cuối cùng."
                  : "Bấm nút để sang từ tiếp theo."
                : canSubmit
                  ? "Bấm nút để kiểm tra đáp án."
                  : exercise.kind === "mcq"
                    ? "Bấm 1–4 để chọn đáp án."
                    : "Gõ đáp án rồi bấm Kiểm tra."}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={!checked && !canSubmit}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              {checked ? (isLast ? "Hoàn thành" : "Từ tiếp theo") : "Kiểm tra"}
              <span className="material-symbols-outlined text-[18px]">
                {checked ? (isLast ? "check" : "arrow_forward") : "check"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
