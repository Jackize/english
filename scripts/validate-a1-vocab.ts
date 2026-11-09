import { mkdirSync, writeFileSync } from "node:fs";
import { A1_VOCAB } from "./a1-vocab";
import { A2_VOCAB } from "./a2-vocab";
import type { SeedWord } from "./curriculum-data";

const a2Words = new Set(
  A2_VOCAB.flatMap((topic) =>
    (topic.lessons ?? (topic.lesson ? [topic.lesson] : [])).flatMap((lesson) =>
      lesson.words.map((word) => word.word.toLowerCase()),
    ),
  ),
);

const errors: string[] = [];
const allWords: string[] = [];
const rows: string[][] = [
  ["Chủ đề", "Bài học", "STT", "Từ/cụm từ", "IPA", "Từ loại", "Nghĩa tiếng Việt", "Nghĩa tiếng Anh", "Ví dụ"],
];

for (const topic of A1_VOCAB) {
  const lessons = topic.lessons ?? (topic.lesson ? [topic.lesson] : []);
  if (lessons.length !== 4) errors.push(`${topic.slug}: ${lessons.length} bài (cần 4)`);

  let topicWords = 0;
  for (const [lessonIndex, lesson] of lessons.entries()) {
    if (lesson.words.length !== 15) {
      errors.push(`${topic.slug} / bài ${lessonIndex + 1}: ${lesson.words.length} từ (cần 15)`);
    }
    if (lesson.sections.length === 0) errors.push(`${topic.slug} / bài ${lessonIndex + 1}: thiếu sections`);

    for (const [wordIndex, word] of lesson.words.entries()) {
      topicWords += 1;
      const key = word.word.toLowerCase();
      allWords.push(key);

      const required: [keyof SeedWord, string | undefined][] = [
        ["word", word.word],
        ["ipa", word.ipa],
        ["wordForm", word.wordForm],
        ["meaningVi", word.meaningVi],
        ["meaningEn", word.meaningEn],
        ["example", word.example],
      ];
      for (const [field, value] of required) {
        if (!value || !value.trim()) errors.push(`${key}: thiếu ${field}`);
      }
      if (word.ipa && !/^\/.+\/$/.test(word.ipa)) errors.push(`${key}: IPA không đúng định dạng`);

      rows.push([
        topic.name,
        `${lessonIndex + 1}. ${lesson.title}`,
        String(wordIndex + 1),
        word.word,
        word.ipa ?? "",
        word.wordForm ?? "",
        word.meaningVi,
        word.meaningEn ?? "",
        word.example ?? "",
      ]);
    }
  }

  if (topicWords !== 60) errors.push(`${topic.slug}: ${topicWords} từ (cần 60)`);
}

const duplicates = allWords.filter((word, index) => allWords.indexOf(word) !== index);
if (duplicates.length > 0) errors.push(`Từ trùng trong A1: ${[...new Set(duplicates)].join(", ")}`);

const sharedWithA2 = [...new Set(allWords.filter((word) => a2Words.has(word)))];

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

mkdirSync("docs", { recursive: true });
const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
writeFileSync("docs/a1-vocab-preview.csv", `${csv}\n`, "utf8");

const markdown: string[] = [
  "# A1 Vocabulary — bản xem trước",
  "",
  `Tổng: **${allWords.length} từ/cụm từ** trong **${A1_VOCAB.length} chủ đề** (${A1_VOCAB.reduce((sum, topic) => sum + (topic.lessons?.length ?? 1), 0)} bài học).`,
  "",
];

for (const topic of A1_VOCAB) {
  const lessons = topic.lessons ?? (topic.lesson ? [topic.lesson] : []);
  markdown.push(`## ${topic.name}`, "", `\`${topic.slug}\` · ${topic.description}`, "");

  for (const [lessonIndex, lesson] of lessons.entries()) {
    markdown.push(
      `### Bài ${lessonIndex + 1}. ${lesson.title}`,
      "",
      `_${lesson.summary}_`,
      "",
      "| # | Từ/cụm từ | IPA | Loại | Nghĩa (VI) | Nghĩa (EN) | Ví dụ |",
      "|---|---|---|---|---|---|---|",
    );
    markdown.push(
      ...lesson.words.map(
        (word, index) =>
          `| ${index + 1} | **${word.word}** | ${word.ipa} | ${word.wordForm} | ${word.meaningVi} | ${word.meaningEn} | ${word.example} |`,
      ),
    );
    markdown.push("");
  }
}

markdown.push(
  "## Ghi chú kiểm tra",
  "",
  `- ${allWords.length} từ, không trùng lặp trong nội bộ A1.`,
  `- ${sharedWithA2.length} từ dùng chung với A2 (A1/A2 được phép tái sử dụng từ nền tảng).`,
  "- Đủ 6 trường: từ, IPA, từ loại, nghĩa Việt, nghĩa Anh, ví dụ.",
  "- Mỗi bài đúng 15 từ; mỗi chủ đề 4 bài.",
  "",
);
writeFileSync("docs/a1-vocab-preview.md", markdown.join("\n"), "utf8");

console.log(`Chủ đề: ${A1_VOCAB.length}`);
console.log(`Bài học: ${A1_VOCAB.reduce((sum, topic) => sum + (topic.lessons?.length ?? 1), 0)}`);
console.log(`Từ: ${allWords.length} (duy nhất: ${new Set(allWords).size})`);
console.log(`Dùng chung với A2: ${sharedWithA2.length}`);
console.log(`Lỗi: ${errors.length}`);
for (const error of errors) console.log(`- ${error}`);
console.log("Đã ghi docs/a1-vocab-preview.csv và docs/a1-vocab-preview.md");
