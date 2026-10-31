"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { NAV_GROUPS, isGroupActive, type NavKey } from "./navigation";
import { SignOutButton } from "./SignOutButton";

export interface HeaderUser {
  name: string | null;
  email: string | null;
  role: "USER" | "ADMIN";
  streak: number;
}

export interface ContinueLessonSummary {
  id: string;
  title: string;
}

interface HeaderBarProps {
  active?: NavKey;
  user: HeaderUser | null;
  continueLesson: ContinueLessonSummary | null;
}

export function HeaderBar({ active, user, continueLesson }: HeaderBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-5 md:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <BrandLogo />

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_GROUPS.map((group) => {
              const groupActive = isGroupActive(group, active);

              if (group.href) {
                return (
                  <Link
                    key={group.key}
                    href={group.href}
                    className={
                      groupActive
                        ? "whitespace-nowrap border-b-2 border-brand pb-0.5 text-sm font-semibold text-ink"
                        : "whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-brand"
                    }
                  >
                    {group.label}
                  </Link>
                );
              }

              return (
                <div
                  key={group.key}
                  className="group relative"
                  onMouseEnter={() => setSkillsOpen(true)}
                  onMouseLeave={() => setSkillsOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={skillsOpen}
                    aria-haspopup="true"
                    onClick={() => setSkillsOpen((open) => !open)}
                    className={
                      groupActive
                        ? "flex items-center gap-0.5 whitespace-nowrap border-b-2 border-brand pb-0.5 text-sm font-semibold text-ink"
                        : "flex items-center gap-0.5 whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-brand"
                    }
                  >
                    {group.label}
                    <span
                      className={`material-symbols-outlined text-[17px] transition-transform ${
                        skillsOpen ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  <div
                    className={`absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-3 ${
                      skillsOpen ? "block" : "hidden"
                    } group-focus-within:block`}
                  >
                    <div className="overflow-hidden rounded-xl border border-line bg-surface p-1.5 shadow-[0_24px_60px_-32px_rgba(21,37,27,0.45)]">
                      {group.items.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setSkillsOpen(false)}
                          className={
                            active === item.key
                              ? "block rounded-lg bg-brand-soft px-3 py-2 text-sm font-semibold text-brand"
                              : "block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-soft/60 hover:text-brand"
                          }
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {continueLesson ? (
            <Link
              href={`/lesson/${continueLesson.id}`}
              className="hidden max-w-[280px] items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark lg:inline-flex"
            >
              <span className="truncate">Tiếp tục học: {continueLesson.title}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          ) : null}

          {user ? (
            <>
              <span
                className="hidden items-center gap-1 rounded-full border border-[#f0d9b5] bg-[#fdf3e2] px-2.5 py-1.5 text-xs font-semibold text-gold sm:inline-flex"
                title={`Chuỗi học ${user.streak} ngày`}
              >
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                {user.streak}
              </span>

              <Link
                href="/settings"
                aria-label="Cài đặt học tập"
                title="Cài đặt học tập"
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand/30 hover:text-brand sm:flex"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
              </Link>

              {isAdmin ? (
                <Link
                  href="/admin"
                  className={
                    active === "admin"
                      ? "hidden whitespace-nowrap text-sm font-semibold text-brand lg:inline"
                      : "hidden whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-brand lg:inline"
                  }
                >
                  Quản trị
                </Link>
              ) : null}

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

          <button
            type="button"
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {continueLesson ? (
        <div className="border-t border-line/60 px-5 py-2 lg:hidden">
          <Link
            href={`/lesson/${continueLesson.id}`}
            className="flex items-center justify-between gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white"
          >
            <span className="truncate">Tiếp tục học: {continueLesson.title}</span>
            <span className="material-symbols-outlined shrink-0 text-[16px]">arrow_forward</span>
          </Link>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="border-t border-line/60 bg-surface px-5 py-4 lg:hidden">
          <div className="space-y-4">
            {NAV_GROUPS.map((group) => (
              <div key={group.key}>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  {group.label}
                </div>
                <div className="mt-1.5 grid grid-cols-2 gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={
                        active === item.key
                          ? "rounded-lg bg-brand-soft px-3 py-2 text-sm font-semibold text-brand"
                          : "rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-soft/60 hover:text-brand"
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              href="/settings"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-soft/60 hover:text-brand"
            >
              Cài đặt học tập
            </Link>

            {isAdmin ? (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className={
                  active === "admin"
                    ? "block rounded-lg bg-brand-soft px-3 py-2 text-sm font-semibold text-brand"
                    : "block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-soft/60 hover:text-brand"
                }
              >
                Quản trị
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
