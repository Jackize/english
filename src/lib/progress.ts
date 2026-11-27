import { addDays } from "./dates";
import { BadRequestError, NotFoundError } from "./errors";
import { prisma, TX_OPTIONS, type Db } from "./prisma";
import { touchStreak } from "./streak";
import {
  isVocabularyAnswerCorrect,
  normalizeVocabularyAnswer,
  registerVocabularyForLesson,
  resetVocabularyToLevelOne,
  vocabularyAnswerExplanation,
} from "./vocab-review";
import { buildWrittenPrompts, type WrittenDirection } from "./vocabulary-quiz";

/** Điểm tối thiểu (phần trăm) để tính là hoàn thành bài. */
export const PASSING_PERCENT = 70;

export interface QuizDetail {
  questionId: string;
  prompt: string;
  selectedChoiceId: string | null;
  selectedLabel: string | null;
  correctChoiceId: string;
  correctLabel: string;
  correct: boolean;
  explanation: string | null;
}

export interface WrittenQuizDetail {
  vocabId: string;
  direction: WrittenDirection;
  prompt: string;
  answer: string;
  expectedAnswer: string;
  correct: boolean;
  explanation: string | null;
}

// ---------------------------------------------------------------------------
// Grading (pure — no database access)
// ---------------------------------------------------------------------------

type GradableQuestion = {
  id: string;
  prompt: string;
  explanation: string | null;
  choices: { id: string; label: string; isCorrect: boolean }[];
};

type GradableVocab = {
  id: string;
  word: string;
  ipa: string | null;
  meaningVi: string;
  example: string | null;
};

export function gradeChoiceQuestions(
  questions: GradableQuestion[],
  answers: Record<string, string>,
): QuizDetail[] {
  return questions.map((question) => {
    const correctChoice = question.choices.find((choice) => choice.isCorrect);
    const selectedId = answers[question.id] ?? null;
    const selectedChoice = question.choices.find((choice) => choice.id === selectedId);

    return {
      questionId: question.id,
      prompt: question.prompt,
      selectedChoiceId: selectedChoice?.id ?? null,
      selectedLabel: selectedChoice?.label ?? null,
      correctChoiceId: correctChoice?.id ?? "",
      correctLabel: correctChoice?.label ?? "",
      correct: Boolean(correctChoice && selectedChoice?.id === correctChoice.id),
      explanation: question.explanation,
    };
  });
}

/**
 * Chấm phần tự luận của bài từ vựng (mỗi từ hai chiều Việt↔Anh). Ở chiều
 * Việt → Anh, các từ cùng nghĩa trong bài đều được chấp nhận.
 */
export function gradeWrittenAnswers(
  vocab: GradableVocab[],
  writtenAnswers: Record<string, string>,
): WrittenQuizDetail[] {
  const vocabById = new Map(vocab.map((entry) => [entry.id, entry]));
  const wordsByMeaning = new Map<string, string[]>();
  for (const entry of vocab) {
    const key = normalizeVocabularyAnswer(entry.meaningVi);
    const words = wordsByMeaning.get(key);
    if (words) words.push(entry.word);
    else wordsByMeaning.set(key, [entry.word]);
  }

  return buildWrittenPrompts(vocab).flatMap((prompt) => {
    const entry = vocabById.get(prompt.vocabId);
    if (!entry) return [];

    const answer = writtenAnswers[`${prompt.vocabId}:${prompt.direction}`] ?? "";
    const correct = isVocabularyAnswerCorrect({
      direction: prompt.direction,
      answer,
      word: entry.word,
      meaningVi: entry.meaningVi,
      alternatives:
        prompt.direction === "vi-en"
          ? (wordsByMeaning.get(normalizeVocabularyAnswer(entry.meaningVi)) ?? [])
          : [],
    });

    return [
      {
        vocabId: entry.id,
        direction: prompt.direction,
        prompt: prompt.prompt,
        answer,
        expectedAnswer: prompt.direction === "vi-en" ? entry.word : entry.meaningVi,
        correct,
        explanation: vocabularyAnswerExplanation(entry),
      },
    ];
  });
}

// ---------------------------------------------------------------------------
// Lesson completion (shared by quiz submission and flashcard completion)
// ---------------------------------------------------------------------------

