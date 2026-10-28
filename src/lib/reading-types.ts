import type { LevelCode } from "./curriculum";

// ---------------------------------------------------------------------------
// Kiểu dữ liệu dùng chung cho Reading.
// File này an toàn để import từ client component; phần truy vấn Prisma nằm ở
// `src/lib/reading.ts`.
// ---------------------------------------------------------------------------

export type ReadingQuestionKind = "true-false" | "mcq" | "matching" | "short-answer";

interface ReadingQuestionBase {
  id: string;
  number: number;
  prompt: string;
  explanation: string;
  evidence?: string;
}

export interface ReadingTrueFalseQuestion extends ReadingQuestionBase {
  kind: "true-false";
  answer: "T" | "F";
}

export interface ReadingChoiceOption {
  id: string;
  label: string;
  text: string;
}

export interface ReadingMcqQuestion extends ReadingQuestionBase {
  kind: "mcq";
  options: ReadingChoiceOption[];
  answer: string;
}

export interface ReadingMatchingItem {
  id: string;
  label: string;
}

export interface ReadingMatchingQuestion extends ReadingQuestionBase {
  kind: "matching";
  left: ReadingMatchingItem[];
  right: ReadingMatchingItem[];
  answer: Record<string, string>;
}

export interface ReadingShortAnswerQuestion extends ReadingQuestionBase {
  kind: "short-answer";
  acceptedAnswers: string[];
  modelAnswer: string;
}

export type ReadingQuestion =
  | ReadingTrueFalseQuestion
  | ReadingMcqQuestion
  | ReadingMatchingQuestion
  | ReadingShortAnswerQuestion;

export interface ReadingQuestionGroup {
  id: string;
  badge: string;
  label: string;
  instructionVi: string;
  questions: ReadingQuestion[];
}

export interface ReadingVocabularyEntry {
  word: string;
  ipa: string;
  meaningVi: string;
  example: string;
}

export interface ReadingMistake {
  title: string;
  body: string;
}

export interface ReadingUnit {
  level: LevelCode;
  slug: string;
  unitNumber: number;
  unitTotal: number;
  title: string;
  passageTitle: string;
  goal: string;
  description: string;
  lengthWords: number;
  estimatedMinutes: number;
  timeLabel: string;
  questionTypes: string[];
  warmUp: string[];
  passage: string[];
  groups: ReadingQuestionGroup[];
  vocabulary: ReadingVocabularyEntry[];
  skill: {
    title: string;
    intro: string;
    bullets: string[];
  };
  mistakes: ReadingMistake[];
  source: string;
}

export function getReadingQuestions(unit: ReadingUnit): ReadingQuestion[] {
  return unit.groups.flatMap((group) => group.questions);
}

export function getReadingQuestionCount(unit: ReadingUnit): number {
  return getReadingQuestions(unit).length;
}
