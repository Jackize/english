import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getOverview, type LevelOverview, type LessonCard } from "@/lib/learning";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProgressBar } from "@/components/ui/Progress";

export const metadata: Metadata = {
  title: "Lộ trình tiếng Anh A1–C2 — eng-growth",
  description:
    "Sáu chặng học tiếng Anh từ A1 đến C2: ngữ pháp, từ vựng, bài kiểm tra và ôn lại câu sai.",
  openGraph: {
    title: "Lộ trình tiếng Anh A1–C2 — eng-growth",
    description:
      "Sáu chặng học tiếng Anh từ A1 đến C2: ngữ pháp, từ vựng, bài kiểm tra và ôn lại câu sai.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lộ trình tiếng Anh A1–C2 — eng-growth",
    description:
      "Sáu chặng học tiếng Anh từ A1 đến C2: ngữ pháp, từ vựng, bài kiểm tra và ôn lại câu sai.",
  },
};

const container = "mx-auto w-full max-w-[1120px] px-5 md:px-8";
const LEVEL_CODES = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export default async function RoadmapPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  const requested = typeof params.level === "string" ? params.level.toUpperCase() : null;
  const selectedCode = LEVEL_CODES.includes(requested as (typeof LEVEL_CODES)[number])
    ? (requested as LevelCode)
    : null;
  const overview = await getOverview(session?.user?.id);
  const selectedLevel = selectedCode
    ? overview.levels.find((level) => level.code === selectedCode) ?? null
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#roadmap-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-brand focus:shadow-lg focus:ring-2 focus:ring-brand"
      >
        Bỏ qua điều hướng
      </a>
      <SiteHeader active="roadmap" />
      <main id="roadmap-main" className="flex-1">
        {selectedLevel ? (
          <section className={`${container} pb-4 pt-6 md:pt-8`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="eyebrow inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px]">route</span>
                Lộ trình A1 → C2
              </div>
              <Link
                href="/roadmap"
                className="link-underline inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Tất cả cấp độ
              </Link>
            </div>
            <h1 className="display mt-2 text-[28px] leading-tight text-ink md:text-[36px]">
              Lộ trình tiếng Anh <span className="whitespace-nowrap">A1–C2</span> cho người tự học
            </h1>
          </section>
        ) : (
          <section className={`${container} pb-8 pt-8 md:pb-10 md:pt-12`}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-12">
              <div>
                <div className="eyebrow inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[15px]">route</span>
                  Lộ trình A1 → C2
                </div>
                <h1 className="display mt-3 max-w-2xl text-[32px] leading-[1.12] text-ink sm:text-[42px] md:text-[48px]">
                  Lộ trình tiếng Anh <span className="whitespace-nowrap">A1–C2</span> cho người tự học
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-ink/80 md:text-base">
                  {overview.totalLessons} bài ngữ pháp và từ vựng, chia theo sáu bậc CEFR. Mỗi bài gồm
                  lý thuyết, bài kiểm tra và câu sai được lưu để ôn lại.
                </p>

                <NextLesson overview={overview} />
              </div>

              <ProgressPanel overview={overview} />
            </div>
          </section>
        )}

        {selectedLevel ? (
          <LevelDetail
            level={selectedLevel}
            levels={overview.levels}
          />
        ) : (
          <LevelMap levels={overview.levels} nextLevelCode={overview.nextLesson?.levelCode ?? null} />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function NextLesson({ overview }: { overview: Awaited<ReturnType<typeof getOverview>> }) {
  const next = overview.nextLesson;
  if (!next) {
    return (
      <div className="mt-6 rounded-2xl border border-line bg-surface p-4 md:p-5">
        <div className="text-xs font-semibold text-ink">Bạn đã hoàn thành toàn bộ lộ trình.</div>
        <p className="mt-1 text-sm text-muted">
          Dành vài phút ôn lại từ vựng theo lịch giãn cách và những câu đã từng trả lời sai.
        </p>
        <Link
          href="/review"
          className="link-underline mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-brand"
        >
          Mở trang ôn tập →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-brand/20 bg-brand-soft/50 p-4 md:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase tracking-[0.12em] text-brand">Bài tiếp theo</div>
          <div className="mt-1 truncate text-base font-semibold text-ink">{next.title}</div>
          <div className="mt-1 text-xs text-muted">
            {next.levelCode} · {next.track === "grammar" ? "Ngữ pháp" : "Từ vựng"} ·{" "}
            {next.estimatedMinutes} phút · +{next.xp} XP
          </div>
        </div>
        <Link
          href={`/lesson/${next.id}`}
          className="btn-primary inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
        >
          Học bài tiếp theo
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}

function ProgressPanel({ overview }: { overview: Awaited<ReturnType<typeof getOverview>> }) {
  const reviewLabel =
    overview.reviewCount > 0
      ? `Ôn tập ${overview.reviewCount} mục đến hạn`
      : "Không có mục cần ôn hôm nay";

  return (
    <aside className="card p-5 md:p-6" aria-label="Tiến độ tổng">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Tiến độ tổng</div>
        <span className="text-sm font-semibold text-brand">{overview.percent}%</span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="display text-2xl text-ink md:text-3xl">{overview.completedLessons}</span>
        <span className="text-sm text-muted">/ {overview.totalLessons} bài</span>
      </div>
      <ProgressBar value={overview.percent} className="mt-4 h-2" />

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4">
        <Stat label="XP" value={String(overview.xp)} />
        <Stat label="Chuỗi" value={`${overview.streak} ngày`} />
        <Stat
          label="Ngữ pháp"
          value={`${overview.counts.grammar.completed}/${overview.counts.grammar.total}`}
        />
        <Stat
          label="Từ vựng"
          value={`${overview.counts.vocabulary.completed}/${overview.counts.vocabulary.total}`}
        />
      </dl>

      <Link
        href="/review"
        className="mt-4 flex min-h-11 items-center justify-between border-t border-line pt-4 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
      >
        <span>{reviewLabel}</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </Link>
    </aside>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}

function LevelMap({
  levels,
  nextLevelCode,
}: {
  levels: LevelOverview[];
  nextLevelCode: string | null;
}) {
  return (
    <section className={`${container} pb-12`} aria-labelledby="levels-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="levels-heading" className="display text-2xl text-ink md:text-3xl">
            Sáu chặng học
          </h2>
          <p className="mt-1 text-sm text-muted">Chọn một chặng để xem ngữ pháp và từ vựng.</p>
        </div>
        <span className="text-xs text-muted">A1 là điểm bắt đầu, C2 là bậc cao nhất.</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} nextLevelCode={nextLevelCode} />
        ))}
      </div>
    </section>
  );
}

function LevelCard({
  level,
  nextLevelCode,
}: {
  level: LevelOverview;
  nextLevelCode: string | null;
}) {
  const meta = LEVEL_META[level.code];
  const percent = level.total ? Math.round((level.completed / level.total) * 100) : 0;
  const done = level.total > 0 && level.completed === level.total;
  const started = level.completed > 0;
  const status = done
    ? "Hoàn thành"
    : started
      ? "Đang học"
      : level.code === nextLevelCode
        ? "Bắt đầu"
        : level.total === 0
          ? "Chưa có bài"
          : "Chưa học";
  const statusClass = done
    ? "text-brand"
    : started
      ? "text-gold"
      : level.code === nextLevelCode
        ? "text-brand"
        : "text-muted";

  return (
    <Link
      id={`level-${level.code}`}
      href={`/roadmap?level=${level.code}`}
      aria-current={level.code === nextLevelCode ? "step" : undefined}
      className="card-link group flex min-h-[164px] flex-col rounded-2xl border border-line bg-surface p-4 hover:border-brand/35"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="display flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
          style={{ background: meta.soft, color: meta.color }}
        >
          {level.code}
        </span>
        <span className={`text-xs font-semibold ${statusClass}`}>{status}</span>
      </div>

      <h3 className="mt-3 text-base font-bold text-ink group-hover:text-brand">{level.name}</h3>
      <p className="mt-0.5 text-xs text-muted">{level.tagline}</p>

      <div className="mt-auto pt-3">
        <div className="flex items-end justify-between gap-2 text-xs">
          <span className="text-muted">
            {level.completed}/{level.total} bài
          </span>
          <span className="font-semibold text-ink">{percent}%</span>
        </div>
        <ProgressBar value={percent} className="mt-2" />
        <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted">
          <span className="truncate">
            {level.grammar.total} ngữ pháp · {level.vocabulary.total} từ vựng
          </span>
          <span className="material-symbols-outlined shrink-0 text-[17px] transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}

function LevelDetail({ level, levels }: { level: LevelOverview; levels: LevelOverview[] }) {
  const percent = level.total ? Math.round((level.completed / level.total) * 100) : 0;
  const topicsWithLessons = level.vocabulary.topics.filter((topic) => topic.lessons.length > 0);

  return (
    <section className={`${container} pb-12`} aria-labelledby="level-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="eyebrow">Chặng {level.code}</div>
          <h2 id="level-heading" className="display mt-2 text-2xl text-ink md:text-3xl">
            {level.name}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{level.description}</p>
        </div>
        <div className="w-full shrink-0 sm:w-56">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-ink">{percent}%</span>
            <span className="text-muted">
              {level.completed}/{level.total} bài
            </span>
          </div>
          <ProgressBar value={percent} className="mt-2" />
        </div>
      </div>

      <nav aria-label="Chọn chặng" className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {levels.map((item) => {
          const active = item.code === level.code;
          return (
            <Link
              key={item.code}
              href={`/roadmap?level=${item.code}`}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-semibold transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "border border-line bg-surface text-muted hover:border-brand/35 hover:text-brand"
              }`}
            >
              <span style={active ? undefined : { color: LEVEL_META[item.code].color }}>
                {item.code}
              </span>
              <span className={`hidden sm:inline ${active ? "text-white/80" : "text-muted"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 grid gap-4">
        <section className="card overflow-hidden" aria-labelledby="grammar-heading">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5 md:px-5">
            <h3 id="grammar-heading" className="flex items-center gap-2 text-sm font-bold text-ink">
              <span className="material-symbols-outlined text-[18px] text-brand">rule</span>
              Ngữ pháp
            </h3>
            <span className="text-xs text-muted">
              {level.grammar.completed}/{level.grammar.total} bài
            </span>
          </div>
          {level.grammar.lessons.length > 0 ? (
            <div className="grid gap-x-4 gap-y-1 p-3 sm:grid-cols-2 md:p-4">
              {level.grammar.lessons.map((lesson) => (
                <CompactLesson key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <p className="px-4 py-5 text-sm text-muted">Chưa có bài ngữ pháp.</p>
          )}
        </section>

        <section className="card overflow-hidden" aria-labelledby="vocabulary-heading">
          <details className="group/level">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden md:px-5">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <h3
                  id="vocabulary-heading"
                  className="flex items-center gap-2 text-sm font-bold text-ink"
                >
                  <span className="material-symbols-outlined text-[18px] text-brand">
                    auto_stories
                  </span>
                  Từ vựng
                </h3>
                <span className="text-xs text-muted">
                  {level.vocabulary.completed}/{level.vocabulary.total} bài ·{" "}
                  {topicsWithLessons.length} chủ đề
                </span>
              </div>
              <span className="material-symbols-outlined shrink-0 text-[20px] text-muted transition-transform group-open/level:rotate-180">
                expand_more
              </span>
            </summary>

            <div className="border-t border-line p-3 md:p-4">
              {topicsWithLessons.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {topicsWithLessons.map((topic) => (
                    <details
                      key={topic.id}
                      className="group/topic rounded-xl border border-line bg-surface-muted/30"
                    >
                      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
                        <span className="material-symbols-outlined text-[16px] text-brand/70">
                          {topic.icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
                          {topic.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted">{topic.lessons.length} bài</span>
                        <span className="material-symbols-outlined shrink-0 text-[18px] text-muted transition-transform group-open/topic:rotate-180">
                          expand_more
                        </span>
                      </summary>
                      <div className="space-y-1 border-t border-line p-2">
                        {topic.lessons.map((lesson) => (
                          <CompactLesson key={lesson.id} lesson={lesson} />
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              ) : (
                <p className="px-1 py-2 text-sm text-muted">Chưa có bài từ vựng.</p>
              )}
            </div>
          </details>
        </section>
      </div>
    </section>
  );
}

function CompactLesson({ lesson }: { lesson: LessonCard }) {
  const started = !lesson.completed && (lesson.theoryDone || lesson.bestScore > 0);

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className="group flex min-h-11 items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-brand-soft/60"
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
          lesson.completed
            ? "bg-brand text-white"
            : started
              ? "bg-brand-soft text-brand"
              : "bg-surface-muted text-muted"
        }`}
      >
        {lesson.completed ? (
          <span className="material-symbols-outlined text-[15px]">check</span>
        ) : started ? (
          <span className="material-symbols-outlined text-[15px]">progress_activity</span>
        ) : (
          String(lesson.order).padStart(2, "0")
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-pretty text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brand">
          {lesson.title}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted">
          <span>{lesson.questionCount} câu</span>
          <span>·</span>
          <span>{lesson.estimatedMinutes} phút</span>
          {lesson.bestScore > 0 ? (
            <>
              <span>·</span>
              <span className="text-brand">
                {lesson.bestScore}/{lesson.quizTotal}
              </span>
            </>
          ) : null}
        </span>
      </span>
      <span className="material-symbols-outlined shrink-0 text-[18px] text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
        arrow_forward
      </span>
    </Link>
  );
}
