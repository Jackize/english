import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./SignOutButton";

export type NavKey =
  | "home"
  | "daily"
  | "roadmap"
  | "grammar"
  | "vocabulary"
  | "reading"
  | "review"
  | "admin";

const links: { href: string; key: NavKey; label: string }[] = [
  { href: "/", key: "home", label: "Trang chủ" },
  { href: "/daily", key: "daily", label: "Theo ngày" },
  { href: "/roadmap", key: "roadmap", label: "Lộ trình" },
  { href: "/grammar", key: "grammar", label: "Ngữ pháp" },
  { href: "/vocabulary", key: "vocabulary", label: "Từ vựng" },
  { href: "/reading", key: "reading", label: "Đọc hiểu" },
  { href: "/review", key: "review", label: "Ôn tập" },
];

export async function SiteHeader({ active }: { active?: NavKey }) {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
            <span className="text-[19px] font-extrabold tracking-tight text-brand">eng-growth</span>
            <span className="hidden rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold tracking-wider text-brand lg:inline">
              IELTS A1 → C2
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={
                  active === link.key
                    ? "whitespace-nowrap border-b-2 border-brand pb-0.5 text-sm font-semibold text-ink"
                    : "whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-brand"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {user ? (
            <>
              <Link
                href="/admin"
                className="hidden whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-brand lg:inline"
              >
                Quản trị
              </Link>
              <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface py-1 pl-1 pr-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                  {(user.name ?? user.email ?? "U").charAt(0).toUpperCase()}
                </span>
                <div className="leading-tight">
                  <div className="hidden max-w-[110px] truncate text-xs font-semibold text-ink sm:block">
                    {user.name ?? user.email}
                  </div>
                  <SignOutButton />
                </div>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      <nav className="no-scrollbar flex gap-5 overflow-x-auto border-t border-line/60 px-5 py-2 lg:hidden">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={
              active === link.key
                ? "whitespace-nowrap text-sm font-semibold text-brand"
                : "whitespace-nowrap text-sm font-medium text-muted"
            }
          >
            {link.label}
          </Link>
        ))}
        {user ? (
          <Link
            href="/admin"
            className={
              active === "admin"
                ? "whitespace-nowrap text-sm font-semibold text-brand"
                : "whitespace-nowrap text-sm font-medium text-muted"
            }
          >
            Quản trị
          </Link>
        ) : null}
      </nav>
    </header>
  );
}
