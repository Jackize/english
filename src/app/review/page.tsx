import { getSession } from "@/lib/auth";
import { getReviewItems } from "@/lib/learning";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ReviewPractice } from "@/components/review/ReviewPractice";

export default async function ReviewPage() {
  const session = await getSession();
  const items = session?.user?.id ? await getReviewItems(session.user.id) : [];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="review" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-12 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            <span className="material-symbols-outlined text-[15px]">history</span>
            Ôn lại câu sai
          </div>
          <h1 className="display max-w-2xl text-[30px] leading-tight text-ink md:text-4xl">
            Sai một lần, <span className="display-accent text-brand">nhớ một đời.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Mỗi câu trả lời sai trong bài kiểm tra được lưu lại. Trả lời đúng ở đây để đánh dấu đã
            xử lý — danh sách sẽ ngắn dần theo tiến độ của bạn.
          </p>
          {items.length > 0 ? (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-muted px-3 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {items.length} câu đang chờ ôn
            </div>
          ) : null}
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          <ReviewPractice items={items} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
