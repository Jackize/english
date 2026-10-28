import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getOverview } from "@/lib/learning";
import { LEVEL_META } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LessonRow } from "@/components/learning/LessonRow";
import { ProgressBar } from "@/components/ui/Progress";

export default async function RoadmapPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  const LEVEL_CODES = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
  const selected = LEVEL_CODES.includes(params.level as (typeof LEVEL_CODES)[number])
    ? (params.level as (typeof LEVEL_CODES)[number])
    : null;
  const overview = await getOverview(session?.user?.id, selected ?? undefined);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="roadmap" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-14 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[15px]">route</span>
                Lộ trình A1 → C2
              </div>
              <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-5xl">
                Một hành trình, <span className="display-accent text-brand">sáu chặng.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                Đi từ những cấu trúc câu đầu tiên đến văn phong học thuật C2. Mỗi chặng gồm ngữ
                pháp và từ vựng, có bài kiểm tra và lưu lại câu trả lời sai.
              </p>
            </div>

            <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Tiến độ tổng
                  </div>
                  <div className="display mt-1 text-3xl text-ink">
                    {overview.completedLessons}
                    <span className="text-lg text-muted">/{overview.totalLessons} bài</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-brand">{overview.percent}%</span>
              </div>
              <ProgressBar value={overview.percent} className="mt-3" />
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                <span>{overview.xp} XP</span>
                <span>Chuỗi {overview.streak} ngày</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {overview.levels.map((level) => {
              const percent = level.total ? Math.round((level.completed / level.total) * 100) : 0;
              return (
                <a
                  key={level.id}
                  href={`#level-${level.code}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-brand/30 hover:text-brand"
                >
                  <span style={{ color: LEVEL_META[level.code].color }}>{level.code}</span>
                  {level.name}
                  <span className="text-[10px] opacity-70">{percent}%</span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-4 md:px-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/roadmap"
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                !selected ? "bg-brand text-white" : "border border-line bg-surface text-muted hover:text-brand"
              }`}
            >
              Tất cả
            </Link>
            {LEVEL_CODES.map((code) => (
              <Link
                key={code}
                href={`/roadmap?level=${code}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  selected === code ? "bg-brand text-white" : "border border-line bg-surface text-muted hover:text-brand"
                }`}
              >
                {code}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          <div className="space-y-8">
            {overview.levels.map((level) => {
              const meta = LEVEL_META[level.code];
              const percent = level.total
                ? Math.round((level.completed / level.total) * 100)
                : 0;
              const topicsWithLessons = level.vocabulary.topics.filter(
                (topic) => topic.lessons.length > 0,
              );

              return (
                <section key={level.id} id={`level-${level.code}`} className="scroll-mt-24">
                  <div className="card overflow-hidden">
                    <div className="flex flex-col gap-4 border-b border-line bg-surface-muted/40 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="display flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl font-bold"
                          style={{ background: meta.soft, color: meta.color }}
                        >
                          {level.code}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="display text-2xl text-ink">{level.name}</h2>
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                              {level.tagline}
                            </span>
                          </div>
                          <p className="mt-1 max-w-2xl text-sm text-muted">{level.description}</p>
                        </div>
                      </div>
                      <div className="w-full flex-shrink-0 md:w-48">
                        <div className="mb-1.5 flex justify-between text-[11px]">
                          <span className="font-semibold text-ink">{percent}%</span>
                          <span className="text-muted">
                            {level.completed}/{level.total} bài
                          </span>
                        </div>
                        <ProgressBar value={percent} />
                      </div>
                    </div>

                    <div className="grid gap-6 p-5 md:grid-cols-2 md:p-6">
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                            <span className="material-symbols-outlined text-[18px] text-brand">
                              rule
                            </span>
                            Ngữ pháp
                          </h3>
                          <span className="text-[11px] text-muted">
                            {level.grammar.completed}/{level.grammar.total} bài
                          </span>
                        </div>
                        <div className="space-y-2">
                          {level.grammar.lessons.map((lesson) => (
                            <LessonRow
                              key={lesson.id}
                              lesson={lesson}
                              levelCode={level.code}
                            />
                          ))}
                          {level.grammar.lessons.length === 0 ? (
                            <p className="rounded-lg bg-surface-muted px-3 py-4 text-xs text-muted">
                              Chưa có bài ngữ pháp.
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                            <span className="material-symbols-outlined text-[18px] text-brand">
                              auto_stories
                            </span>
                            Từ vựng
                          </h3>
                          <span className="text-[11px] text-muted">
                            {level.vocabulary.completed}/{level.vocabulary.total} bài
                          </span>
                        </div>
                        <div className="space-y-2">
                          {topicsWithLessons.map((topic) => (
                            <div key={topic.id}>
                              <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                                <span className="material-symbols-outlined text-[13px] text-brand/70">
                                  {topic.icon}
                                </span>
                                {topic.name}
                              </div>
                              <div className="space-y-2">
                                {topic.lessons.map((lesson) => (
                                  <LessonRow
                                    key={lesson.id}
                                    lesson={lesson}
                                    levelCode={level.code}
                                    topicName={topic.name}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                          {topicsWithLessons.length === 0 ? (
                            <p className="rounded-lg bg-surface-muted px-3 py-4 text-xs text-muted">
                              Chưa có bài từ vựng.
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/review" className="text-sm font-semibold text-brand hover:underline">
              Ôn lại {overview.reviewCount} câu trả lời sai →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
