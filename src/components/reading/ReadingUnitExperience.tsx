"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getReadingQuestions,
  type ReadingQuestion,
  type ReadingUnit,
} from "@/lib/reading-types";
import { ProgressBar } from "@/components/ui/Progress";

type ChoiceAnswers = Record<string, string>;
type MatchAnswers = Record<string, Record<string, string>>;
type TextAnswers = Record<string, string>;

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.rate = 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function normalizeAnswer(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[.,!?;:"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isAnswered(
  question: ReadingQuestion,
  choices: ChoiceAnswers,
  matches: MatchAnswers,
  texts: TextAnswers,
) {
  switch (question.kind) {
    case "true-false":
    case "mcq":
      return Boolean(choices[question.id]);
    case "matching":
      return question.left.every((item) => Boolean(matches[question.id]?.[item.id]));
    case "short-answer":
      return Boolean(texts[question.id]?.trim());
  }
}

function isCorrect(
  question: ReadingQuestion,
  choices: ChoiceAnswers,
  matches: MatchAnswers,
  texts: TextAnswers,
) {
  switch (question.kind) {
    case "true-false":
    case "mcq":
      return choices[question.id] === question.answer;
    case "matching":
      return question.left.every(
        (item) => matches[question.id]?.[item.id] === question.answer[item.id],
      );
    case "short-answer": {
      const normalized = normalizeAnswer(texts[question.id] ?? "");
      return question.acceptedAnswers.some(
        (answer) => normalizeAnswer(answer) === normalized,
      );
    }
  }
}

function answerLabel(question: ReadingQuestion) {
  switch (question.kind) {
    case "true-false":
      return question.answer === "T" ? "True (T)" : "False (F)";
    case "mcq": {
      const option = question.options.find((entry) => entry.id === question.answer);
      return option ? `${option.label}. ${option.text}` : question.answer;
    }
    case "matching":
      return question.left
        .map((item) => `${item.label.split(".")[0]}-${question.answer[item.id]}`)
        .join(", ");
    case "short-answer":
      return question.modelAnswer;
  }
}

function resultCopy(score: number, total: number) {
  if (score === total) {
    return {
      title: "Đọc rất chắc!",
      message:
        "Bạn đã tìm đúng thông tin trong cả 5 câu. Thử đọc lại bài thành tiếng một lần để nhớ nhịp câu.",
    };
  }
  if (score >= Math.ceil(total * 0.6)) {
    return {
      title: "Khá tốt, chỉ cần chỉnh vài chỗ",
      message:
        "Xem lại các câu chưa đúng, đối chiếu câu chứng minh trong bài rồi làm lại một lần.",
    };
  }
  return {
    title: "Đừng lo, chậm lại một chút",
    message:
      "Hãy đọc bài lần hai, gạch chân tên riêng và số liệu, sau đó thử lại. Mỗi đáp án đều có câu chứng minh.",
  };
}

export function ReadingUnitExperience({ unit }: { unit: ReadingUnit }) {
  const questions = useMemo(() => getReadingQuestions(unit), [unit]);
  const [choiceAnswers, setChoiceAnswers] = useState<ChoiceAnswers>({});
  const [matchAnswers, setMatchAnswers] = useState<MatchAnswers>({});
  const [textAnswers, setTextAnswers] = useState<TextAnswers>({});
  const [checked, setChecked] = useState(false);

  const answeredCount = useMemo(
    () =>
      questions.filter((question) =>
        isAnswered(question, choiceAnswers, matchAnswers, textAnswers),
      ).length,
    [questions, choiceAnswers, matchAnswers, textAnswers],
  );
  const score = useMemo(
    () =>
      questions.filter((question) =>
        isCorrect(question, choiceAnswers, matchAnswers, textAnswers),
      ).length,
    [questions, choiceAnswers, matchAnswers, textAnswers],
  );
  const allAnswered = answeredCount === questions.length;
  const result = resultCopy(score, questions.length);

  function checkAnswers() {
    if (!allAnswered) return;
    setChecked(true);
    window.setTimeout(() => {
      document
        .getElementById("reading-result")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }

  function reset() {
    setChoiceAnswers({});
    setMatchAnswers({});
    setTextAnswers({});
    setChecked(false);
    window.setTimeout(() => {
      document
        .getElementById("reading-questions")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  return (
    <>
      <section className="mx-auto w-full max-w-[1120px] px-5 pt-8 md:px-8">
        <div className="card p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <span className="material-symbols-outlined text-[20px]">waving_hand</span>
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                  Before you read · 3–5 phút
                </div>
                <h2 className="display text-xl text-ink">Khởi động</h2>
              </div>
            </div>
            <span className="text-xs text-muted">
              Trả lời miệng, không cần viết câu hoàn chỉnh.
            </span>
          </div>

          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {unit.warmUp.map((question, index) => (
              <li
                key={question}
                className="flex gap-3 rounded-xl bg-surface-muted/50 px-3 py-2.5 text-sm leading-relaxed text-muted"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-bold text-brand">
                  {index + 1}
                </span>
                <span>{question}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-6 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-start">
          <article className="card overflow-hidden lg:sticky lg:top-24">
            <div className="border-b border-line bg-surface-muted/40 p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                    Reading passage · {unit.lengthWords} từ
                  </div>
                  <h2 className="display mt-1 text-2xl leading-tight text-ink md:text-[28px]">
                    {unit.passageTitle}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => speak(unit.passage.join(" "))}
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-brand/30 hover:text-brand"
                  aria-label="Nghe toàn bộ bài đọc"
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  Nghe
                </button>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <div className="space-y-4">
                {unit.passage.map((paragraph, index) => (
                  <div key={paragraph} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-surface-muted text-[10px] font-bold text-muted">
                      {index + 1}
                    </span>
                    <p className="text-[15px] leading-7 text-ink">{paragraph}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-2.5 rounded-xl border border-brand/15 bg-brand-soft/50 p-3 text-xs leading-relaxed text-muted">
                <span className="material-symbols-outlined mt-0.5 text-[17px] text-brand">
                  lightbulb
                </span>
                <span>
                  Đọc lần 1 trong 2 phút, không tra từ. Chỉ cần biết bài nói về ai, ở đâu, làm gì.
                </span>
              </div>
            </div>
          </article>

          <div id="reading-questions" className="scroll-mt-28 space-y-4 lg:scroll-mt-24">
            <div className="card p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                    Luyện tập
                  </div>
                  <h2 className="display mt-1 text-2xl text-ink">Câu hỏi</h2>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-ink">
                    {answeredCount}/{questions.length}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                    đã trả lời
                  </div>
                </div>
              </div>
              <ProgressBar
                value={(answeredCount / questions.length) * 100}
                className="mt-3"
              />
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Mỗi đáp án đều có một câu chứng minh trong bài. Làm xong tất cả rồi mới kiểm tra.
              </p>
            </div>

            {checked ? (
              <div
                id="reading-result"
                aria-live="polite"
                className={`card p-5 md:p-6 ${
                  score === questions.length
                    ? "border-brand/25 bg-brand-soft/25"
                    : "border-gold/25 bg-[#fdf9ef]"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div
                    className={`flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-2xl ${
                      score === questions.length
                        ? "bg-brand-soft text-brand"
                        : "bg-[#f8edda] text-gold"
                    }`}
                  >
                    <div className="text-2xl font-bold leading-none">
                      {score}
                      <span className="text-sm font-semibold">/{questions.length}</span>
                    </div>
                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em]">
                      câu đúng
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      Kết quả
                    </div>
                    <h2 className="display mt-1 text-2xl text-ink">{result.title}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{result.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex flex-shrink-0 items-center justify-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand/30 hover:text-brand"
                  >
                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                    Làm lại
                  </button>
                </div>
              </div>
            ) : null}

            {unit.groups.map((group) => (
              <section key={group.id} className="card p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-soft text-xs font-bold text-brand">
                    {group.badge}
                  </span>
                  <div>
                    <h3 className="display text-lg text-ink md:text-xl">{group.label}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">
                      {group.instructionVi}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {group.questions.map((question) => {
                    const questionCorrect =
                      checked && isCorrect(question, choiceAnswers, matchAnswers, textAnswers);

                    return (
                      <div
                        key={question.id}
                        className={`rounded-xl border p-4 transition-colors ${
                          checked
                            ? questionCorrect
                              ? "border-brand/25 bg-brand-soft/15"
                              : "border-[#efc6c1] bg-[#fdf6f5]"
                            : "border-line bg-surface"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                              checked
                                ? questionCorrect
                                  ? "bg-brand text-white"
                                  : "bg-danger text-white"
                                : "bg-surface-muted text-muted"
                            }`}
                          >
                            {question.number}
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold leading-relaxed text-ink">
                              {question.prompt}
                            </p>

                            <div className="mt-3">
                              <QuestionInput
                                question={question}
                                checked={checked}
                                choiceAnswers={choiceAnswers}
                                matchAnswers={matchAnswers}
                                textAnswers={textAnswers}
                                onChoice={(value) =>
                                  setChoiceAnswers((previous) => ({
                                    ...previous,
                                    [question.id]: value,
                                  }))
                                }
                                onMatch={(itemId, value) =>
                                  setMatchAnswers((previous) => ({
                                    ...previous,
                                    [question.id]: {
                                      ...(previous[question.id] ?? {}),
                                      [itemId]: value,
                                    },
                                  }))
                                }
                                onText={(value) =>
                                  setTextAnswers((previous) => ({
                                    ...previous,
                                    [question.id]: value,
                                  }))
                                }
                              />
                            </div>

                            {checked ? (
                              <div
                                className={`mt-3 rounded-lg border p-3 ${
                                  questionCorrect
                                    ? "border-brand/20 bg-brand-soft/55"
                                    : "border-[#efc6c1] bg-[#fdf4f2]"
                                }`}
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span
                                    className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                                      questionCorrect ? "text-brand" : "text-danger"
                                    }`}
                                  >
                                    <span className="material-symbols-outlined text-[14px]">
                                      {questionCorrect ? "check_circle" : "cancel"}
                                    </span>
                                    {questionCorrect ? "Chính xác" : "Chưa đúng"}
                                  </span>
                                  <span className="text-[11px] text-muted">
                                    Đáp án:{" "}
                                    <strong className="font-semibold text-ink">
                                      {answerLabel(question)}
                                    </strong>
                                  </span>
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                                  {question.explanation}
                                </p>
                                {question.evidence ? (
                                  <p className="mt-1.5 text-xs italic leading-relaxed text-muted">
                                    Evidence: “{question.evidence}”
                                  </p>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            <div className="card p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-ink">
                    {checked
                      ? `Bạn đúng ${score}/${questions.length} câu.`
                      : allAnswered
                        ? `Bạn đã trả lời đủ ${questions.length} câu.`
                        : `Còn ${questions.length - answeredCount} câu chưa trả lời.`}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">
                    {checked
                      ? "Ghi lại lỗi sai để lần sau đọc nhanh và chắc hơn."
                      : "Đối chiếu lại với bài đọc trước khi kiểm tra đáp án."}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {checked ? (
                    <>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/30 hover:text-brand"
                      >
                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                        Làm lại
                      </button>
                      <a
                        href="#tu-vung"
                        className="btn-primary inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold"
                      >
                        Học từ vựng
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </a>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={checkAnswers}
                      disabled={!allAnswered}
                      className="btn-primary inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined text-[18px]">task_alt</span>
                      Kiểm tra đáp án
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-4 md:px-8">
        <div id="tu-vung" className="card scroll-mt-28 p-6 md:p-8 lg:scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Vocabulary · {unit.vocabulary.length} từ
              </div>
              <h2 className="display mt-1 text-2xl text-ink md:text-3xl">Từ vựng trong bài</h2>
              <p className="mt-1 text-xs text-muted">
                IPA theo British English. Nhấn biểu tượng loa để nghe phát âm.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold text-muted">
              <span className="material-symbols-outlined text-[15px] text-brand">record_voice_over</span>
              Nghe và đọc to
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {unit.vocabulary.map((entry) => (
              <div
                key={entry.word}
                className="rounded-xl border border-line bg-surface-muted/30 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-base font-bold text-ink">{entry.word}</div>
                    <div className="text-xs text-muted">{entry.ipa}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => speak(entry.word)}
                    aria-label={`Nghe từ ${entry.word}`}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-brand-soft hover:text-brand"
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  </button>
                </div>
                <div className="mt-2 text-sm font-semibold text-brand">{entry.meaningVi}</div>
                <div className="mt-2 text-xs italic leading-relaxed text-muted">
                  “{entry.example}”
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-4 md:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div id="ky-nang" className="card scroll-mt-24 p-6 md:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <span className="material-symbols-outlined text-[20px]">travel_explore</span>
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                  Reading skill
                </div>
                <h2 className="display text-xl text-ink">{unit.skill.title}</h2>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{unit.skill.intro}</p>
            <ul className="mt-4 space-y-2">
              {unit.skill.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2 text-sm leading-relaxed text-ink"
                >
                  <span className="material-symbols-outlined mt-0.5 text-[17px] text-brand">
                    arrow_right
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 md:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fdf3e2] text-gold">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                  Common mistakes
                </div>
                <h2 className="display text-xl text-ink">Lỗi thường gặp</h2>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {unit.mistakes.map((mistake) => (
                <div key={mistake.title} className="border-l-2 border-[#e6c98a] pl-3">
                  <div className="text-sm font-semibold text-ink">{mistake.title}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{mistake.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-4 md:px-8">
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center">
          <Link
            href="/reading"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Danh sách bài đọc
          </Link>
          <span className="text-xs text-muted">
            Unit 2 · Countries &amp; Nationalities đang được cập nhật.
          </span>
        </div>
      </section>
    </>
  );
}

function QuestionInput({
  question,
  checked,
  choiceAnswers,
  matchAnswers,
  textAnswers,
  onChoice,
  onMatch,
  onText,
}: {
  question: ReadingQuestion;
  checked: boolean;
  choiceAnswers: ChoiceAnswers;
  matchAnswers: MatchAnswers;
  textAnswers: TextAnswers;
  onChoice: (value: string) => void;
  onMatch: (itemId: string, value: string) => void;
  onText: (value: string) => void;
}) {
  if (question.kind === "true-false") {
    return (
      <div className="flex flex-wrap gap-2">
        {(["T", "F"] as const).map((value) => {
          const active = choiceAnswers[question.id] === value;
          const isAnswer = question.answer === value;
          const wrongChoice = checked && active && !isAnswer;

          return (
            <button
              key={value}
              type="button"
              disabled={checked}
              aria-pressed={active}
              onClick={() => onChoice(value)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                checked
                  ? isAnswer
                    ? "border-brand/50 bg-brand-soft/50 text-brand"
                    : wrongChoice
                      ? "border-danger/40 bg-[#fdf6f5] text-danger"
                      : "border-line bg-surface text-muted"
                  : active
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-line bg-surface text-muted hover:border-brand/30 hover:text-brand"
              } disabled:cursor-default`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  checked
                    ? isAnswer
                      ? "bg-brand text-white"
                      : wrongChoice
                        ? "bg-danger text-white"
                        : "bg-surface-muted text-muted"
                    : active
                      ? "bg-brand text-white"
                      : "bg-surface-muted text-muted"
                }`}
              >
                {value}
              </span>
              {value === "T" ? "True" : "False"}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.kind === "mcq") {
    return (
      <div className="space-y-2">
        {question.options.map((option) => {
          const active = choiceAnswers[question.id] === option.id;
          const isAnswer = question.answer === option.id;
          const wrongChoice = checked && active && !isAnswer;

          return (
            <button
              key={option.id}
              type="button"
              disabled={checked}
              aria-pressed={active}
              onClick={() => onChoice(option.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                checked
                  ? isAnswer
                    ? "border-brand/50 bg-brand-soft/50"
                    : wrongChoice
                      ? "border-danger/40 bg-[#fdf6f5]"
                      : "border-line bg-surface"
                  : active
                    ? "border-brand bg-brand-soft"
                    : "border-line bg-surface hover:border-brand/30 hover:bg-surface-muted/40"
              } disabled:cursor-default`}
            >
              <span
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  checked
                    ? isAnswer
                      ? "bg-brand text-white"
                      : wrongChoice
                        ? "bg-danger text-white"
                        : "bg-surface-muted text-muted"
                    : active
                      ? "bg-brand text-white"
                      : "bg-surface-muted text-muted"
                }`}
              >
                {option.label}
              </span>
              <span
                className={`text-sm ${
                  wrongChoice
                    ? "text-danger"
                    : checked
                      ? isAnswer
                        ? "font-semibold text-ink"
                        : "text-ink"
                      : active
                        ? "font-semibold text-ink"
                        : "text-ink"
                }`}
              >
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (question.kind === "matching") {
    return (
      <div className="space-y-2">
        {question.left.map((item) => {
          const selected = matchAnswers[question.id]?.[item.id] ?? "";
          const pairCorrect = checked && selected === question.answer[item.id];

          return (
            <div
              key={item.id}
              className={`grid gap-2 rounded-lg border px-3 py-2 sm:grid-cols-[1fr_1.45fr] sm:items-center ${
                checked
                  ? pairCorrect
                    ? "border-brand/20 bg-brand-soft/25"
                    : "border-[#efc6c1] bg-[#fdf6f5]"
                  : "border-line bg-surface"
              }`}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                {item.label}
                {checked ? (
                  <span
                    className={`material-symbols-outlined text-[15px] ${
                      pairCorrect ? "text-brand" : "text-danger"
                    }`}
                  >
                    {pairCorrect ? "check_circle" : "cancel"}
                  </span>
                ) : null}
              </span>
              <select
                value={selected}
                disabled={checked}
                onChange={(event) => onMatch(item.id, event.target.value)}
                aria-label={`Thông tin phù hợp với ${item.label}`}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10 disabled:cursor-default disabled:bg-surface-muted/40"
              >
                <option value="">Chọn thông tin...</option>
                {question.right.map((right) => (
                  <option key={right.id} value={right.id}>
                    {right.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        value={textAnswers[question.id] ?? ""}
        disabled={checked}
        onChange={(event) => onText(event.target.value)}
        placeholder="Write your answer in English..."
        aria-label={question.prompt}
        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/10 disabled:cursor-default disabled:bg-surface-muted/40"
      />
      <p className="mt-1.5 text-[11px] text-muted">
        Trả lời ngắn (2–4 từ), không cần viết cả câu.
      </p>
    </div>
  );
}
