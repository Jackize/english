"use client";

import { useMemo, useState } from "react";
import type { WritingUnit } from "@/lib/writing";

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[.,!?;:"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

type DiffToken = { type: "same" | "missing" | "extra"; text: string };

function tokenize(value: string) {
  return value.trim().split(/\s+/).filter(Boolean);
}

function comparableToken(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^\p{L}\p{N}']/gu, "");
}

/**
 * So sánh từng từ giữa bài của người học và bài mẫu bằng LCS.
 * "missing" = từ có trong bài mẫu nhưng người học chưa viết.
 * "extra" = từ người học viết thêm so với bài mẫu.
 */
function diffWords(userText: string, modelText: string): DiffToken[] {
  const userTokens = tokenize(userText);
  const modelTokens = tokenize(modelText);
  const user = userTokens.map(comparableToken);
  const model = modelTokens.map(comparableToken);

  const rows = user.length;
  const cols = model.length;
  const table: number[][] = Array.from({ length: rows + 1 }, () =>
    new Array<number>(cols + 1).fill(0),
  );

  for (let i = rows - 1; i >= 0; i -= 1) {
    for (let j = cols - 1; j >= 0; j -= 1) {
      table[i][j] =
        user[i] === model[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const result: DiffToken[] = [];
  let i = 0;
  let j = 0;

  while (i < rows && j < cols) {
    if (user[i] === model[j]) {
      result.push({ type: "same", text: userTokens[i] });
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      result.push({ type: "extra", text: userTokens[i] });
      i += 1;
    } else {
      result.push({ type: "missing", text: modelTokens[j] });
      j += 1;
    }
  }

  while (i < rows) {
    result.push({ type: "extra", text: userTokens[i] });
    i += 1;
  }
  while (j < cols) {
    result.push({ type: "missing", text: modelTokens[j] });
    j += 1;
  }

  return result;
}

const RUBRIC_CRITERIA = [
  {
    key: "task",
    label: "Task Achievement",
    vi: "Hoàn thành yêu cầu",
    hint: "Trả lời đủ các ý của đề, có mở bài – thân bài – kết bài.",
  },
  {
    key: "coherence",
    label: "Coherence & Cohesion",
    vi: "Mạch lạc & liên kết",
    hint: "Ý được sắp xếp hợp lý, dùng từ nối tự nhiên giữa các câu/đoạn.",
  },
  {
    key: "lexical",
    label: "Lexical Resource",
    vi: "Vốn từ vựng",
    hint: "Dùng từ phù hợp chủ đề, ít lặp, có cụm từ tự nhiên.",
  },
  {
    key: "grammar",
    label: "Grammatical Range & Accuracy",
    vi: "Ngữ pháp & độ chính xác",
    hint: "Câu đa dạng, ít lỗi chia thì, mạo từ, giới từ, số ít/số nhiều.",
  },
] as const;

const RUBRIC_LEVELS = [
  { value: 1, label: "Cần cải thiện" },
  { value: 2, label: "Đạt cơ bản" },
  { value: 3, label: "Tốt" },
  { value: 4, label: "Xuất sắc" },
] as const;

function SectionHtml({ html }: { html: string }) {
  return (
    <div
      className="writing-content rounded-2xl border border-line bg-surface p-6 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_h4]:mt-4 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-ink [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-ink [&_li]:text-sm [&_li]:leading-7 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-line [&_th]:bg-surface-muted/60 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_td]:border [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_blockquote]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-brand/30 [&_blockquote]:bg-brand-soft/30 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:italic [&_strong]:font-semibold [&_code]:rounded [&_code]:bg-surface-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function WritingUnitExperience({ unit }: { unit: WritingUnit }) {
  const [tab, setTab] = useState<"learn" | "practice">("learn");
  const [modelInput, setModelInput] = useState("");
  const [modelStatus, setModelStatus] = useState<boolean | null>(null);

  const [languageInputs, setLanguageInputs] = useState<string[]>(() =>
    unit.languagePractice.map(() => ""),
  );
  const [languageStatuses, setLanguageStatuses] = useState<(boolean | null)[]>(() =>
    unit.languagePractice.map(() => null),
  );

  const [guidedDone, setGuidedDone] = useState(() => {
    if (typeof window === "undefined") return false;
    const key = `writing:${unit.level}:${unit.slug}:done`;
    return window.localStorage.getItem(key) === "1";
  });
  const [writeInput, setWriteInput] = useState("");
  const [writeChecked, setWriteChecked] = useState(false);
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({});

  const diff = useMemo(
    () => (writeChecked ? diffWords(writeInput, unit.modelSample) : []),
    [writeChecked, writeInput, unit.modelSample],
  );

  const diffStats = useMemo(() => {
    const same = diff.filter((token) => token.type === "same").length;
    const missing = diff.filter((token) => token.type === "missing").length;
    const extra = diff.filter((token) => token.type === "extra").length;
    const total = Math.max(same + missing, same + extra, 1);
    return {
      same,
      missing,
      extra,
      matchPercent: Math.round((same / total) * 100),
    };
  }, [diff]);

  const ratedCount = RUBRIC_CRITERIA.filter((criterion) => rubricScores[criterion.key]).length;
  const rubricTotal = RUBRIC_CRITERIA.reduce(
    (sum, criterion) => sum + (rubricScores[criterion.key] ?? 0),
    0,
  );

  function checkWriting() {
    // Rubric được lưu trên thiết bị; đọc khi người học bắt đầu kiểm tra để
    // tránh lệch hydration giữa server và client.
    const storageKey = `writing:${unit.level}:${unit.slug}:rubric`;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setRubricScores(JSON.parse(raw) as Record<string, number>);
    } catch {
      // Bỏ qua dữ liệu hỏng, bắt đầu với rubric trống.
    }
    setWriteChecked(true);
  }

  function setRubricScore(key: string, value: number) {
    const next = { ...rubricScores, [key]: value };
    setRubricScores(next);
    if (typeof window !== "undefined") {
      const storageKey = `writing:${unit.level}:${unit.slug}:rubric`;
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    }
  }

  const modelCorrect = modelStatus === true;
  const allLanguageCorrect =
    unit.languagePractice.length === 0 ||
    languageStatuses.every((status) => status === true);

  const learnDone = modelCorrect && allLanguageCorrect;

  const learnSections = unit.learnSections;
  const practiceSections = unit.practiceSections;

  const modelSection = learnSections.find((section) =>
    section.title.toLowerCase().includes("model"),
  );
  const languageSection = learnSections.find((section) =>
    section.title.toLowerCase().includes("language bank"),
  );

  const sampleAnswerSection = practiceSections.find((section) =>
    section.title.toLowerCase().includes("sample answer"),
  );
  const commonMistakesSection = practiceSections.find((section) =>
    section.title.toLowerCase().includes("common mistakes"),
  );
  const guidedPracticeSection = practiceSections.find((section) =>
    section.title.toLowerCase().includes("guided practice"),
  );
  const writeSection = practiceSections.find((section) =>
    section.title.toLowerCase().includes("write"),
  );
  const checklistSection = practiceSections.find((section) =>
    section.title.toLowerCase().includes("checklist"),
  );

  const checklistItems = useMemo(
    () => [
      { label: "Đã gõ đúng đoạn mẫu", done: modelCorrect },
      { label: "Đã hoàn thành luyện ngôn ngữ", done: allLanguageCorrect },
      { label: "Đã hoàn thành guided practice", done: guidedDone },
      { label: "Đã viết và tự kiểm tra bài", done: writeChecked },
    ],
    [modelCorrect, allLanguageCorrect, guidedDone, writeChecked],
  );

  function checkModel() {
    setModelStatus(normalize(modelInput) === normalize(unit.modelSample));
  }

  function checkLanguage(index: number) {
    const next = [...languageStatuses];
    next[index] =
      normalize(languageInputs[index]) ===
      normalize(unit.languagePractice[index].answer);
    setLanguageStatuses(next);
  }

  function checkAllLanguage() {
    setLanguageStatuses(
      unit.languagePractice.map((item, index) =>
        normalize(languageInputs[index]) === normalize(item.answer),
      ),
    );
  }

  function markGuidedDone() {
    const key = `writing:${unit.level}:${unit.slug}:done`;
    window.localStorage.setItem(key, "1");
    setGuidedDone(true);
  }

  function unmarkGuidedDone() {
    const key = `writing:${unit.level}:${unit.slug}:done`;
    window.localStorage.removeItem(key);
    setGuidedDone(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("learn")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            tab === "learn"
              ? "bg-brand text-white"
              : "border border-line bg-surface text-muted hover:text-brand"
          }`}
        >
          Phần học
        </button>
        <button
          type="button"
          onClick={() => setTab("practice")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            tab === "practice"
              ? "bg-brand text-white"
              : "border border-line bg-surface text-muted hover:text-brand"
          }`}
        >
          Phần thực hành
        </button>
      </div>

      {tab === "learn" ? (
        <div className="space-y-6">
          {modelSection ? <SectionHtml html={modelSection.html} /> : null}

          {unit.modelSample ? (
            <div className="rounded-2xl border border-brand/20 bg-brand-soft/20 p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Thực hành gõ lại đoạn mẫu
              </div>
              <p className="mt-2 text-sm leading-7 text-ink">{unit.modelSample}</p>
              <textarea
                value={modelInput}
                onChange={(event) => setModelInput(event.target.value)}
                rows={5}
                placeholder="Gõ lại đoạn mẫu vào đây..."
                className="mt-3 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={checkModel}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Kiểm tra
                </button>
                {modelStatus === true ? (
                  <span className="text-sm font-semibold text-brand">Chính xác!</span>
                ) : modelStatus === false ? (
                  <span className="text-sm font-semibold text-danger">
                    Chưa khớp. Hãy gõ lại đúng từng từ.
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

          {languageSection ? <SectionHtml html={languageSection.html} /> : null}

          {unit.languagePractice.length > 0 ? (
            <div className="rounded-2xl border border-gold/20 bg-[#fdf9ef] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                Thực hành ngôn ngữ: tiếng Việt → tiếng Anh
              </div>
              <div className="mt-4 space-y-4">
                {unit.languagePractice.map((item, index) => (
                  <div key={`${item.prompt}-${index}`} className="space-y-2">
                    <div className="text-sm font-semibold text-ink">{item.prompt}</div>
                    <textarea
                      value={languageInputs[index]}
                      onChange={(event) => {
                        const next = [...languageInputs];
                        next[index] = event.target.value;
                        setLanguageInputs(next);
                      }}
                      rows={2}
                      placeholder="Viết câu tiếng Anh..."
                      className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/10"
                    />
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => checkLanguage(index)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brand/30 hover:text-brand"
                      >
                        Kiểm tra
                      </button>
                      {languageStatuses[index] === true ? (
                        <span className="text-xs font-semibold text-brand">Đúng</span>
                      ) : languageStatuses[index] === false ? (
                        <span className="text-xs font-semibold text-danger">
                          Chưa đúng. Đáp án: {item.answer}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={checkAllLanguage}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Kiểm tra tất cả
                </button>
              </div>
            </div>
          ) : null}

          {learnDone ? (
            <div className="rounded-2xl border border-brand/25 bg-brand-soft/25 p-4 text-sm font-semibold text-brand">
              Bạn đã hoàn thành phần học. Hãy chuyển sang phần thực hành.
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-6">
          {sampleAnswerSection ? <SectionHtml html={sampleAnswerSection.html} /> : null}
          {commonMistakesSection ? <SectionHtml html={commonMistakesSection.html} /> : null}
          {guidedPracticeSection ? <SectionHtml html={guidedPracticeSection.html} /> : null}

          <div className="rounded-2xl border border-brand/20 bg-brand-soft/20 p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
              Đánh dấu hoàn thành guided practice
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Sau khi làm xong các bài tập trong phần guided practice, đánh dấu unit này là hoàn thành.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={guidedDone ? unmarkGuidedDone : markGuidedDone}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  guidedDone
                    ? "border border-line bg-surface text-ink hover:border-danger/30 hover:text-danger"
                    : "bg-brand px-4 py-2 text-white hover:bg-brand-dark"
                }`}
              >
                {guidedDone ? "Bỏ đánh dấu hoàn thành" : "Đánh dấu hoàn thành unit"}
              </button>
              {guidedDone ? (
                <span className="text-sm font-semibold text-brand">Đã hoàn thành guided practice</span>
              ) : null}
            </div>
          </div>

          {writeSection ? <SectionHtml html={writeSection.html} /> : null}

          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
              Bài viết của bạn
            </div>
            <textarea
              value={writeInput}
              onChange={(event) => setWriteInput(event.target.value)}
              rows={8}
              placeholder="Viết bài của bạn vào đây..."
              className="mt-3 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={checkWriting}
                disabled={!writeInput.trim()}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                So sánh với bài mẫu
              </button>
              <span className="text-xs text-muted">
                {writeInput.trim() ? `${tokenize(writeInput).length} từ` : "Chưa có nội dung"}
              </span>
              {writeChecked ? (
                <span className="text-sm font-semibold text-brand">Đã kiểm tra bài viết</span>
              ) : null}
            </div>
          </div>

          {writeChecked ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                      So sánh với bài mẫu
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      Từ màu xanh là phần bài mẫu bạn chưa viết. Từ gạch ngang là phần bạn viết
                      thêm so với bài mẫu.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-brand">
                      Khớp {diffStats.matchPercent}%
                    </span>
                    <span className="text-muted">{diffStats.missing} từ thiếu</span>
                    <span className="text-muted">{diffStats.extra} từ thêm</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-1.5 gap-y-2 rounded-xl border border-line bg-background p-4 text-sm leading-7">
                  {diff.map((token, index) => (
                    <span
                      key={`${token.type}-${index}`}
                      className={
                        token.type === "missing"
                          ? "rounded bg-brand-soft px-1 font-semibold text-brand"
                          : token.type === "extra"
                            ? "rounded bg-[#fde8e6] px-1 text-danger line-through"
                            : "text-ink"
                      }
                      title={
                        token.type === "missing"
                          ? "Có trong bài mẫu, chưa có trong bài của bạn"
                          : token.type === "extra"
                            ? "Bạn viết thêm so với bài mẫu"
                            : undefined
                      }
                    >
                      {token.text}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-brand-soft ring-1 ring-brand/20" />
                    Từ còn thiếu
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-[#fde8e6] ring-1 ring-danger/20" />
                    Từ viết thêm
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                      Rubric tự đánh giá
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      Chấm bài của bạn theo 4 tiêu chí. Điểm được lưu trên thiết bị này.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="display text-2xl text-ink">
                      {rubricTotal}
                      <span className="text-sm text-muted">/16</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-muted">
                      {ratedCount}/{RUBRIC_CRITERIA.length} tiêu chí
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {RUBRIC_CRITERIA.map((criterion) => {
                    const current = rubricScores[criterion.key] ?? 0;
                    return (
                      <div key={criterion.key} className="rounded-xl border border-line p-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div>
                            <div className="text-sm font-semibold text-ink">
                              {criterion.vi}{" "}
                              <span className="text-[11px] font-normal text-muted">
                                · {criterion.label}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                              {criterion.hint}
                            </p>
                          </div>
                          {current ? (
                            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand">
                              {current}/4
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                          {RUBRIC_LEVELS.map((level) => (
                            <button
                              key={level.value}
                              type="button"
                              onClick={() => setRubricScore(criterion.key, level.value)}
                              className={`rounded-lg border px-2 py-2 text-[11px] font-semibold transition-colors ${
                                current === level.value
                                  ? "border-brand bg-brand-soft text-brand"
                                  : "border-line bg-surface text-muted hover:border-brand/30 hover:text-ink"
                              }`}
                            >
                              {level.value} · {level.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {ratedCount === RUBRIC_CRITERIA.length ? (
                  <div className="mt-4 rounded-xl border border-brand/25 bg-brand-soft/25 p-4 text-sm font-semibold text-brand">
                    {rubricTotal >= 14
                      ? "Rất tốt! Bài viết đã ở mức xuất sắc."
                      : rubricTotal >= 10
                        ? "Khá tốt. Chú ý thêm các tiêu chí còn thấp để nâng điểm."
                        : "Đã có điểm khởi đầu. Hãy xem lại bài mẫu và thử viết lại."}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {checklistSection ? <SectionHtml html={checklistSection.html} /> : null}

          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Tiến độ unit
            </div>
            <div className="mt-4 space-y-3">
              {checklistItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500 ${
                    item.done
                      ? "border-brand/25 bg-brand-soft/20"
                      : "border-line bg-surface-muted/30"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                      item.done
                        ? "scale-100 bg-brand text-white"
                        : "scale-90 bg-surface-muted text-muted"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {item.done ? "check" : "radio_button_unchecked"}
                    </span>
                  </span>
                  <span
                    className={`text-sm font-semibold transition-colors duration-500 ${
                      item.done ? "text-ink" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            {checklistItems.every((item) => item.done) ? (
              <div className="mt-4 rounded-xl border border-brand/25 bg-brand-soft/25 p-4 text-sm font-semibold text-brand animate-pulse">
                Bạn đã hoàn thành unit này!
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
