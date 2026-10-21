"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/learn";
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
      setError("Invalid email or password");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main className="flex min-h-screen flex-grow items-center justify-center p-4 md:p-gutter">
      <div className="w-full max-w-md rounded-xl border border-outline-variant bg-surface-container-lowest p-6 elevation-1 md:p-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-primary">eng-growth</h1>
          <p className="text-lg text-on-surface-variant">
            Welcome back. Please sign in to continue your learning journey.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            Sign In
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Button>
        </form>
        <div className="mt-8 border-t border-outline-variant pt-6 text-center">
          <p className="text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:text-secondary-container">
              Create one
            </Link>
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
