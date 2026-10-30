"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/layout/BrandLogo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Email hoặc mật khẩu không đúng.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  function fillDemo() {
    setEmail("demo@eng-growth.app");
    setPassword("demo1234");
    setError("");
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-5 md:px-8">
          <BrandLogo />
          <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
            Về trang chủ
          </Link>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-6 text-center">
            <h1 className="display text-3xl text-ink">Chào mừng trở lại</h1>
            <p className="mt-2 text-sm text-muted">
              Đăng nhập để tiếp tục hành trình A1 → C2 của bạn.
            </p>
          </div>

          <div className="card p-6 md:p-7">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="ban@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                id="password"
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-sm text-danger">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Button>
            </form>

            <div className="mt-5 rounded-xl border border-brand/15 bg-brand-soft/50 p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                    Tài khoản demo
                  </div>
                  <div className="mt-0.5 text-xs text-muted">demo@eng-growth.app · demo1234</div>
                </div>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="flex-shrink-0 rounded-full bg-surface px-3 py-1.5 text-[11px] font-semibold text-brand hover:bg-white"
                >
                  Điền nhanh
                </button>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-5 text-center text-sm text-muted">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="font-semibold text-brand hover:underline">
                Tạo tài khoản
              </Link>
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
            Bằng việc đăng nhập, bạn đồng ý lưu tiến độ học tập trên thiết bị này.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
