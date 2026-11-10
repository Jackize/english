"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { LearnerLesson } from "@/lib/learning";
import { buildWrittenPrompts, type WrittenDirection } from "@/lib/vocabulary-quiz";
import { ProgressBar } from "@/components/ui/Progress";
import { VocabFlashcards } from "@/components/lesson/VocabFlashcards";
import { useToast } from "@/components/ui/Toast";

type Tab = "learn" | "quiz";
type ExamStage = "choice" | "written";

interface WrittenDetail {
  vocabId: string;
  direction: WrittenDirection;
  prompt: string;
  answer: string;
  expectedAnswer: string;
  correct: boolean;
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
  writtenDetails?: WrittenDetail[];
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

  const [quizStarted, setQuizStarted] = useState(false);
  const [examStage, setExamStage] = useState<ExamStage>("choice");
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  // Tự luận đi tuần tự: hoàn thành Việt → Anh trước mới sang Anh → Việt.
  const [writtenStep, setWrittenStep] = useState<WrittenDirection>("vi-en");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const totalQuestions = lesson.questions.length;
  const answeredCount = Object.keys(answers).length;
  const isVocabulary = lesson.track === "vocabulary" && lesson.vocab.length > 0;
  const writtenPrompts = useMemo(
    () => (isVocabulary ? buildWrittenPrompts(lesson.vocab) : []),
    [isVocabulary, lesson.vocab],
  );
  const writtenCount = writtenPrompts.length;
  const writtenAnsweredCount = writtenPrompts.filter((prompt) =>
    writtenAnswers[`${prompt.vocabId}:${prompt.direction}`]?.trim(),
  ).length;
  const writtenStepPrompts = writtenPrompts.filter(
    (prompt) => prompt.direction === writtenStep,
  );
  const writtenStepAnswered = writtenStepPrompts.filter((prompt) =>
    writtenAnswers[`${prompt.vocabId}:${prompt.direction}`]?.trim(),
  ).length;
  const writtenStepComplete =
    writtenStepPrompts.length > 0 && writtenStepAnswered === writtenStepPrompts.length;
  const examHasWriting = isVocabulary && writtenCount > 0;
  const examTotal = totalQuestions + (examHasWriting ? writtenCount : 0);
  const question = lesson.questions[current];
  const selected = question ? answers[question.id] : undefined;

  const scorePercent = useMemo(
    () => (lesson.progress.quizTotal ? (lesson.progress.bestScore / lesson.progress.quizTotal) * 100 : 0),
    [lesson.progress],
  );

  function choose(choiceId: string) {
    if (!question) return;
    // Chế độ thi thật: chỉ ghi nhận lựa chọn, không chấm từng câu.
    setAnswers((previous) => ({ ...previous, [question.id]: choiceId }));
  }

