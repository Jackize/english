import Link from "next/link";

export function BrandLogo({
  variant = "link",
}: {
  variant?: "link" | "placeholder";
}) {
  const content = (
    <>
      <span className="text-[19px] font-extrabold tracking-tight text-brand">eng-growth</span>
      <span
        className={`hidden rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold tracking-wider text-brand lg:pointer-fine:inline ${
          variant === "placeholder" ? "opacity-80" : ""
        }`}
      >
        IELTS A1 → C2
      </span>
    </>
  );

  if (variant === "placeholder") {
    return (
      <span className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">{content}</span>
    );
  }

  return (
    <Link href="/" className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
      {content}
    </Link>
  );
}
