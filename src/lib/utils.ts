export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\[|\]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "category";
}

export function extractDocId(url: string): string | null {
  const match = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

export function normalizeWordKey(word: string): string {
  return word.toLowerCase().trim().split(/\s*\/\s*/)[0] ?? word;
}
