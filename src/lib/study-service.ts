import { prisma } from "./prisma";
import { applyReview, isDue, type ReviewResult } from "./srs";

export async function getTodayProgress(userId: string, dailyGoal: number) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const reviewedToday = await prisma.userWordProgress.count({
    where: {
      userId,
      lastReviewed: { gte: startOfDay },
    },
  });

  return { reviewedToday, dailyGoal, completed: reviewedToday >= dailyGoal };
}

export async function updateStreak(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const progress = await getTodayProgress(userId, user.dailyGoal);
  if (!progress.completed) return;

  const lastStudy = user.lastStudyDate ? new Date(user.lastStudyDate) : null;
  if (lastStudy) lastStudy.setHours(0, 0, 0, 0);

  let streak = user.streak;
  if (!lastStudy) {
    streak = 1;
  } else {
    const diffDays = Math.round((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) streak += 1;
    else if (diffDays > 1) streak = 1;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { streak, lastStudyDate: new Date() },
  });
}

export async function recordReview(userId: string, wordId: string, result: ReviewResult) {
  const existing = await prisma.userWordProgress.findUnique({
    where: { userId_wordId: { userId, wordId } },
  });

  const base = existing ?? {
    status: "new",
    easeFactor: 2.5,
    interval: 0,
    reviewCount: 0,
  };

  const next = applyReview(base, result);

  await prisma.userWordProgress.upsert({
    where: { userId_wordId: { userId, wordId } },
    create: {
      userId,
      wordId,
      ...next,
      lastReviewed: new Date(),
    },
    update: {
      ...next,
      lastReviewed: new Date(),
    },
  });

  await prisma.studySession.create({
    data: { userId, wordsDone: 1 },
  });

  await updateStreak(userId);

  return next;
}

export async function getReviewQueue(userId: string, categorySlug?: string, limit = 20) {
  const now = new Date();

  const words = await prisma.word.findMany({
    where: {
      archived: false,
      ...(categorySlug
        ? { category: { slug: categorySlug } }
        : {}),
    },
    include: {
      category: true,
      progress: { where: { userId } },
    },
    take: 200,
  });

  const due = words.filter((w) => {
    const p = w.progress[0];
    if (!p) return true;
    return isDue(p.nextReviewAt);
  });

  const shuffled = due.sort(() => Math.random() - 0.5).slice(0, limit);

  return shuffled.map((w) => ({
    ...w,
    progress: w.progress[0] ?? null,
  }));
}

export async function getReviewStats(userId: string) {
  const [mastered, total, user] = await Promise.all([
    prisma.userWordProgress.count({
      where: { userId, status: "mastered" },
    }),
    prisma.word.count({ where: { archived: false } }),
    prisma.user.findUnique({ where: { id: userId } }),
  ]);

  const allProgress = await prisma.userWordProgress.findMany({
    where: { userId },
    select: { lastResult: true },
  });

  const knows = allProgress.filter((p) => p.lastResult === "know").length;
  const retentionRate = allProgress.length > 0 ? Math.round((knows / allProgress.length) * 100) : 0;

  return {
    mastered,
    total,
    retentionRate,
    streak: user?.streak ?? 0,
    dailyGoal: user?.dailyGoal ?? 10,
  };
}
