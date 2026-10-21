"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      setError("Account created but sign in failed. Please log in.");
      router.push("/login");
      return;
    }

    router.push("/learn");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen flex-grow items-center justify-center p-4 md:p-gutter">
      <div className="w-full max-w-md rounded-xl border border-outline-variant bg-surface-container-lowest p-6 elevation-1 md:p-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-primary">eng-growth</h1>
          <p className="text-lg text-on-surface-variant">Create your account to start learning.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            id="name"
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            Create Account
          </Button>
        </form>
        <div className="mt-8 border-t border-outline-variant pt-6 text-center">
          <p className="text-on-surface-variant">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-secondary-container">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
