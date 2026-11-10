import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getDailyPlan } from "@/lib/daily-plan";
import { getOverview } from "@/lib/learning";
import { LEVEL_META, TRACK_META } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DailyTaskRow } from "@/components/learning/DailyTaskRow";
import { DailyGoalCard } from "@/components/learning/DailyGoalCard";
import { PlantGrowth } from "@/components/learning/PlantGrowth";
import { ProgressBar, LevelBadge } from "@/components/ui/Progress";

const container = "mx-auto w-full max-w-[1120px] px-5 md:px-8";

export default async function HomePage() {
  const session = await getSession();
  const overview = await getOverview(session?.user?.id);
  const next = overview.nextLesson;
  const dailyPlan = getDailyPlan(overview);
  const currentDay = dailyPlan?.currentDay ?? null;
  const totalQuestions = overview.levels.reduce(
    (sum, level) =>
      sum +
      [...level.grammar.lessons, ...level.vocabulary.lessons].reduce(
        (lessonSum, lesson) => lessonSum + lesson.questionCount,
        0,
      ),
    0,
  );
  const continueHref = next
    ? `/lesson/${next.id}`
    : dailyPlan && currentDay
      ? `/daily?level=${dailyPlan.levelCode}`
      : "/review";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="home" />

      <main className="flex-1 pb-6">
        {session?.user ? (
          <>
            {/* Greeting */}
            <section className={`${container} pt-10 md:pt-14`}>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="eyebrow">Lộ trình IELTS · A1 → C2</div>
                  <h1 className="display mt-3 text-[32px] text-ink sm:text-[40px] md:text-[48px]">
                    Chào {session.user.name ?? "bạn"},{" "}
                    <span className="display-accent">tiếp tục nào.</span>
                  </h1>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                    {overview.completedLessons}/{overview.totalLessons} bài đã hoàn thành. Mỗi
                    buổi học ngắn giúp kiến thức ở lại lâu hơn.
                  </p>
                </div>
                <Link
                  href={continueHref}
                  className="btn-primary inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
                >
                  <span className="max-w-[260px] truncate">
                    {next
                      ? `Tiếp tục: ${next.title}`
                      : dailyPlan && currentDay
                        ? "Tiếp tục kế hoạch hôm nay"
                        : "Ôn tập kiến thức"}
                  </span>
                  <span className="material-symbols-outlined shrink-0 text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </section>

            {/* Daily goal + plan */}
            <section className={`${container} mt-8 grid gap-5 lg:grid-cols-[1.45fr_1fr]`}>
              {dailyPlan && currentDay ? (
                <div className="card-elevated overflow-hidden">
                  <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                    <div>
                      <div className="eyebrow">
                        Kế hoạch · {dailyPlan.levelCode} · Ngày {currentDay.day}/{dailyPlan.totalDays}
                      </div>
                      <h2 className="display mt-2 text-2xl text-ink md:text-[28px]">Mục tiêu hôm nay</h2>
                      <p className="mt-1 text-xs text-muted">
                        {currentDay.tasks.length} bài · khoảng {currentDay.estimatedMinutes} phút · +
                        {currentDay.xp} XP
                      </p>
                    </div>
                    <Link
                      href={`/daily?level=${dailyPlan.levelCode}`}
                      className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
                    >
                      Xem cả kế hoạch
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                  <div className="grid gap-2.5 p-4 sm:grid-cols-2 md:p-5">
                    {currentDay.tasks.map((task) => (
                      <DailyTaskRow key={task.lesson.id} task={task} />
                    ))}
                  </div>
                </div>
              ) : next ? (
                <div className="card-elevated flex flex-col justify-between gap-6 p-6 md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <LevelBadge code={next.levelCode} />
                      <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-muted">
                        {next.track === "grammar" ? "Ngữ pháp" : "Từ vựng"}
                      </span>
                      <span className="eyebrow !text-muted">Bài học tiếp theo</span>
                    </div>
                    <h2 className="display mt-4 text-3xl text-ink md:text-[36px]">{next.title}</h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{next.summary}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface-muted/50 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                        01
                      </span>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand">
                          Bắt đầu
                        </div>
                        <div className="text-sm font-semibold text-ink">Học kiến thức</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-xs font-bold text-muted">
                        02
                      </span>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                          {next.bestScore > 0 ? `Điểm ${next.bestScore}/${next.quizTotal}` : "Tiếp theo"}
                        </div>
                        <div className="text-sm font-semibold text-ink">Kiểm tra</div>
                      </div>
                      <span className="text-xs text-muted">{next.questionCount} câu</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-elevated flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <div className="text-4xl">🌳</div>
                  <h2 className="display text-3xl text-ink">Bạn đã hoàn thành toàn bộ lộ trình!</h2>
                  <p className="max-w-md text-sm text-muted">
                    Hãy quay lại ôn tập những câu sai để giữ kiến thức thật chắc.
                  </p>
                  <Link
                    href="/review"
                    className="btn-primary mt-3 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white"
                  >
                    Ôn lại câu sai
                  </Link>
                </div>
              )}

              <DailyGoalCard goal={overview.dailyGoal} streak={overview.streak} xp={overview.xp} />
            </section>

            {/* Onboarding reminder */}
            {!overview.onboarding.completed ? (
              <section className={`${container} mt-5`}>
                <div className="flex flex-col gap-4 rounded-2xl border border-brand/20 bg-brand-soft/50 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                  <div>
                    <div className="eyebrow">Thiết lập lộ trình</div>
                    <h2 className="display mt-1.5 text-2xl text-ink">Cá nhân hóa kế hoạch học của bạn</h2>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                      Chọn mục tiêu, thời gian mỗi ngày và làm bài kiểm tra ngắn để biết nên bắt đầu từ
                      cấp độ nào.
                    </p>
                  </div>
                  <Link
                    href="/onboarding"
                    className="btn-primary inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Bắt đầu thiết lập
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </section>
            ) : null}
          </>
        ) : (
          /* Guest hero */
          <section className={`${container} grid items-center gap-12 pb-4 pt-12 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand shadow-[0_1px_2px_rgba(14,30,21,0.04)]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Lộ trình IELTS · A1 đến C2
              </div>

              <h1 className="display mt-6 text-[40px] text-ink sm:text-[52px] md:text-[60px] lg:text-[64px]">
                Học theo từng chặng,{" "}
                <span className="display-accent">nhớ theo từng bài.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Ngữ pháp và từ vựng nằm trong hai lộ trình riêng. Mục tiêu hôm nay chia nhỏ lộ trình
                thành buổi học ngắn, và câu trả lời chưa đúng được lưu lại để ôn tập.
              </p>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/register"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
                >
                  Bắt đầu học miễn phí
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link
                  href="/login"
                  className="link-underline px-1 text-sm font-semibold text-ink"
                >
                  Đã có tài khoản? Đăng nhập
                </Link>
              </div>

              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
                <div>
                  <dt className="text-xs text-muted">Cấp độ CEFR</dt>
                  <dd className="display mt-1 text-3xl text-ink">{overview.levels.length}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Bài học</dt>
                  <dd className="display mt-1 text-3xl text-ink">{overview.totalLessons}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Câu hỏi</dt>
                  <dd className="display mt-1 text-3xl text-ink">{totalQuestions}</dd>
                </div>
              </dl>
            </div>

            {/* Lesson preview */}
            <div aria-hidden="true" className="relative">
              <div className="absolute -inset-5 -z-10 rounded-[2.25rem] bg-brand-soft/70" />
              <div className="card-elevated space-y-6 p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand">A1</span>
                    <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-muted">
                      Ngữ pháp
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-muted">Câu 3 / 10</span>
                </div>
                <ProgressBar value={30} />
                <div>
                  <div className="eyebrow !text-muted">Quá khứ đơn</div>
                  <p className="display mt-3 text-[26px] leading-snug text-ink">
                    Yesterday, she ____ to the market with her mother.
                  </p>
                </div>
                <div className="grid gap-2.5">
                  <div className="flex items-center justify-between rounded-2xl border border-brand bg-brand-soft px-4 py-3.5 text-sm font-semibold text-brand">
                    went
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-line px-4 py-3.5 text-sm font-medium text-muted">
                    goes
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-line px-4 py-3.5 text-sm font-medium text-muted">
                    going
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-gold">local_fire_department</span>
                    Chuỗi 5 ngày
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-brand">bolt</span>
                    +20 XP
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Plant */}
        <section className={`${container} mt-16 md:mt-20`}>
          <div className="card p-6 md:p-10">
            <PlantGrowth
              stage={overview.plant.current}
              percent={overview.percent}
              remainingXp={overview.plant.remainingXp}
            />
          </div>
        </section>

        {/* Tracks */}
        <section className={`${container} mt-16 md:mt-20`}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow">Nội dung</div>
              <h2 className="display mt-2 text-3xl text-ink md:text-4xl">Chọn nội dung học</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Ngữ pháp và từ vựng có bài học, bài kiểm tra và tiến độ riêng.
              </p>
            </div>
            <Link href="/roadmap" className="link-underline inline-flex items-center gap-1 text-sm font-semibold text-brand">
              Xem toàn bộ lộ trình
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(["grammar", "vocabulary"] as const).map((track) => {
              const meta = TRACK_META[track];
              const count =
                track === "grammar" ? overview.counts.grammar : overview.counts.vocabulary;
              const percent = count.total ? Math.round((count.completed / count.total) * 100) : 0;
              return (
                <Link
                  key={track}
                  href={meta.href}
                  className="group card card-link flex flex-col justify-between p-6 md:p-7"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                        <span className="material-symbols-outlined text-[24px]">{meta.icon}</span>
                      </span>
                      <span className="rounded-full border border-line px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                        A1 → C2
                      </span>
                    </div>
                    <h3 className="display text-2xl text-ink">
                      {track === "grammar" ? "Ngữ pháp theo bậc CEFR" : "Từ vựng theo chủ đề"}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {track === "grammar"
                        ? `${count.total} bài ngữ pháp xếp theo sáu bậc A1 đến C2, từ cấu trúc câu cơ bản đến cách diễn đạt học thuật.`
                        : `${overview.counts.vocabulary.topics} chủ đề, ${count.total} bài học từ vựng theo cấp độ, kèm ví dụ và bài kiểm tra.`}
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="mb-2.5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">
                        {count.completed}/{count.total} bài đã hoàn thành
                      </span>
                      <span className="font-semibold text-brand">{percent}%</span>
                    </div>
                    <ProgressBar value={percent} />
                    <div className="mt-5 flex items-center text-sm font-semibold text-brand">
                      {track === "grammar" ? "Học ngữ pháp" : "Học từ vựng"}
                      <span className="material-symbols-outlined ml-1 text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Levels */}
        <section className={`${container} mt-16 md:mt-20`}>
          <div className="mb-6">
            <div className="eyebrow">Cấp độ</div>
            <h2 className="display mt-2 text-2xl text-ink md:text-3xl">Sáu chặng, một hành trình</h2>
            <p className="mt-2 text-sm text-muted">Mỗi cấp độ là một bước tiến rõ ràng.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {overview.levels.map((level) => {
              const percent = level.total
                ? Math.round((level.completed / level.total) * 100)
                : 0;
              return (
                <Link
                  key={level.id}
                  href={`/roadmap#level-${level.code}`}
                  className="group card card-link p-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="display text-3xl"
                      style={{ color: LEVEL_META[level.code].color }}
                    >
                      {level.code}
                    </span>
                    <span className="text-[11px] font-semibold text-muted">{percent}%</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-ink">{level.name}</div>
                  <div className="mt-0.5 text-[11px] text-muted">
                    {level.completed}/{level.total} bài
                  </div>
                  <ProgressBar value={percent} className="mt-4 h-1" />
                </Link>
              );
            })}
          </div>
        </section>

        <section className={`${container} mt-16 md:mt-20`}>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-brand px-6 py-12 text-center text-white md:px-12 md:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mint/20 blur-3xl"
            />
            <div className="relative">
              <h2 className="display mx-auto max-w-2xl text-[28px] text-white md:text-[36px]">
                Mỗi ngày một bài, cây lớn dần theo tiến độ.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                Câu trả lời sai được ghi lại và đưa vào mục ôn tập — bạn không phải nhớ mình đã sai ở đâu.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
