"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LearnerLesson } from "@/lib/learning";
import { ProgressBar } from "@/components/ui/Progress";
import { useToast } from "@/components/ui/Toast";

type Tab = "learn" | "quiz";

interface QuestionFeedback {
  correct: boolean;
  selectedChoiceId: string;
  correctChoiceId: string;
  correctLabel: string;
  explanation: string | null;
}

interface QuizResult {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  xpAwarded: number;
  details: {
    questionId: string;
    prompt: string;
    selectedChoiceId: string | null;
    selectedLabel: string | null;
    correctChoiceId: string;
    correctLabel: string;
    correct: boolean;
    explanation: string | null;
  }[];
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

function LessonBody({ body }: { body: string }) {
  const lines = body.split("\n");
  return (
    <div className="lesson-body">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-2" />;
        if (trimmed.startsWith("- ")) {
          return (
            <p key={index} className="lesson-bullet text-sm leading-relaxed">
              <Inline text={trimmed.slice(2)} />
            </p>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <p key={index} className="lesson-bullet text-sm leading-relaxed">
              <Inline text={trimmed} />
            </p>
          );
        }
        return (
          <p key={index} className="text-sm leading-relaxed text-muted">
            <Inline text={trimmed} />
          </p>
        );
      })}
    </div>
  );
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function LessonExperience({
  lesson,
  canSave = false,
}: {
  lesson: LearnerLesson;
  canSave?: boolean;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>("learn");
  const [theoryDone, setTheoryDone] = useState(lesson.progress.theoryDone);
  const [marking, setMarking] = useState(false);

  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, QuestionFeedback>>({});
  const [checking, setChecking] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const lessonEndRef = useRef<HTMLDivElement | null>(null);
  const markingRef = useRef(false);

  const totalQuestions = lesson.questions.length;
  const answeredCount = Object.keys(answers).length;
  const question = lesson.questions[current];
  const selected = question ? answers[question.id] : undefined;
  const questionFeedback = question ? feedback[question.id] : undefined;
  const checkingAnswer = question ? Boolean(checking[question.id]) : false;

  const scorePercent = useMemo(
    () => (lesson.progress.quizTotal ? (lesson.progress.bestScore / lesson.progress.quizTotal) * 100 : 0),
    [lesson.progress],
  );

  const markTheoryDone = useCallback(async () => {
    if (!canSave || theoryDone || markingRef.current) return;
    markingRef.current = true;
    setMarking(true);
    try {
      const response = await fetch(`/api/lessons/${lesson.id}/theory`, { method: "POST" });
      if (!response.ok) throw new Error("Cannot save theory progress");
      setTheoryDone(true);
      router.refresh();
    } catch {
      showToast({
        variant: "error",
        title: "Chưa lưu được tiến độ",
        description: "Kết nối có thể bị gián đoạn. Bạn vẫn có thể bấm nút đánh dấu để thử lại.",
        action: { label: "Thử lại", onClick: () => void markTheoryDone() },
      });
    } finally {
      markingRef.current = false;
      setMarking(false);
    }
  }, [canSave, lesson.id, router, showToast, theoryDone]);

  // Tự ghi nhận lý thuyết khi người học đọc đến cuối bài (sentinel cuối trang).
  useEffect(() => {
    if (!canSave || theoryDone || tab !== "learn") return;
    const node = lessonEndRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void markTheoryDone();
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [canSave, markTheoryDone, tab, theoryDone]);

  // Fallback: nếu người học đọc lâu mà chưa cuộn hết, tự ghi nhận sau 30 giây.
  useEffect(() => {
    if (!canSave || theoryDone || tab !== "learn") return;
    const timer = window.setTimeout(() => {
      void markTheoryDone();
    }, 30_000);
    return () => window.clearTimeout(timer);
  }, [canSave, markTheoryDone, tab, theoryDone]);

  async function choose(choiceId: string) {
    if (!question || answers[question.id] || checking[question.id]) return;

    const questionId = question.id;
    setAnswers((previous) => ({ ...previous, [questionId]: choiceId }));
    setChecking((previous) => ({ ...previous, [questionId]: true }));

    try {
      const response = await fetch(`/api/lessons/${lesson.id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, choiceId }),
      });
      if (!response.ok) throw new Error("Cannot check answer");
      const data = (await response.json()) as QuestionFeedback;
      setFeedback((previous) => ({ ...previous, [questionId]: data }));
    } catch {
      // Cho phép chọn lại nếu không kiểm tra được đáp án.
      setAnswers((previous) => {
        const next = { ...previous };
        delete next[questionId];
        return next;
      });
      showToast({
        variant: "error",
        title: "Không kiểm tra được đáp án",
        description: "Kiểm tra kết nối mạng rồi chọn lại đáp án.",
        action: { label: "Thử lại", onClick: () => void choose(choiceId) },
      });
    } finally {
      setChecking((previous) => {
        const next = { ...previous };
        delete next[questionId];
        return next;
      });
    }
  }

  function goToQuiz() {
    void markTheoryDone();
    setTab("quiz");
    setTimeout(() => {
      document.getElementById("lesson-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function submit() {
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(`/api/lessons/${lesson.id}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) throw new Error("Không thể nộp bài");
      const data = (await response.json()) as QuizResult;
      setResult(data);
      setTheoryDone(true);
      router.refresh();
    } catch {
      // Keep the quiz state so the learner can try submitting again.
      showToast({
        variant: "error",
        title: "Chưa nộp được bài",
        description: "Bài làm của bạn vẫn được giữ. Hãy thử lại.",
        action: { label: "Thử lại", onClick: () => void submit() },
      });
    } finally {
      setSubmitting(false);
    }
  }

  function restart() {
    setResult(null);
    setAnswers({});
    setFeedback({});
    setChecking({});
    setCurrent(0);
    setQuizStarted(false);
  }

  return (
    <div>
      {/* Breadcrumb + title */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
            <Link href="/roadmap" className="hover:text-brand">
              Lộ trình
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link
              href={lesson.track === "grammar" ? "/grammar" : "/vocabulary"}
              className="hover:text-brand"
            >
              {lesson.track === "grammar" ? "Ngữ pháp" : "Từ vựng"}
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-ink">
              {lesson.level.code} · {lesson.title}
            </span>
          </nav>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand">
                  {lesson.level.code} · {lesson.level.name}
                </span>
                <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-muted">
                  {lesson.track === "grammar" ? "Ngữ pháp" : "Từ vựng"}
                </span>
                {lesson.topic ? (
                  <span className="text-[11px] text-muted">{lesson.topic.name}</span>
                ) : null}
                {lesson.progress.completed ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    Hoàn thành
                  </span>
                ) : null}
              </div>
              <h1 className="display text-3xl leading-tight text-ink md:text-[42px]">
                {lesson.title}
              </h1>
              {lesson.summary ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{lesson.summary}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
                <span className="material-symbols-outlined text-[15px] text-brand">quiz</span>
                {totalQuestions} câu hỏi
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
                <span className="material-symbols-outlined text-[15px] text-brand">schedule</span>
                {lesson.estimatedMinutes} phút
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
                <span className="material-symbols-outlined text-[15px] text-brand">bolt</span>
                +{lesson.xp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: mobile là segmented control không sticky; desktop mới sticky. */}
      <div
        id="lesson-tabs"
        className="scroll-mt-32 border-b border-line bg-background/95 backdrop-blur lg:sticky lg:top-16 lg:z-40 lg:scroll-mt-20"
      >
        <div className="mx-auto w-full max-w-[1120px] px-5 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-1 rounded-full border border-line bg-surface-muted p-1">
            <button
              type="button"
              onClick={() => setTab("learn")}
              className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                tab === "learn" ? "bg-surface text-ink shadow-sm" : "text-muted"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              Học kiến thức
              {theoryDone ? (
                <span className="material-symbols-outlined text-[14px] text-brand">check_circle</span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setTab("quiz")}
              className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                tab === "quiz" ? "bg-surface text-ink shadow-sm" : "text-muted"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">quiz</span>
              Kiểm tra
              {lesson.progress.bestScore > 0 ? (
                <span className="rounded-full bg-brand-soft px-1.5 py-0.5 text-[9px] font-bold text-brand">
                  {lesson.progress.bestScore}/{lesson.progress.quizTotal}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <div className="mx-auto hidden w-full max-w-[1120px] gap-6 px-5 md:px-8 lg:flex">
          <button
            type="button"
            onClick={() => setTab("learn")}
            className={`flex items-center gap-2 border-b-2 py-3.5 text-sm font-semibold transition-colors ${
              tab === "learn"
                ? "border-brand text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            Học kiến thức
            {theoryDone ? (
              <span className="material-symbols-outlined text-[16px] text-brand">check_circle</span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setTab("quiz")}
            className={`flex items-center gap-2 border-b-2 py-3.5 text-sm font-semibold transition-colors ${
              tab === "quiz"
                ? "border-brand text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            Kiểm tra
            {lesson.progress.bestScore > 0 ? (
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand">
                {lesson.progress.bestScore}/{lesson.progress.quizTotal}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8">
        {tab === "learn" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              {lesson.sections.map((section, index) => (
                <section key={section.id} className="card p-6 md:p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-xs font-bold text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display text-xl text-ink md:text-2xl">{section.title}</h2>
                  </div>
                  <LessonBody body={section.body} />
                  {section.remember ? (
                    <div className="mt-5 flex gap-3 rounded-xl border border-brand/15 bg-brand-soft/50 p-4">
                      <span className="material-symbols-outlined text-[20px] text-brand">
                        lightbulb
                      </span>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                          Ghi nhớ nhanh
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-ink">{section.remember}</p>
                      </div>
                    </div>
                  ) : null}
                </section>
              ))}

              {lesson.vocab.length > 0 ? (
                <section className="card p-6 md:p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="display text-xl text-ink md:text-2xl">Danh sách từ</h2>
                    <span className="text-[11px] text-muted">{lesson.vocab.length} từ</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {lesson.vocab.map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-xl border border-line bg-surface-muted/30 p-4"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="text-base font-bold text-ink">{entry.word}</span>
                              {entry.wordForm ? (
                                <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                                  {entry.wordForm}
                                </span>
                              ) : null}
                            </div>
                            {entry.ipa ? (
                              <div className="text-xs text-muted">{entry.ipa}</div>
                            ) : null}
                          </div>
                          <button
                            type="button"
                            aria-label={`Nghe ${entry.word}`}
                            onClick={() => speak(entry.word)}
                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-brand-soft hover:text-brand"
                          >
                            <span className="material-symbols-outlined text-[16px]">volume_up</span>
                          </button>
                        </div>
                        <div className="mt-2 text-sm font-semibold text-brand">{entry.meaningVi}</div>
                        {entry.meaningEn ? (
                          <div className="mt-1 text-[11px] text-muted">{entry.meaningEn}</div>
                        ) : null}
                        {entry.example ? (
                          <div className="mt-2 text-xs italic leading-relaxed text-muted">
                            “{entry.example}”
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <div
                ref={lessonEndRef}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="text-sm font-semibold text-ink">
                    {theoryDone
                      ? "Đã ghi nhận bạn học xong phần lý thuyết."
                      : marking
                        ? "Đang ghi nhận tiến độ..."
                        : "Đã nắm nội dung?"}
                  </div>
                  <div className="text-xs text-muted">
                    {!canSave
                      ? "Đăng nhập để hệ thống lưu tiến độ học của bạn."
                      : theoryDone
                        ? "Bạn có thể làm bài kiểm tra để hoàn thành bài học."
                        : "Hệ thống tự ghi nhận khi bạn đọc đến cuối bài hoặc sau 30 giây. Bạn vẫn có thể bấm nút để đánh dấu ngay."}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={markTheoryDone}
                    disabled={theoryDone || marking || !canSave}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      theoryDone
                        ? "bg-brand-soft text-brand"
                        : "border border-line bg-surface text-ink hover:border-brand/30 hover:text-brand"
                    } disabled:opacity-80`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {theoryDone ? "check_circle" : "task_alt"}
                    </span>
                    {marking ? "Đang lưu..." : theoryDone ? "Đã học xong" : "Đánh dấu đã học"}
                  </button>
                  <button
                    type="button"
                    onClick={goToQuiz}
                    className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    Làm bài kiểm tra
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
              <div className="card p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Tiến độ bài học
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted">Lý thuyết</span>
                  <span className={theoryDone ? "font-semibold text-brand" : "text-muted"}>
                    {theoryDone ? "Đã học" : "Chưa học"}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted">Điểm cao nhất</span>
                  <span className="font-semibold text-ink">
                    {lesson.progress.bestScore}/{lesson.progress.quizTotal}
                  </span>
                </div>
                <ProgressBar value={scorePercent} className="mt-3" />
                <div className="mt-2 text-right text-[11px] text-muted">
                  {Math.round(scorePercent)}%
                </div>
              </div>

              <div className="rounded-2xl border border-brand/15 bg-brand-soft/50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  Cách học hiệu quả
                </div>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted">
                  <li>• Đọc ví dụ và tự đặt một câu mới.</li>
                  <li>• Làm bài kiểm tra ngay sau khi học.</li>
                  <li>• Câu sai sẽ xuất hiện trong mục Ôn tập.</li>
                </ul>
              </div>

              <Link
                href="/roadmap"
                className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-muted transition-colors hover:text-brand"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Về lộ trình
              </Link>
            </aside>
          </div>
        ) : totalQuestions === 0 ? (
          <div className="card mx-auto max-w-3xl p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <span className="material-symbols-outlined text-[28px]">edit_note</span>
            </span>
            <h2 className="display mt-4 text-2xl text-ink">Bài học chưa có câu hỏi</h2>
            <p className="mt-2 text-sm text-muted">
              Nội dung kiểm tra đang được cập nhật. Hãy quay lại sau hoặc tiếp tục bài khác.
            </p>
            <Link
              href="/roadmap"
              className="btn-primary mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Về lộ trình
            </Link>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {result ? (
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
                    Bạn trả lời đúng {result.score}/{result.total} câu.{" "}
                    {result.passed
                      ? `Điểm đạt từ 70% trở lên — bài học đã được ghi nhận.`
                      : "Cần đạt ít nhất 70% để hoàn thành bài. Hãy xem lại phần giải thích bên dưới."}
                  </p>
                  {result.xpAwarded > 0 ? (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                      +{result.xpAwarded} XP
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

                <div className="mt-6 space-y-3">
                  {result.details.map((detail, index) => (
                    <div key={detail.questionId} className="card p-5">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                            detail.correct
                              ? "bg-brand-soft text-brand"
                              : "bg-[#fde8e6] text-danger"
                          }`}
                        >
                          {detail.correct ? "✓" : "✕"}
                        </span>
                        <div className="flex-1">
                          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                            Câu {index + 1}
                          </div>
                          <div className="mt-0.5 text-sm font-semibold text-ink">
                            {detail.prompt}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs">
                            <span
                              className={`rounded-md px-2 py-1 ${
                                detail.correct
                                  ? "bg-brand-soft text-brand"
                                  : "bg-[#fde8e6] text-danger"
                              }`}
                            >
                              Bạn chọn: {detail.selectedLabel ?? "Chưa chọn"}
                            </span>
                            {!detail.correct ? (
                              <span className="rounded-md bg-brand-soft px-2 py-1 text-brand">
                                Đáp án: {detail.correctLabel}
                              </span>
                            ) : null}
                          </div>
                          {detail.explanation ? (
                            <p className="mt-3 text-xs leading-relaxed text-muted">
                              {detail.explanation}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : !quizStarted ? (
              <div className="card p-7 text-center md:p-10">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <span className="material-symbols-outlined text-[28px]">quiz</span>
                </span>
                <h2 className="display mt-4 text-3xl text-ink">Kiểm tra kiến thức</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                  {totalQuestions} câu hỏi trắc nghiệm. Bạn cần đạt từ 70% để hoàn thành bài.
                  Câu sai sẽ được lưu vào mục Ôn tập.
                </p>
                <div className="mx-auto mt-5 grid max-w-md grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-surface-muted px-3 py-3">
                    <div className="text-lg font-bold text-ink">{totalQuestions}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted">Câu hỏi</div>
                  </div>
                  <div className="rounded-xl bg-surface-muted px-3 py-3">
                    <div className="text-lg font-bold text-ink">70%</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted">Để đạt</div>
                  </div>
                  <div className="rounded-xl bg-surface-muted px-3 py-3">
                    <div className="text-lg font-bold text-ink">+{lesson.xp}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted">XP</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setQuizStarted(true)}
                  className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
                >
                  Bắt đầu làm bài
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            ) : (
              <div className="card p-6 md:p-8">
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted">
                    <span>
                      Câu {current + 1}/{totalQuestions}
                    </span>
                    <span>{answeredCount} đã chọn</span>
                  </div>
                  <ProgressBar value={(answeredCount / totalQuestions) * 100} />
                </div>

                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  Chọn đáp án đúng
                </div>
                <h2 className="display mt-2 text-2xl leading-snug text-ink md:text-[28px]">
                  {question.prompt}
                </h2>

                <div className="mt-6 space-y-2.5">
                  {question.choices.map((choice, index) => {
                    const active = selected === choice.id;
                    const showCorrect = questionFeedback?.correctChoiceId === choice.id;
                    const showWrong = questionFeedback ? active && !questionFeedback.correct : false;
                    const locked = Boolean(questionFeedback) || checkingAnswer;

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        disabled={locked}
                        onClick={() => choose(choice.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all disabled:cursor-default ${
                          showCorrect
                            ? "border-brand bg-brand-soft"
                            : showWrong
                              ? "border-danger/40 bg-[#fde8e6]"
                              : active
                                ? "border-brand bg-brand-soft/60"
                                : "border-line bg-surface hover:border-brand/30 hover:bg-surface-muted/40"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                            showCorrect
                              ? "bg-brand text-white"
                              : showWrong
                                ? "bg-danger text-white"
                                : active
                                  ? "bg-brand text-white"
                                  : "bg-surface-muted text-muted"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-sm text-ink">{choice.label}</span>
                        {showCorrect ? (
                          <span className="material-symbols-outlined ml-auto text-[18px] text-brand">
                            check_circle
                          </span>
                        ) : showWrong ? (
                          <span className="material-symbols-outlined ml-auto text-[18px] text-danger">
                            cancel
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {questionFeedback ? (
                  <div
                    className={`mt-5 rounded-xl border p-4 ${
                      questionFeedback.correct
                        ? "border-brand/20 bg-brand-soft/50"
                        : "border-danger/20 bg-[#fdf2f1]"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 text-sm font-semibold ${
                        questionFeedback.correct ? "text-brand" : "text-danger"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {questionFeedback.correct ? "check_circle" : "cancel"}
                      </span>
                      {questionFeedback.correct ? "Chính xác!" : "Chưa đúng"}
                    </div>
                    {!questionFeedback.correct ? (
                      <p className="mt-1 text-xs text-ink">
                        Đáp án đúng:{" "}
                        <span className="font-semibold">{questionFeedback.correctLabel}</span>
                      </p>
                    ) : null}
                    {questionFeedback.explanation ? (
                      <p className="mt-2 text-xs leading-relaxed text-muted">
                        {questionFeedback.explanation}
                      </p>
                    ) : null}
                  </div>
                ) : checkingAnswer ? (
                  <p className="mt-4 text-xs text-muted">Đang kiểm tra đáp án...</p>
                ) : null}

                <div className="mt-7 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={current === 0}
                    onClick={() => setCurrent((value) => Math.max(0, value - 1))}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-ink disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Trước
                  </button>

                  {current < totalQuestions - 1 ? (
                    <button
                      type="button"
                      disabled={!selected}
                      onClick={() => setCurrent((value) => value + 1)}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Câu tiếp theo
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={answeredCount < totalQuestions || submitting}
                      onClick={submit}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {submitting ? "Đang chấm..." : "Nộp bài"}
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                  )}
                </div>

                {answeredCount < totalQuestions && current === totalQuestions - 1 ? (
                  <p className="mt-3 text-right text-[11px] text-muted">
                    Còn {totalQuestions - answeredCount} câu chưa chọn đáp án.
                  </p>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
