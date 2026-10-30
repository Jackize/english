import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEVEL_META } from "@/lib/curriculum";
import { getWritingUnit, getWritingUnits } from "@/lib/writing";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WritingUnitExperience } from "@/components/writing/WritingUnitExperience";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string; unit: string }>;
}): Promise<Metadata> {
  const { level, unit: unitSlug } = await params;
  const unit = await getWritingUnit(level, unitSlug);

  if (!unit) {
    return { title: "Bài viết không tồn tại — eng-growth" };
  }

  return {
    title: `${unit.level} Writing Unit ${unit.unitNumber} — ${unit.title} | eng-growth`,
    description: unit.goal,
  };
}

export default async function WritingUnitPage({
  params,
}: {
  params: Promise<{ level: string; unit: string }>;
}) {
  const { level, unit: unitSlug } = await params;
  const unit = await getWritingUnit(level, unitSlug);

  if (!unit) notFound();

  const meta = LEVEL_META[unit.level];
  const levelUnits = await getWritingUnits(unit.level);
  const isPreIelts = unit.level === "A1" || unit.level === "A2";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="writing" />
      <main className="flex-1">
        <div className="border-b border-line bg-surface">
          <div className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-8 md:py-10">
            <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
              <Link href="/writing" className="hover:text-brand">
                Viết
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link href={`/writing?level=${unit.level}`} className="hover:text-brand">
                {unit.level}
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-ink">Unit {unit.unitNumber}</span>
            </nav>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: meta.soft, color: meta.color }}
                  >
                    {unit.level} · {meta.name}
                  </span>
                  <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-muted">
                    {isPreIelts ? "Pre-IELTS Writing" : "IELTS Academic Writing"}
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                    Unit {unit.unitNumber} / {levelUnits.length}
                  </span>
                </div>

                <h1 className="display text-[34px] leading-tight text-ink md:text-[46px]">
                  {unit.title}
                </h1>
                {unit.goal ? (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {unit.goal}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted">
                  {unit.product ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1.5">
                      <span className="material-symbols-outlined text-[15px] text-brand">task_alt</span>
                      {unit.product}
                    </span>
                  ) : null}
                  {unit.minutes ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1.5">
                      <span className="material-symbols-outlined text-[15px] text-brand">schedule</span>
                      {unit.minutes}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto w-full max-w-[920px] px-5 py-8 md:px-8">
          <WritingUnitExperience unit={unit} />
          <div className="mt-8 flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center">
            <Link
              href={`/writing?level=${unit.level}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Danh sách bài viết {unit.level}
            </Link>
            <span className="text-xs text-muted">
              {isPreIelts
                ? `${unit.level} Writing là pre-IELTS: câu đơn, đoạn ngắn và tự sửa lỗi.`
                : `${unit.level} Writing theo format IELTS Academic: Task 1 và Task 2.`}
            </span>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
