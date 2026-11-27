import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { GuestGrowthHome } from "@/components/home/GuestGrowthHome";
import { DailyGoalCard } from "@/components/learning/DailyGoalCard";
import { DailyTaskRow } from "@/components/learning/DailyTaskRow";
import { PlantGrowth } from "@/components/learning/PlantGrowth";
import { ReviewMomentumCard } from "@/components/learning/ReviewMomentumCard";
import { StudyRhythmCard } from "@/components/learning/StudyRhythmCard";
import { LevelBadge, ProgressBar } from "@/components/ui/Progress";
import { getSession } from "@/lib/auth";
import { LEVEL_META, TRACK_META } from "@/lib/curriculum";
import { getDailyPlan } from "@/lib/daily-plan";
import { getHomeShowcase, getOverview } from "@/lib/learning";
import { getHomeMotivation } from "@/lib/motivation";
import Link from "next/link";

const container = "mx-auto w-full max-w-[1120px] px-5 md:px-8";

export default async function HomePage() {
  const session = await getSession();
  const [overview, motivation] = await Promise.all([
    getOverview(session?.user?.id),
    session?.user?.id
      ? getHomeMotivation(session.user.id)
      : Promise.resolve(null),
  ]);
  const dueReviews = motivation
    ? motivation.review.dueVocab + motivation.review.dueQuestions
    : 0;
  const isGuest = !session?.user;
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

  if (isGuest) {
    const showcase = await getHomeShowcase();
    return (
      <GuestGrowthHome
        showcase={showcase}
        levels={overview.levels.map((level) => ({
          code: level.code,
          name: level.name,
          grammar: level.grammar.total,
          vocabulary: level.vocabulary.total,
        }))}
        totalLessons={overview.totalLessons}
        totalQuestions={totalQuestions}
      />
    );
  }

  const continueHref = next
    ? `/lesson/${next.id}`
    : dailyPlan && currentDay
      ? `/daily?level=${dailyPlan.levelCode}`
      : "/review";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="home" />

      <main className="flex-1 pb-6">
          <>
            {/* Greeting */}
            <section className={`${container} pt-10 md:pt-14`}>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="display text-[32px] text-ink sm:text-[40px] md:text-[48px]">
                    Chào {session.user.name ?? "bạn"},{" "}
                    <span className="display-accent">tiếp tục nào.</span>
                  </h1>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                    {overview.completedLessons}/{overview.totalLessons} bài đã
                    hoàn thành.{" "}
                    {dueReviews > 0
                      ? `Có ${dueReviews} mục đến hạn ôn, ôn trước rồi học bài mới để kiến thức cũ không bị trôi.`
                      : motivation?.streak.atRisk
                        ? `Học một bài hôm nay để giữ chuỗi ${motivation.streak.days} ngày.`
                        : "Mỗi buổi học ngắn giúp kiến thức ở lại lâu hơn."}
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
                  <span className="material-symbols-outlined shrink-0 text-[18px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </section>

            {/* Daily goal + plan */}
            <section
              className={`${container} mt-8 grid gap-5 lg:grid-cols-[1.45fr_1fr]`}
            >
              {dailyPlan && currentDay ? (
                <div className="card-elevated overflow-hidden">
                  <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                    <div>
                      <div className="eyebrow">
                        Kế hoạch · {dailyPlan.levelCode} · Ngày {currentDay.day}
                        /{dailyPlan.totalDays}
                      </div>
                      <h2 className="display mt-2 text-2xl text-ink md:text-[28px]">
                        Mục tiêu hôm nay
                      </h2>
                      <p className="mt-1 text-xs text-muted">
                        {currentDay.tasks.length} bài · khoảng{" "}
                        {currentDay.estimatedMinutes} phút · +{currentDay.xp} XP
                      </p>
                    </div>
                    <Link
                      href={`/daily?level=${dailyPlan.levelCode}`}
                      className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
                    >
                      Xem cả kế hoạch
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
                      <span className="eyebrow !text-muted">
                        Bài học tiếp theo
                      </span>
                    </div>
                    <h2 className="display mt-4 text-3xl text-ink md:text-[36px]">
                      {next.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                      {next.summary}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface-muted/50 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                        01
                      </span>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-brand">
                          Bắt đầu
                        </div>
                        <div className="text-sm font-semibold text-ink">
                          Học kiến thức
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-xs font-bold text-muted">
                        02
                      </span>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-muted">
                          {next.bestScore > 0
                            ? `Điểm ${next.bestScore}/${next.quizTotal}`
                            : "Tiếp theo"}
                        </div>
                        <div className="text-sm font-semibold text-ink">
                          Kiểm tra
                        </div>
                      </div>
                      <span className="text-xs text-muted">
                        {next.questionCount} câu
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-elevated flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <span
                    className="material-symbols-outlined text-[40px] text-brand"
                    aria-hidden="true"
                  >
                    park
                  </span>
                  <h2 className="display text-3xl text-ink">
                    Bạn đã hoàn thành toàn bộ lộ trình!
                  </h2>
                  <p className="max-w-md text-sm text-muted">
                    Hãy quay lại ôn tập những câu sai để giữ kiến thức thật
                    chắc.
                  </p>
                  <Link
                    href="/review"
                    className="btn-primary mt-3 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white"
                  >
                    Ôn lại câu sai
                  </Link>
                </div>
              )}

              <DailyGoalCard
                goal={overview.dailyGoal}
                streak={overview.streak}
                xp={overview.xp}
              />
            </section>

            {/* Review + rhythm */}
            {motivation ? (
              <section
                className={`${container} mt-5 grid gap-5 lg:grid-cols-[1.45fr_1fr] ${
                  // Thẻ ôn tập trống chỉ có một đoạn chữ: không kéo giãn nó theo thẻ nhịp học.
                  motivation.memory.total === 0 ? "lg:items-start" : ""
                }`}
              >
                <ReviewMomentumCard
                  review={motivation.review}
                  memory={motivation.memory}
                  mistakesFixed={motivation.mistakesFixed}
                />
                <StudyRhythmCard
                  streak={motivation.streak}
                  rhythm={motivation.rhythm}
                  activeDays={motivation.activeDays}
                />
              </section>
            ) : null}

            {/* Onboarding reminder */}
            {!overview.onboarding.completed ? (
              <section className={`${container} mt-5`}>
                <div className="flex flex-col gap-4 rounded-2xl border border-brand/20 bg-brand-soft/50 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                  <div>
                    <h2 className="display text-2xl text-ink">
                      Cá nhân hóa kế hoạch học của bạn
                    </h2>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                      Chọn mục tiêu, thời gian mỗi ngày và làm bài kiểm tra ngắn
                      để biết nên bắt đầu từ cấp độ nào.
                    </p>
                  </div>
                  <Link
                    href="/onboarding"
                    className="btn-primary inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Bắt đầu thiết lập
                  </Link>
                </div>
              </section>
            ) : null}
          </>

        {/* Plant: tiến độ cá nhân của người học. */}
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
              <h2 className="display text-3xl text-ink md:text-4xl">
                Chọn nội dung học
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Ngữ pháp và từ vựng có bài học, bài kiểm tra và tiến độ riêng.
              </p>
            </div>
            <Link
              href="/roadmap"
              className="link-underline inline-flex items-center gap-1 text-sm font-semibold text-brand"
            >
              Xem toàn bộ lộ trình
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(["grammar", "vocabulary"] as const).map((track) => {
              const meta = TRACK_META[track];
              const count =
                track === "grammar"
                  ? overview.counts.grammar
                  : overview.counts.vocabulary;
              const percent = count.total
                ? Math.round((count.completed / count.total) * 100)
                : 0;
              return (
                <Link
                  key={track}
                  href={meta.href}
                  className="group card card-link flex flex-col justify-between p-6 md:p-7"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                        <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                          {meta.icon}
                        </span>
                      </span>
                      <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
                        A1 → C2
                      </span>
                    </div>
                    <h3 className="display text-2xl text-ink">
                      {track === "grammar"
                        ? "Ngữ pháp theo bậc CEFR"
                        : "Từ vựng theo chủ đề"}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {track === "grammar"
                        ? `${count.total} bài ngữ pháp xếp theo sáu bậc A1 đến C2, từ cấu trúc câu cơ bản đến cách diễn đạt học thuật.`
                        : `${overview.counts.vocabulary.topics} chủ đề, ${count.total} bài học từ vựng theo cấp độ, kèm ví dụ và bài kiểm tra.`}
                    </p>
                  </div>
                  <div className="mt-8">
                    <>
                        <div className="mb-2.5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">
                        {count.completed}/{count.total} bài đã hoàn thành
                      </span>
                      <span className="font-semibold text-brand">
                        {percent}%
                      </span>
                    </div>
                    <ProgressBar value={percent} />
                    </>
                    <div className={`mt-5 text-sm font-semibold text-brand group-hover:underline`}>
                      {track === "grammar" ? "Học ngữ pháp" : "Học từ vựng"}
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
            <h2 className="display text-2xl text-ink md:text-3xl">
              Sáu chặng, một hành trình
            </h2>
            <p className="mt-2 text-sm text-muted">
              Mỗi cấp độ là một bước tiến rõ ràng.
            </p>
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
                    <span className="text-[11px] font-semibold text-muted">
                      {percent}%
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-ink">
                    {level.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted">
                    {`${level.completed}/${level.total} bài`}
                  </div>
                  <ProgressBar value={percent} className="mt-4 h-1" />
                </Link>
              );
            })}
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
