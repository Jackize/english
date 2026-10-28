import Link from "next/link";
import { auth } from "@/lib/auth";
import { getOverview } from "@/lib/learning";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProgressBar } from "@/components/ui/Progress";

const LEVEL_CODES: LevelCode[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default async function VocabularyPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const selected = LEVEL_CODES.includes(params.level as LevelCode)
    ? (params.level as LevelCode)
    : null;
  const overview = await getOverview(session?.user?.id, selected ?? undefined);

  const levels = selected
    ? overview.levels.filter((level) => level.code === selected)
    : overview.levels;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="vocabulary" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-14 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                Từ vựng · A1 → C2
              </div>
              <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-5xl">
                Từ vựng theo <span className="display-accent text-brand">chủ đề.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {overview.counts.vocabulary.topics} chủ đề, {overview.counts.vocabulary.total} bài
                học. Mỗi bài gồm danh sách từ, phiên âm, nghĩa tiếng Việt, ví dụ và bài kiểm tra.
              </p>
              <Link
                href={selected ? `/daily?level=${selected}` : "/daily"}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
              >
                <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                Học theo kế hoạch ngày →
              </Link>
            </div>

            <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4">
              <div className="flex items-end justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Tiến độ từ vựng
                </span>
                <span className="text-sm font-semibold text-brand">
                  {overview.counts.vocabulary.total
                    ? Math.round(
                        (overview.counts.vocabulary.completed /
                          overview.counts.vocabulary.total) *
                          100,
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="display mt-1 text-2xl text-ink">
                {overview.counts.vocabulary.completed}
                <span className="text-base text-muted">
                  /{overview.counts.vocabulary.total} bài
                </span>
              </div>
              <ProgressBar
                value={
                  overview.counts.vocabulary.total
                    ? (overview.counts.vocabulary.completed /
                        overview.counts.vocabulary.total) *
                      100
                    : 0
                }
                className="mt-3"
              />
            </div>
          </div>

          <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/vocabulary"
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                !selected
                  ? "bg-brand text-white"
                  : "border border-line bg-surface text-muted hover:text-brand"
              }`}
            >
              Tất cả
            </Link>
            {LEVEL_CODES.map((code) => (
              <Link
                key={code}
                href={`/vocabulary?level=${code}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  selected === code
                    ? "bg-brand text-white"
                    : "border border-line bg-surface text-muted hover:text-brand"
                }`}
              >
                <span className="mr-1">{code}</span>
                <span className="opacity-70">{LEVEL_META[code].name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          <div className="space-y-10">
            {levels.map((level) => {
              const topics = level.vocabulary.topics.filter((topic) => topic.lessons.length > 0);
              if (topics.length === 0) return null;
              const meta = LEVEL_META[level.code];

              return (
                <div key={level.id}>
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="display flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold"
                      style={{ background: meta.soft, color: meta.color }}
                    >
                      {level.code}
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-ink">
                        {meta.name}
                        <span className="ml-2 text-xs font-normal text-muted">{meta.tagline}</span>
                      </h2>
                      <p className="text-[11px] text-muted">
                        {level.vocabulary.completed}/{level.vocabulary.total} bài từ vựng đã hoàn thành
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {topics.map((topic) => {
                      const words = topic.lessons.reduce(
                        (sum, lesson) => sum + lesson.wordCount,
                        0,
                      );
                      const completed = topic.lessons.filter((lesson) => lesson.completed).length;
                      const percent = topic.lessons.length
                        ? Math.round((completed / topic.lessons.length) * 100)
                        : 0;

                      return (
                        <Link
                          key={topic.id}
                          href={`/vocabulary/${level.code}/${topic.slug}`}
                          className="group card flex flex-col justify-between p-6 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_20px_50px_-40px_rgba(21,37,27,0.5)]"
                        >
                          <div>
                            <div className="mb-4 flex items-start justify-between gap-3">
                              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                <span className="material-symbols-outlined">{topic.icon}</span>
                              </span>
                              <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[10px] font-semibold text-muted">
                                {topic.lessons.length} bài · {words} từ
                              </span>
                            </div>
                            <h3 className="display text-xl text-ink group-hover:text-brand">
                              {topic.name}
                            </h3>
                            {topic.description ? (
                              <p className="mt-2 text-sm leading-relaxed text-muted">
                                {topic.description}
                              </p>
                            ) : null}
                          </div>
                          <div className="mt-5">
                            <div className="mb-1.5 flex justify-between text-[11px]">
                              <span className="font-semibold text-ink">
                                {completed}/{topic.lessons.length} bài
                              </span>
                              <span className="text-muted">{percent}%</span>
                            </div>
                            <ProgressBar value={percent} />
                            <div className="mt-4 flex items-center text-sm font-semibold text-brand">
                              Khám phá chủ đề
                              <span className="material-symbols-outlined ml-1 text-[18px] transition-transform group-hover:translate-x-0.5">
                                arrow_forward
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
