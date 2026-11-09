-- Backfill vocabulary review items for words from lessons the user already
-- studied before the Leitner review system was introduced.
INSERT INTO "VocabReviewItem" (
    "id",
    "userId",
    "vocabId",
    "level",
    "correctStreak",
    "wrongCount",
    "dueAt",
    "createdAt",
    "updatedAt"
)
SELECT
    gen_random_uuid()::text,
    lp."userId",
    v."id",
    1,
    0,
    0,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "LessonProgress" lp
JOIN "Lesson" l ON l."id" = lp."lessonId"
JOIN "VocabEntry" v ON v."lessonId" = l."id"
WHERE l."track" = 'vocabulary'
  AND (lp."completed" = true OR lp."theoryDone" = true OR lp."bestScore" > 0)
ON CONFLICT ("userId", "vocabId") DO NOTHING;