/**
 * Đánh dấu hoàn thành và cộng XP đúng một lần.
 *
 * `updateMany ... where completed = false` là phép "compare-and-set": Postgres
 * khoá dòng rồi kiểm tra lại điều kiện, nên khi hai request nộp bài cùng lúc
 * chỉ một request thấy count = 1 và được cộng XP. Cách đọc trước rồi ghi sau
 * (bản cũ) cho phép cả hai cùng cộng.
 */
async function markCompletedOnce(
  tx: Db,
  userId: string,
  lessonId: string,
  xp: number,
  now: Date,
): Promise<boolean> {
  const { count } = await tx.lessonProgress.updateMany({
    where: { userId, lessonId, completed: false },
    data: { completed: true, completedAt: now },
  });
  if (count === 0) return false;

  await tx.user.update({ where: { id: userId }, data: { xp: { increment: xp } } });
  return true;
}

/**
 * Câu trắc nghiệm sai đưa vào lịch ôn, đến hạn ngay hôm nay. Đúng trong bài
 * kiểm tra không tự xoá lịch ôn — chỉ lượt ôn mới quyết định mốc tiếp theo.
 */
async function scheduleWrongQuestions(tx: Db, userId: string, questionIds: string[]) {
  if (questionIds.length === 0) return;
  const now = new Date();

  await tx.reviewItem.updateMany({
    where: { userId, questionId: { in: questionIds } },
    data: {
      wrongCount: { increment: 1 },
      resolved: false,
      lastWrongAt: now,
      intervalDays: 0,
      correctStreak: 0,
      dueAt: now,
    },
  });
  await tx.reviewItem.createMany({
    data: questionIds.map((questionId) => ({
      userId,
      questionId,
      wrongCount: 1,
      resolved: false,
      lastWrongAt: now,
      dueAt: now,
    })),
    skipDuplicates: true,
  });
}

// ---------------------------------------------------------------------------
// Use cases
// ---------------------------------------------------------------------------

export async function submitQuiz(
  userId: string,
  lessonId: string,
  answers: Record<string, string>,
  writtenAnswers?: Record<string, string>,
) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { choices: { orderBy: { order: "asc" } } },
      },
      vocab: { orderBy: { order: "asc" } },
    },
  });

  if (!lesson) throw new NotFoundError("Lesson not found");
  if (lesson.questions.length === 0 && lesson.vocab.length === 0) {
    throw new BadRequestError("Lesson has no questions");
  }

  const details = gradeChoiceQuestions(lesson.questions, answers);
  const includeWritten = lesson.track === "vocabulary" && writtenAnswers !== undefined;
  const writtenDetails = includeWritten ? gradeWrittenAnswers(lesson.vocab, writtenAnswers) : [];

  const total = details.length + writtenDetails.length;
  if (total === 0) throw new BadRequestError("Lesson has no questions");
  const score =
    details.filter((detail) => detail.correct).length +
    writtenDetails.filter((detail) => detail.correct).length;
  const percent = Math.round((score / total) * 100);
  const passed = percent >= PASSING_PERCENT;

  const wrongQuestionIds = details.filter((d) => !d.correct).map((d) => d.questionId);
  const wrongVocabIds = writtenDetails.filter((d) => !d.correct).map((d) => d.vocabId);
  const now = new Date();

  // Mọi thao tác ghi nằm trong một transaction: tiến độ, XP, lịch ôn và chuỗi
  // ngày học hoặc cùng thành công, hoặc cùng không xảy ra.
  const firstCompletion = await prisma.$transaction(async (tx) => {
    await tx.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: { userId, lessonId, attempts: 1, bestScore: score, quizTotal: total },
      update: { attempts: { increment: 1 }, quizTotal: total },
    });
    // GREATEST(bestScore, score) mà không cần đọc trước.
    await tx.lessonProgress.updateMany({
      where: { userId, lessonId, bestScore: { lt: score } },
      data: { bestScore: score },
    });
    await tx.quizAttempt.create({ data: { userId, lessonId, score, total } });

    const first = passed ? await markCompletedOnce(tx, userId, lessonId, lesson.xp, now) : false;

    await scheduleWrongQuestions(tx, userId, wrongQuestionIds);
    // Đưa từ của bài vào lịch ôn (mức 1, giữ nguyên từ đã có lịch sử)...
    await registerVocabularyForLesson(userId, lessonId, lesson, tx);
    // ...rồi đưa từ viết sai về mức 1.
    await resetVocabularyToLevelOne(tx, userId, wrongVocabIds);
    await touchStreak(userId, tx);

    return first;
  }, TX_OPTIONS);

  return {
    score,
    total,
    percent,
    passed,
    details,
    writtenDetails,
    xpAwarded: firstCompletion ? lesson.xp : 0,
  };
}

