import type { ParsedDocument } from "@/lib/gdoc-parser";

interface ImportPreviewProps {
  preview: ParsedDocument;
}

export function ImportPreview({ preview }: ImportPreviewProps) {
  const totalWords = preview.categories.reduce((sum, c) => sum + c.words.length, 0);

  return (
    <div className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest elevation-1">
      <div className="border-b border-outline-variant/30 p-6">
        <h3 className="text-lg font-semibold text-on-background">{preview.documentTitle}</h3>
        <p className="mt-1 text-sm text-on-surface-variant">
          {preview.categories.length} categories · {totalWords} words
        </p>
      </div>
      <div className="max-h-96 overflow-y-auto p-6">
        {preview.categories.map((cat) => (
          <details key={cat.name} className="mb-4 border-b border-outline-variant/20 pb-4 last:border-0">
            <summary className="cursor-pointer text-sm font-medium text-primary">
              {cat.name} ({cat.words.length} words)
            </summary>
            <ul className="mt-2 space-y-1 pl-4">
              {cat.words.slice(0, 10).map((w) => (
                <li key={`${cat.name}-${w.word}`} className="text-sm text-on-surface-variant">
                  <span className="font-medium text-on-background">{w.word}</span>
                  {w.ipa && <span className="ml-2 opacity-70">{w.ipa}</span>}
                  <span className="ml-2">— {w.meaningVi}</span>
                </li>
              ))}
              {cat.words.length > 10 && (
                <li className="text-xs text-on-surface-variant">+{cat.words.length - 10} more...</li>
              )}
            </ul>
          </details>
        ))}
      </div>
      {preview.unparsedRows.length > 0 && (
        <div className="border-t border-outline-variant/30 p-4 text-xs text-on-surface-variant">
          {preview.unparsedRows.length} warnings during parse
        </div>
      )}
    </div>
  );
}
