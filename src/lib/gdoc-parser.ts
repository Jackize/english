import * as cheerio from "cheerio";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import { extractDocId } from "./utils";

export interface ParsedWord {
  word: string;
  ipa?: string;
  wordForm?: string;
  meaningEn: string;
  meaningVi: string;
  example?: string;
  relatedForms?: string;
}

export interface ParsedCategory {
  name: string;
  words: ParsedWord[];
}

export interface ParsedDocument {
  documentTitle: string;
  sourceUrl: string;
  categories: ParsedCategory[];
  unparsedRows: string[];
}

const CATEGORY_PATTERN = /\[C\d+T\d+\]/i;

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function parseWordCell(raw: string): Pick<ParsedWord, "word" | "example" | "relatedForms"> {
  const text = cleanText(raw);
  if (!text.includes(" / ")) {
    return { word: text };
  }

  const parts = text.split(/\s*\/\s*/);
  const main = parts[0] ?? text;
  const rest = parts.slice(1).join(" / ");

  if (/^[A-Z]/.test(rest) || rest.split(" ").length >= 3) {
    return { word: main, example: rest };
  }

  if (/\([^)]+\)/.test(rest) || rest.split(" ").length <= 2) {
    return { word: main, relatedForms: rest };
  }

  return { word: main, example: rest };
}

function isVocabularyHeader(cells: string[]): boolean {
  const joined = cells.join(" ").toLowerCase();
  return (
    joined.includes("word") &&
    (joined.includes("nghĩa") || joined.includes("viet") || joined.includes("meaning"))
  );
}

function isValidWordRow(cells: string[]): boolean {
  const word = cleanText(cells[0] ?? "");
  if (!word || word.toLowerCase() === "word") return false;
  if (/quizlet|http|link/i.test(word)) return false;
  const meaningEn = cleanText(cells[3] ?? cells[2] ?? "");
  const meaningVi = cleanText(cells[4] ?? cells[3] ?? "");
  return Boolean(meaningEn || meaningVi);
}

function parseTableRow(cells: string[]): ParsedWord | null {
  if (cells.length < 3) return null;
  if (!isValidWordRow(cells)) return null;

  let wordIdx = 0;
  let ipaIdx = 1;
  let formIdx = 2;
  let enIdx = 3;
  let viIdx = 4;

  if (cells.length === 4) {
    formIdx = 2;
    enIdx = 2;
    viIdx = 3;
  }

  const wordParts = parseWordCell(cells[wordIdx] ?? "");
  const ipa = cleanText(cells[ipaIdx] ?? "");
  const wordForm = cleanText(cells[formIdx] ?? "");
  const meaningEn = cleanText(cells[enIdx] ?? "");
  const meaningVi = cleanText(cells[viIdx] ?? "");

  if (!wordParts.word) return null;

  return {
    ...wordParts,
    ipa: ipa.startsWith("/") ? ipa : ipa || undefined,
    wordForm: wordForm && wordForm !== meaningEn ? wordForm : undefined,
    meaningEn: meaningEn || meaningVi,
    meaningVi: meaningVi || meaningEn,
  };
}

function parseTable($: CheerioAPI, table: Cheerio<Element>): ParsedWord[] {
  const words: ParsedWord[] = [];
  const rows = table.find("tr").toArray();

  for (const row of rows) {
    const cells = $(row)
      .find("td, th")
      .map((_, el) => cleanText($(el).text()))
      .get();

    if (isVocabularyHeader(cells)) continue;

    const parsed = parseTableRow(cells);
    if (parsed) words.push(parsed);
  }

  return words;
}

function isCategoryHeading(text: string): boolean {
  const cleaned = cleanText(text);
  return CATEGORY_PATTERN.test(cleaned) || /^CAM\s+\d+/i.test(cleaned);
}

export async function fetchGoogleDocHtml(url: string): Promise<string> {
  const docId = extractDocId(url);
  if (!docId) {
    throw new Error("Invalid Google Doc URL. Expected format: https://docs.google.com/document/d/{id}/...");
  }

  const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;
  const response = await fetch(exportUrl, {
    headers: { "User-Agent": "eng-growth-importer/1.0" },
  });

  if (!response.ok) {
    throw new Error(
      "Could not fetch document. Make sure it is shared as \"Anyone with the link can view\".",
    );
  }

  const html = await response.text();
  if (html.includes("Sign in") && html.includes("Google Account")) {
    throw new Error(
      "Document is not publicly accessible. Set sharing to \"Anyone with the link can view\".",
    );
  }

  return html;
}

export function parseGoogleDocHtml(html: string, sourceUrl: string): ParsedDocument {
  const $ = cheerio.load(html);
  const unparsedRows: string[] = [];
  let documentTitle = cleanText($("title").text()) || "Imported Vocabulary";
  let currentCategory: ParsedCategory | null = null;
  const categories: ParsedCategory[] = [];

  const bodyChildren = $("body").children().toArray();

  for (const el of bodyChildren) {
    const tag = el.tagName?.toLowerCase();
    const text = cleanText($(el).text());

    if (["h1", "h2", "h3", "p"].includes(tag ?? "") && text) {
      if (/^CAM\s+\d+/i.test(text) && !CATEGORY_PATTERN.test(text)) {
        documentTitle = text;
        continue;
      }

      if (isCategoryHeading(text)) {
        if (currentCategory && currentCategory.words.length > 0) {
          categories.push(currentCategory);
        }
        currentCategory = { name: text, words: [] };
        continue;
      }
    }

    if (tag === "table") {
      const words = parseTable($, $(el));
      if (words.length === 0) {
        unparsedRows.push(`Empty or unrecognized table near: ${text.slice(0, 50)}`);
        continue;
      }

      if (!currentCategory) {
        currentCategory = { name: "General", words: [] };
      }
      currentCategory.words.push(...words);
    }
  }

  if (currentCategory && currentCategory.words.length > 0) {
    categories.push(currentCategory);
  }

  if (categories.length === 0) {
    $("table").each((_, table) => {
      const words = parseTable($, $(table));
      if (words.length > 0) {
        categories.push({ name: currentCategory?.name ?? "General", words });
      }
    });
  }

  return {
    documentTitle,
    sourceUrl,
    categories,
    unparsedRows,
  };
}

export async function parseGoogleDoc(url: string): Promise<ParsedDocument> {
  const html = await fetchGoogleDocHtml(url);
  return parseGoogleDocHtml(html, url);
}
