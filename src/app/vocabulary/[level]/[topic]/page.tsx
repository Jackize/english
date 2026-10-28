import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getTopicDetail } from "@/lib/learning";
import { prisma } from "@/lib/prisma";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LessonRow } from "@/components/learning/LessonRow";
import { ProgressBar } from "@/components/ui/Progress";

export const revalidate = 3600;

export async function generateStaticParams() {
  const topics = await prisma.topic.findMany({
    select: { slug: true, level: { select: { code: true } } },
  });
  return topics.map((topic) => ({
    level: topic.level.code.toUpperCase(),
    topic: topic.slug,
  }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ level: string; topic: string }>;
}) {
  const session = await getSession();
  const { level: levelParam, topic: topicParam } = await params;
  const levelCode = levelParam.toUpperCase() as LevelCode;
  const topic = await getTopicDetail(levelCode, topicParam, session?.user?.id);

  if (!topic) notFound();

  const meta = LEVEL_META[levelCode];
  const percent = topic.total ? Math.round((topic.completed / topic.total) * 100) : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="vocabulary" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-10 md:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted">
            <Link href="/vocabulary" className="hover:text-brand">
              Từ vựng
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link href={`/vocabulary?level=${levelCode}`} className="hover:text-brand">
              {levelCode}
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-ink">{topic.name}</span>
          </nav>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <span className="material-symbols-outlined text-[26px]">{topic.icon}</span>
              </span>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: meta.soft, color: meta.color }}
                  >
                    {levelCode} · {meta.name}
                  </span>
                  <span className="text-[11px] text-muted">
                    {topic.lessons.length} bài · {topic.wordCount} từ
                  </span>
                </div>
                <h1 className="display text-3xl text-ink md:text-4xl">{topic.name}</h1>
                {topic.description ? (
                  <p className="mt-2 max-w-2xl text-sm text-muted">{topic.description}</p>
                ) : null}
              </div>
            </div>

            <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4">
              <div className="mb-2 flex justify-between text-[11px]">
                <span className="font-semibold text-ink">
                  {topic.completed}/{topic.total} bài
                </span>
                <span className="text-muted">{percent}%</span>
              </div>
              <ProgressBar value={percent} />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          <div className="space-y-2">
            {topic.lessons.map((lesson, index) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                levelCode={levelCode}
                index={index + 1}
              />
            ))}
          </div>

          <div className="mt-8">
            <Link
              href={`/vocabulary?level=${levelCode}`}
              className="text-sm font-semibold text-brand hover:underline"
            >
              ← Quay lại từ vựng {levelCode}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
