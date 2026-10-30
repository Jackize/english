import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import type { LevelCode } from "@/lib/curriculum";

export interface WritingSection {
  title: string;
  html: string;
}

export interface WritingPracticeItem {
  prompt: string;
  answer: string;
}

export interface WritingUnit {
  level: LevelCode;
  slug: string;
  unitNumber: number;
  title: string;
  goal: string;
  product: string;
  minutes: string;
  markdown: string;
  html: string;
  learnSections: WritingSection[];
  practiceSections: WritingSection[];
  modelSample: string;
  languagePractice: WritingPracticeItem[];
}

export const WRITING_LEVELS: LevelCode[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const CURRICULUM_DIR = path.join(process.cwd(), "docs", "curriculum", "levels");

const cachedUnits = new Map<LevelCode, WritingUnit[]>();

function normalizeHeading(title: string) {
  return title.trim().toLowerCase();
}

function splitSections(markdown: string): WritingSection[] {
  const regex = /^### (.+)$/gm;
  const matches = [...markdown.matchAll(regex)];
  const sections: WritingSection[] = [];

  for (let i = 0; i < matches.length; i++) {
    const title = matches[i][1].trim();
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end =
      i + 1 < matches.length
        ? (matches[i + 1].index ?? markdown.length)
        : markdown.length;

    const content = markdown.slice(start, end).trim();
    if (!content) continue;

    sections.push({
      title,
      html: marked.parse(`### ${title}\n\n${content}`) as string,
    });
  }

  return sections;
}

function sectionMarkdown(markdown: string, keyword: string) {
  const regex = /^#{3,4} (.+)$/gm;
  const matches = [...markdown.matchAll(regex)];

  for (let i = 0; i < matches.length; i++) {
    if (!matches[i][1].toLowerCase().includes(keyword)) continue;

    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end =
      i + 1 < matches.length
        ? (matches[i + 1].index ?? markdown.length)
        : markdown.length;

    return markdown.slice(start, end).trim();
  }

  return "";
}

function extractModelSample(markdown: string) {
  const modelSection = sectionMarkdown(markdown, "model");
  if (!modelSection) return "";

  const blockquote = modelSection.match(/^> (.+(?:\n> .*)*)/m)?.[1];

  if (!blockquote) return "";

  return blockquote
    .split("\n")
    .map((line) => line.replace(/^> ?/, "").trim())
    .filter(Boolean)
    .join(" ")
    .trim();
}

function parseMarkdownTables(markdown: string) {
  const lines = markdown.split("\n");
  const tables: string[][][] = [];
  let current: string[][] | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) {
      if (current) {
        tables.push(current);
        current = null;
      }
      continue;
    }

    const cells = trimmed
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());

    if (cells.every((cell) => /^[-: ]+$/.test(cell))) continue;

    if (!current) current = [];
    current.push(cells);
  }

  if (current) tables.push(current);
  return tables;
}

function extractLanguagePractice(markdown: string): WritingPracticeItem[] {
  const languageSection = sectionMarkdown(markdown, "language bank");
  const tables = parseMarkdownTables(languageSection);
  const items: WritingPracticeItem[] = [];

  for (const table of tables) {
    if (table.length < 2) continue;

    const headers = table[0];
    const viIndex = headers.findIndex((header) =>
      /nghĩa|vietnamese|tiếng việt|cách dùng|chức năng/i.test(header),
    );

    if (viIndex < 0) continue;

    const answerIndex = headers.findIndex(
      (header, index) =>
        index !== viIndex &&
        /mẫu|khung|cụm|ví dụ|example|collocation|công thức|câu mẫu|phrase/i.test(header),
    );

    const fallbackIndex = headers.findIndex((_, index) => index !== viIndex);
    const enIndex = answerIndex >= 0 ? answerIndex : fallbackIndex;

    for (const row of table.slice(1)) {
      const prompt = row[viIndex]?.trim();
      const answer = row[enIndex]?.trim();

      if (prompt && answer && prompt !== answer) {
        items.push({ prompt, answer });
      }
    }
  }

  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.prompt}::${item.answer}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function parseWritingUnits(level: LevelCode): Promise<WritingUnit[]> {
  const file = path.join(CURRICULUM_DIR, level.toLowerCase(), "writing.md");

  let content: string;
  try {
    content = await fs.readFile(file, "utf8");
  } catch {
    return [];
  }

  const matches = [...content.matchAll(/^## Unit (\d+) — (.+)$/gm)];

  return matches.map((match, index) => {
    const unitNumber = Number(match[1]);
    const title = match[2].trim();
    const start = match.index ?? 0;
    const end =
      index + 1 < matches.length
        ? (matches[index + 1].index ?? content.length)
        : content.length;

    const markdown = content.slice(start, end).trim();
    const sections = splitSections(markdown);

    const learnTitles = ["model", "language bank"];
    const practiceTitles = [
      "guided practice",
      "write",
      "checklist",
      "sample answer",
      "common mistakes",
      "review nhanh",
      "grammar recap",
      "independent",
      "mock",
    ];

    const learnSections = sections.filter((section) =>
      learnTitles.some((title) =>
        normalizeHeading(section.title).includes(title),
      ),
    );

    const practiceSections = sections.filter((section) =>
      practiceTitles.some((title) =>
        normalizeHeading(section.title).includes(title),
      ),
    );

    const goal = markdown.match(/\*\*Mục tiêu:\*\*\s*(.+)/)?.[1]?.trim() ?? "";
    const product = markdown.match(/\*\*Sản phẩm:\*\*\s*(.+)/)?.[1]?.trim() ?? "";
    const minutes = markdown.match(/\*\*Thời gian:\*\*\s*(.+)/)?.[1]?.trim() ?? "";

    return {
      level,
      slug: `unit-${unitNumber}`,
      unitNumber,
      title,
      goal,
      product,
      minutes,
      markdown,
      html: marked.parse(markdown) as string,
      learnSections: learnSections.length ? learnSections : sections,
      practiceSections: practiceSections.length ? practiceSections : sections,
      modelSample: extractModelSample(markdown),
      languagePractice: extractLanguagePractice(markdown),
    };
  });
}

export async function getWritingUnits(level?: LevelCode): Promise<WritingUnit[]> {
  const levels = level ? [level] : WRITING_LEVELS;
  const groups = await Promise.all(
    levels.map(async (code) => {
      if (!cachedUnits.has(code)) {
        cachedUnits.set(code, await parseWritingUnits(code));
      }
      return cachedUnits.get(code) ?? [];
    }),
  );

  return groups.flat();
}

export async function getWritingUnit(
  level: string,
  unit: string,
): Promise<WritingUnit | null> {
  const code = level.toUpperCase() as LevelCode;

  if (!WRITING_LEVELS.includes(code)) return null;

  const units = await getWritingUnits(code);
  return units.find((entry) => entry.slug === unit.toLowerCase()) ?? null;
}

