"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TopNav } from "@/components/layout/TopNav";
import { CategoryList, type CategoryItem } from "@/components/learn/CategoryList";
import { DailyGoalBar } from "@/components/learn/DailyGoalBar";
import { Flashcard, type FlashcardWord } from "@/components/learn/Flashcard";

export default function CategoryLearnPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [documentSetName, setDocumentSetName] = useState<string>();
  const [word, setWord] = useState<FlashcardWord | null>(null);
  const [progress, setProgress] = useState({ reviewedToday: 0, dailyGoal: 10, streak: 0 });
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    const [catRes, studyRes] = await Promise.all([
      fetch("/api/categories"),
      fetch(`/api/study?category=${slug}`),
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
  }, [slug]);

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

  const categoryName = categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav active="learn" />
      <div className="mx-auto flex w-full max-w-[var(--spacing-container-max)] flex-1 px-gutter md:px-0">
        <CategoryList categories={categories} activeSlug={slug} documentSetName={documentSetName} />
        <main className="flex flex-1 flex-col items-center py-lg">
          <p className="mb-4 text-sm text-on-surface-variant">{categoryName}</p>
          <DailyGoalBar
            reviewedToday={progress.reviewedToday}
            dailyGoal={progress.dailyGoal}
            streak={progress.streak}
          />
          {word ? (
            <Flashcard word={word} onReview={handleReview} loading={loading} />
          ) : (
            <div className="card-elevation w-full max-w-lg rounded-xl bg-white p-xl text-center">
              <h2 className="mb-2 text-xl font-semibold">All caught up in this category!</h2>
              <Link href="/learn" className="text-sm font-medium text-primary hover:underline">
                Study all categories →
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
