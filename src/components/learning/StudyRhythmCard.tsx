import type { HomeMotivation } from "@/lib/motivation";

const WEEKDAY = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export function StudyRhythmCard({
  streak,
  rhythm,
  activeDays,
}: Pick<HomeMotivation, "streak" | "rhythm" | "activeDays">) {
  const headline = streak.studiedToday
    ? `Chuỗi ${streak.days} ngày, hôm nay đã tính`
    : streak.atRisk
      ? `Giữ chuỗi ${streak.days} ngày`
      : "Bắt đầu một chuỗi mới";

  const hint = streak.studiedToday
    ? "Một bài học hoặc một lượt ôn mỗi ngày là đủ để chuỗi tiếp tục."
    : streak.atRisk
      ? "Hôm nay chưa có hoạt động. Hoàn thành một bài hoặc ôn vài từ trước nửa đêm để không mất chuỗi."
      : "Một bài học hoặc một lượt ôn hôm nay sẽ tính là ngày đầu tiên.";

  return (
    <div
      className={`card flex flex-col p-5 md:p-6 ${
        streak.atRisk ? "border-gold/40 bg-[#fffaf0]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="display text-2xl text-ink">{headline}</h2>
        </div>
        <span
          className={`material-symbols-outlined mt-1 text-[28px] ${
            streak.days > 0 ? "text-gold" : "text-muted"
          }`}
          aria-hidden="true"
        >
          local_fire_department
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{hint}</p>

      <div className="mt-auto pt-5">
        <div className="mb-2 flex items-baseline justify-between text-xs">
          <span className="font-semibold text-ink">14 ngày gần nhất</span>
          <span className="text-muted">{activeDays}/14 ngày có học</span>
        </div>
        <ol className="grid grid-cols-7 gap-1.5" aria-label="Các ngày có học trong 14 ngày gần nhất">
          {rhythm.map((day) => (
            <li key={day.key} className="flex flex-col items-center gap-1">
              <span className="sr-only">{`${WEEKDAY[day.weekday]} ${day.key.slice(8)}/${day.key.slice(5, 7)}${
                day.isToday ? " (hôm nay)" : ""
              }: ${day.active ? "có học" : "chưa học"}`}</span>
              <span
                className={`h-6 w-full rounded-md ${
                  day.active ? "bg-brand" : "border border-line bg-surface-muted"
                } ${day.isToday ? "ring-2 ring-brand/40 ring-offset-2 ring-offset-surface" : ""}`}
              />
              <span
                className={`text-[10px] ${day.isToday ? "font-bold text-ink" : "text-muted"}`}
                aria-hidden="true"
              >
                {day.isToday ? "Nay" : WEEKDAY[day.weekday]}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
