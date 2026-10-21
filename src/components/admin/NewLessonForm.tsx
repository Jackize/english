"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LevelOption {
  id: string;
  code: string;
  name: string;
}

export function NewLessonForm({
  levels,
  initialLevelId,
  initialTrack,
}: {
  levels: LevelOption[];
  initialLevelId?: string;
  initialTrack?: "grammar" | "vocabulary";
}) {
  const router = useRouter();
  const [levelId, setLevelId] = useState(initialLevelId ?? levels[0]?.id ?? "");
  const [track, setTrack] = useState<"grammar" | "vocabulary">(initialTrack ?? "grammar");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function create() {
    if (!levelId) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levelId, track, title }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Không thể tạo bài học");
      router.push(`/admin/lessons/${data.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Không thể tạo bài học");
      setLoading(false);
    }
  }

  return (
    <div className="card mx-auto max-w-2xl p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="display text-2xl text-ink">Tạo bài học mới</h2>
        <Link href="/admin" className="text-xs font-semibold text-muted hover:text-brand">
          ← Quản trị
        </Link>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">Cấp độ CEFR</label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {levels.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => setLevelId(level.id)}
                className={`rounded-xl border px-2 py-2 text-center transition-colors ${
                  levelId === level.id
                    ? "border-brand bg-brand-soft"
                    : "border-line bg-surface hover:border-brand/30"
                }`}
              >
                <div className="text-sm font-bold text-ink">{level.code}</div>
                <div className="text-[9px] text-muted">{level.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink">Loại bài học</label>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { key: "grammar" as const, label: "Ngữ pháp", icon: "rule" },
                { key: "vocabulary" as const, label: "Từ vựng", icon: "auto_stories" },
              ]
            ).map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setTrack(option.key)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left transition-colors ${
                  track === option.key
                    ? "border-brand bg-brand-soft"
                    : "border-line bg-surface hover:border-brand/30"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] text-brand">
                  {option.icon}
                </span>
                <span className="text-sm font-semibold text-ink">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="lesson-title" className="mb-2 block text-sm font-medium text-ink">
            Tên bài học
          </label>
          <input
            id="lesson-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={track === "grammar" ? "VD: Thì hiện tại đơn" : "VD: Từ vựng về du lịch"}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
          <p className="mt-1.5 text-[11px] text-muted">
            Bạn có thể đổi tên và thêm nội dung ở bước tiếp theo.
          </p>
        </div>

        {error ? <p className="text-sm text-danger">{error}</p> : null}

        <div className="flex justify-end gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink"
          >
            Huỷ
          </Link>
          <button
            type="button"
            onClick={create}
            disabled={loading || !levelId}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Đang tạo..." : "Tạo và soạn nội dung"}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
