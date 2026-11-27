import { cache } from "react";
import type { LevelCode } from "./curriculum";
import { prisma } from "./prisma";
import type { ReadingQuestion, ReadingUnit, ReadingUnitSummary } from "./reading-types";

// ---------------------------------------------------------------------------
// Reading loader: nội dung được seed vào Prisma từ scripts/a1-reading.ts.
// Client component chỉ import kiểu/helper từ `reading-types.ts`.
// ---------------------------------------------------------------------------

async function findReadingUnits(where?: {
  slug?: string;
  level?: { code: string };
}) {
  return prisma.readingUnit.findMany({
    where,
    orderBy: [{ level: { order: "asc" } }, { unitNumber: "asc" }],
    include: {
      level: { select: { code: true } },
      groups: {
        orderBy: { order: "asc" },
        include: {
          questions: {
            orderBy: { order: "asc" },
            include: {
              choices: { orderBy: { order: "asc" } },
              matchItems: { orderBy: { order: "asc" } },
            },
          },
        },
      },
      vocabulary: { orderBy: { order: "asc" } },
      skill: true,
      mistakes: { orderBy: { order: "asc" } },
    },
  });
}

type ReadingUnitRecord = Awaited<ReturnType<typeof findReadingUnits>>[number];
type ReadingQuestionRecord = ReadingUnitRecord["groups"][number]["questions"][number];

/**
 * Câu hỏi mà toReadingQuestion() hiển thị được. Dùng chung cho trang chi tiết
 * và bộ đếm của trang danh sách để hai nơi luôn ra cùng một số câu.
 */
function isRenderableQuestion(row: { kind: string; answerKey: string | null }) {
  switch (row.kind) {
    case "true-false":
      return row.answerKey === "T" || row.answerKey === "F";
    case "mcq":
    case "matching":
    case "short-answer":
      return true;
    default:
      return false;
  }
}

function toReadingQuestion(row: ReadingQuestionRecord): ReadingQuestion | null {
  if (!isRenderableQuestion(row)) return null;

  const base = {
    id: row.id,
    number: row.number,
    prompt: row.prompt,
    explanation: row.explanation,
    evidence: row.evidence ?? undefined,
  };

  switch (row.kind) {
    case "true-false": {
      const answer = row.answerKey;
      if (answer !== "T" && answer !== "F") return null;

      return { ...base, kind: "true-false", answer };
    }

    case "mcq":
      return {
        ...base,
        kind: "mcq",
        options: row.choices.map((choice) => ({
          id: choice.choiceKey,
          label: choice.label,
          text: choice.text ?? "",
        })),
        answer: row.answerKey ?? "",
      };

    case "matching": {
      const answer: Record<string, string> = {};

      for (const item of row.matchItems) {
        if (item.side === "left" && item.matchKey) {
          answer[item.itemKey] = item.matchKey;
        }
      }

      return {
        ...base,
        kind: "matching",
        left: row.matchItems
          .filter((item) => item.side === "left")
          .map((item) => ({ id: item.itemKey, label: item.label })),
        right: row.matchItems
          .filter((item) => item.side === "right")
          .map((item) => ({ id: item.itemKey, label: item.label })),
        answer,
      };
    }

    case "short-answer":
      return {
        ...base,
        kind: "short-answer",
        acceptedAnswers: row.acceptedAnswers,
        modelAnswer: row.modelAnswer ?? "",
      };

    default:
      return null;
  }
}

function toReadingUnit(row: ReadingUnitRecord): ReadingUnit {
  return {
    level: row.level.code as LevelCode,
    slug: row.slug,
    unitNumber: row.unitNumber,
    unitTotal: row.unitTotal,
    title: row.title,
    passageTitle: row.passageTitle,
    goal: row.goal,
    description: row.description,
    lengthWords: row.lengthWords,
    estimatedMinutes: row.estimatedMinutes,
    timeLabel: row.timeLabel,
    questionTypes: row.questionTypes,
    warmUp: row.warmUp,
    passage: row.passage,
    groups: row.groups.map((group) => ({
      id: group.id,
      badge: group.badge,
      label: group.label,
      instructionVi: group.instructionVi,
      questions: group.questions
        .map((question) => toReadingQuestion(question))
        .filter((question): question is ReadingQuestion => question !== null),
    })),
    vocabulary: row.vocabulary.map((entry) => ({
      word: entry.word,
      ipa: entry.ipa,
      meaningVi: entry.meaningVi,
      example: entry.example,
    })),
    skill: row.skill
      ? {
          title: row.skill.title,
          intro: row.skill.intro,
          bullets: row.skill.bullets,
        }
      : { title: "", intro: "", bullets: [] },
    mistakes: row.mistakes.map((mistake) => ({
      title: mistake.title,
      body: mistake.body,
    })),
    source: row.source,
  };
}

/**
 * Danh sách unit cho trang /reading: chỉ lấy metadata và loại câu hỏi, không
 * tải bài đọc, lựa chọn, matching hay từ vựng của từng unit.
 */
export const getReadingUnitSummaries = cache(async (): Promise<ReadingUnitSummary[]> => {
  const rows = await prisma.readingUnit.findMany({
    orderBy: [{ level: { order: "asc" } }, { unitNumber: "asc" }],
    select: {
      slug: true,
      unitNumber: true,
      title: true,
      description: true,
      lengthWords: true,
      estimatedMinutes: true,
      questionTypes: true,
      level: { select: { code: true } },
      groups: { select: { questions: { select: { kind: true, answerKey: true } } } },
    },
  });

  return rows.map((row) => ({
    level: row.level.code as LevelCode,
    slug: row.slug,
    unitNumber: row.unitNumber,
    title: row.title,
    description: row.description,
    lengthWords: row.lengthWords,
    estimatedMinutes: row.estimatedMinutes,
    questionTypes: row.questionTypes,
    questionCount: row.groups.reduce(
      (sum, group) => sum + group.questions.filter(isRenderableQuestion).length,
      0,
    ),
  }));
});

export const getReadingUnit = cache(
  async (level: string, unit: string): Promise<ReadingUnit | null> => {
    const normalizedLevel = level.toUpperCase();
    const normalizedUnit = unit.toLowerCase();
    const rows = await findReadingUnits({
      slug: normalizedUnit,
      level: { code: normalizedLevel },
    });

    return rows[0] ? toReadingUnit(rows[0]) : null;
  },
);
