"use client";

import { useState } from "react";
import type { getReviewItems } from "@/lib/learning";
import type { getVocabularyReview } from "@/lib/vocab-review";
import { ReviewPractice } from "@/components/review/ReviewPractice";
import { VocabularyReview } from "@/components/review/VocabularyReview";

type Tab = "vocabulary" | "questions";

type VocabularyData = Awaited<ReturnType<typeof getVocabularyReview>>;
type QuestionItems = Awaited<ReturnType<typeof getReviewItems>>;

export function ReviewHub({
  vocabulary,
  questions,
}: {
  vocabulary: VocabularyData;
  questions: QuestionItems;
}) {
  const [tab, setTab] = useState<Tab>(
    vocabulary.stats.dueCount > 0 || questions.length === 0 ? "vocabulary" : "questions",
  );

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-line bg-surface-muted p-1 sm:max-w-md">
        <button
          type="button"
          onClick={() => setTab("vocabulary")}
          className={`flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-xs font-semibold transition-colors ${
            tab === "vocabulary" ? "bg-surface text-ink shadow-sm" : "text-muted"
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">style</span>
          Từ vựng
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              vocabulary.stats.dueCount > 0
                ? "bg-brand text-white"
                : "bg-surface-muted text-muted"
            }`}
          >
            {vocabulary.stats.dueCount}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTab("questions")}
          className={`flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-xs font-semibold transition-colors ${
            tab === "questions" ? "bg-surface text-ink shadow-sm" : "text-muted"
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">quiz</span>
          Câu hỏi
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              questions.length > 0 ? "bg-gold text-white" : "bg-surface-muted text-muted"
            }`}
          >
            {questions.length}
          </span>
        </button>
      </div>

      {tab === "vocabulary" ? (
        <VocabularyReview data={vocabulary} />
      ) : (
        <ReviewPractice items={questions} />
      )}
    </div>
  );
}
