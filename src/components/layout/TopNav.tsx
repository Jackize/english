import Link from "next/link";

interface TopNavProps {
  active?: "home" | "learn" | "review" | "admin";
}

const links = [
  { href: "/", key: "home" as const, label: "Home" },
  { href: "/learn", key: "learn" as const, label: "Learn" },
  { href: "/review", key: "review" as const, label: "Review" },
  { href: "/admin", key: "admin" as const, label: "Admin" },
];

export function TopNav({ active }: TopNavProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-surface">
      <div className="mx-auto flex w-full max-w-[var(--spacing-container-max)] items-center justify-between px-gutter py-4">
        <div className="flex items-center gap-md">
          <Link href="/" className="text-xl font-bold text-primary">
            eng-growth
          </Link>
          <div className="ml-lg hidden gap-md md:flex">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={
                  active === link.key
                    ? "border-b-2 border-primary pb-1 font-bold text-primary"
                    : "font-medium text-on-surface-variant transition-colors hover:text-primary"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-sm text-primary">
          <Link href="/login" className="material-symbols-outlined hover:opacity-80" aria-label="Account">
            account_circle
          </Link>
        </div>
      </div>
    </nav>
  );
}
