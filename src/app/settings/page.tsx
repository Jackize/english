import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getOverview } from "@/lib/learning";
import { getLearnedVocabularyCount } from "@/lib/vocab-review";
import { LEVEL_META } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GoalSettings } from "@/components/settings/GoalSettings";
import { ResetProgressCard } from "@/components/settings/ResetProgressCard";

export const metadata = {
  title: "Cài đặt học tập · Eng Growth",
};

export default async function SettingsPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login?callbackUrl=/settings");

  const overview = await getOverview(session.user.id);
  const learnedWords = await getLearnedVocabularyCount(session.user.id);
  const target = overview.onboarding.targetLevel;
  const placement = overview.onboarding.placementLevel;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-12 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            <span className="material-symbols-outlined text-[15px]">settings</span>
            Cài đặt học tập
          </div>
          <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-4xl">
            Điều chỉnh <span className="display-accent text-brand">nhịp học của bạn.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Thay đổi mục tiêu hằng ngày hoặc thiết lập lại lộ trình bất cứ khi nào bạn muốn.
          </p>
        </section>

        <section className="mx-auto grid w-full max-w-[1120px] gap-5 px-5 pb-5 md:px-8 lg:grid-cols-[1fr_340px]">
          <GoalSettings
            initialLessons={overview.dailyGoal.targetLessons}
            initialMinutes={overview.dailyGoal.targetMinutes}
          />

          <aside className="space-y-4">
            <div className="card p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                Lộ trình hiện tại
              </div>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Cấp độ hướng tới</span>
                  <span className="font-semibold text-ink">
                    {target ? `${target} · ${LEVEL_META[target].name}` : "Chưa chọn"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Trình độ gợi ý</span>
                  <span className="font-semibold text-ink">
                    {placement ? `${placement} · ${LEVEL_META[placement].name}` : "Chưa kiểm tra"}
                  </span>
                </div>
              </div>
              <Link
                href="/onboarding"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                Thiết lập lại lộ trình
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="card p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                Vốn từ của bạn
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="display text-3xl text-ink">{learnedWords}</span>
                <span className="text-sm text-muted">từ đã học</span>
              </div>
              <Link
                href="/vocabulary/learned"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                Xem các từ đã học
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="rounded-2xl border border-brand/15 bg-brand-soft/40 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                Mẹo giữ nhịp
              </div>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted">
                <li>• Chọn mục tiêu bạn chắc chắn làm được cả tuần.</li>
                <li>• Học một bài ngắn vẫn tốt hơn bỏ cả ngày.</li>
                <li>• Dành 5 phút ôn câu sai sau mỗi buổi học.</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          <ResetProgressCard
            completedLessons={overview.completedLessons}
            learnedWords={learnedWords}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
