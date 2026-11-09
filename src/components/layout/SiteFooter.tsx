"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { BrandLogo } from "./BrandLogo";

const linkClass = "block text-white/75 transition-colors hover:text-white";

export function SiteFooter() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <footer className="mt-24 bg-brand-dark text-white">
      <div className="mx-auto grid w-full max-w-[1120px] gap-12 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <BrandLogo variant="placeholder" tone="inverse" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            Học theo từng chặng, nhớ theo từng bài. Kế hoạch theo ngày chia nhỏ ngữ pháp và từ
            vựng thành từng buổi học, có kiểm tra và ôn lại câu sai.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="eyebrow !text-mint">Lộ trình</div>
          <Link href="/roadmap" className={linkClass}>
            Toàn bộ A1 → C2
          </Link>
          <Link href="/daily" className={linkClass}>
            Học theo ngày
          </Link>
          <Link href="/grammar" className={linkClass}>
            Ngữ pháp
          </Link>
          <Link href="/vocabulary" className={linkClass}>
            Từ vựng
          </Link>
          <Link href="/reading" className={linkClass}>
            Đọc hiểu
          </Link>
          <Link href="/writing" className={linkClass}>
            Viết
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <div className="eyebrow !text-mint">Tài khoản</div>
          <Link href="/review" className={linkClass}>
            Ôn tập từ vựng & câu sai
          </Link>
          {user?.role === "ADMIN" ? (
            <Link href="/admin" className={linkClass}>
              Quản trị
            </Link>
          ) : null}
          {!user ? (
            <>
              <Link href="/login" className={linkClass}>
                Đăng nhập
              </Link>
              <Link href="/register" className={linkClass}>
                Tạo tài khoản
              </Link>
            </>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/60 md:px-8">
        © 2026 eng-growth. Học chậm mà chắc.
      </div>
    </footer>
  );
}
