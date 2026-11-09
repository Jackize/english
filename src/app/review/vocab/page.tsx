import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getVocabularyReview } from "@/lib/vocab-review";
import { VocabReviewSession } from "@/components/review/VocabReviewSession";

export const metadata = {
  title: "Ôn tập từ vựng",
};

export default async function VocabReviewPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login?callbackUrl=/review/vocab");

  const data = await getVocabularyReview(session.user.id);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-5 py-4">
          <Link
            href="/review"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-brand"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Ôn tập
          </Link>
          <span className="text-xs text-muted">{data.stats.dueCount} từ đến hạn</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8 pb-16">
        <div className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            Phiên ôn tập
          </div>
          <h1 className="display mt-1 text-2xl text-ink md:text-3xl">Từ vựng hôm nay</h1>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Tập trung vào từng từ. Hệ thống đã chọn sẵn nội dung và chiều bài tập cho bạn.
          </p>
        </div>

        <VocabReviewSession items={data.items} />
      </main>
    </div>
  );
}
