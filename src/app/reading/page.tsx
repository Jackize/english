import type { Metadata } from "next";
import Link from "next/link";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import { getReadingUnits } from "@/lib/reading";
import { getReadingQuestionCount, type ReadingUnit } from "@/lib/reading-types";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Đọc hiểu IELTS A1 → C2 | eng-growth",
  description:
    "Luyện đọc hiểu theo từng unit: bài ngắn, câu hỏi tương tác, đáp án có câu chứng minh và từ vựng kèm IPA.",
};

const LEVEL_CODES: LevelCode[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const LEVEL_NOTES: Record<LevelCode, string> = {
  A1: "Câu ngắn, chủ đề quen thuộc; làm quen True/False, trắc nghiệm, matching và trả lời ngắn.",
  A2: "Bài dài hơn, thêm True/False/Not Given và matching thông tin.",
  B1: "Bắt đầu format IELTS Academic với bài đọc 500–650 từ.",
  B2: "Bài 700–900 từ, luyện tốc độ và paraphrase.",
  C1: "Bài 900–1.100 từ, chú trọng inference và thái độ tác giả.",
  C2: "Bài học thuật dài, xử lý nuance và lập luận phức tạp.",
};

function unitCountForLevel(units: ReadingUnit[], code: LevelCode) {
  return units.filter((unit) => unit.level === code).length;
}

function ReadingUnitRow({ unit }: { unit: ReadingUnit }) {
  const questionCount = getReadingQuestionCount(unit);

  return (
    <Link
      href={`/reading/${unit.level.toLowerCase()}/${unit.slug}`}
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
        <p className="mt-1 text-xs leading-relaxed text-muted">{unit.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {unit.questionTypes.map((type) => (
            <span
              key={type}
              className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold text-muted"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 text-[11px] text-muted sm:flex-col sm:items-end sm:gap-0.5">
        <span>{unit.lengthWords} từ</span>
        <span>{questionCount} câu hỏi</span>
        <span>~{unit.estimatedMinutes} phút</span>
      </div>

      <span className="material-symbols-outlined hidden text-[20px] text-brand transition-transform group-hover:translate-x-0.5 sm:block">
        arrow_forward
      </span>
    </Link>
  );
}

export default async function ReadingPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const params = await searchParams;
  const units = await getReadingUnits();
  const selected = LEVEL_CODES.includes(params.level as LevelCode)
    ? (params.level as LevelCode)
    : null;

  const visibleLevels = selected
    ? [selected]
    : LEVEL_CODES.filter((code) => unitCountForLevel(units, code) > 0);
  const totalUnits = units.length;
  const upcomingLevels = LEVEL_CODES.filter(
    (code) => !selected && unitCountForLevel(units, code) === 0,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="reading" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-14 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[15px]">menu_book</span>
                Đọc hiểu · A1 → C2
              </div>
              <h1 className="display max-w-2xl text-[32px] leading-tight text-ink md:text-5xl">
                Đọc chậm, hiểu chắc,{" "}
                <span className="display-accent text-brand">rồi tăng tốc.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                Mỗi unit có một bài đọc ngắn, câu hỏi tương tác và đáp án kèm câu chứng minh.
                A1–A2 xây nền trước khi bước vào format IELTS Academic ở B1.
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
                  Prototype
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                A1 Reading là mẫu đầu tiên. Các unit tiếp theo sẽ dùng chung cấu trúc này.
              </p>
            </div>
          </div>

          <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/reading"
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
                  href={`/reading?level=${code}`}
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
                            <span className="ml-2 text-sm font-normal text-muted">
                              Reading
                            </span>
                          </h2>
                          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
                            {LEVEL_NOTES[code]}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold text-muted">
                        {levelUnits.length} unit đã mở
                      </span>
                    </div>

                    <div className="space-y-3 p-4 md:p-5">
                      {levelUnits.map((unit) => (
                        <ReadingUnitRow key={`${unit.level}-${unit.slug}`} unit={unit} />
                      ))}

                      {levelUnits.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-line bg-surface-muted/20 px-5 py-8 text-center">
                          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-muted">
                            <span className="material-symbols-outlined text-[22px]">
                              auto_stories
                            </span>
                          </span>
                          <h3 className="mt-3 text-sm font-semibold text-ink">
                            Level này chưa mở trên app
                          </h3>
                          <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted">
                            Nội dung {code} Reading đã có trong tài liệu curriculum. App đang
                            hoàn thiện mẫu A1 trước khi chuyển các level tiếp theo.
                          </p>
                          <Link
                            href="/reading/a1/unit-1"
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

          {!selected ? (
            <div className="mt-4 rounded-2xl border border-dashed border-line bg-surface/60 px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-semibold text-ink">Các level tiếp theo</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    A2–C2 Reading đã có trong curriculum và sẽ mở sau khi hoàn thiện mẫu A1.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {upcomingLevels.map((code) => (
                    <span
                      key={code}
                      className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-semibold text-muted"
                    >
                      {code} · {LEVEL_META[code].name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-8 rounded-2xl border border-brand/15 bg-brand-soft/40 p-6 md:p-7">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: "waving_hand",
                  title: "Khởi động trước khi đọc",
                  body: "Trả lời nhanh vài câu hỏi quen thuộc để kích hoạt vốn từ và đoán chủ đề.",
                },
                {
                  icon: "menu_book",
                  title: "Đọc và trả lời",
                  body: "Bài đọc nằm cạnh câu hỏi. Mỗi đáp án phải có một câu chứng minh trong bài.",
                },
                {
                  icon: "task_alt",
                  title: "Kiểm tra và ghi lỗi",
                  body: "Xem giải thích, đối chiếu evidence rồi học lại từ vựng khó trong unit.",
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
