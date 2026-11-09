import { getSession } from "@/lib/auth";
import { getReviewItems } from "@/lib/learning";
import { VOCAB_REVIEW_LEVELS, getVocabularyReview } from "@/lib/vocab-review";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ReviewHub } from "@/components/review/ReviewHub";

export default async function ReviewPage() {
  const session = await getSession();
  const userId = session?.user?.id;

  let items: Awaited<ReturnType<typeof getReviewItems>> = [];
  let vocabulary: Awaited<ReturnType<typeof getVocabularyReview>> = {
    items: [],
    stats: {
      total: 0,
      dueCount: 0,
      counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      lowestLevel: null,
      suggestedIntervalDays: null,
      nextDueAt: null,
    },
    levels: VOCAB_REVIEW_LEVELS,
  };

  if (userId) {
    // Chạy tuần tự vì Prisma client chỉ mở 1 connection (giới hạn pooler
    // của Supabase). Chạy song song dễ vượt connectionTimeoutMillis khi DB chậm.
    items = await getReviewItems(userId);
    vocabulary = await getVocabularyReview(userId);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="review" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-12 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            <span className="material-symbols-outlined text-[15px]">history</span>
            Ôn tập thông minh
          </div>
          <h1 className="display max-w-2xl text-[30px] leading-tight text-ink md:text-4xl">
            Ôn đúng lúc, <span className="display-accent text-brand">nhớ lâu hơn.</span>
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            Từ vựng được ôn theo chu kỳ giãn cách: trả lời đúng thì lần ôn sau xa hơn, sai thì ôn
            lại sớm. Câu hỏi trắc nghiệm từng sai cũng được ôn giãn cách riêng.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
            {vocabulary.stats.dueCount > 0 ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-muted px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {vocabulary.stats.dueCount} từ vựng đến hạn hôm nay
              </span>
            ) : null}
            {items.length > 0 ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-muted px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {items.length} câu hỏi đến hạn ôn
              </span>
            ) : null}
            {vocabulary.stats.total === 0 && items.length === 0 ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-muted px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                Chưa có nội dung đến hạn
              </span>
            ) : null}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          <ReviewHub vocabulary={vocabulary} questions={items} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
