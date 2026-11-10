import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getDailyPlan, type DailyDay, type DailyPlan, type DailyTask } from "@/lib/daily-plan";
import { getOverview } from "@/lib/learning";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DailyGoalCard } from "@/components/learning/DailyGoalCard";
import { ProgressBar } from "@/components/ui/Progress";

const container = "mx-auto w-full max-w-[1120px] px-5 md:px-8";
const WEEK_LENGTH = 5;

export default async function DailyPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; week?: string }>;
}) {
  const session = await getSession();
  const overview = await getOverview(session?.user?.id);
  const params = await searchParams;
  const requested = typeof params.level === "string" ? params.level.toUpperCase() : null;
  const matchedLevel = overview.levels.find((level) => level.code === requested);
  const plan = getDailyPlan(overview, matchedLevel?.code ?? null);
  const activeCode = plan?.levelCode ?? matchedLevel?.code ?? null;

  const weeks = plan
    ? Array.from({ length: Math.ceil(plan.days.length / WEEK_LENGTH) }, (_, index) =>
        plan.days.slice(index * WEEK_LENGTH, index * WEEK_LENGTH + WEEK_LENGTH),
      )
    : [];
  const currentWeekIndex = plan?.currentDay
    ? Math.floor((plan.currentDay.day - 1) / WEEK_LENGTH)
    : Math.max(weeks.length - 1, 0);
  const requestedWeek = params.week ? Number(params.week) : null;
  const weekIndex =
    requestedWeek && requestedWeek >= 1 && requestedWeek <= weeks.length
      ? requestedWeek - 1
      : currentWeekIndex;
  const week = weeks[weekIndex] ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="daily" />
      <main className="flex-1 pb-6">
        {/* Intro: one line of purpose, the level switch, the plan's numbers */}
        <section className={`${container} pt-8 md:pt-14`}>
          <div className="eyebrow inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px]">calendar_month</span>
            Kế hoạch theo ngày
          </div>
          <h1 className="display mt-3 max-w-2xl text-[30px] text-ink sm:text-[38px] md:text-[46px]">
            Mỗi ngày một <span className="display-accent">mục tiêu nhỏ.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {plan
              ? `${plan.levelCode} có ${plan.totalDays} ngày học. Mỗi ngày gồm một bài ngữ pháp và một chủ đề từ vựng, khoảng ${plan.totalDays > 0 ? Math.round(plan.estimatedMinutes / plan.totalDays) : 0} phút.`
              : "Chọn một cấp độ để xem kế hoạch học theo ngày."}
          </p>

          <nav aria-label="Chọn cấp độ" className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {overview.levels.map((level) => {
              const current = activeCode === level.code;
              return (
                <Link
                  key={level.id}
                  href={`/daily?level=${level.code}`}
                  aria-current={current ? "page" : undefined}
                  className={`flex min-h-11 flex-col justify-center rounded-2xl px-3 py-2 text-left transition-colors ${
                    current
                      ? "bg-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                      : "border border-line bg-surface text-ink hover:border-brand/40 hover:text-brand"
                  }`}
                >
                  <span className="text-sm font-bold">{level.code}</span>
                  <span className={`truncate text-xs ${current ? "text-white/80" : "text-muted"}`}>
                    {level.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </section>

        {plan ? (
          <section className={`${container} mt-6`}>
            <div className="card grid grid-cols-3 divide-x divide-line overflow-hidden">
              <Stat label="Ngày" value={`${plan.completedDays}/${plan.totalDays}`} />
              <Stat label="Bài" value={`${plan.completedLessons}/${plan.totalLessons}`} />
              <Stat label="Tiến độ" value={`${plan.percent}%`} brand />
              <div className="col-span-3 border-t border-line px-4 py-3 md:px-5">
                <ProgressBar value={plan.percent} />
                <div className="mt-2 flex items-center justify-between text-xs text-muted">
                  <span>
                    {plan.grammarCount} ngữ pháp · {plan.vocabularyCount} từ vựng
                  </span>
                  <span>{plan.levelName}</span>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {session?.user ? (
          <section className={`${container} mt-5`}>
            <DailyGoalCard goal={overview.dailyGoal} streak={overview.streak} xp={overview.xp} />
          </section>
        ) : null}

        {/* Today */}
        <section className={`${container} mt-6 md:mt-8`}>
          {plan && plan.currentDay ? (
            <TodayCard plan={plan} day={plan.currentDay} />
          ) : plan && plan.days.length > 0 ? (
            <div className="card-elevated p-7 text-center md:p-10">
              <div className="text-4xl">🎉</div>
              <h2 className="display mt-3 text-2xl text-ink md:text-3xl">
                Bạn đã hoàn thành kế hoạch {plan.levelCode}!
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
                Hãy dành thêm vài phút ôn lại từ vựng theo lịch giãn cách và những câu đã từng trả lời
                sai để kiến thức thật sự chắc.
              </p>
              <Link
                href="/review"
                className="btn-primary mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                Ôn tập kiến thức
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          ) : (
            <div className="card p-7 text-center md:p-8">
              <h2 className="display text-2xl text-ink">Cấp độ này chưa có bài học</h2>
              <p className="mt-2 text-sm text-muted">
                Nội dung đang được cập nhật. Bạn có thể quay lại lộ trình để chọn cấp độ khác.
              </p>
              <Link href="/roadmap" className="link-underline mt-5 inline-flex text-sm font-semibold text-brand">
                Xem lộ trình →
              </Link>
            </div>
          )}
        </section>

        {/* One week at a time */}
        {plan && weeks.length > 0 ? (
          <section className={`${container} mt-12 md:mt-16`}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="eyebrow !text-muted">Lịch theo tuần</div>
                <h2 className="display mt-1.5 text-2xl text-ink md:text-3xl">
                  Tuần {weekIndex + 1}
                  <span className="ml-2 text-base font-semibold text-muted">
                    Ngày {week[0]?.day}–{week[week.length - 1]?.day}
                  </span>
                </h2>
              </div>
              <span className="text-sm text-muted">
                {week.filter((day) => day.completed).length}/{week.length} ngày hoàn thành
              </span>
            </div>

            <nav
              aria-label="Chọn tuần"
              className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-8 md:px-8"
            >
              {weeks.map((weekDays, index) => {
                const active = index === weekIndex;
                const done = weekDays.every((day) => day.completed);
                return (
                  <Link
                    key={index}
                    href={`/daily?level=${plan.levelCode}&week=${index + 1}`}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-ink text-white"
                        : "border border-line bg-surface text-muted hover:border-brand/40 hover:text-brand"
                    }`}
                  >
                    {done ? <span className="material-symbols-outlined text-[15px]">check</span> : null}
                    Tuần {index + 1}
                  </Link>
                );
              })}
            </nav>

            <ol className="card divide-y divide-line overflow-hidden">
              {week.map((day) => (
                <DayRow key={day.day} day={day} current={plan.currentDay?.day === day.day} />
              ))}
            </ol>
          </section>
        ) : null}

        <section className={`${container} mt-10`}>
          <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
            <div>
              <div className="text-sm font-semibold text-ink">Mẹo học theo ngày</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Học lý thuyết trước, rồi làm bài kiểm tra. Nếu một ngày có hai bài, chia thành hai phiên
                10–15 phút.
              </p>
            </div>
            <Link href="/review" className="link-underline inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-brand">
              Ôn câu sai →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value, brand = false }: { label: string; value: string; brand?: boolean }) {
  return (
    <div className="px-4 py-3.5 md:px-5">
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</div>
      <div className={`display mt-1 text-xl md:text-2xl ${brand ? "text-brand" : "text-ink"}`}>{value}</div>
    </div>
  );
}

function TodayCard({
  plan,
  day,
}: {
  plan: DailyPlan;
  day: DailyDay;
}) {
  const next = plan.nextTask;
  return (
    <article className="card-elevated overflow-hidden">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between md:p-7">
        <div>
          <div className="eyebrow">
            Hôm nay · {plan.levelCode}
          </div>
          <h2 className="display mt-2 text-[34px] text-ink md:text-[40px]">
            Ngày {day.day}
            <span className="ml-2 text-base font-semibold text-muted md:text-lg">/ {plan.totalDays}</span>
          </h2>
          <p className="mt-2 text-sm text-muted">
            {day.tasks.length} bài · khoảng {day.estimatedMinutes} phút · +{day.xp} XP
          </p>
        </div>
        {next ? (
          <Link
            href={`/lesson/${next.lesson.id}`}
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white sm:w-auto"
          >
            Học bài tiếp theo
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        ) : null}
      </div>

      <ul className="divide-y divide-line border-t border-line">
        {day.tasks.map((task) => (
          <li key={task.lesson.id} className="min-w-0">
            <TaskLink task={task} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function DayRow({ day, current }: { day: DailyDay; current: boolean }) {
  const status = day.completed ? "Hoàn thành" : day.started ? "Đang học" : "Chưa học";
  const statusClass = day.completed
    ? "bg-brand-soft text-brand"
    : day.started
      ? "bg-[#fdf3e2] text-gold"
      : "bg-surface-muted text-muted";

  return (
    <li className={`px-4 py-4 md:px-6 ${current ? "bg-brand-soft/40" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
              day.completed
                ? "bg-brand text-white"
                : current
                  ? "bg-brand-soft text-brand ring-1 ring-brand/30"
                  : "bg-surface-muted text-muted"
            }`}
          >
            {day.completed ? <span className="material-symbols-outlined text-[18px]">check</span> : day.day}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-bold text-ink">
              Ngày {day.day}
              {current ? <span className="ml-2 text-xs font-semibold text-brand">Hôm nay</span> : null}
            </div>
            <div className="text-xs text-muted">
              {day.tasks.length} bài · {day.estimatedMinutes} phút · +{day.xp} XP
            </div>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}>
          {status}
        </span>
      </div>

      <ul className="mt-3 grid min-w-0 gap-1.5 sm:grid-cols-2">
        {day.tasks.map((task) => (
          <li key={task.lesson.id} className="min-w-0">
            <TaskLink task={task} compact />
          </li>
        ))}
      </ul>
    </li>
  );
}

function TaskLink({ task, compact = false }: { task: DailyTask; compact?: boolean }) {
  const { lesson } = task;
  const label = task.kind === "grammar" ? "Ngữ pháp" : "Từ vựng";
  const icon = lesson.completed ? "check" : task.kind === "grammar" ? "rule" : "auto_stories";
  const started = !lesson.completed && lesson.bestScore > 0;

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className={`group flex min-h-14 min-w-0 items-center gap-3.5 transition-colors hover:bg-brand-soft/50 ${
        compact
          ? "rounded-xl border border-line bg-surface px-3 py-2.5 hover:border-brand/40"
          : "px-4 py-3.5 md:px-7"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          lesson.completed ? "bg-brand text-white" : "bg-brand-soft text-brand"
        }`}
      >
        <span className="material-symbols-outlined text-[17px]">{icon}</span>
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="font-bold uppercase tracking-[0.1em] text-brand">{label}</span>
          {started ? <span className="font-semibold text-gold">· Đang học</span> : null}
          {lesson.completed ? <span className="font-semibold text-brand">· Hoàn thành</span> : null}
        </div>
        <div className="truncate text-sm font-semibold text-ink group-hover:text-brand">{lesson.title}</div>
        {!compact ? (
          <div className="mt-0.5 text-xs text-muted">
            {task.topicName ? `${task.topicName} · ` : ""}
            {task.kind === "vocabulary" ? `${lesson.wordCount} từ · ` : ""}
            {lesson.questionCount} câu · {lesson.estimatedMinutes} phút
          </div>
        ) : null}
      </div>
      <span className="material-symbols-outlined ml-auto shrink-0 pl-1 text-[18px] text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand">
        arrow_forward
      </span>
    </Link>
  );
}
