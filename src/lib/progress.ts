import { prisma } from "./prisma";

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

async function touchStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastStudyDate: true, streak: true },
  });
  if (!user) return;

  const today = startOfDay(new Date());
  const last = user.lastStudyDate ? startOfDay(user.lastStudyDate) : null;

  if (last && last.getTime() === today.getTime()) return;

  let streak = 1;
  if (last) {
    const diffDays = Math.round((today.getTime() - last.getTime()) / 86_400_000);
    streak = diffDays === 1 ? user.streak + 1 : 1;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { streak, lastStudyDate: new Date() },
  });
}

export async function completeTheory(userId: string, lessonId: string) {
  const progress = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: { userId, lessonId, theoryDone: true },
    update: { theoryDone: true },
  });

  await touchStreak(userId);
  return progress;
}

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

export async function submitQuiz(
  userId: string,
  lessonId: string,
  answers: Record<string, string>,
) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { choices: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!lesson) throw new Error("Lesson not found");
  if (lesson.questions.length === 0) throw new Error("Lesson has no questions");

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

  const score = details.filter((detail) => detail.correct).length;
  const total = details.length;
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
        theoryDone: true,
        attempts: 1,
        bestScore: score,
        quizTotal: total,
        completed: passed,
      },
      update: {
        theoryDone: true,
        attempts: { increment: 1 },
        bestScore: Math.max(existing?.bestScore ?? 0, score),
        quizTotal: total,
        completed: existing?.completed || passed,
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
      if (detail.correct) {
        await tx.reviewItem.updateMany({
          where: { userId, questionId: detail.questionId, resolved: false },
          data: { resolved: true },
        });
      } else {
        await tx.reviewItem.upsert({
          where: {
            userId_questionId: { userId, questionId: detail.questionId },
          },
          create: {
            userId,
            questionId: detail.questionId,
            wrongCount: 1,
            resolved: false,
          },
          update: {
            wrongCount: { increment: 1 },
            resolved: false,
            lastWrongAt: new Date(),
          },
        });
      }
    }
  });

  await touchStreak(userId);

  return {
    score,
    total,
    percent,
    passed,
    details,
    xpAwarded: firstCompletion ? lesson.xp : 0,
  };
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

  if (isCorrect) {
    await prisma.reviewItem.update({
      where: { id: item.id },
      data: { resolved: true },
    });
    await touchStreak(userId);
  }

  return {
    correct: isCorrect,
    correctChoiceId: correct?.id ?? "",
    correctLabel: correct?.label ?? "",
    selectedLabel: selected?.label ?? "",
    explanation: item.question.explanation,
  };
}
