import { cache } from "react";
import { addDays, dayKey, startOfDay, startOfToday } from "./dates";
import { getUserLearningState } from "./learning";
import { prisma } from "./prisma";
import { liveStreak } from "./streak";
import { countByLevel, type VocabReviewLevel } from "./vocab-review";

export const RHYTHM_DAYS = 14;

export interface RhythmDay {
  /** yyyy-mm-dd theo giờ server, cùng quy ước với touchStreak. */
  key: string;
  weekday: number;
  active: boolean;
  isToday: boolean;
}

export interface HomeMotivation {
  streak: {
    days: number;
    studiedToday: boolean;
    /** Đã học hôm qua nhưng chưa học hôm nay: chuỗi sẽ mất nếu bỏ qua hôm nay. */
    atRisk: boolean;
  };
  rhythm: RhythmDay[];
  activeDays: number;
  review: {
    dueVocab: number;
    dueQuestions: number;
    reviewedToday: number;
    nextDueAt: string | null;
  };
  memory: {
    total: number;
    counts: Record<VocabReviewLevel, number>;
    /** Từ ở mức 4–5: chu kỳ ôn 7–14 ngày. */
    longTerm: number;
  };
  mistakesFixed: number;
}

/**
 * Số liệu động lực cho trang chủ, chỉ lấy từ dữ liệu thật: chuỗi ngày, các ngày
 * có hoạt động trong 14 ngày gần nhất, mục ôn đến hạn, phân bố hộp Leitner và
 * số câu sai đã sửa xong.
 *
 * "Ngày có hoạt động" gộp lượt hoàn thành bài, lượt làm kiểm tra và lần ôn gần
 * nhất của mỗi mục ôn. Vì mỗi mục ôn chỉ lưu lần ôn cuối, các ngày chỉ có ôn tập
 * ở xa trong quá khứ có thể bị thiếu; con số không bao giờ bị thổi phồng.
 */
export const getHomeMotivation = cache(async (userId: string): Promise<HomeMotivation> => {
  const today = startOfToday();
  const tomorrow = addDays(today, 1);
  const windowStart = addDays(today, -(RHYTHM_DAYS - 1));

  const [
    state,
    lessonDays,
    attemptDays,
    vocabReviewDays,
    questionReviewDays,
    vocabGrouped,
    dueVocab,
    dueQuestions,
    nextVocab,
    nextQuestion,
    mistakesFixed,
  ] = await Promise.all([
    // Đã cache theo request (trang chủ cũng gọi getOverview), không query lại.
    getUserLearningState(userId),
    prisma.lessonProgress.findMany({
      where: { userId, completedAt: { gte: windowStart } },
      select: { completedAt: true },
    }),
    prisma.quizAttempt.findMany({
      where: { userId, createdAt: { gte: windowStart } },
      select: { createdAt: true },
    }),
    prisma.vocabReviewItem.findMany({
      where: { userId, lastReviewedAt: { gte: windowStart } },
      select: { lastReviewedAt: true },
    }),
    prisma.reviewItem.findMany({
      where: { userId, lastReviewedAt: { gte: windowStart } },
      select: { lastReviewedAt: true },
    }),
    prisma.vocabReviewItem.groupBy({
      by: ["level"],
      where: { userId },
      _count: { _all: true },
    }),
    prisma.vocabReviewItem.count({ where: { userId, dueAt: { lt: tomorrow } } }),
    prisma.reviewItem.count({ where: { userId, resolved: false, dueAt: { lt: tomorrow } } }),
    prisma.vocabReviewItem.findFirst({
      where: { userId, dueAt: { gte: tomorrow } },
      orderBy: { dueAt: "asc" },
      select: { dueAt: true },
    }),
    prisma.reviewItem.findFirst({
      where: { userId, resolved: false, dueAt: { gte: tomorrow } },
      orderBy: { dueAt: "asc" },
      select: { dueAt: true },
    }),
    prisma.reviewItem.count({ where: { userId, resolved: true } }),
  ]);

  const activeKeys = new Set<string>();
  const stamps: (Date | null)[] = [
    ...lessonDays.map((row) => row.completedAt),
    ...attemptDays.map((row) => row.createdAt),
    ...vocabReviewDays.map((row) => row.lastReviewedAt),
    ...questionReviewDays.map((row) => row.lastReviewedAt),
  ];
  for (const stamp of stamps) {
    if (stamp) activeKeys.add(dayKey(stamp));
  }

  const user = state.user;
  const lastStudy = user?.lastStudyDate ? startOfDay(user.lastStudyDate) : null;
  const studiedToday = lastStudy?.getTime() === today.getTime();
  if (studiedToday) activeKeys.add(dayKey(today));
  const yesterday = addDays(today, -1);
  const studiedYesterday = lastStudy?.getTime() === yesterday.getTime();
  const streakDays = liveStreak(user?.streak ?? 0, user?.lastStudyDate);

  const rhythm: RhythmDay[] = [];
  for (let i = 0; i < RHYTHM_DAYS; i++) {
    const date = addDays(windowStart, i);
    const key = dayKey(date);
    rhythm.push({
      key,
      weekday: date.getDay(),
      active: activeKeys.has(key),
      isToday: key === dayKey(today),
    });
  }

  const reviewedToday =
    vocabReviewDays.filter((row) => row.lastReviewedAt && row.lastReviewedAt >= today).length +
    questionReviewDays.filter((row) => row.lastReviewedAt && row.lastReviewedAt >= today).length;

  const { counts, total } = countByLevel(vocabGrouped);

  const nextCandidates = [nextVocab?.dueAt, nextQuestion?.dueAt].filter(
    (value): value is Date => Boolean(value),
  );
  const nextDueAt = nextCandidates.length
    ? new Date(Math.min(...nextCandidates.map((d) => d.getTime()))).toISOString()
    : null;

  return {
    streak: {
      days: streakDays,
      studiedToday,
      atRisk: studiedYesterday && streakDays > 0,
    },
    rhythm,
    activeDays: rhythm.filter((day) => day.active).length,
    review: { dueVocab, dueQuestions, reviewedToday, nextDueAt },
    memory: { total, counts, longTerm: counts[4] + counts[5] },
    mistakesFixed,
  };
});
