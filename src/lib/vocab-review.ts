import { prisma } from "./prisma";
import { touchStreak } from "./streak";
import type { WrittenDirection } from "./vocabulary-quiz";

/**
 * Leitner 5 hộp cho từ vựng.
 * - Mức 1: nhận biết có chủ đích — ôn mỗi ngày.
 * - Mức 2: tiếp nhận có hiểu — ôn mỗi 2 ngày.
 * - Mức 3: nhớ — ôn mỗi 4 ngày.
 * - Mức 4: vốn từ chủ động — ôn mỗi 7 ngày.
 * - Mức 5: phản xạ có tiềm thức — ôn mỗi 14 ngày.
 * Trả lời đúng thì lên mức; sai ở bất kỳ mức nào thì quay về mức 1.
 */
export const VOCAB_REVIEW_INTERVALS = [1, 2, 4, 7, 14] as const;

export const VOCAB_REVIEW_LEVELS = [
  {
    level: 1,
    name: "Nhận biết có chủ đích",
    shortName: "Nhận biết",
    intervalDays: 1,
    description: "Vừa gặp từ, cần nhìn thấy thường xuyên để nhận ra.",
  },
  {
    level: 2,
    name: "Tiếp nhận có hiểu",
    shortName: "Tiếp nhận",
    intervalDays: 2,
    description: "Đã hiểu nghĩa khi gặp từ trong ngữ cảnh.",
  },
  {
    level: 3,
    name: "Nhớ",
    shortName: "Ghi nhớ",
    intervalDays: 4,
    description: "Có thể nhớ lại nghĩa hoặc từ mà không cần gợi ý.",
  },
  {
    level: 4,
    name: "Vốn từ chủ động",
    shortName: "Chủ động",
    intervalDays: 7,
    description: "Chủ động dùng được từ khi nói và viết.",
  },
  {
    level: 5,
    name: "Phản xạ có tiềm thức",
    shortName: "Phản xạ",
    intervalDays: 14,
    description: "Nhớ gần như tự động, chỉ cần ôn duy trì.",
  },
] as const;

export type VocabReviewLevel = 1 | 2 | 3 | 4 | 5;

export interface VocabReviewStats {
  total: number;
  dueCount: number;
  counts: Record<VocabReviewLevel, number>;
  lowestLevel: VocabReviewLevel | null;
  suggestedIntervalDays: number | null;
  nextDueAt: string | null;
}

function clampLevel(value: number): VocabReviewLevel {
  if (value <= 1) return 1;
  if (value >= 5) return 5;
  return Math.round(value) as VocabReviewLevel;
}

export function vocabLevelMeta(level: number) {
  return VOCAB_REVIEW_LEVELS[clampLevel(level) - 1];
}

/**
 * Mức 1–2 ưu tiên chiều Anh → Việt (nhận biết/tiếp nhận).
 * Mức 3–5 chuyển sang Việt → Anh (tái tạo chủ động).
 */
export function directionForLevel(level: number): WrittenDirection {
  return clampLevel(level) <= 2 ? "en-vi" : "vi-en";
}

