"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { Flashcard, type FlashcardWord } from "@/components/learn/Flashcard";

export default function ReviewSessionPage() {
  const [word, setWord] = useState<FlashcardWord | null>(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadWord = useCallback(async () => {
    const res = await fetch("/api/study");
    if (res.ok) {
      const data = await res.json();
      setWord(data.word);
    }
  }, []);

  useEffect(() => {
    loadWord();
  }, [loadWord]);

  async function handleReview(result: "know" | "hard" | "again") {
    if (!word) return;
    setLoading(true);
    await fetch("/api/study", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordId: word.id, result }),
    });
    setCount((c) => c + 1);
    setLoading(false);
    await loadWord();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav active="review" />
      <main className="mx-auto flex w-full max-w-[var(--spacing-container-max)] flex-grow flex-col items-center px-gutter py-lg">
        <div className="mb-6 flex w-full max-w-lg items-center justify-between">
          <Link href="/review" className="text-sm text-on-surface-variant hover:text-primary">
            ← Back to History
          </Link>
          <span className="text-sm font-medium text-on-surface-variant">Reviewed: {count}</span>
        </div>
        {word ? (
          <Flashcard word={word} onReview={handleReview} loading={loading} />
        ) : (
          <div className="card-elevation w-full max-w-lg rounded-xl bg-white p-xl text-center">
            <span className="material-symbols-outlined mb-4 text-4xl text-accent-green-dark">celebration</span>
            <h2 className="mb-2 text-xl font-semibold">Review session complete!</h2>
            <p className="mb-6 text-on-surface-variant">You reviewed {count} words.</p>
            <Link href="/review" className="btn-primary inline-flex rounded-lg px-6 py-3 text-sm font-medium">
              Back to History
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
