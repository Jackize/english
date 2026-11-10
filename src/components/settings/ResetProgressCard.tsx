"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

const CONFIRM_TEXT = "XÓA";

export function ResetProgressCard({
  completedLessons,
  learnedWords,
}: {
  completedLessons: number;
  learnedWords: number;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const hasData = completedLessons > 0 || learnedWords > 0;
  const canDelete = hasData && confirmText.trim().toUpperCase() === CONFIRM_TEXT && !deleting;

  async function resetProgress() {
    if (!canDelete) return;
    setDeleting(true);
    try {
      const response = await fetch("/api/settings/reset-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: CONFIRM_TEXT }),
      });
      if (!response.ok) throw new Error("Cannot reset progress");

      setOpen(false);
      setConfirmText("");
      showToast({
        variant: "success",
        title: "Đã xoá dữ liệu học tập",
        description: "Tiến độ bài học, XP, chuỗi ngày và lịch ôn đã được đặt lại.",
      });
      router.refresh();
    } catch {
      showToast({
        variant: "error",
        title: "Chưa xoá được dữ liệu",
        description: "Kiểm tra kết nối mạng rồi thử lại.",
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-danger/20 bg-[#fdf7f6] p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-danger">
            <span className="material-symbols-outlined text-[16px]">warning</span>
            Vùng nguy hiểm
          </div>
          <h2 className="display mt-1 text-2xl text-ink">Xoá dữ liệu học tập</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Xoá sạch toàn bộ bài đã học của bạn: tiến độ bài học, lượt làm bài kiểm tra, XP, chuỗi
            ngày học, lịch ôn từ vựng và các câu hỏi từng trả lời sai. Tài khoản, mục tiêu hằng ngày
            và lộ trình vẫn được giữ nguyên.
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-muted">
            <span className="rounded-full bg-surface px-2.5 py-1 ring-1 ring-line">
              {completedLessons} bài đã hoàn thành
            </span>
            <span className="rounded-full bg-surface px-2.5 py-1 ring-1 ring-line">
              {learnedWords} từ đã học
            </span>
          </div>
        </div>

        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={!hasData}
            className="inline-flex items-center gap-2 rounded-full border border-danger/30 bg-surface px-5 py-2.5 text-sm font-semibold text-danger transition-colors hover:bg-[#fde8e6] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">delete_forever</span>
            Xoá dữ liệu học
          </button>
        ) : null}
      </div>

      {open ? (
        <div className="mt-5 rounded-xl border border-danger/20 bg-surface p-4">
          <label htmlFor="reset-confirm" className="text-xs font-semibold text-ink">
            Gõ <span className="font-bold text-danger">{CONFIRM_TEXT}</span> để xác nhận thao tác
            không thể hoàn tác này.
          </label>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              id="reset-confirm"
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              placeholder={CONFIRM_TEXT}
              className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-danger"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setConfirmText("");
                }}
                disabled={deleting}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-ink disabled:opacity-40 sm:flex-none"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={resetProgress}
                disabled={!canDelete}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-danger px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                {deleting ? "Đang xoá..." : "Xoá vĩnh viễn"}
                <span className="material-symbols-outlined text-[17px]">delete</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
