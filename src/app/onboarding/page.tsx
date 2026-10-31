import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getOverview } from "@/lib/learning";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export const metadata = {
  title: "Thiết lập lộ trình · Eng Growth",
};

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login?callbackUrl=/onboarding");

  const overview = await getOverview(session.user.id);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-12 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            <span className="material-symbols-outlined text-[15px]">explore</span>
            Bắt đầu hành trình
          </div>
          <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-5xl">
            Một lộ trình <span className="display-accent text-brand">dành riêng cho bạn.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Chọn mục tiêu mỗi ngày và làm bài kiểm tra ngắn để biết nên bắt đầu từ đâu. Bạn có thể
            thay đổi mọi thiết lập sau này.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[820px] px-5 pb-20 md:px-8">
          <OnboardingFlow
            initial={{
              dailyGoalLessons: overview.dailyGoal.targetLessons,
              dailyGoalMinutes: overview.dailyGoal.targetMinutes,
              targetLevel: overview.onboarding.targetLevel,
              placementLevel: overview.onboarding.placementLevel,
              onboarded: overview.onboarding.completed,
            }}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
