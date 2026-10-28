import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getOverview } from "@/lib/learning";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LessonRow } from "@/components/learning/LessonRow";
import { ProgressBar } from "@/components/ui/Progress";

const LEVEL_CODES: LevelCode[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default async function GrammarPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const session = await getSession();
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
      <SiteHeader active="grammar" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-14 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[15px]">rule</span>
                Ngữ pháp · A1 → C2
              </div>
              <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-5xl">
                Ngữ pháp theo <span className="display-accent text-brand">từng bậc.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {overview.counts.grammar.total} bài học xếp theo sáu bậc CEFR. Học kiến thức trước,
                sau đó làm bài kiểm tra để chắc rằng bạn đã nắm chắc.
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
                  Tiến độ ngữ pháp
                </span>
                <span className="text-sm font-semibold text-brand">
                  {overview.counts.grammar.total
                    ? Math.round(
                        (overview.counts.grammar.completed / overview.counts.grammar.total) * 100,
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="display mt-1 text-2xl text-ink">
                {overview.counts.grammar.completed}
                <span className="text-base text-muted">/{overview.counts.grammar.total} bài</span>
              </div>
              <ProgressBar
                value={
                  overview.counts.grammar.total
                    ? (overview.counts.grammar.completed / overview.counts.grammar.total) * 100
                    : 0
                }
                className="mt-3"
              />
            </div>
          </div>

          <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/grammar"
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
                href={`/grammar?level=${code}`}
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
          <div className="space-y-8">
            {levels.map((level) => {
              const meta = LEVEL_META[level.code];
              const percent = level.grammar.total
                ? Math.round((level.grammar.completed / level.grammar.total) * 100)
                : 0;
              return (
                <div key={level.id} className="card overflow-hidden">
                  <div className="flex flex-col gap-3 border-b border-line bg-surface-muted/40 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="display flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold"
                        style={{ background: meta.soft, color: meta.color }}
                      >
                        {level.code}
                      </div>
                      <div>
                        <h2 className="display text-xl text-ink">
                          {meta.name}
                          <span className="ml-2 text-sm font-normal text-muted">
                            {meta.tagline}
                          </span>
                        </h2>
                        <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
                          {level.description}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex-shrink-0 sm:w-40">
                      <div className="mb-1.5 flex justify-between text-[11px]">
                        <span className="font-semibold text-ink">{percent}%</span>
                        <span className="text-muted">
                          {level.grammar.completed}/{level.grammar.total} bài
                        </span>
                      </div>
                      <ProgressBar value={percent} />
                    </div>
                  </div>
                  <div className="space-y-2 p-4 md:p-5">
                    {level.grammar.lessons.map((lesson, index) => (
                      <LessonRow
                        key={lesson.id}
                        lesson={lesson}
                        levelCode={level.code}
                        index={index + 1}
                      />
                    ))}
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
