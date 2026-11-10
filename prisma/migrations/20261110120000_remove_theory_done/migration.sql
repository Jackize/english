-- Drop theoryDone: lesson progress now only tracks quiz results.
ALTER TABLE "LessonProgress" DROP COLUMN "theoryDone";
