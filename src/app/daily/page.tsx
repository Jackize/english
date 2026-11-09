import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getDailyPlan, type DailyDay } from "@/lib/daily-plan";
import { getOverview } from "@/lib/learning";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DailyTaskRow } from "@/components/learning/DailyTaskRow";
import { DailyGoalCard } from "@/components/learning/DailyGoalCard";
import { ProgressBar } from "@/components/ui/Progress";

export default async function DailyPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; week?: string }>;
}) {
  const session = await getSession();
  const overview = await getOverview(session?.user?.id);
  const params = await searchParams;
  const requested =
    typeof params.level === "string" ? params.level.toUpperCase() : null;
  const matchedLevel = overview.levels.find((level) => level.code === requested);
  const plan = getDailyPlan(overview, matchedLevel?.code ?? null);
  const requestedWeek = params.week ? Number(params.week) : null;
  const activeCode = plan?.levelCode ?? matchedLevel?.code ?? null;
  const weeks = plan
    ? Array.from({ length: Math.ceil(plan.days.length / 5) }, (_, index) =>
        plan.days.slice(index * 5, index * 5 + 5),
      )
    : [];
  const visibleWeeks =
    plan && requestedWeek && requestedWeek >= 1 && requestedWeek <= weeks.length
      ? [weeks[requestedWeek - 1]]
      : weeks;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="daily" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-14 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                Kế hoạch theo ngày
              </div>
              <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-5xl">
                Mỗi ngày một <span className="display-accent text-brand">mục tiêu nhỏ.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {plan
                  ? `${plan.levelCode} được chia thành ${plan.totalDays} ngày. Mỗi ngày có 1 bài ngữ pháp, kết hợp 1 chủ đề từ vựng; những ngày cuối chỉ còn ngữ pháp. Trung bình khoảng ${plan.estimatedMinutes > 0 ? Math.round(plan.estimatedMinutes / Math.max(plan.totalDays, 1)) : 0} phút/ngày.`
                  : "Chọn một cấp độ để xem kế hoạch học theo ngày."}
              </p>
            </div>

            {plan ? (
              <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4">
                <div className="flex items-end justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Tiến độ kế hoạch
                  </span>
                  <span className="text-sm font-semibold text-brand">{plan.percent}%</span>
                </div>
                <div className="display mt-1 text-2xl text-ink">
                  {plan.completedDays}
                  <span className="text-base text-muted">/{plan.totalDays} ngày</span>
                </div>
                <ProgressBar value={plan.percent} className="mt-3" />
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                  <span>
                    {plan.completedLessons}/{plan.totalLessons} bài
                  </span>
                  <span>
                    {plan.grammarCount} ngữ pháp · {plan.vocabularyCount} từ vựng
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
            {overview.levels.map((level) => (
              <Link
                key={level.id}
                href={`/daily?level=${level.code}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  activeCode === level.code
                    ? "bg-brand text-white"
                    : "border border-line bg-surface text-muted hover:text-brand"
                }`}
              >
                <span className="mr-1">{level.code}</span>
                <span className={activeCode === level.code ? "opacity-80" : "opacity-70"}>
                  {level.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {session?.user ? (
          <section className="mx-auto w-full max-w-[1120px] px-5 pb-6 md:px-8">
            <DailyGoalCard
              goal={overview.dailyGoal}
              streak={overview.streak}
              xp={overview.xp}
            />
          </section>
        ) : null}

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          {plan && plan.currentDay ? (
            <div className="card overflow-hidden border-brand/20 bg-brand-soft/10">
              <div className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-7">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                    Mục tiêu hiện tại · {plan.levelCode}
                  </div>
                  <div className="mt-1 flex flex-wrap items-baseline gap-3">
                    <h2 className="display text-3xl text-ink md:text-4xl">
                      Ngày {plan.currentDay.day}
                    </h2>
                    <span className="text-sm text-muted">/ {plan.totalDays} ngày</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {plan.currentDay.tasks.length} bài · khoảng {plan.currentDay.estimatedMinutes} phút ·{" "}
                    +{plan.currentDay.xp} XP
                  </p>
                </div>
                {plan.nextTask ? (
                  <Link
                    href={`/lesson/${plan.nextTask.lesson.id}`}
                    className="btn-primary inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    Học bài tiếp theo
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                ) : null}
              </div>
              <div className="grid gap-2 border-t border-brand/10 p-4 sm:grid-cols-2 md:p-5">
                {plan.currentDay.tasks.map((task) => (
                  <DailyTaskRow key={task.lesson.id} task={task} />
                ))}
              </div>
            </div>
          ) : plan && plan.days.length > 0 ? (
            <div className="card p-8 text-center md:p-10">
              <div className="text-4xl">🎉</div>
              <h2 className="display mt-3 text-2xl text-ink md:text-3xl">
                Bạn đã hoàn thành kế hoạch {plan.levelCode}!
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
                Hãy dành thêm vài phút ôn lại từ vựng theo lịch giãn cách và những câu đã từng trả
                lời sai để kiến thức thật sự chắc.
              </p>
              <Link
                href="/review"
                className="btn-primary mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Ôn tập kiến thức
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          ) : (
            <div className="card p-8 text-center">
              <h2 className="display text-2xl text-ink">Cấp độ này chưa có bài học</h2>
              <p className="mt-2 text-sm text-muted">
                Nội dung đang được cập nhật. Bạn có thể quay lại lộ trình để chọn cấp độ khác.
              </p>
              <Link
                href="/roadmap"
                className="mt-5 inline-flex text-sm font-semibold text-brand hover:underline"
              >
                Xem lộ trình →
              </Link>
            </div>
          )}

          {plan && weeks.length > 1 ? (
            <div className="no-scrollbar mt-8 mb-10 flex gap-2 overflow-x-auto border-t border-line/60 pt-6 pb-1">
              <Link
                href={`/daily?level=${plan.levelCode}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  !requestedWeek ? "bg-brand text-white" : "border border-line bg-surface text-muted hover:text-brand"
                }`}
              >
                Tất cả tuần
              </Link>
              {weeks.map((_, index) => (
                <Link
                  key={index}
                  href={`/daily?level=${plan.levelCode}&week=${index + 1}`}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    requestedWeek === index + 1
                      ? "bg-brand text-white"
                      : "border border-line bg-surface text-muted hover:text-brand"
                  }`}
                >
                  Tuần {index + 1}
                </Link>
              ))}
            </div>
          ) : null}

          {plan && plan.days.length > 0 ? (
            <div className="mt-10 space-y-9">
              {visibleWeeks.map((week) => {
                const weekIndex = weeks.indexOf(week);
                const completedInWeek = week.filter((day) => day.completed).length;
                return (
                  <section key={week[0].day}>
                    <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                          Tuần {weekIndex + 1}
                        </div>
                        <h2 className="display text-xl text-ink">
                          Ngày {week[0].day}–{week[week.length - 1].day}
                        </h2>
                      </div>
                      <span className="text-[11px] text-muted">
                        {completedInWeek}/{week.length} ngày hoàn thành
                      </span>
                    </div>
                    <div className="grid gap-3 lg:grid-cols-2">
                      {week.map((day) => (
                        <DayCard
                          key={day.day}
                          day={day}
                          current={plan.currentDay?.day === day.day}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : null}

          <div className="mt-10 flex flex-col items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 text-center sm:flex-row sm:text-left">
            <div>
              <div className="text-sm font-semibold text-ink">Mẹo học theo ngày</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Học lý thuyết trước, đánh dấu đã học rồi làm bài kiểm tra. Nếu một ngày có 2 bài,
                hãy chia thành 2 phiên 10–15 phút.
              </p>
            </div>
            <Link href="/review" className="text-sm font-semibold text-brand hover:underline">
              Ôn câu sai →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function DayCard({ day, current }: { day: DailyDay; current: boolean }) {
  const status = day.completed ? "Hoàn thành" : day.started ? "Đang học" : "Chưa bắt đầu";
  const statusClass = day.completed
    ? "bg-brand-soft text-brand"
    : day.started
      ? "bg-[#fdf3e2] text-gold"
      : "bg-surface-muted text-muted";

  return (
    <article
      className={`card overflow-hidden ${
        current ? "border-brand/40 bg-brand-soft/20" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
              day.completed
                ? "bg-brand text-white"
                : current
                  ? "bg-brand-soft text-brand"
                  : "bg-surface-muted text-muted"
            }`}
          >
            {day.completed ? (
              <span className="material-symbols-outlined text-[17px]">check</span>
            ) : (
              day.day
            )}
          </span>
          <div>
            <div className="text-sm font-bold text-ink">Ngày {day.day}</div>
            <div className="text-[10px] text-muted">
              {day.tasks.length} bài · khoảng {day.estimatedMinutes} phút
            </div>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusClass}`}>
          {status}
        </span>
      </div>

      <div className="space-y-2 p-3">
        {day.tasks.map((task) => (
          <DailyTaskRow key={task.lesson.id} task={task} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[10px] text-muted">
        <span>
          {day.questionCount} câu hỏi
          {day.wordCount > 0 ? ` · ${day.wordCount} từ` : ""}
        </span>
        <span>+{day.xp} XP</span>
      </div>
    </article>
  );
}
