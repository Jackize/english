import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { auth } from "@/lib/auth";
import { getTodayProgress } from "@/lib/study-service";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MilestonesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const progress = await getTodayProgress(user.id, user.dailyGoal);
  const mastered = await prisma.userWordProgress.count({
    where: { userId: user.id, status: "mastered" },
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav active="learn" />
      <main className="mx-auto flex w-full max-w-lg flex-grow flex-col items-center justify-center px-gutter py-xl text-center">
        <div className="card-elevation w-full rounded-3xl bg-white p-xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-green-light">
            <span className="material-symbols-outlined text-4xl text-accent-green-dark">emoji_events</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-on-surface">
            {progress.completed ? "Daily Goal Completed!" : "Keep Going!"}
          </h1>
          <p className="mb-6 text-on-surface-variant">
            {progress.completed
              ? `You reviewed ${progress.reviewedToday} words today. Amazing work!`
              : `You've reviewed ${progress.reviewedToday} of ${progress.dailyGoal} words today.`}
          </p>
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-surface-container-low p-4">
              <p className="text-2xl font-bold text-primary">{user.streak}</p>
              <p className="text-xs text-on-surface-variant">Day Streak</p>
            </div>
            <div className="rounded-xl bg-surface-container-low p-4">
              <p className="text-2xl font-bold text-primary">{mastered}</p>
              <p className="text-xs text-on-surface-variant">Words Mastered</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/learn" className="btn-primary rounded-lg px-6 py-3 text-sm font-medium">
              Continue Learning
            </Link>
            <Link
              href="/review"
              className="rounded-lg border-[1.5px] border-outline-variant px-6 py-3 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low"
            >
              View Review History
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
