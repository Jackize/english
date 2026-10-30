
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NAV_LINKS } from "@/components/layout/navigation";

export function LoadingShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-8">
            <BrandLogo variant="placeholder" />
            <nav className="hidden items-center gap-6 lg:flex">
              {NAV_LINKS.map((link) => (
                <span
                  key={link.key}
                  className="whitespace-nowrap text-sm font-medium text-muted/70"
                >
                  {link.label}
                </span>
              ))}
            </nav>
          </div>
          <span className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white opacity-80">
            Đăng nhập
          </span>
        </div>
        <nav className="no-scrollbar flex gap-5 overflow-x-auto border-t border-line/60 px-5 py-2 lg:hidden">
          {NAV_LINKS.map((link) => (
            <span key={link.key} className="whitespace-nowrap text-sm font-medium text-muted/70">
              {link.label}
            </span>
          ))}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-line bg-surface">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-5 py-10 md:flex-row md:items-start md:justify-between md:px-8">
          <div>
            <span className="text-lg font-extrabold tracking-tight text-brand">eng-growth</span>
            <div className="mt-3 space-y-2">
              <div className="h-3 w-64 animate-pulse rounded bg-surface-muted" />
              <div className="h-3 w-48 animate-pulse rounded bg-surface-muted" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Lộ trình</div>
              <div className="h-3 w-24 animate-pulse rounded bg-surface-muted" />
              <div className="h-3 w-20 animate-pulse rounded bg-surface-muted" />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Tài khoản</div>
              <div className="h-3 w-24 animate-pulse rounded bg-surface-muted" />
            </div>
          </div>
        </div>
        <div className="border-t border-line/70 px-5 py-4 text-center text-xs text-muted">
          © 2026 eng-growth. Học chậm mà chắc.
        </div>
      </footer>
    </div>
  );
}