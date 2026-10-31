-- Daily goals + onboarding for User
ALTER TABLE "User"
  ADD COLUMN "dailyGoalLessons" INTEGER NOT NULL DEFAULT 2,
  ADD COLUMN "dailyGoalMinutes" INTEGER NOT NULL DEFAULT 20,
  ADD COLUMN "onboardedAt" TIMESTAMP(3),
  ADD COLUMN "targetLevel" TEXT,
  ADD COLUMN "placementLevel" TEXT;

-- Track the moment a lesson was first completed (for daily goal progress)
ALTER TABLE "LessonProgress" ADD COLUMN "completedAt" TIMESTAMP(3);
UPDATE "LessonProgress"
SET "completedAt" = "updatedAt"
WHERE "completed" = true AND "completedAt" IS NULL;

-- Spaced repetition fields for ReviewItem
ALTER TABLE "ReviewItem"
  ADD COLUMN "lastReviewedAt" TIMESTAMP(3),
  ADD COLUMN "intervalDays" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "correctStreak" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "dueAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX "ReviewItem_userId_resolved_dueAt_idx"
  ON "ReviewItem"("userId", "resolved", "dueAt");
