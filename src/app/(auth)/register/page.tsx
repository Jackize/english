"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useToast } from "@/components/ui/Toast";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        const message =
          data.error === "Email already registered"
            ? "Email này đã được đăng ký."
            : "Đăng ký thất bại. Vui lòng thử lại.";
        setError(message);
        showToast({ variant: "error", title: "Không thể đăng ký", description: message });
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", { email, password, redirect: false });
      setLoading(false);

      if (result?.error) {
        setError("Tài khoản đã tạo nhưng đăng nhập thất bại. Hãy đăng nhập lại.");
        router.push("/login");
        return;
      }

      showToast({ variant: "success", title: "Tạo tài khoản thành công" });
      router.push("/");
      router.refresh();
    } catch {
      setLoading(false);
      const message = "Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.";
      setError(message);
      showToast({
        variant: "error",
        title: "Không thể đăng ký",
        description: message,
      });
    }
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
        <div className="w-full max-w-[440px]">
          <div className="mb-6 text-center">
            <h1 className="display text-3xl text-ink">Bắt đầu hành trình</h1>
            <p className="mt-2 text-sm text-muted">
              Tạo tài khoản miễn phí để lưu tiến độ và ôn lại câu sai.
            </p>
          </div>

          <div className="card p-6 md:p-7">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                id="name"
                label="Tên của bạn"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                placeholder="Ít nhất 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              {error && <p className="text-sm text-danger">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Button>
            </form>

            <div className="mt-6 border-t border-line pt-5 text-center text-sm text-muted">
              Đã có tài khoản?{" "}
              <Link href="/login" className="font-semibold text-brand hover:underline">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
