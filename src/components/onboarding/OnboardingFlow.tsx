"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import { PLACEMENT_QUESTIONS, scorePlacement } from "@/lib/placement";
import { ProgressBar } from "@/components/ui/Progress";
import { useToast } from "@/components/ui/Toast";

const LEVEL_CODES: LevelCode[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LESSON_OPTIONS = [1, 2, 3, 4, 5];
const MINUTE_OPTIONS = [10, 15, 20, 30, 45, 60];

interface OnboardingInitial {
  dailyGoalLessons: number;
  dailyGoalMinutes: number;
  targetLevel: LevelCode | null;
  placementLevel: LevelCode | null;
  onboarded: boolean;
}

export function OnboardingFlow({ initial }: { initial: OnboardingInitial }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState(0);
  const [lessons, setLessons] = useState(initial.dailyGoalLessons || 2);
  const [minutes, setMinutes] = useState(initial.dailyGoalMinutes || 20);
  const [targetLevel, setTargetLevel] = useState<LevelCode>(initial.targetLevel ?? "B1");

  const [testStarted, setTestStarted] = useState(false);
  const [testIndex, setTestIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [testTaken, setTestTaken] = useState(false);
  const savedPlacement = initial.placementLevel;

  const [saving, setSaving] = useState(false);

  const placement = useMemo(() => scorePlacement(answers), [answers]);
  const question = PLACEMENT_QUESTIONS[testIndex];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === PLACEMENT_QUESTIONS.length;

  function chooseAnswer(choiceId: string) {
    if (!question) return;
    setAnswers((previous) => ({ ...previous, [question.id]: choiceId }));
    if (testIndex < PLACEMENT_QUESTIONS.length - 1) {
      setTestIndex((value) => value + 1);
    }
  }

  async function save() {
    if (saving) return;
    setSaving(true);
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dailyGoalLessons: lessons,
          dailyGoalMinutes: minutes,
          targetLevel,
          placementLevel: testTaken ? placement.level : savedPlacement,
        }),
      });
      if (!response.ok) throw new Error("Cannot save onboarding");
      showToast({
        variant: "success",
        title: "Đã thiết lập lộ trình",
        description: "Mục tiêu học tập của bạn đã được lưu.",
      });
      router.push("/");
      router.refresh();
    } catch {
      showToast({
        variant: "error",
        title: "Chưa lưu được thiết lập",
        description: "Kiểm tra kết nối mạng rồi thử lại.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {["Mục tiêu", "Kiểm tra trình độ", "Kết quả"].map((label, index) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                index <= step ? "bg-brand text-white" : "bg-surface-muted text-muted"
              }`}
            >
              {index < step ? "✓" : index + 1}
            </span>
            <span
              className={`hidden text-xs font-semibold sm:block ${
                index <= step ? "text-ink" : "text-muted"
              }`}
            >
              {label}
            </span>
            {index < 2 ? (
              <span
                className={`h-px flex-1 ${index < step ? "bg-brand/40" : "bg-line"}`}
                aria-hidden
              />
            ) : null}
          </div>
        ))}
      </div>

      {step === 0 ? (
        <div className="card animate-rise p-6 md:p-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            Bước 1 · Mục tiêu học tập
          </div>
          <h2 className="display mt-2 text-3xl text-ink">Bạn muốn học bao nhiêu mỗi ngày?</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Mục tiêu nhỏ nhưng đều đặn hiệu quả hơn một buổi học dài mỗi tuần. Bạn có thể thay đổi
            bất cứ lúc nào trong phần cài đặt.
          </p>

          <div className="mt-7">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Số bài mỗi ngày
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {LESSON_OPTIONS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLessons(value)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    lessons === value
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-line bg-surface text-muted hover:border-brand/30 hover:text-ink"
                  }`}
                >
                  {value} bài
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Thời gian mỗi ngày
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {MINUTE_OPTIONS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMinutes(value)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    minutes === value
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-line bg-surface text-muted hover:border-brand/30 hover:text-ink"
                  }`}
                >
                  {value} phút
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Cấp độ bạn hướng tới
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {LEVEL_CODES.map((code) => {
                const meta = LEVEL_META[code];
                const active = targetLevel === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setTargetLevel(code)}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      active
                        ? "border-brand bg-brand-soft"
                        : "border-line bg-surface hover:border-brand/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-ink">{code}</span>
                      {active ? (
                        <span className="material-symbols-outlined text-[16px] text-brand">
                          check_circle
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted">{meta.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-muted">
              {lessons} bài · {minutes} phút mỗi ngày
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Tiếp tục
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      ) : step === 1 ? (
        <div className="card animate-rise p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Bước 2 · Kiểm tra trình độ
              </div>
              <h2 className="display mt-2 text-3xl text-ink">10 câu hỏi nhanh</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Không có áp lực — bài kiểm tra chỉ giúp gợi ý cấp độ phù hợp để bạn bắt đầu.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setTestTaken(false);
                setStep(2);
              }}
              className="text-xs font-semibold text-muted hover:text-brand"
            >
              Bỏ qua kiểm tra →
            </button>
          </div>

          {!testStarted ? (
            <div className="mt-6 rounded-2xl border border-line bg-surface-muted/30 p-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <span className="material-symbols-outlined text-[28px]">quiz</span>
              </span>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Bài kiểm tra gồm {PLACEMENT_QUESTIONS.length} câu trắc nghiệm từ A1 đến C2. Mỗi câu
                chỉ chọn một đáp án.
              </p>
              <button
                type="button"
                onClick={() => setTestStarted(true)}
                className="btn-primary mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                Bắt đầu kiểm tra
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted">
                <span>
                  Câu {testIndex + 1}/{PLACEMENT_QUESTIONS.length}
                </span>
                <span>{answeredCount} đã trả lời</span>
              </div>
              <ProgressBar value={(answeredCount / PLACEMENT_QUESTIONS.length) * 100} />

              <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Chọn đáp án đúng
              </div>
              <h3 className="display mt-2 text-2xl leading-snug text-ink">{question.prompt}</h3>

              <div className="mt-5 space-y-2.5">
                {question.choices.map((choice, index) => {
                  const active = answers[question.id] === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => chooseAnswer(choice.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                        active
                          ? "border-brand bg-brand-soft"
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
                      {active ? (
                        <span className="material-symbols-outlined ml-auto text-[18px] text-brand">
                          check_circle
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={testIndex === 0}
                  onClick={() => setTestIndex((value) => Math.max(0, value - 1))}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-ink disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Trước
                </button>

                {testIndex < PLACEMENT_QUESTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setTestIndex((value) => value + 1)}
                    className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    Câu tiếp theo
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!allAnswered}
                    onClick={() => {
                      setTestTaken(true);
                      setStep(2);
                    }}
                    className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Xem kết quả
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="text-sm font-semibold text-muted hover:text-brand"
            >
              ← Quay lại mục tiêu
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-sm font-semibold text-brand hover:underline"
            >
              Đến bước cuối →
            </button>
          </div>
        </div>
      ) : (
        <div className="card animate-rise p-6 md:p-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            Bước 3 · Sẵn sàng học
          </div>
          <h2 className="display mt-2 text-3xl text-ink">Lộ trình của bạn đã sẵn sàng</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Hệ thống đã ghi nhận mục tiêu. Bạn có thể bắt đầu ngay từ bài đầu tiên phù hợp.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface-muted/30 p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                Mục tiêu ngày
              </div>
              <div className="mt-1 text-lg font-bold text-ink">
                {lessons} bài · {minutes} phút
              </div>
            </div>
            <div className="rounded-xl border border-line bg-surface-muted/30 p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                Cấp độ hướng tới
              </div>
              <div className="mt-1 text-lg font-bold text-ink">
                {targetLevel} · {LEVEL_META[targetLevel].name}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-surface-muted/30 p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                Trình độ hiện tại
              </div>
              <div className="mt-1 text-lg font-bold text-ink">
                {testTaken
                  ? `${placement.level} · ${placement.score}/${placement.total}`
                  : savedPlacement
                    ? `${savedPlacement} · đã lưu`
                    : "Chưa kiểm tra"}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-brand/20 bg-brand-soft/25 p-5">
            <div className="text-sm font-semibold text-ink">
              {testTaken
                ? `Nên bắt đầu từ ${placement.level} để xây nền vững chắc.`
                : savedPlacement
                  ? `Giữ trình độ đã kiểm tra trước đó: ${savedPlacement}.`
                  : "Bạn có thể bắt đầu từ cấp độ đã chọn và điều chỉnh sau."}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {initial.onboarded
                ? "Bạn đang cập nhật lại thiết lập. Các tiến độ học trước đó vẫn được giữ nguyên."
                : "Sau khi hoàn tất, bạn sẽ thấy mục tiêu hằng ngày trên trang chủ và trong kế hoạch học."}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm font-semibold text-muted hover:text-brand"
            >
              ← Làm lại kiểm tra
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {saving ? "Đang lưu..." : "Bắt đầu học"}
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
