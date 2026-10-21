"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";

interface ReviewWord {
  id: string;
  word: string;
  meaningEn: string;
  meaningVi: string;
  status: string;
  lastResult?: string | null;
  reviewCount: number;
  interval: number;
}

interface Stats {
  mastered: number;
  total: number;
  retentionRate: number;
  streak: number;
}

export default function ReviewPage() {
  const [stats, setStats] = useState<Stats>({ mastered: 0, total: 0, retentionRate: 0, streak: 0 });
  const [words, setWords] = useState<ReviewWord[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recent");

  const loadData = useCallback(async () => {
    const res = await fetch(`/api/progress?search=${encodeURIComponent(search)}&filter=${filter}`);
    if (res.ok) {
      const data = await res.json();
      setStats(data.stats);
      setWords(data.words);
    }
  }, [search, filter]);

  useEffect(() => {
    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [loadData]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav active="review" />
      <main className="mx-auto flex w-full max-w-[var(--spacing-container-max)] flex-grow flex-col gap-lg px-gutter py-lg">
        <section className="flex flex-col justify-between gap-base border-b border-outline-variant pb-md md:flex-row md:items-end">
          <div>
            <h1 className="mb-1 text-2xl font-semibold text-on-surface">Review History</h1>
            <p className="text-on-surface-variant">
              Track your vocabulary mastery and revisit challenging words.
            </p>
          </div>
          <div className="flex flex-col items-center gap-sm sm:flex-row">
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                className="w-full rounded-lg border-[1.5px] border-outline-variant bg-surface py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-accent-green focus:outline-none"
                placeholder="Search words..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="w-full appearance-none rounded-lg border-[1.5px] border-outline-variant bg-surface px-4 py-2 text-sm sm:w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="recent">Recent</option>
              <option value="hardest">Hardest</option>
              <option value="easiest">Easiest</option>
            </select>
            <Link
              href="/review/session"
              className="btn-primary whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium"
            >
              Start Review
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {[
            { icon: "task_alt", label: "Total Mastered", value: stats.mastered },
            { icon: "monitoring", label: "Retention Rate", value: `${stats.retentionRate}%` },
            { icon: "local_fire_department", label: "Current Streak", value: `${stats.streak} days` },
          ].map((s) => (
            <div
              key={s.label}
              className="card-elevation flex flex-col items-center justify-center rounded-xl bg-surface-bright p-md text-center"
            >
              <span className="material-symbols-outlined mb-1 text-3xl text-accent-green-dark">{s.icon}</span>
              <p className="mb-1 text-xs font-semibold tracking-wider text-on-surface-variant uppercase">{s.label}</p>
              <p className="text-2xl font-semibold text-on-surface">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
          {words.map((w) => (
            <div
              key={w.id}
              className="card-elevation flex flex-col justify-between rounded-xl bg-surface-container-lowest p-md transition-all"
            >
              <div>
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-on-surface">{w.word}</h3>
                  <span className="rounded-full bg-accent-green-light px-2 py-0.5 text-xs text-accent-green-dark">
                    {w.status}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-on-surface-variant">{w.meaningVi}</p>
                <p className="mt-1 line-clamp-2 text-xs text-on-surface-variant opacity-70">{w.meaningEn}</p>
              </div>
              <div className="mt-4 flex gap-4 border-t border-outline-variant pt-3 text-xs text-on-surface-variant">
                <span>Reviews: {w.reviewCount}</span>
                <span>Interval: {w.interval}d</span>
                {w.lastResult && <span>Last: {w.lastResult}</span>}
              </div>
            </div>
          ))}
          {words.length === 0 && (
            <p className="col-span-full py-12 text-center text-on-surface-variant">
              No review history yet. Start learning to see your progress here.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
