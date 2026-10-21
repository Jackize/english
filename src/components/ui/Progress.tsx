export function ProgressBar({
  value,
  className = "",
  tone = "brand",
}: {
  value: number;
  className?: string;
  tone?: "brand" | "mint" | "muted";
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const bar =
    tone === "mint" ? "bg-mint" : tone === "muted" ? "bg-line" : "bg-brand";
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-line/80 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${bar}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function LevelBadge({ code, className = "" }: { code: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-bold tracking-wide text-brand ${className}`}
    >
      {code}
    </span>
  );
}

export function StatPill({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted">
      <span className="material-symbols-outlined text-[16px] text-brand">{icon}</span>
      {children}
    </span>
  );
}
