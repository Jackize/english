"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function SiteFooter() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-5 py-10 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold tracking-tight text-brand">eng-growth</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              IELTS A1 → C2
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Học theo từng chặng, nhớ theo từng bài. Kế hoạch theo ngày chia nhỏ ngữ pháp và từ
            vựng thành từng buổi học, có kiểm tra và ôn lại câu sai.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Lộ trình</div>
            <Link href="/roadmap" className="block text-ink hover:text-brand">
              Toàn bộ A1 → C2
            </Link>
            <Link href="/daily" className="block text-ink hover:text-brand">
              Học theo ngày
            </Link>
            <Link href="/grammar" className="block text-ink hover:text-brand">
              Ngữ pháp
            </Link>
            <Link href="/vocabulary" className="block text-ink hover:text-brand">
              Từ vựng
            </Link>
            <Link href="/reading" className="block text-ink hover:text-brand">
              Đọc hiểu
            </Link>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Tài khoản</div>
            <Link href="/review" className="block text-ink hover:text-brand">
              Ôn lại câu sai
            </Link>
            {user ? (
              <Link href="/admin" className="block text-ink hover:text-brand">
                Quản trị
              </Link>
            ) : (
              <>
                <Link href="/login" className="block text-ink hover:text-brand">
                  Đăng nhập
                </Link>
                <Link href="/register" className="block text-ink hover:text-brand">
                  Tạo tài khoản
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-line/70 px-5 py-4 text-center text-xs text-muted">
        © 2026 eng-growth. Học chậm mà chắc.
      </div>
    </footer>
  );
}
