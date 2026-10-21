"use client";

import { useState } from "react";
export interface WordRow {
  id: string;
  word: string;
  meaningEn: string;
  meaningVi: string;
  ipa?: string | null;
  wordForm?: string | null;
  categoryName: string;
  createdAt: string;
}

interface WordTableProps {
  words: WordRow[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (word: WordRow) => void;
}

export function WordTable({ words, onDelete, onEdit }: WordTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-lowest elevation-1">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-lowest">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Word</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">IPA</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Nghĩa tiếng Việt</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Category</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr key={word.id} className="group border-b border-outline-variant/20 hover:bg-surface-container-low">
                <td className="px-6 py-4 font-medium text-primary">{word.word}</td>
                <td className="px-6 py-4 text-on-surface-variant">{word.ipa ?? "—"}</td>
                <td className="max-w-xs truncate px-6 py-4 text-on-surface-variant">{word.meaningVi}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{word.categoryName}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onEdit(word)}
                      className="rounded-full p-2 text-on-surface-variant hover:bg-surface-variant hover:text-primary"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button
                      type="button"
                      disabled={deleting === word.id}
                      onClick={async () => {
                        setDeleting(word.id);
                        await onDelete(word.id);
                        setDeleting(null);
                      }}
                      className="rounded-full p-2 text-on-surface-variant hover:bg-error-container hover:text-error"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {words.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No words yet. Import a Google Doc to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
