"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

export interface AdminLessonData {
  id: string;
  title: string;
  summary: string;
  levelId: string;
  track: "grammar" | "vocabulary";
  xp: number;
  estimatedMinutes: number;
  topicName: string;
  sections: { id: string; title: string; body: string; remember: string }[];
  vocab: {
    id: string;
    word: string;
    ipa: string;
    wordForm: string;
    meaningVi: string;
    meaningEn: string;
    example: string;
  }[];
  questions: {
    id: string;
    prompt: string;
    explanation: string;
    choices: { id: string; label: string; isCorrect: boolean }[];
  }[];
}

interface LevelOption {
  id: string;
  code: string;
  name: string;
}

interface SectionRow {
  key: string;
  title: string;
  body: string;
  remember: string;
}

interface WordRow {
  key: string;
  word: string;
  ipa: string;
  wordForm: string;
  meaningVi: string;
  meaningEn: string;
  example: string;
}

interface ChoiceRow {
  key: string;
  label: string;
  correct: boolean;
}

interface QuestionRow {
  key: string;
  prompt: string;
  explanation: string;
  choices: ChoiceRow[];
}

function makeKey(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-muted/50 focus:border-brand focus:ring-4 focus:ring-brand/10";
const labelClass = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-muted";

export function LessonEditor({
  lesson,
  levels,
}: {
  lesson: AdminLessonData;
  levels: LevelOption[];
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState(lesson.title);
  const [summary, setSummary] = useState(lesson.summary);
  const [levelId, setLevelId] = useState(lesson.levelId);
  const [track, setTrack] = useState<"grammar" | "vocabulary">(lesson.track);
  const [topicName, setTopicName] = useState(lesson.topicName);
  const [xp, setXp] = useState(lesson.xp);
  const [minutes, setMinutes] = useState(lesson.estimatedMinutes);

  const [sections, setSections] = useState<SectionRow[]>(
    lesson.sections.map((section) => ({
      key: section.id,
      title: section.title,
      body: section.body,
      remember: section.remember,
    })),
  );

  const [vocab, setVocab] = useState<WordRow[]>(
    lesson.vocab.map((word) => ({
      key: word.id,
      word: word.word,
      ipa: word.ipa,
      wordForm: word.wordForm,
      meaningVi: word.meaningVi,
      meaningEn: word.meaningEn,
      example: word.example,
    })),
  );

  const [questions, setQuestions] = useState<QuestionRow[]>(
    lesson.questions.map((question) => ({
      key: question.id,
      prompt: question.prompt,
      explanation: question.explanation,
      choices: question.choices.map((choice) => ({
        key: choice.id,
        label: choice.label,
        correct: choice.isCorrect,
      })),
    })),
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  function updateSection(key: string, patch: Partial<SectionRow>) {
    setSections((rows) => rows.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  }

  function updateWord(key: string, patch: Partial<WordRow>) {
    setVocab((rows) => rows.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  }

  function updateQuestion(key: string, patch: Partial<QuestionRow>) {
    setQuestions((rows) => rows.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  }

  function updateChoice(questionKey: string, choiceKey: string, patch: Partial<ChoiceRow>) {
    setQuestions((rows) =>
      rows.map((row) =>
        row.key === questionKey
          ? {
              ...row,
              choices: row.choices.map((choice) =>
                choice.key === choiceKey ? { ...choice, ...patch } : choice,
              ),
            }
          : row,
      ),
    );
  }

  function setCorrectChoice(questionKey: string, choiceKey: string) {
    setQuestions((rows) =>
      rows.map((row) =>
        row.key === questionKey
          ? {
              ...row,
              choices: row.choices.map((choice) => ({
                ...choice,
                correct: choice.key === choiceKey,
              })),
            }
          : row,
      ),
    );
  }

  async function save() {
    setMessage(null);

    if (!title.trim()) {
      setMessage({ type: "error", text: "Tên bài học không được để trống." });
      return;
    }

    const cleanSections = sections
      .filter((section) => section.title.trim() && section.body.trim())
      .map((section) => ({
        title: section.title.trim(),
        body: section.body,
        remember: section.remember.trim() || null,
      }));

    if (cleanSections.length === 0) {
      setMessage({ type: "error", text: "Cần ít nhất một phần nội dung có tiêu đề và nội dung." });
      return;
    }

    const cleanVocab = vocab
      .filter((word) => word.word.trim() && word.meaningVi.trim())
      .map((word) => ({
        word: word.word.trim(),
        ipa: word.ipa.trim() || null,
        wordForm: word.wordForm.trim() || null,
        meaningVi: word.meaningVi.trim(),
        meaningEn: word.meaningEn.trim() || null,
        example: word.example.trim() || null,
      }));

    if (track === "vocabulary" && cleanVocab.length < 2) {
      setMessage({ type: "error", text: "Bài từ vựng cần ít nhất 2 từ để tạo câu hỏi." });
      return;
    }

    const cleanQuestions = questions
      .filter((question) => question.prompt.trim())
      .map((question) => ({
        prompt: question.prompt.trim(),
        explanation: question.explanation.trim() || null,
        choices: question.choices
          .filter((choice) => choice.label.trim())
          .map((choice) => ({ label: choice.label.trim(), correct: choice.correct })),
      }));

    if (track === "grammar") {
      const invalid = cleanQuestions.find(
        (question) =>
          question.choices.length < 2 || !question.choices.some((choice) => choice.correct),
      );
      if (invalid) {
        setMessage({
          type: "error",
          text: `Câu hỏi “${invalid.prompt.slice(0, 50)}…” cần ít nhất 2 đáp án và 1 đáp án đúng.`,
        });
        return;
      }
      if (cleanQuestions.length === 0) {
        setMessage({ type: "error", text: "Bài ngữ pháp cần ít nhất một câu hỏi kiểm tra." });
        return;
      }
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/lessons/${lesson.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          summary: summary.trim() || null,
          levelId,
          track,
          topicName: track === "vocabulary" ? topicName.trim() || null : null,
          xp,
          estimatedMinutes: minutes,
          sections: cleanSections,
          vocab: cleanVocab,
          questions: cleanQuestions,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Không thể lưu bài học");
      setMessage({ type: "ok", text: "Đã lưu bài học." });
      showToast({ variant: "success", title: "Đã lưu bài học" });
      router.refresh();
    } catch (caught) {
      const text = caught instanceof Error ? caught.message : "Không thể lưu bài học";
      setMessage({ type: "error", text });
      showToast({
        variant: "error",
        title: "Không lưu được bài học",
        description: text,
        action: { label: "Thử lại", onClick: () => void save() },
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="sticky top-[100px] z-40 border-b border-line bg-background/95 backdrop-blur lg:top-16">
        <div className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/admin"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-muted hover:text-brand"
              aria-label="Quay lại quản trị"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                Đang sửa bài học
              </div>
              <div className="truncate text-sm font-semibold text-ink">{title || "Chưa có tên"}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {message ? (
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  message.type === "ok" ? "text-brand" : "text-danger"
                }`}
              >
                {message.text}
              </span>
            ) : null}
            <Link
              href={`/lesson/${lesson.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink hover:border-brand/30 hover:text-brand"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              Xem bài
            </Link>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="btn-primary inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1120px] gap-6 px-5 py-8 md:px-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Sections */}
          <section className="card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="display text-xl text-ink">Nội dung bài học</h2>
                <p className="text-[11px] text-muted">
                  Dòng bắt đầu bằng “-” là gạch đầu dòng; **chữ** là in đậm.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSections((rows) => [
                    ...rows,
                    { key: makeKey("section"), title: "", body: "", remember: "" },
                  ])
                }
                className="rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-semibold text-brand hover:bg-brand-soft/70"
              >
                + Phần mới
              </button>
            </div>

            <div className="space-y-4">
              {sections.map((section, index) => (
                <div key={section.key} className="rounded-xl border border-line p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                      Phần {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() =>
                          setSections((rows) => {
                            const next = [...rows];
                            [next[index - 1], next[index]] = [next[index], next[index - 1]];
                            return next;
                          })
                        }
                        className="rounded-full px-2 py-1 text-[11px] text-muted hover:text-ink disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={index === sections.length - 1}
                        onClick={() =>
                          setSections((rows) => {
                            const next = [...rows];
                            [next[index + 1], next[index]] = [next[index], next[index + 1]];
                            return next;
                          })
                        }
                        className="rounded-full px-2 py-1 text-[11px] text-muted hover:text-ink disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSections((rows) => rows.filter((row) => row.key !== section.key))
                        }
                        className="rounded-full px-2 py-1 text-[11px] font-semibold text-muted hover:text-danger"
                      >
                        Xoá
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>Tiêu đề phần</label>
                      <input
                        value={section.title}
                        onChange={(event) =>
                          updateSection(section.key, { title: event.target.value })
                        }
                        placeholder="VD: Cấu trúc câu"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Nội dung</label>
                      <textarea
                        value={section.body}
                        onChange={(event) =>
                          updateSection(section.key, { body: event.target.value })
                        }
                        rows={6}
                        placeholder={"Nhập nội dung...\n- Gạch đầu dòng\n- Ví dụ"}
                        className={`${inputClass} resize-y leading-relaxed`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Ghi nhớ nhanh (tuỳ chọn)</label>
                      <input
                        value={section.remember}
                        onChange={(event) =>
                          updateSection(section.key, { remember: event.target.value })
                        }
                        placeholder="Một câu tóm tắt quan trọng"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {sections.length === 0 ? (
                <p className="rounded-xl bg-surface-muted px-4 py-6 text-center text-xs text-muted">
                  Chưa có phần nội dung. Bấm “+ Phần mới” để bắt đầu.
                </p>
              ) : null}
            </div>
          </section>

          {/* Vocabulary */}
          {track === "vocabulary" ? (
            <section className="card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="display text-xl text-ink">Danh sách từ</h2>
                  <p className="text-[11px] text-muted">
                    Câu hỏi kiểm tra sẽ tự sinh từ danh sách này khi lưu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setVocab((rows) => [
                      ...rows,
                      {
                        key: makeKey("word"),
                        word: "",
                        ipa: "",
                        wordForm: "",
                        meaningVi: "",
                        meaningEn: "",
                        example: "",
                      },
                    ])
                  }
                  className="rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-semibold text-brand hover:bg-brand-soft/70"
                >
                  + Thêm từ
                </button>
              </div>

              <div className="space-y-3">
                {vocab.map((word, index) => (
                  <div key={word.key} className="rounded-xl border border-line p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                        Từ {String(index + 1).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setVocab((rows) => rows.filter((row) => row.key !== word.key))
                        }
                        className="rounded-full px-2 py-1 text-[11px] font-semibold text-muted hover:text-danger"
                      >
                        Xoá
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Từ / cụm từ</label>
                        <input
                          value={word.word}
                          onChange={(event) => updateWord(word.key, { word: event.target.value })}
                          className={inputClass}
                          placeholder="word"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phiên âm</label>
                        <input
                          value={word.ipa}
                          onChange={(event) => updateWord(word.key, { ipa: event.target.value })}
                          className={inputClass}
                          placeholder="/wɜːd/"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Từ loại</label>
                        <input
                          value={word.wordForm}
                          onChange={(event) =>
                            updateWord(word.key, { wordForm: event.target.value })
                          }
                          className={inputClass}
                          placeholder="n / v / adj"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Nghĩa tiếng Việt *</label>
                        <input
                          value={word.meaningVi}
                          onChange={(event) =>
                            updateWord(word.key, { meaningVi: event.target.value })
                          }
                          className={inputClass}
                          placeholder="nghĩa"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Nghĩa tiếng Anh</label>
                        <input
                          value={word.meaningEn}
                          onChange={(event) =>
                            updateWord(word.key, { meaningEn: event.target.value })
                          }
                          className={inputClass}
                          placeholder="English meaning"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Ví dụ</label>
                        <input
                          value={word.example}
                          onChange={(event) =>
                            updateWord(word.key, { example: event.target.value })
                          }
                          className={inputClass}
                          placeholder="Example sentence"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {vocab.length === 0 ? (
                  <p className="rounded-xl bg-surface-muted px-4 py-6 text-center text-xs text-muted">
                    Chưa có từ vựng. Bấm “+ Thêm từ”.
                  </p>
                ) : null}
              </div>
            </section>
          ) : (
            <section className="card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="display text-xl text-ink">Câu hỏi kiểm tra</h2>
                  <p className="text-[11px] text-muted">
                    Mỗi câu có ít nhất 2 đáp án và đúng 1 đáp án đúng.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setQuestions((rows) => [
                      ...rows,
                      {
                        key: makeKey("question"),
                        prompt: "",
                        explanation: "",
                        choices: [
                          { key: makeKey("choice"), label: "", correct: true },
                          { key: makeKey("choice"), label: "", correct: false },
                          { key: makeKey("choice"), label: "", correct: false },
                          { key: makeKey("choice"), label: "", correct: false },
                        ],
                      },
                    ])
                  }
                  className="rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-semibold text-brand hover:bg-brand-soft/70"
                >
                  + Thêm câu hỏi
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.key} className="rounded-xl border border-line p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                        Câu {String(index + 1).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuestions((rows) =>
                            rows.filter((row) => row.key !== question.key),
                          )
                        }
                        className="rounded-full px-2 py-1 text-[11px] font-semibold text-muted hover:text-danger"
                      >
                        Xoá câu
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className={labelClass}>Câu hỏi</label>
                        <input
                          value={question.prompt}
                          onChange={(event) =>
                            updateQuestion(question.key, { prompt: event.target.value })
                          }
                          className={inputClass}
                          placeholder="Nhập câu hỏi..."
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Giải thích (hiện sau khi chấm)</label>
                        <input
                          value={question.explanation}
                          onChange={(event) =>
                            updateQuestion(question.key, { explanation: event.target.value })
                          }
                          className={inputClass}
                          placeholder="Vì sao đáp án này đúng?"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Đáp án (chọn nút tròn để đánh dấu đúng)</label>
                        <div className="space-y-2">
                          {question.choices.map((choice, choiceIndex) => (
                            <div key={choice.key} className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setCorrectChoice(question.key, choice.key)}
                                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                                  choice.correct
                                    ? "border-brand bg-brand text-white"
                                    : "border-line bg-surface text-muted"
                                }`}
                                aria-label="Đánh dấu đáp án đúng"
                              >
                                {choice.correct ? "✓" : String.fromCharCode(65 + choiceIndex)}
                              </button>
                              <input
                                value={choice.label}
                                onChange={(event) =>
                                  updateChoice(question.key, choice.key, {
                                    label: event.target.value,
                                  })
                                }
                                className={inputClass}
                                placeholder={`Đáp án ${String.fromCharCode(65 + choiceIndex)}`}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setQuestions((rows) =>
                                    rows.map((row) =>
                                      row.key === question.key
                                        ? {
                                            ...row,
                                            choices: row.choices.filter(
                                              (item) => item.key !== choice.key,
                                            ),
                                          }
                                        : row,
                                    ),
                                  )
                                }
                                disabled={question.choices.length <= 2}
                                className="flex-shrink-0 rounded-full px-2 py-1 text-[11px] text-muted hover:text-danger disabled:opacity-30"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setQuestions((rows) =>
                              rows.map((row) =>
                                row.key === question.key
                                  ? {
                                      ...row,
                                      choices: [
                                        ...row.choices,
                                        { key: makeKey("choice"), label: "", correct: false },
                                      ],
                                    }
                                  : row,
                              ),
                            )
                          }
                          className="mt-2 text-[11px] font-semibold text-brand hover:underline"
                        >
                          + Thêm đáp án
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {questions.length === 0 ? (
                  <p className="rounded-xl bg-surface-muted px-4 py-6 text-center text-xs text-muted">
                    Chưa có câu hỏi. Bấm “+ Thêm câu hỏi”.
                  </p>
                ) : null}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <section className="card p-5">
            <h2 className="mb-4 text-sm font-bold text-ink">Thông tin bài học</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Tên bài học</label>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Mô tả ngắn</label>
                <textarea
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  rows={3}
                  className={`${inputClass} resize-y`}
                  placeholder="Bài học này giúp bạn..."
                />
              </div>
              <div>
                <label className={labelClass}>Cấp độ</label>
                <select
                  value={levelId}
                  onChange={(event) => setLevelId(event.target.value)}
                  className={inputClass}
                >
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.code} — {level.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Loại bài</label>
                <select
                  value={track}
                  onChange={(event) =>
                    setTrack(event.target.value === "vocabulary" ? "vocabulary" : "grammar")
                  }
                  className={inputClass}
                >
                  <option value="grammar">Ngữ pháp</option>
                  <option value="vocabulary">Từ vựng</option>
                </select>
              </div>
              {track === "vocabulary" ? (
                <div>
                  <label className={labelClass}>Chủ đề</label>
                  <input
                    value={topicName}
                    onChange={(event) => setTopicName(event.target.value)}
                    className={inputClass}
                    placeholder="VD: Du lịch & phương tiện"
                  />
                  <p className="mt-1 text-[10px] text-muted">
                    Chủ đề mới sẽ tự được tạo nếu chưa tồn tại.
                  </p>
                </div>
              ) : null}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>XP</label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={xp}
                    onChange={(event) => setXp(Number(event.target.value) || 10)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Số phút</label>
                  <input
                    type="number"
                    min={1}
                    max={180}
                    value={minutes}
                    onChange={(event) => setMinutes(Number(event.target.value) || 10)}
                    className={inputClass}
                  />
                </div>
              </div>

              {message ? (
                <p
                  className={`text-xs font-medium ${
                    message.type === "ok" ? "text-brand" : "text-danger"
                  }`}
                >
                  {message.text}
                </p>
              ) : null}

              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </section>

          <div className="rounded-xl border border-brand/15 bg-brand-soft/50 p-4 text-[11px] leading-relaxed text-muted">
            <span className="font-semibold text-ink">Lưu ý:</span> Bài từ vựng tự sinh câu hỏi từ
            danh sách từ. Bài ngữ pháp dùng danh sách câu hỏi bên trái.
          </div>
        </aside>
      </div>
    </div>
  );
}
