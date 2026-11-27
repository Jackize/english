import { z } from "zod";
import { prisma } from "./prisma";

/** Mục tiêu học mỗi ngày — dùng chung cho onboarding và trang cài đặt. */
export const dailyGoalSchema = z.object({
  dailyGoalLessons: z.number().int().min(1).max(10),
  dailyGoalMinutes: z.number().int().min(5).max(180),
});

/**
 * Xoá dữ liệu học tập (tiến độ, lượt làm bài, lịch ôn, XP, chuỗi ngày).
 * Tài khoản, mục tiêu ngày và lộ trình được giữ nguyên.
 */
export async function resetLearningProgress(userId: string) {
  await prisma.$transaction([
    prisma.reviewItem.deleteMany({ where: { userId } }),
    prisma.vocabReviewItem.deleteMany({ where: { userId } }),
    prisma.quizAttempt.deleteMany({ where: { userId } }),
    prisma.lessonProgress.deleteMany({ where: { userId } }),
    prisma.user.update({
      where: { id: userId },
      data: { xp: 0, streak: 0, lastStudyDate: null },
    }),
  ]);
}
