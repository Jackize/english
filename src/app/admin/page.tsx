"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AdminSideNav } from "@/components/layout/AdminSideNav";
import { WordTable, type WordRow } from "@/components/admin/WordTable";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminPage() {
  const [words, setWords] = useState<WordRow[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [editing, setEditing] = useState<WordRow | null>(null);
  const [editForm, setEditForm] = useState({
    word: "",
    ipa: "",
    wordForm: "",
    meaningEn: "",
    meaningVi: "",
  });

  const loadWords = useCallback(async () => {
    const res = await fetch(
      `/api/words?search=${encodeURIComponent(search)}&page=${page}&limit=20`,
    );
    if (res.ok) {
      const data = await res.json();
      setWords(data.words);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    }
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(loadWords, 300);
    return () => clearTimeout(timer);
  }, [loadWords]);

  async function handleDelete(id: string) {
    await fetch(`/api/words?id=${id}`, { method: "DELETE" });
    await loadWords();
  }

  function handleEdit(word: WordRow) {
    setEditing(word);
    setEditForm({
      word: word.word,
      ipa: word.ipa ?? "",
      wordForm: word.wordForm ?? "",
      meaningEn: word.meaningEn,
      meaningVi: word.meaningVi,
    });
  }

  async function saveEdit() {
    if (!editing) return;
    await fetch("/api/words", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing.id, ...editForm }),
    });
    setEditing(null);
    await loadWords();
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSideNav active="words" />
      <main className="ml-0 w-full max-w-[var(--spacing-container-max)] flex-1 p-gutter pt-lg pb-xl md:ml-64">
        <header className="mb-lg flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-on-background">Vocabulary Data</h2>
            <p className="text-on-surface-variant">Manage, import, and edit your learning content repository.</p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link href="/admin/import">
              <Button variant="secondary" className="w-full sm:w-auto">
                <span className="material-symbols-outlined">upload_file</span>
                Import Google Doc
              </Button>
            </Link>
          </div>
        </header>

        <div className="relative mb-md max-w-md">
          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <Input
            className="pl-10"
            placeholder="Search vocabulary..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <WordTable words={words} onDelete={handleDelete} onEdit={handleEdit} />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-on-surface-variant">
            Showing page {page} of {totalPages} ({total} words)
          </span>
          <div className="flex gap-2">
            <Button variant="outline" className="px-3 py-1.5 text-xs" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </Button>
            <Button variant="outline" className="px-3 py-1.5 text-xs" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              Next
            </Button>
          </div>
        </div>

        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 elevation-2">
              <h3 className="mb-4 text-lg font-semibold">Edit Word</h3>
              <div className="space-y-4">
                <Input label="Word" value={editForm.word} onChange={(e) => setEditForm({ ...editForm, word: e.target.value })} />
                <Input label="IPA" value={editForm.ipa} onChange={(e) => setEditForm({ ...editForm, ipa: e.target.value })} />
                <Input label="Word Form" value={editForm.wordForm} onChange={(e) => setEditForm({ ...editForm, wordForm: e.target.value })} />
                <Input label="English Meaning" value={editForm.meaningEn} onChange={(e) => setEditForm({ ...editForm, meaningEn: e.target.value })} />
                <Input label="Nghĩa tiếng Việt" value={editForm.meaningVi} onChange={(e) => setEditForm({ ...editForm, meaningVi: e.target.value })} />
              </div>
              <div className="mt-6 flex gap-2">
                <Button className="flex-1" onClick={saveEdit}>Save</Button>
                <Button variant="outline" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
