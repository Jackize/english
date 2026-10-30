import type { Metadata } from "next";
import Link from "next/link";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import { getWritingUnits, type WritingUnit } from "@/lib/writing";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Viết A1 → C2 | eng-growth",
  description:
    "Luyện viết tiếng Anh theo từng unit: câu đơn, đoạn văn, IELTS Task 1 & Task 2, ngữ pháp và tự sửa lỗi.",
};

const LEVEL_CODES: LevelCode[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const LEVEL_NOTES: Record<LevelCode, string> = {
  A1: "Pre-IELTS: câu đơn, đoạn 30–80 từ, tự sửa lỗi và làm quen mô tả biểu đồ.",
  A2: "Đoạn văn 4 phần, tường thuật quá khứ, so sánh và làm quen biểu đồ cơ bản.",
  B1: "Vào format IELTS Academic: Task 1 (line, bar, pie, process, map) và Task 2.",
  B2: "Chọn số liệu, overview nâng cao, nhượng bộ/phản bác và mock test có thời gian.",
  C1: "Lập luận phức hợp, academic style, độ chính xác số liệu và timed mock.",
  C2: "Precision, thesis/counter-thesis, cú pháp phức và kiểm soát sắc thái.",
};

function unitCountForLevel(units: WritingUnit[], code: LevelCode) {
  return units.filter((unit) => unit.level === code).length;
}

function WritingUnitRow({ unit }: { unit: WritingUnit }) {
  return (
    <Link
      href={`/writing/${unit.level.toLowerCase()}/${unit.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 transition-all hover:border-brand/30 hover:bg-brand-soft/10 sm:flex-row sm:items-center"
    >
      <span className="display flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-soft text-sm font-bold text-brand">
        {String(unit.unitNumber).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-bold text-ink">{unit.title}</h3>
          <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-semibold text-muted">
            Unit {unit.unitNumber}
          </span>
        </div>
        {unit.goal ? (
          <p className="mt-1 text-xs leading-relaxed text-muted">{unit.goal}</p>
        ) : null}
        <div className="mt-2 text-[11px] text-muted">
          {unit.product}
          {unit.product && unit.minutes ? " · " : ""}
          {unit.minutes}
        </div>
      </div>

      <span className="material-symbols-outlined hidden text-[20px] text-brand transition-transform group-hover:translate-x-0.5 sm:block">
        arrow_forward
      </span>
    </Link>
  );
}

export default async function WritingPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const params = await searchParams;
  const units = await getWritingUnits();
  const selected = LEVEL_CODES.includes(params.level as LevelCode)
    ? (params.level as LevelCode)
    : null;

  const visibleLevels = selected
    ? [selected]
    : LEVEL_CODES.filter((code) => unitCountForLevel(units, code) > 0);
  const totalUnits = units.length;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="writing" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-14 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[15px]">edit_note</span>
                Viết · A1 → C2
              </div>
              <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-5xl">
                Viết chậm, đúng ngữ pháp,{" "}
                <span className="display-accent text-brand">rồi viết dài hơn.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                A1–A2 xây nền bằng câu đơn và đoạn ngắn. Từ B1, mỗi unit đi thẳng vào
                IELTS Academic với model, language bank, guided practice, bài viết và checklist.
              </p>
            </div>

            <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Đã mở trên app
                  </div>
                  <div className="display mt-1 text-3xl text-ink">
                    {totalUnits}
                    <span className="text-lg text-muted"> unit</span>
                  </div>
                </div>
                <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand">
                  Đủ 6 level
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {LEVEL_CODES.length} bậc CEFR, từ câu đơn A1 đến bài luận C2.
              </p>
            </div>
          </div>

          <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/writing"
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                !selected
                  ? "bg-brand text-white"
                  : "border border-line bg-surface text-muted hover:text-brand"
              }`}
            >
              Tất cả
            </Link>
            {LEVEL_CODES.map((code) => {
              const count = unitCountForLevel(units, code);
              return (
                <Link
                  key={code}
                  href={`/writing?level=${code}`}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    selected === code
                      ? "bg-brand text-white"
                      : "border border-line bg-surface text-muted hover:text-brand"
                  }`}
                >
                  <span className="mr-1">{code}</span>
                  <span className="opacity-70">{LEVEL_META[code].name}</span>
                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                      selected === code ? "bg-white/20" : "bg-surface-muted"
                    }`}
                  >
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-16 md:px-8">
          <div className="space-y-8">
            {visibleLevels.map((code) => {
              const meta = LEVEL_META[code];
              const levelUnits = units.filter((unit) => unit.level === code);

              return (
                <section key={code}>
                  <div className="card overflow-hidden">
                    <div className="flex flex-col gap-3 border-b border-line bg-surface-muted/40 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="display flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold"
                          style={{ background: meta.soft, color: meta.color }}
                        >
                          {code}
                        </div>
                        <div>
                          <h2 className="display text-xl text-ink">
                            {meta.name}
                            <span className="ml-2 text-sm font-normal text-muted">Writing</span>
                          </h2>
                          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
                            {LEVEL_NOTES[code]}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold text-muted">
                        {levelUnits.length} unit
                      </span>
                    </div>

                    <div className="space-y-3 p-4 md:p-5">
                      {levelUnits.map((unit) => (
                        <WritingUnitRow key={`${unit.level}-${unit.slug}`} unit={unit} />
                      ))}

                      {levelUnits.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-line bg-surface-muted/20 px-5 py-8 text-center">
                          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-muted">
                            <span className="material-symbols-outlined text-[22px]">
                              edit_note
                            </span>
                          </span>
                          <h3 className="mt-3 text-sm font-semibold text-ink">
                            Level này chưa mở trên app
                          </h3>
                          <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted">
                            Nội dung {code} Writing đã có trong curriculum và đang được đưa lên app.
                          </p>
                          <Link
                            href="/writing/a1/unit-1"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                          >
                            Xem A1 · Unit 1
                            <span className="material-symbols-outlined text-[15px]">
                              arrow_forward
                            </span>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-brand/15 bg-brand-soft/40 p-6 md:p-7">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: "menu_book",
                  title: "Đọc model trước",
                  body: "Xem bài mẫu, ghi lại cách chia đoạn và những cụm từ đáng học.",
                },
                {
                  icon: "edit_note",
                  title: "Luyện có hướng dẫn",
                  body: "Làm guided practice và language bank để nắm cấu trúc trước khi viết.",
                },
                {
                  icon: "task_alt",
                  title: "Viết và tự sửa",
                  body: "Viết bài của bạn, đối chiếu checklist rồi ghi lỗi vào error bank.",
                },
              ].map((step) => (
                <div key={step.title}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-brand">
                    <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-ink">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-muted">
            A1–A2 là pre-IELTS. B1 mới bắt đầu format IELTS Academic đầy đủ.
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
