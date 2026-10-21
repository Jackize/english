"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSideNav } from "@/components/layout/AdminSideNav";
import { ImportPreview } from "@/components/admin/ImportPreview";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { ParsedDocument } from "@/lib/gdoc-parser";

export default function AdminImportPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [preview, setPreview] = useState<ParsedDocument | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePreview(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPreview(null);

    const res = await fetch("/api/import/gdoc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, action: "preview" }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Preview failed");
      return;
    }

    const data = await res.json();
    setPreview(data);
    if (!documentTitle) setDocumentTitle(data.documentTitle);
  }

  async function handleConfirm() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/import/gdoc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, action: "confirm", documentTitle }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Import failed");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSideNav active="import" />
      <main className="ml-0 w-full max-w-[var(--spacing-container-max)] flex-1 p-gutter pt-lg pb-xl md:ml-64">
        <header className="mb-lg">
          <h2 className="mb-2 text-2xl font-semibold text-on-background">Import from Google Doc</h2>
          <p className="text-on-surface-variant">
            Paste a public Google Doc URL. The document must be shared as &quot;Anyone with the link can view&quot;.
          </p>
        </header>

        <form onSubmit={handlePreview} className="mb-lg space-y-4">
          <Input
            label="Google Doc URL"
            placeholder="https://docs.google.com/document/d/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Input
            label="Document Set Name (optional)"
            placeholder="CAM 12-20 READING"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
          />
          {error && (
            <div className="rounded-lg border border-error-container bg-error-container/30 p-4 text-sm text-on-error-container">
              {error}
            </div>
          )}
          <Button type="submit" disabled={loading || !url}>
            <span className="material-symbols-outlined">preview</span>
            Preview Import
          </Button>
        </form>

        {preview && (
          <div className="space-y-4">
            <ImportPreview preview={preview} />
            <Button onClick={handleConfirm} disabled={loading} variant="secondary">
              <span className="material-symbols-outlined">check</span>
              Confirm Import
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