/** Chuẩn hoá câu trả lời: bỏ dấu tiếng Việt, dấu câu, khoảng trắng thừa. */
export function normalizeVocabularyAnswer(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function meaningAlternatives(meaningVi: string) {
  const parts = new Set<string>([meaningVi]);
  for (const part of meaningVi.split(/\s*(?:;|\/|,|\bhoặc\b)\s*/i)) {
    if (part.trim()) parts.add(part.trim());
  }
  return [...parts];
}

export function isVocabularyAnswerCorrect({
  direction,
  answer,
  word,
  meaningVi,
  alternatives = [],
}: {
  direction: WrittenDirection;
  answer: string;
  word: string;
  meaningVi: string;
  alternatives?: string[];
}) {
  const normalized = normalizeVocabularyAnswer(answer);
  if (!normalized) return false;

  const expected =
    direction === "vi-en" ? [word, ...alternatives] : meaningAlternatives(meaningVi);

  return expected.some((candidate) => normalizeVocabularyAnswer(candidate) === normalized);
}

export function vocabularyAnswerExplanation({
  word,
  ipa,
  meaningVi,
  example,
}: {
  word: string;
  ipa?: string | null;
  meaningVi: string;
  example?: string | null;
}) {
  return `${word}${ipa ? ` ${ipa}` : ""} — ${meaningVi}.${example ? ` Ví dụ: ${example}` : ""}`;
}

function endOfToday() {
  const value = new Date();
  value.setHours(0, 0, 0, 0);
  value.setDate(value.getDate() + 1);
  return value;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * Đưa toàn bộ từ của một bài từ vựng vào mức 1.
 * createMany + skipDuplicates đảm bảo gọi lại nhiều lần không reset mức của
 * những từ đã có lịch sử ôn.
 */
export async function registerVocabularyForLesson(userId: string, lessonId: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      track: true,
      vocab: { select: { id: true } },
    },
  });

  if (!lesson || lesson.track !== "vocabulary" || lesson.vocab.length === 0) {
    return 0;
  }

  const result = await prisma.vocabReviewItem.createMany({
    data: lesson.vocab.map((entry) => ({
      userId,
      vocabId: entry.id,
      level: 1,
      dueAt: new Date(),
    })),
    skipDuplicates: true,
  });

  return result.count;
}

/**
 * Danh sách toàn bộ từ người dùng đã học. Một từ được tính là "đã học" khi nó
 * đã được đưa vào lịch ôn (sau khi hoàn thành lý thuyết hoặc làm bài kiểm tra
 * từ vựng của bài tương ứng).
 */