  function goToQuiz() {
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
        body: JSON.stringify({
          answers,
          writtenAnswers: examHasWriting ? writtenAnswers : undefined,
        }),
      });
      if (!response.ok) throw new Error("Không thể nộp bài");
      const data = (await response.json()) as QuizResult;
      setResult(data);
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
    setCurrent(0);
    setQuizStarted(false);
    setExamStage("choice");
    setWrittenAnswers({});
    setWrittenStep("vi-en");
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
              Học
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
            Học
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
            {isVocabulary ? (
              <VocabFlashcards vocab={lesson.vocab} onGoToQuiz={goToQuiz} />
            ) : (
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

                <div className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="text-sm font-semibold text-ink">Sẵn sàng kiểm tra?</div>
                    <div className="text-xs text-muted">
                      {!canSave
                        ? "Đăng nhập để hệ thống lưu tiến độ học của bạn."
                        : "Làm bài kiểm tra đạt từ 70% để hoàn thành bài học."}
                    </div>
                  </div>
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
            )}

            <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
              <div className="card p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Tiến độ bài học
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
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
                  <li>
                    {lesson.track === "vocabulary"
                      ? "• Tự nhớ nghĩa trước khi lật thẻ."
                      : "• Đọc ví dụ và tự đặt một câu mới."}
                  </li>
                  <li>• Làm bài kiểm tra ngay sau khi học.</li>
                  <li>
                    {lesson.track === "vocabulary"
                      ? "Từ vựng tự vào lịch ôn tập; từ sai sẽ được ôn lại sớm hơn."
                      : "Câu sai sẽ xuất hiện trong mục Ôn tập."}
                  </li>
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
                            Trắc nghiệm · Câu {index + 1}
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

                {result.writtenDetails && result.writtenDetails.length > 0 ? (
                  <div className="mt-8">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                      </span>
                      <h3 className="display text-xl text-ink">Phần tự luận</h3>
                    </div>
                    <div className="space-y-3">
                      {result.writtenDetails.map((detail, index) => (
                        <div key={`${detail.vocabId}-${detail.direction}`} className="card p-5">
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
                                {detail.direction === "vi-en" ? "Việt → Anh" : "Anh → Việt"} · Câu{" "}
                                {index + 1}
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
                                  Bạn viết: {detail.answer.trim() || "Chưa trả lời"}
                                </span>
                                {!detail.correct ? (
                                  <span className="rounded-md bg-brand-soft px-2 py-1 text-brand">
                                    Đáp án: {detail.expectedAnswer}
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
                ) : null}
              </div>
            ) : !quizStarted ? (
              <div className="card p-7 text-center md:p-10">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <span className="material-symbols-outlined text-[28px]">quiz</span>
                </span>
                <h2 className="display mt-4 text-3xl text-ink">Bài kiểm tra</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                  {examHasWriting
                    ? `Bài thi gồm 2 phần: ${totalQuestions} câu trắc nghiệm và ${writtenCount} câu tự luận (Việt → Anh và Anh → Việt). Bạn cần đạt từ 70% để hoàn thành bài.`
                    : `${totalQuestions} câu hỏi trắc nghiệm. Bạn cần đạt từ 70% để hoàn thành bài. Câu sai sẽ được lưu vào mục Ôn tập.`}
                </p>

                {examHasWriting ? (
                  <div className="mx-auto mt-5 max-w-lg rounded-xl border border-brand/15 bg-brand-soft/40 p-4 text-left">
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                      Bài thi gồm 2 phần
                    </div>
                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-3 rounded-lg bg-surface/80 px-3 py-2">
                        <span className="font-semibold text-ink">Phần 1 · Trắc nghiệm</span>
                        <span className="text-muted">{totalQuestions} câu</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-lg bg-surface/80 px-3 py-2">
                        <span className="font-semibold text-ink">Phần 2 · Tự luận</span>
                        <span className="text-muted">
                          {writtenCount} câu · Việt→Anh {lesson.vocab.length} · Anh→Việt{" "}
                          {lesson.vocab.length}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted">
                      Phần tự luận đi lần lượt: hoàn thành Việt → Anh mới sang Anh → Việt.
                    </p>
                  </div>
                ) : null}

                <div className="mx-auto mt-5 grid max-w-md grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-surface-muted px-3 py-3">
                    <div className="text-lg font-bold text-ink">
                      {examHasWriting ? examTotal : totalQuestions}
                    </div>
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
                  Bắt đầu phần thi
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            ) : examHasWriting && examStage === "written" ? (
              <div className="card p-6 md:p-8">
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted">
                    <span>
                      Phần 2 · Tự luận · Bước {writtenStep === "vi-en" ? 1 : 2}/2
                    </span>
                    <span>
                      {writtenStepAnswered}/{writtenStepPrompts.length} câu đã viết
                    </span>
                  </div>
                  <ProgressBar
                    value={
                      writtenStepPrompts.length
                        ? (writtenStepAnswered / writtenStepPrompts.length) * 100
                        : 0
                    }
                  />
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    <span className={writtenStep === "vi-en" ? "text-brand" : ""}>
                      Việt → Anh
                    </span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    <span className={writtenStep === "en-vi" ? "text-brand" : ""}>
                      Anh → Việt
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  Gõ lại từ vựng đã học
                </div>
                <h2 className="display mt-2 text-2xl leading-snug text-ink md:text-[28px]">
                  {writtenStep === "vi-en"
                    ? "Nhìn nghĩa tiếng Việt, gõ từ tiếng Anh"
                    : "Nhìn từ tiếng Anh, gõ nghĩa tiếng Việt"}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Không phân biệt chữ hoa/thường và dấu câu. Với tiếng Việt, bạn có thể gõ không
                  dấu.{" "}
                  {writtenStep === "vi-en"
                    ? `Hoàn thành đủ ${writtenStepPrompts.length} câu ở bước này mới sang bước tiếp theo.`
                    : `Hoàn thành đủ ${writtenStepPrompts.length} câu ở bước này để nộp bài.`}
                </p>

                <div className="mt-5 space-y-3">
                  {writtenStepPrompts.map((prompt, promptIndex) => {
                    const key = `${prompt.vocabId}:${prompt.direction}`;
                    return (
                      <label
                        key={key}
                        className="block rounded-xl border border-line bg-surface-muted/20 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                            Câu {promptIndex + 1}
                          </span>
                          <span className="text-[10px] font-semibold text-muted">
                            {prompt.direction === "vi-en" ? "Việt → Anh" : "Anh → Việt"}
                          </span>
                        </div>
                        <div className="mt-1 text-sm font-semibold text-ink">{prompt.prompt}</div>
                        <input
                          value={writtenAnswers[key] ?? ""}
                          onChange={(event) =>
                            setWrittenAnswers((previous) => ({
                              ...previous,
                              [key]: event.target.value,
                            }))
                          }
                          autoComplete="off"
                          autoCapitalize="none"
                          spellCheck={false}
                          placeholder={
                            prompt.direction === "vi-en"
                              ? "Gõ từ tiếng Anh..."
                              : "Gõ nghĩa tiếng Việt..."
                          }
                          className="mt-2 w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand"
                        />
                      </label>
                    );
                  })}
                </div>

                <div className="mt-7 flex justify-end">
                  {writtenStep === "vi-en" ? (
                    <button
                      type="button"
                      disabled={!writtenStepComplete}
                      onClick={() => setWrittenStep("en-vi")}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Sang bước Anh → Việt
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={writtenAnsweredCount < writtenCount || submitting}
                      onClick={submit}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {submitting ? "Đang chấm..." : "Nộp bài thi"}
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                  )}
                </div>

                {!writtenStepComplete ? (
                  <p className="mt-3 text-right text-[11px] text-muted">
                    Còn {writtenStepPrompts.length - writtenStepAnswered} câu chưa viết ở bước này.
                  </p>
                ) : writtenStep === "en-vi" && writtenAnsweredCount < writtenCount ? (
                  <p className="mt-3 text-right text-[11px] text-muted">
                    Còn {writtenCount - writtenAnsweredCount} câu chưa viết.
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="card p-6 md:p-8">
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted">
                    <span>
                      {examHasWriting
                        ? `Phần 1 · Câu ${current + 1}/${totalQuestions}`
                        : `Câu ${current + 1}/${totalQuestions}`}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      {answeredCount} đã chọn
                    </span>
                  </div>
                  <ProgressBar value={(answeredCount / totalQuestions) * 100} />

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {lesson.questions.map((item, index) => {
                      const done = Boolean(answers[item.id]);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCurrent(index)}
                          aria-label={`Đi đến câu ${index + 1}`}
                          className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold transition-colors ${
                            index === current
                              ? "bg-brand text-white"
                              : done
                                ? "bg-brand-soft text-brand"
                                : "bg-surface-muted text-muted hover:text-ink"
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
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

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => choose(choice.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                          active
                            ? "border-brand bg-brand-soft/60"
                            : "border-line bg-surface hover:border-brand/30 hover:bg-surface-muted/40"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                            active ? "bg-brand text-white" : "bg-surface-muted text-muted"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-sm text-ink">{choice.label}</span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Đã ghi nhận lựa chọn. Bạn có thể đổi đáp án và quay lại bất cứ lúc nào trước khi
                  nộp bài.
                </p>

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
                      onClick={() => setCurrent((value) => value + 1)}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Câu tiếp theo
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  ) : examHasWriting ? (
                    <button
                      type="button"
                      disabled={answeredCount < totalQuestions}
                      onClick={() => setExamStage("written")}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Sang phần tự luận
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={answeredCount < totalQuestions || submitting}
                      onClick={submit}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {submitting ? "Đang chấm..." : "Nộp bài thi"}
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
