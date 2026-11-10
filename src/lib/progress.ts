import { prisma } from "./prisma";
import { touchStreak } from "./streak";
import {
  isVocabularyAnswerCorrect,
  normalizeVocabularyAnswer,
  registerVocabularyForLesson,
  vocabularyAnswerExplanation,
} from "./vocab-review";
import { buildWrittenPrompts, type WrittenDirection } from "./vocabulary-quiz";

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

  if (!lesson) throw new Error("Lesson not found");
  if (lesson.questions.length === 0 && lesson.vocab.length === 0) {
    throw new Error("Lesson has no questions");
  }

  const details: QuizDetail[] = lesson.questions.map((question) => {
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

  const vocabById = new Map(lesson.vocab.map((entry) => [entry.id, entry]));
  const wordsByMeaning = new Map<string, string[]>();
  for (const entry of lesson.vocab) {
    const key = normalizeVocabularyAnswer(entry.meaningVi);
    wordsByMeaning.set(key, [...(wordsByMeaning.get(key) ?? []), entry.word]);
  }
  const includeWritten = lesson.track === "vocabulary" && writtenAnswers !== undefined;

  const writtenDetails: WrittenQuizDetail[] = includeWritten
    ? buildWrittenPrompts(lesson.vocab).flatMap((prompt) => {
        const entry = vocabById.get(prompt.vocabId);
        if (!entry) return [];

        const answer = writtenAnswers?.[`${prompt.vocabId}:${prompt.direction}`] ?? "";
        const correct = isVocabularyAnswerCorrect({
          direction: prompt.direction,
          answer,
          word: entry.word,
          meaningVi: entry.meaningVi,
          alternatives:
            prompt.direction === "vi-en"
              ? wordsByMeaning.get(normalizeVocabularyAnswer(entry.meaningVi)) ?? []
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
      })
    : [];

  const score =
    details.filter((detail) => detail.correct).length +
    writtenDetails.filter((detail) => detail.correct).length;
  const total = details.length + writtenDetails.length;
  if (total === 0) throw new Error("Lesson has no questions");
  const percent = Math.round((score / total) * 100);
  const passed = percent >= 70;

  const existing = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });
  const firstCompletion = passed && !existing?.completed;

  await prisma.$transaction(async (tx) => {
    await tx.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        attempts: 1,
        bestScore: score,
        quizTotal: total,
        completed: passed,
        completedAt: passed ? new Date() : null,
      },
      update: {
        attempts: { increment: 1 },
        bestScore: Math.max(existing?.bestScore ?? 0, score),
        quizTotal: total,
        completed: existing?.completed || passed,
        completedAt:
          existing?.completed && existing.completedAt
            ? existing.completedAt
            : passed
              ? new Date()
              : null,
      },
    });

    await tx.quizAttempt.create({
      data: { userId, lessonId, score, total },
    });

    if (firstCompletion) {
      await tx.user.update({
        where: { id: userId },
        data: { xp: { increment: lesson.xp } },
      });
    }

    for (const detail of details) {
      if (detail.correct) continue;

      // Sai trong bài kiểm tra cũng đưa câu vào lịch ôn ngay hôm nay.
      // Đúng trong bài kiểm tra không tự xoá lịch ôn — chỉ lượt ôn mới
      // quyết định mốc giãn cách tiếp theo.
      const now = new Date();
      await tx.reviewItem.upsert({
        where: {
          userId_questionId: { userId, questionId: detail.questionId },
        },
        create: {
          userId,
          questionId: detail.questionId,
          wrongCount: 1,
          resolved: false,
          dueAt: now,
        },
        update: {
          wrongCount: { increment: 1 },
          resolved: false,
          lastWrongAt: now,
          intervalDays: 0,
          correctStreak: 0,
          dueAt: now,
        },
      });
    }
  });

  await registerVocabularyForLesson(userId, lessonId);

  // Từ viết sai trong bài thi thật quay về mức 1 và đến hạn ôn ngay.
  const wrongWritten = writtenDetails.filter((detail) => !detail.correct);
  if (wrongWritten.length > 0) {
    const now = new Date();
    // Tuần tự từng upsert vì Prisma chỉ có 1 connection.
    for (const detail of wrongWritten) {
      await prisma.vocabReviewItem.upsert({
        where: { userId_vocabId: { userId, vocabId: detail.vocabId } },
        create: {
          userId,
          vocabId: detail.vocabId,
          level: 1,
          wrongCount: 1,
          dueAt: now,
        },
        update: {
          level: 1,
          correctStreak: 0,
          wrongCount: { increment: 1 },
          lastReviewedAt: now,
          dueAt: now,
        },
      });
    }
  }

  await touchStreak(userId);

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

// Các mốc ôn tập giãn cách (ngày). Đúng thì tiến một mốc, sai thì quay về mốc đầu.
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30] as const;

function nextReviewInterval(current: number) {
  const index = REVIEW_INTERVALS.indexOf(current as (typeof REVIEW_INTERVALS)[number]);
  if (index === -1) return REVIEW_INTERVALS[0];
  return REVIEW_INTERVALS[Math.min(index + 1, REVIEW_INTERVALS.length - 1)];
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export async function answerReviewItem(userId: string, reviewItemId: string, choiceId: string) {
  const item = await prisma.reviewItem.findFirst({
    where: { id: reviewItemId, userId, resolved: false },
    include: { question: { include: { choices: true } } },
  });

  if (!item) throw new Error("Review item not found");

  const selected = item.question.choices.find((choice) => choice.id === choiceId);
  const correct = item.question.choices.find((choice) => choice.isCorrect);
  const isCorrect = Boolean(selected?.isCorrect);
  const now = new Date();

  let intervalDays = 0;
  let dueAt = now;
  let mastered = false;

  if (isCorrect) {
    // Đã đạt mốc 30 ngày và trả lời đúng lần nữa => coi như đã khắc sâu.
    mastered = item.intervalDays >= REVIEW_INTERVALS[REVIEW_INTERVALS.length - 1];
    intervalDays = mastered
      ? item.intervalDays
      : nextReviewInterval(item.intervalDays);
    dueAt = mastered ? now : addDays(now, intervalDays);

    await prisma.reviewItem.update({
      where: { id: item.id },
      data: {
        resolved: mastered,
        intervalDays,
        correctStreak: { increment: 1 },
        lastReviewedAt: now,
        dueAt,
      },
    });
    await touchStreak(userId);
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
