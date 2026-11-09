import Link from "next/link";

export function BrandLogo({
  variant = "link",
  tone = "default",
}: {
  variant?: "link" | "placeholder";
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";
  const content = (
    <>
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 items-center justify-center rounded-[10px] text-[15px] font-extrabold tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ${
          inverse ? "bg-mint text-brand-dark" : "bg-brand text-white"
        }`}
      >
        e
      </span>
      <span className="flex items-baseline gap-2">
        <span className={`text-[17px] font-bold tracking-tight ${inverse ? "text-white" : "text-ink"}`}>
          eng-growth
        </span>
        <span
          className={`hidden rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider lg:pointer-fine:inline ${
            inverse ? "bg-white/10 text-mint" : "bg-brand-soft text-brand"
          } ${variant === "placeholder" ? "opacity-80" : ""}`}
        >
          A1 → C2
        </span>
      </span>
    </>
  );

  if (variant === "placeholder") {
    return <span className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">{content}</span>;
  }

  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
      {content}
    </Link>
  );
}