export async function getLearnedVocabulary(userId: string) {
  const rows = await prisma.vocabReviewItem.findMany({
    where: { userId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      vocab: {
        select: {
          id: true,
          word: true,
          ipa: true,
          wordForm: true,
          meaningVi: true,
          meaningEn: true,
          example: true,
          lesson: {
            select: {
              id: true,
              title: true,
              level: { select: { code: true, name: true } },
              topic: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return rows.map((row) => {
    const level = clampLevel(row.level);
    const meta = VOCAB_REVIEW_LEVELS[level - 1];

    return {
      id: row.id,
      vocabId: row.vocab.id,
      word: row.vocab.word,
      ipa: row.vocab.ipa,
      wordForm: row.vocab.wordForm,
      meaningVi: row.vocab.meaningVi,
      meaningEn: row.vocab.meaningEn,
      example: row.vocab.example,
      level,
      levelName: meta.name,
      levelShortName: meta.shortName,
      correctStreak: row.correctStreak,
      wrongCount: row.wrongCount,
      lastReviewedAt: row.lastReviewedAt?.toISOString() ?? null,
      dueAt: row.dueAt.toISOString(),
      createdAt: row.createdAt.toISOString(),
      lesson: {
        id: row.vocab.lesson.id,
        title: row.vocab.lesson.title,
        levelCode: row.vocab.lesson.level.code,
        levelName: row.vocab.lesson.level.name,
        topicName: row.vocab.lesson.topic?.name ?? null,
      },
    };
  });
}

export async function getLearnedVocabularyCount(userId: string) {
  return prisma.vocabReviewItem.count({ where: { userId } });
}

export async function getVocabularyReview(userId: string) {
  const dueEnd = endOfToday();

  const dueItems = await prisma.vocabReviewItem.findMany({
    where: { userId, dueAt: { lt: dueEnd } },
    orderBy: [{ dueAt: "asc" }, { level: "asc" }],
    take: 40,
    include: {
      vocab: {
        select: {
          id: true,
          word: true,
          ipa: true,
          wordForm: true,
          meaningVi: true,
          lesson: {
            select: {
              id: true,
              title: true,
              level: { select: { code: true } },
            },
          },
        },
      },
    },
  });

  const grouped = await prisma.vocabReviewItem.groupBy({
    by: ["level"],
    where: { userId },
    _count: { _all: true },
  });

  const dueCount = await prisma.vocabReviewItem.count({
    where: { userId, dueAt: { lt: dueEnd } },
  });

  const aggregate = await prisma.vocabReviewItem.aggregate({
    where: { userId },
    _min: { dueAt: true },
  });

  const counts: Record<VocabReviewLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;
  for (const row of grouped) {
    const level = clampLevel(row.level);
    counts[level] += row._count._all;
    total += row._count._all;
  }

  const lowestLevel =
    (VOCAB_REVIEW_LEVELS.find((row) => counts[row.level] > 0)?.level as
      | VocabReviewLevel
      | undefined) ?? null;

  const nextDueAt =
    dueCount > 0 ? new Date().toISOString() : (aggregate._min.dueAt?.toISOString() ?? null);

  const items = dueItems.map((item) => {
    const level = clampLevel(item.level);
    const direction = directionForLevel(level);
    const meta = VOCAB_REVIEW_LEVELS[level - 1];

    return {
      id: item.id,
      vocabId: item.vocab.id,
      level,
      levelName: meta.name,
      levelShortName: meta.shortName,
      intervalDays: meta.intervalDays,
      direction,
      prompt: direction === "en-vi" ? item.vocab.word : item.vocab.meaningVi,
      ipa: direction === "en-vi" ? item.vocab.ipa : null,
      wordForm: direction === "en-vi" ? item.vocab.wordForm : null,
      wrongCount: item.wrongCount,
      correctStreak: item.correctStreak,
      dueAt: item.dueAt.toISOString(),
      lesson: {
        id: item.vocab.lesson.id,
        title: item.vocab.lesson.title,
        levelCode: item.vocab.lesson.level.code,
      },
    };
  });

  return {
    items,
    stats: {
      total,
      dueCount,
      counts,
      lowestLevel,
      suggestedIntervalDays: lowestLevel
        ? VOCAB_REVIEW_INTERVALS[lowestLevel - 1]
        : null,
      nextDueAt,
    } satisfies VocabReviewStats,
    levels: VOCAB_REVIEW_LEVELS,
  };
}

export async function answerVocabularyReview(
  userId: string,
  reviewItemId: string,
  answer: string,
) {
  const item = await prisma.vocabReviewItem.findFirst({
    where: { id: reviewItemId, userId },
    include: {
      vocab: {
        select: {
          id: true,
          lessonId: true,
          word: true,
          ipa: true,
          meaningVi: true,
          example: true,
        },
      },
    },
  });

  if (!item) throw new Error("Vocabulary review item not found");

  const previousLevel = clampLevel(item.level);
  const direction = directionForLevel(previousLevel);
  const alternatives =
    direction === "vi-en"
      ? (
          await prisma.vocabEntry.findMany({
            where: {
              lessonId: item.vocab.lessonId,
              meaningVi: item.vocab.meaningVi,
              NOT: { id: item.vocab.id },
            },
            select: { word: true },
          })
        ).map((row) => row.word)
      : [];
  const correct = isVocabularyAnswerCorrect({
    direction,
    answer,
    word: item.vocab.word,
    meaningVi: item.vocab.meaningVi,
    alternatives,
  });

  const now = new Date();
  const level = correct
    ? (Math.min(5, previousLevel + 1) as VocabReviewLevel)
    : (1 as VocabReviewLevel);
  const intervalDays = correct ? VOCAB_REVIEW_INTERVALS[level - 1] : 0;
  const dueAt = correct ? addDays(now, intervalDays) : now;
  const meta = VOCAB_REVIEW_LEVELS[level - 1];

  await prisma.vocabReviewItem.update({
    where: { id: item.id },
    data: {
      level,
      correctStreak: correct ? { increment: 1 } : 0,
      wrongCount: correct ? undefined : { increment: 1 },
      lastReviewedAt: now,
      dueAt,
    },
  });

  if (correct) await touchStreak(userId);

  return {
    correct,
    direction,
    prompt: direction === "en-vi" ? item.vocab.word : item.vocab.meaningVi,
    expectedAnswer: direction === "vi-en" ? item.vocab.word : item.vocab.meaningVi,
    explanation: vocabularyAnswerExplanation(item.vocab),
    previousLevel,
    level,
    levelName: meta.name,
    intervalDays,
    dueAt: dueAt.toISOString(),
  };
}
