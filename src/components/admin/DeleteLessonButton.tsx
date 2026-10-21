"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteLessonButton({ lessonId, title }: { lessonId: string; title: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function remove() {
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/lessons/${lessonId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("delete failed");
      router.refresh();
    } catch {
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-muted transition-colors hover:bg-[#fde8e6] hover:text-danger"
      >
        Xoá
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={remove}
        disabled={deleting}
        className="rounded-full bg-[#fde8e6] px-2.5 py-1 text-[11px] font-semibold text-danger disabled:opacity-50"
      >
        {deleting ? "Đang xoá..." : `Xoá “${title.slice(0, 18)}${title.length > 18 ? "…" : ""}”`}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-full px-2 py-1 text-[11px] text-muted hover:text-ink"
      >
        Huỷ
      </button>
    </span>
  );
}
