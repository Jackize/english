-- Leitner 5-box vocabulary review.
CREATE TABLE "VocabReviewItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "correctStreak" INTEGER NOT NULL DEFAULT 0,
    "wrongCount" INTEGER NOT NULL DEFAULT 0,
    "lastReviewedAt" TIMESTAMP(3),
    "dueAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabReviewItem_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "VocabReviewItem_level_check" CHECK ("level" BETWEEN 1 AND 5)
);

CREATE UNIQUE INDEX "VocabReviewItem_userId_vocabId_key"
  ON "VocabReviewItem"("userId", "vocabId");

CREATE INDEX "VocabReviewItem_userId_dueAt_idx"
  ON "VocabReviewItem"("userId", "dueAt");

CREATE INDEX "VocabReviewItem_userId_level_idx"
  ON "VocabReviewItem"("userId", "level");

ALTER TABLE "VocabReviewItem"
  ADD CONSTRAINT "VocabReviewItem_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "VocabReviewItem"
  ADD CONSTRAINT "VocabReviewItem_vocabId_fkey"
  FOREIGN KEY ("vocabId") REFERENCES "VocabEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
