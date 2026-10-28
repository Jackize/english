import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEVEL_META } from "@/lib/curriculum";
import { getReadingUnit } from "@/lib/reading";
import { getReadingQuestionCount } from "@/lib/reading-types";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ReadingUnitExperience } from "@/components/reading/ReadingUnitExperience";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string; unit: string }>;
}): Promise<Metadata> {
  const { level, unit: unitSlug } = await params;
  const unit = await getReadingUnit(level, unitSlug);

  if (!unit) {
    return { title: "Bài đọc không tồn tại — eng-growth" };
  }

  return {
    title: `${unit.level} Reading Unit ${unit.unitNumber} — ${unit.title} | eng-growth`,
    description: unit.goal,
  };
}

export default async function ReadingUnitPage({
  params,
}: {
  params: Promise<{ level: string; unit: string }>;
}) {
  const { level, unit: unitSlug } = await params;
  const unit = await getReadingUnit(level, unitSlug);

  if (!unit) notFound();

  const meta = LEVEL_META[unit.level];
  const questionCount = getReadingQuestionCount(unit);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="reading" />
      <main className="flex-1">
        <div className="border-b border-line bg-surface">
          <div className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-8 md:py-10">
            <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
              <Link href="/reading" className="hover:text-brand">
                Đọc hiểu
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link href={`/reading?level=${unit.level}`} className="hover:text-brand">
                {unit.level}
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-ink">Unit {unit.unitNumber}</span>
            </nav>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: meta.soft, color: meta.color }}
                  >
                    {unit.level} · {meta.name}
                  </span>
                  <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-muted">
                    Pre-IELTS
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                    Unit {unit.unitNumber} / {unit.unitTotal}
                  </span>
                </div>

                <h1 className="display text-[34px] leading-tight text-ink md:text-[46px]">
                  {unit.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {unit.goal}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1.5">
                    <span className="material-symbols-outlined text-[15px] text-brand">schedule</span>
                    {unit.timeLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1.5">
                    <span className="material-symbols-outlined text-[15px] text-brand">
                      menu_book
                    </span>
                    {unit.lengthWords} từ
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1.5">
                    <span className="material-symbols-outlined text-[15px] text-brand">quiz</span>
                    {questionCount} câu hỏi
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1.5">
                    <span className="material-symbols-outlined text-[15px] text-brand">category</span>
                    {unit.questionTypes.length} dạng câu hỏi
                  </span>
                </div>
              </div>

              <div className="w-full max-w-xs rounded-xl border border-line bg-background p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Trong unit này
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {unit.questionTypes.map((type) => (
                    <span
                      key={type}
                      className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-semibold text-ink"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <div className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  A1 là pre-IELTS: bài ngắn, không tính giờ, ưu tiên hiểu đúng và tìm được câu
                  chứng minh.
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReadingUnitExperience unit={unit} />
      </main>
      <SiteFooter />
    </div>
  );
}
