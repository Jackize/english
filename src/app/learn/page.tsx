"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { CategoryList, type CategoryItem } from "@/components/learn/CategoryList";
import { DailyGoalBar } from "@/components/learn/DailyGoalBar";
import { Flashcard, type FlashcardWord } from "@/components/learn/Flashcard";

export default function LearnPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [documentSetName, setDocumentSetName] = useState<string>();
  const [word, setWord] = useState<FlashcardWord | null>(null);
  const [progress, setProgress] = useState({ reviewedToday: 0, dailyGoal: 10, streak: 0 });
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    const [catRes, studyRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/study"),
    ]);
    if (catRes.ok) {
      const catData = await catRes.json();
      setCategories(catData.categories);
      setDocumentSetName(catData.documentSetName);
    }
    if (studyRes.ok) {
      const studyData = await studyRes.json();
      setWord(studyData.word);
      setProgress(studyData.progress);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleReview(result: "know" | "hard" | "again") {
    if (!word) return;
    setLoading(true);
    await fetch("/api/study", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordId: word.id, result }),
    });
    setLoading(false);
    await loadData();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav active="learn" />
      <div className="mx-auto flex w-full max-w-[var(--spacing-container-max)] flex-1 px-gutter md:px-0">
        <CategoryList categories={categories} documentSetName={documentSetName} />
        <main className="flex flex-1 flex-col items-center py-lg">
          <DailyGoalBar
            reviewedToday={progress.reviewedToday}
            dailyGoal={progress.dailyGoal}
            streak={progress.streak}
          />
          {word ? (
            <Flashcard word={word} onReview={handleReview} loading={loading} />
          ) : (
            <div className="card-elevation w-full max-w-lg rounded-xl bg-white p-xl text-center">
              <span className="material-symbols-outlined mb-4 text-4xl text-on-surface-variant">menu_book</span>
              <h2 className="mb-2 text-xl font-semibold">No words to study</h2>
              <p className="mb-6 text-on-surface-variant">
                Import a Google Doc from the admin panel to get started.
              </p>
              <Link href="/admin/import" className="btn-primary inline-flex rounded-lg px-6 py-3 text-sm font-medium">
                Import Vocabulary
              </Link>
            </div>
          )}
          {progress.reviewedToday >= progress.dailyGoal && progress.dailyGoal > 0 && (
            <Link
              href="/milestones"
              className="mt-6 text-sm font-medium text-primary hover:underline"
            >
              Daily goal completed! View milestone →
            </Link>
          )}
        </main>
      </div>
    </div>
  );
}
