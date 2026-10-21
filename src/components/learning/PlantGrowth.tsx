import { PLANT_STAGES, type PlantStage } from "@/lib/curriculum";

export function PlantArt({ stage }: { stage: number }) {
  const show = (n: number) => stage >= n;

  return (
    <svg viewBox="0 0 280 320" className="h-full w-full" role="img" aria-label="Cây học tập">
      <defs>
        <linearGradient id="potGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e6d2" />
          <stop offset="100%" stopColor="#e3cfb2" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#eaf7ee" />
          <stop offset="100%" stopColor="#faf9f4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f8a4d" />
          <stop offset="100%" stopColor="#1f6c3a" />
        </linearGradient>
      </defs>

      <rect width="280" height="320" fill="url(#glow)" />
      <ellipse cx="140" cy="292" rx="82" ry="10" fill="#e8e8de" opacity="0.7" />

      {/* pot */}
      <path d="M92 246h96l-10 46c-1 6-6 10-12 10h-52c-6 0-11-4-12-10l-10-46Z" fill="url(#potGrad)" stroke="#d8c3a4" />
      <ellipse cx="140" cy="246" rx="48" ry="9" fill="#cbb28f" />
      <ellipse cx="140" cy="246" rx="42" ry="6.5" fill="#8a6a45" opacity="0.75" />

      {/* stage 1 — seed */}
      {show(1) && (
        <g>
          <ellipse cx="140" cy="244" rx="7" ry="4.5" fill="#7a5a36" />
        </g>
      )}

      {/* stage 2 — sprout */}
      {show(2) && (
        <g className="transition-all">
          <path d="M140 244c0-14 0-24 0-34" stroke="url(#stemGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M140 222c-12-2-20-10-21-20 12 2 20 9 21 20Z" fill="#4eae6c" />
          <path d="M140 216c11-2 19-10 20-19-12 2-19 9-20 19Z" fill="#6bc585" />
        </g>
      )}

      {/* stage 3 — stem */}
      {show(3) && (
        <g>
          <path d="M140 218c0-26-2-46-2-64" stroke="url(#stemGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M138 196c-15-3-25-12-26-25 15 3 25 12 26 25Z" fill="#3f9f5d" />
          <path d="M138 182c14-3 23-12 24-24-14 3-23 11-24 24Z" fill="#5cbd78" />
          <path d="M138 166c-12-3-20-10-21-21 12 3 20 10 21 21Z" fill="#4eae6c" />
          <path d="M138 156c12-3 20-10 21-20-12 3-20 10-21 20Z" fill="#6bc585" />
        </g>
      )}

      {/* stage 4 — branches */}
      {show(4) && (
        <g>
          <path d="M138 158c0-26-1-44-1-60" stroke="url(#stemGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M137 158c-20-6-32-19-34-36" stroke="#2f8a4d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M137 148c19-6 31-18 33-34" stroke="#2f8a4d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M104 128c-10-2-17-9-18-18 10 2 17 9 18 18Z" fill="#4eae6c" />
          <path d="M171 120c9-3 15-9 16-17-9 3-15 8-16 17Z" fill="#6bc585" />
          <path d="M104 146c-9 1-16-4-19-12 9-1 16 4 19 12Z" fill="#3f9f5d" />
          <path d="M170 140c8 1 15-4 18-11-9-1-16 4-18 11Z" fill="#5cbd78" />
          <path d="M136 138c-11-3-18-10-19-20 11 3 18 10 19 20Z" fill="#4eae6c" />
          <path d="M136 128c11-3 18-10 19-19-11 3-18 9-19 19Z" fill="#6bc585" />
        </g>
      )}

      {/* stage 5 — leaves */}
      {show(5) && (
        <g>
          <path d="M136 128c0-22 0-36 1-50" stroke="url(#stemGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M136 102c-17-3-28-13-29-28 17 3 28 13 29 28Z" fill="#3f9f5d" />
          <path d="M137 94c16-3 26-13 27-27-16 3-26 12-27 27Z" fill="#6bc585" />
          <path d="M137 80c-13-3-21-10-22-22 13 3 21 10 22 22Z" fill="#4eae6c" />
          <path d="M137 72c12-3 20-10 21-20-12 3-20 9-21 20Z" fill="#7ed494" />
          <path d="M136 118c-10 1-18-4-21-13 10-1 18 4 21 13Z" fill="#55b673" />
          <path d="M137 108c10 1 18-4 21-12-10-1-18 4-21 12Z" fill="#6bc585" />
        </g>
      )}

      {/* stage 6 — fruit */}
      {show(6) && (
        <g>
          <path d="M137 72c0-18 0-28 1-38" stroke="url(#stemGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="105" cy="96" r="6.5" fill="#f2a65a" stroke="#d97f2e" strokeWidth="1.2" />
          <circle cx="171" cy="88" r="6" fill="#f2a65a" stroke="#d97f2e" strokeWidth="1.2" />
          <circle cx="124" cy="62" r="5.5" fill="#e86b4b" stroke="#c94f31" strokeWidth="1.2" />
          <circle cx="155" cy="56" r="6" fill="#e86b4b" stroke="#c94f31" strokeWidth="1.2" />
          <circle cx="139" cy="34" r="7" fill="#f4b860" stroke="#d99a35" strokeWidth="1.2" />
          <path d="M139 41c0-5 3-9 8-10-1 6-4 9-8 10Z" fill="#6bc585" />
          <path d="M137 63c-12-3-19-10-20-21 12 3 19 10 20 21Z" fill="#4eae6c" />
          <path d="M138 54c11-3 18-9 19-19-11 3-18 9-19 19Z" fill="#6bc585" />
          <path d="M138 28c-9-3-15-8-16-17 9 3 15 8 16 17Z" fill="#7ed494" />
        </g>
      )}
    </svg>
  );
}

export function PlantGrowth({
  stage,
  percent,
  remainingXp,
}: {
  stage: PlantStage;
  percent: number;
  remainingXp: number;
}) {
  const next = PLANT_STAGES.find((item) => item.index === stage.index + 1) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-center">
      <div className="relative mx-auto h-[300px] w-[280px]">
        <PlantArt stage={stage.index} />
      </div>

      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-3xl text-ink">Hạt giống</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Mỗi bài hoàn thành bổ sung XP cho cây. Cây lớn dần theo tiến độ của toàn bộ khoá học.
            </p>
          </div>
          <div className="text-right">
            <div className="display text-4xl text-brand">{percent}%</div>
            <div className="text-xs uppercase tracking-[0.15em] text-muted">toàn khoá học</div>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-line bg-surface-muted/60 px-4 py-3 text-sm text-muted">
          {next ? (
            <>
              Còn <span className="font-semibold text-ink">{remainingXp} XP</span> để đạt{" "}
              <span className="font-semibold text-brand">{next.label}</span>
            </>
          ) : (
            <>Bạn đã chạm tới chặng cuối — <span className="font-semibold text-brand">Kết trái</span>.</>
          )}
        </div>

        <ol className="grid gap-2 sm:grid-cols-2">
          {PLANT_STAGES.map((item) => {
            const done = stage.index >= item.index;
            return (
              <li
                key={item.key}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                  item.index === stage.index
                    ? "border-brand/30 bg-brand-soft"
                    : "border-transparent"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    done ? "bg-brand text-white" : "bg-line text-muted"
                  }`}
                >
                  {String(item.index).padStart(2, "0")}
                </span>
                <span className={done ? "font-semibold text-ink" : "text-muted"}>{item.label}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