/**
 * Hoàn thành bài từ vựng bằng cách học xong flashcard (không có bài kiểm tra).
 * Ghi nhận completed + XP lần đầu, đưa từ vựng vào lịch ôn, giữ nguyên nếu đã
 * hoàn thành trước đó.
 */
export async function completeVocabLesson(userId: string, lessonId: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { track: true, xp: true, vocab: { select: { id: true } } },
  });

  if (!lesson) throw new NotFoundError("Lesson not found");
  if (lesson.track !== "vocabulary" || lesson.vocab.length === 0) {
    throw new BadRequestError("Lesson has no vocabulary");
  }
  const now = new Date();

  const firstCompletion = await prisma.$transaction(async (tx) => {
    // Tạo dòng tiến độ nếu chưa có (attempts = 1, như bản cũ), rồi để
    // markCompletedOnce quyết định có phải lần hoàn thành đầu tiên không.
    await tx.lessonProgress.createMany({
      data: [{ userId, lessonId, attempts: 1 }],
      skipDuplicates: true,
    });
    const first = await markCompletedOnce(tx, userId, lessonId, lesson.xp, now);
    await registerVocabularyForLesson(userId, lessonId, lesson, tx);
    await touchStreak(userId, tx);
    return first;
  }, TX_OPTIONS);

  return { completed: true, xpAwarded: firstCompletion ? lesson.xp : 0 };
}

// ---------------------------------------------------------------------------
// Ôn câu hỏi trắc nghiệm đã sai (giãn cách 1 → 3 → 7 → 14 → 30 ngày)
// ---------------------------------------------------------------------------

/** Các mốc ôn tập giãn cách (ngày). Đúng thì tiến một mốc, sai thì quay về mốc đầu. */
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30] as const;

const LAST_INTERVAL = REVIEW_INTERVALS[REVIEW_INTERVALS.length - 1];

function nextReviewInterval(current: number) {
  const index = REVIEW_INTERVALS.indexOf(current as (typeof REVIEW_INTERVALS)[number]);
  if (index === -1) return REVIEW_INTERVALS[0];
  return REVIEW_INTERVALS[Math.min(index + 1, REVIEW_INTERVALS.length - 1)];
}

export async function answerReviewItem(userId: string, reviewItemId: string, choiceId: string) {
  const item = await prisma.reviewItem.findFirst({
    where: { id: reviewItemId, userId, resolved: false },
    include: { question: { include: { choices: true } } },
  });

  if (!item) throw new NotFoundError("Review item not found");

  const selected = item.question.choices.find((choice) => choice.id === choiceId);
  const correct = item.question.choices.find((choice) => choice.isCorrect);
  const isCorrect = Boolean(selected?.isCorrect);
  const now = new Date();

  let intervalDays = 0;
  let dueAt = now;
  let mastered = false;

  if (isCorrect) {
    // Đã đạt mốc 30 ngày và trả lời đúng lần nữa => coi như đã khắc sâu.
    mastered = item.intervalDays >= LAST_INTERVAL;
    intervalDays = mastered ? item.intervalDays : nextReviewInterval(item.intervalDays);
    dueAt = mastered ? now : addDays(now, intervalDays);

    await prisma.$transaction(async (tx) => {
      await tx.reviewItem.update({
        where: { id: item.id },
        data: {
          resolved: mastered,
          intervalDays,
          correctStreak: { increment: 1 },
          lastReviewedAt: now,
          dueAt,
        },
      });
      await touchStreak(userId, tx);
    }, TX_OPTIONS);
  } else {
    await prisma.reviewItem.update({
      where: { id: item.id },
      data: {
        resolved: false,
        intervalDays: 0,
        correctStreak: 0,
        wrongCount: { increment: 1 },
        lastWrongAt: now,
        lastReviewedAt: now,
        dueAt: now,
      },
    });
  }

  return {
    correct: isCorrect,
    correctChoiceId: correct?.id ?? "",
    correctLabel: correct?.label ?? "",
    selectedLabel: selected?.label ?? "",
    explanation: item.question.explanation,
    intervalDays,
    dueAt: dueAt.toISOString(),
    mastered,
  };
}
