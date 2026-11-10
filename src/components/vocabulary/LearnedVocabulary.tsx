"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { getLearnedVocabulary } from "@/lib/vocab-review";

type LearnedWord = Awaited<ReturnType<typeof getLearnedVocabulary>>[number];

const LEVEL_STYLE: Record<
  number,
  { label: string; className: string }
> = {
  1: { label: "Mới gặp", className: "bg-[#fdf3e2] text-[#a8691a]" },
  2: { label: "Tiếp nhận", className: "bg-[#f6f0d8] text-[#8a6a12]" },
  3: { label: "Ghi nhớ", className: "bg-[#eef6ea] text-[#3d7a33]" },
  4: { label: "Chủ động", className: "bg-brand-soft text-brand" },
  5: { label: "Phản xạ", className: "bg-[#e8f0fb] text-[#2f5f9e]" },
};

const FILTERS = [
  { value: "all" as const, label: "Tất cả" },
  { value: 1 as const, label: "Mới gặp" },
  { value: 2 as const, label: "Tiếp nhận" },
  { value: 3 as const, label: "Ghi nhớ" },
  { value: 4 as const, label: "Chủ động" },
  { value: 5 as const, label: "Phản xạ" },
];

export function LearnedVocabulary({ words }: { words: LearnedWord[] }) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<number | "all">("all");

  const counts = useMemo(() => {
    const result: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const word of words) result[word.level] += 1;
    return result;
  }, [words]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return words.filter((word) => {
      if (level !== "all" && word.level !== level) return false;
      if (!needle) return true;

      const haystack = [
        word.word,
        word.meaningVi,
        word.meaningEn ?? "",
        word.lesson.title,
        word.lesson.topicName ?? "",
        word.lesson.levelCode,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [level, query, words]);

  if (words.length === 0) {
    return (
      <div className="card p-8 text-center md:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <span className="material-symbols-outlined text-[30px]">auto_stories</span>
        </span>
        <h2 className="display mt-4 text-3xl text-ink">Chưa có từ nào đã học</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Khi bạn hoàn thành phần lý thuyết hoặc làm bài kiểm tra từ vựng, các từ sẽ xuất hiện ở đây
          để bạn xem lại bất cứ lúc nào.
        </p>
        <Link
          href="/vocabulary"
          className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
        >
          Bắt đầu học từ vựng
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="card p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-muted">
              search
            </span>
            <label htmlFor="learned-search" className="sr-only">
              Tìm từ đã học
            </label>
            <input
              id="learned-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo từ, nghĩa hoặc tên bài..."
              className="w-full rounded-xl border border-line bg-surface py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold text-muted">
              <span className="material-symbols-outlined text-[15px]">menu_book</span>
              {filtered.length}/{words.length} từ
            </span>
          </div>
        </div>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((filter) => {
            const active = level === filter.value;
            const count = filter.value === "all" ? words.length : counts[filter.value];

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setLevel(filter.value)}
                aria-pressed={active}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-brand text-white"
                    : "border border-line bg-surface text-muted hover:border-brand/30 hover:text-brand"
                }`}
              >
                {filter.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    active ? "bg-white/20 text-white" : "bg-surface-muted text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-5 p-8 text-center">
          <span className="material-symbols-outlined text-[30px] text-muted">search_off</span>
          <h2 className="display mt-3 text-2xl text-ink">Không tìm thấy từ phù hợp</h2>
          <p className="mt-1 text-sm text-muted">Thử từ khoá khác hoặc bỏ bộ lọc hiện tại.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLevel("all");
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/30 hover:text-brand"
          >
            <span className="material-symbols-outlined text-[17px]">restart_alt</span>
            Xoá bộ lọc
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {filtered.map((word) => {
            const style = LEVEL_STYLE[word.level] ?? LEVEL_STYLE[1];

            return (
              <article key={word.id} className="card flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h2 className="display text-xl text-ink md:text-2xl">{word.word}</h2>
                      {word.wordForm ? (
                        <span className="rounded-md bg-surface-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {word.wordForm}
                        </span>
                      ) : null}
                    </div>
                    {word.ipa ? <p className="mt-0.5 text-xs text-muted">{word.ipa}</p> : null}
                    <p className="mt-2 text-sm font-medium leading-relaxed text-ink">
                      {word.meaningVi}
                    </p>
                    {word.meaningEn ? (
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{word.meaningEn}</p>
                    ) : null}
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${style.className}`}
                    title={word.levelName}
                  >
                    {style.label}
                  </span>
                </div>

                {word.example ? (
                  <p className="mt-3 border-l-2 border-line pl-3 text-xs italic leading-relaxed text-muted">
                    {word.example}
                  </p>
                ) : null}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[11px] text-muted">
                  <span className="min-w-0 truncate">
                    <span className="font-semibold text-ink">{word.lesson.levelCode}</span>
                    {word.lesson.topicName ? ` · ${word.lesson.topicName}` : ""}
                    {` · ${word.lesson.title}`}
                  </span>
                  <Link
                    href={`/lesson/${word.lesson.id}`}
                    className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand hover:underline"
                  >
                    Học lại
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
