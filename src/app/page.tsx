import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getDailyPlan } from "@/lib/daily-plan";
import { getOverview } from "@/lib/learning";
import { LEVEL_META, TRACK_META } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DailyTaskRow } from "@/components/learning/DailyTaskRow";
import { PlantGrowth } from "@/components/learning/PlantGrowth";
import { ProgressBar, LevelBadge } from "@/components/ui/Progress";

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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="home" />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-10 pt-16 text-center md:px-8 md:pt-20">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Lộ trình IELTS · A1 đến C2
          </div>

          <h1 className="display mx-auto max-w-3xl text-[34px] leading-[1.1] text-ink sm:text-[42px] md:text-[64px]">
            Học theo từng chặng,
            <br className="hidden sm:block" />{" "}
            <span className="display-accent text-brand">nhớ theo từng bài.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
            Từ vựng và ngữ pháp nằm trong hai lộ trình riêng. Mục tiêu hôm nay chia nhỏ lộ trình
            thành từng buổi học ngắn; câu trả lời chưa đúng được lưu lại để ôn tập.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            {session?.user ? (
              <Link
                href={next ? `/lesson/${next.id}` : dailyPlan && currentDay ? `/daily?level=${dailyPlan.levelCode}` : "/review"}
                className="btn-primary inline-flex max-w-full items-center gap-2 rounded-full px-7 py-3.5 text-center text-sm font-semibold"
              >
                <span>
                  {next
                    ? `Tiếp tục học: ${next.title}`
                    : dailyPlan && currentDay
                      ? "Tiếp tục kế hoạch hôm nay"
                      : "Ôn tập câu sai"}
                </span>
                <span className="material-symbols-outlined shrink-0 text-[18px]">arrow_forward</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                >
                  Bắt đầu học miễn phí
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted transition-colors hover:text-brand"
                >
                  Đã có tài khoản? Đăng nhập
                </Link>
              </>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-brand">stairs</span>
              {overview.levels.length} cấp độ CEFR
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-brand">menu_book</span>
              {overview.totalLessons} bài học
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-brand">quiz</span>
              {totalQuestions} câu hỏi
            </span>
          </div>
        </section>

        {/* Daily target */}
        {dailyPlan && currentDay ? (
          <section className="mx-auto w-full max-w-[1120px] px-5 pb-6 md:px-8">
            <div className="card overflow-hidden border-brand/20 bg-brand-soft/20">
              <div className="flex flex-col gap-4 border-b border-brand/10 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                    Kế hoạch theo ngày · {dailyPlan.levelCode} · Ngày {currentDay.day}/
                    {dailyPlan.totalDays}
                  </div>
                  <h2 className="display mt-1 text-2xl text-ink md:text-3xl">Mục tiêu hôm nay</h2>
                  <p className="mt-1 text-xs text-muted">
                    {currentDay.tasks.length} bài · khoảng {currentDay.estimatedMinutes} phút · +
                    {currentDay.xp} XP
                  </p>
                </div>
                <Link
                  href={`/daily?level=${dailyPlan.levelCode}`}
                  className="inline-flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                >
                  Xem cả kế hoạch
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
              <div className="grid gap-2 p-4 sm:grid-cols-2 md:p-5">
                {currentDay.tasks.map((task) => (
                  <DailyTaskRow key={task.lesson.id} task={task} />
                ))}
              </div>
              <div className="border-t border-brand/10 bg-surface/60 px-5 py-3 text-xs text-muted md:px-6">
                {session?.user ? (
                  <span>
                    Chào {session.user.name ?? session.user.email} · Chuỗi học{" "}
                    <span className="font-semibold text-ink">{overview.streak} ngày</span> ·{" "}
                    <span className="font-semibold text-ink">{overview.xp} XP</span>
                  </span>
                ) : (
                  <span>
                    <Link href="/login" className="font-semibold text-brand hover:underline">
                      Đăng nhập
                    </Link>{" "}
                    để lưu tiến độ học của bạn.
                  </span>
                )}
              </div>
            </div>
          </section>
        ) : null}

        {/* Next lesson (fallback khi đã hoàn thành kế hoạch) */}
        {!dailyPlan || !currentDay ? (
          <section className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
            <div className="card-elevated overflow-hidden">
              <div className="flex flex-col gap-6 p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {next ? (
                      <>
                        <LevelBadge code={next.levelCode} />
                        <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-muted">
                          {next.track === "grammar" ? "Ngữ pháp" : "Từ vựng"}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                          Bài học tiếp theo
                        </span>
                      </>
                    ) : (
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                        Lộ trình của bạn
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted">
                    <span className="font-semibold text-ink">{overview.completedLessons}</span>/
                    {overview.totalLessons} bài đã hoàn thành
                  </span>
                </div>

                {next ? (
                  <>
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                      <div>
                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                          {next.track === "grammar" ? "Lộ trình ngữ pháp" : "Lộ trình từ vựng"} ·{" "}
                          {next.levelCode} {next.levelName}
                        </div>
                        <h2 className="display text-3xl text-ink md:text-[34px]">{next.title}</h2>
                        <p className="mt-2 max-w-xl text-sm text-muted">{next.summary}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-muted/40 px-4 py-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                          01
                        </span>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand">
                            {next.theoryDone ? "Đã học" : "Bắt đầu"}
                          </div>
                          <div className="text-sm font-semibold text-ink">Học kiến thức</div>
                        </div>
                        {next.theoryDone ? (
                          <span className="material-symbols-outlined text-[20px] text-brand">
                            check_circle
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-line px-4 py-3">
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
                  </>
                ) : (
                  <div className="py-6 text-center">
                    <div className="text-4xl">🌳</div>
                    <h2 className="display mt-3 text-3xl text-ink">Bạn đã hoàn thành toàn bộ lộ trình!</h2>
                    <p className="mt-2 text-sm text-muted">
                      Hãy quay lại ôn tập những câu sai để giữ kiến thức thật chắc.
                    </p>
                    <Link
                      href="/review"
                      className="btn-primary mt-5 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
                    >
                      Ôn lại câu sai
                    </Link>
                  </div>
                )}
              </div>

              <div className="border-t border-line bg-surface-muted/30 px-6 py-3 text-xs text-muted md:px-8">
                {session?.user ? (
                  <span>
                    Chào {session.user.name ?? session.user.email} · Chuỗi học{" "}
                    <span className="font-semibold text-ink">{overview.streak} ngày</span> ·{" "}
                    <span className="font-semibold text-ink">{overview.xp} XP</span>
                  </span>
                ) : (
                  <span>
                    <Link href="/login" className="font-semibold text-brand hover:underline">
                      Đăng nhập
                    </Link>{" "}
                    để lưu tiến độ học của bạn.
                  </span>
                )}
              </div>
            </div>
          </section>
        ) : null}

        {/* Plant */}
        <section className="mx-auto mt-16 w-full max-w-[1120px] px-5 md:px-8">
          <div className="card p-6 md:p-10">
            <PlantGrowth
              stage={overview.plant.current}
              percent={overview.percent}
              remainingXp={overview.plant.remainingXp}
            />
          </div>
        </section>

        {/* Choose track */}
        <section className="mx-auto mt-16 w-full max-w-[1120px] px-5 md:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="display text-3xl text-ink md:text-4xl">Chọn nội dung học</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Ngữ pháp và từ vựng có bài học, bài kiểm tra và tiến độ riêng.
              </p>
            </div>
            <Link href="/roadmap" className="text-sm font-semibold text-brand hover:underline">
              Xem toàn bộ lộ trình →
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
                  className="group card flex flex-col justify-between p-6 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_20px_50px_-40px_rgba(21,37,27,0.5)] md:p-7"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                        <span className="material-symbols-outlined">{meta.icon}</span>
                      </span>
                      <span className="rounded-full border border-line px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
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
                  <div className="mt-7">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">
                        {count.completed}/{count.total} bài đã hoàn thành
                      </span>
                      <span className="text-muted">{percent}%</span>
                    </div>
                    <ProgressBar value={percent} />
                    <div className="mt-4 flex items-center text-sm font-semibold text-brand">
                      {track === "grammar" ? "Học ngữ pháp" : "Học từ vựng"}
                      <span className="material-symbols-outlined ml-1 text-[18px] transition-transform group-hover:translate-x-0.5">
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
        <section className="mx-auto mt-16 w-full max-w-[1120px] px-5 md:px-8">
          <h2 className="display mb-1 text-2xl text-ink">Sáu chặng, một hành trình</h2>
          <p className="mb-5 text-sm text-muted">Mỗi cấp độ là một bước tiến rõ ràng.</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {overview.levels.map((level) => {
              const percent = level.total
                ? Math.round((level.completed / level.total) * 100)
                : 0;
              return (
                <Link
                  key={level.id}
                  href={`/roadmap#level-${level.code}`}
                  className="group rounded-xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="display text-2xl"
                      style={{ color: LEVEL_META[level.code].color }}
                    >
                      {level.code}
                    </span>
                    <span className="text-[10px] font-semibold text-muted">{percent}%</span>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-ink">{level.name}</div>
                  <div className="mt-0.5 text-[10px] text-muted">
                    {level.completed}/{level.total} bài
                  </div>
                  <ProgressBar value={percent} className="mt-3 h-1" />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1120px] px-5 md:px-8">
          <div className="rounded-2xl border border-brand/15 bg-brand-soft/50 px-6 py-8 text-center md:px-10">
            <h2 className="display text-2xl text-ink md:text-3xl">
              Mỗi ngày một bài, cây lớn dần theo tiến độ.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Câu trả lời sai được ghi lại và đưa vào mục ôn tập — bạn không phải nhớ mình đã sai ở đâu.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
