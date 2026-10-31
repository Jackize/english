"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

const LESSON_OPTIONS = [1, 2, 3, 4, 5];
const MINUTE_OPTIONS = [10, 15, 20, 30, 45, 60];

export function GoalSettings({
  initialLessons,
  initialMinutes,
}: {
  initialLessons: number;
  initialMinutes: number;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [lessons, setLessons] = useState(initialLessons);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [saving, setSaving] = useState(false);

  const dirty = lessons !== initialLessons || minutes !== initialMinutes;

  async function save() {
    if (saving || !dirty) return;
    setSaving(true);
    try {
      const response = await fetch("/api/settings/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyGoalLessons: lessons, dailyGoalMinutes: minutes }),
      });
      if (!response.ok) throw new Error("Cannot save goal");
      showToast({
        variant: "success",
        title: "Đã cập nhật mục tiêu",
        description: `Mục tiêu mới: ${lessons} bài · ${minutes} phút mỗi ngày.`,
      });
      router.refresh();
    } catch {
      showToast({
        variant: "error",
        title: "Chưa lưu được mục tiêu",
        description: "Kiểm tra kết nối mạng rồi thử lại.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card p-6 md:p-7">
      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
        Mục tiêu hằng ngày
      </div>
      <h2 className="display mt-1 text-2xl text-ink">Điều chỉnh nhịp học</h2>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        Mục tiêu được dùng để tính tiến độ trên trang chủ và kế hoạch học hôm nay.
      </p>

      <div className="mt-6">
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

      <div className="mt-5">
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <span className="text-xs text-muted">
          {dirty ? "Bạn có thay đổi chưa lưu." : "Mục tiêu hiện tại đang được áp dụng."}
        </span>
        <button
          type="button"
          onClick={save}
          disabled={saving || !dirty}
          className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
          <span className="material-symbols-outlined text-[18px]">save</span>
        </button>
      </div>
    </div>
  );
}
