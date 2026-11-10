import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getLearnedVocabulary } from "@/lib/vocab-review";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LearnedVocabulary } from "@/components/vocabulary/LearnedVocabulary";

export const metadata = {
  title: "Từ đã học · Eng Growth",
};

export default async function LearnedVocabularyPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login?callbackUrl=/vocabulary/learned");

  const words = await getLearnedVocabulary(session.user.id);
  const mastered = words.filter((word) => word.level === 5).length;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="learned" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-12 md:px-8">
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
            <Link href="/vocabulary" className="hover:text-brand">
              Từ vựng
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-ink">Từ đã học</span>
          </nav>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                Vốn từ của bạn
              </div>
              <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-5xl">
                Những từ bạn <span className="display-accent text-brand">đã học.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                Tất cả từ đã đi qua bài học hoặc bài kiểm tra của bạn, kèm nghĩa, phiên âm, ví dụ và
                mức ghi nhớ hiện tại. Bạn có thể tìm lại bất cứ từ nào.
              </p>
            </div>

            <div className="grid w-full max-w-xs grid-cols-2 divide-x divide-line rounded-xl border border-line bg-surface p-4">
              <div className="pr-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Đã học
                </div>
                <div className="display mt-1 text-2xl text-ink">{words.length}</div>
                <div className="text-[11px] text-muted">từ</div>
              </div>
              <div className="pl-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Đã phản xạ
                </div>
                <div className="display mt-1 text-2xl text-brand">{mastered}</div>
                <div className="text-[11px] text-muted">từ</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <Link
              href="/review"
              className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">history</span>
              Ôn tập từ vựng đến hạn
            </Link>
            <Link
              href="/vocabulary"
              className="inline-flex items-center gap-1.5 font-semibold text-muted transition-colors hover:text-brand"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Học thêm từ mới
            </Link>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          <LearnedVocabulary words={words} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
