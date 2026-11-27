"use client"; // Error boundary phải là Client Component.

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="card w-full max-w-lg p-6 text-center md:p-8">
        <span
          className="material-symbols-outlined text-[40px] text-danger"
          aria-hidden="true"
        >
          cloud_off
        </span>
        <h1 className="display mt-3 text-2xl text-ink md:text-[28px]">
          Không tải được trang này
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Máy chủ không trả về dữ liệu học của bạn. Tiến độ đã lưu vẫn còn nguyên. Hãy thử tải
          lại, nếu vẫn lỗi thì đợi vài phút rồi quay lại.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-muted">Mã lỗi: {error.digest}</p>
        ) : null}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="btn-primary inline-flex min-h-11 cursor-pointer items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white"
          >
            Thử tải lại
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}
