-- CreateTable
CREATE TABLE "ReadingUnit" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "unitNumber" INTEGER NOT NULL,
    "unitTotal" INTEGER NOT NULL DEFAULT 10,
    "title" TEXT NOT NULL,
    "passageTitle" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lengthWords" INTEGER NOT NULL,
    "estimatedMinutes" INTEGER NOT NULL,
    "timeLabel" TEXT NOT NULL,
    "questionTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "warmUp" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "passage" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "source" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReadingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingSkill" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "bullets" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "ReadingSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingQuestionGroup" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "instructionVi" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReadingQuestionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingQuestion" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "evidence" TEXT,
    "answerKey" TEXT,
    "acceptedAnswers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "modelAnswer" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReadingQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingChoice" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "choiceKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReadingChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingMatchItem" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "itemKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "matchKey" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReadingMatchItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingVocabularyEntry" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "ipa" TEXT NOT NULL DEFAULT '',
    "meaningVi" TEXT NOT NULL,
    "example" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReadingVocabularyEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingMistake" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReadingMistake_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReadingUnit_levelId_unitNumber_idx" ON "ReadingUnit"("levelId", "unitNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingUnit_levelId_slug_key" ON "ReadingUnit"("levelId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingUnit_levelId_unitNumber_key" ON "ReadingUnit"("levelId", "unitNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingSkill_unitId_key" ON "ReadingSkill"("unitId");

-- CreateIndex
CREATE INDEX "ReadingQuestionGroup_unitId_order_idx" ON "ReadingQuestionGroup"("unitId", "order");

-- CreateIndex
CREATE INDEX "ReadingQuestion_groupId_order_idx" ON "ReadingQuestion"("groupId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingQuestion_groupId_number_key" ON "ReadingQuestion"("groupId", "number");

-- CreateIndex
CREATE INDEX "ReadingChoice_questionId_order_idx" ON "ReadingChoice"("questionId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingChoice_questionId_choiceKey_key" ON "ReadingChoice"("questionId", "choiceKey");

-- CreateIndex
CREATE INDEX "ReadingMatchItem_questionId_side_order_idx" ON "ReadingMatchItem"("questionId", "side", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingMatchItem_questionId_side_itemKey_key" ON "ReadingMatchItem"("questionId", "side", "itemKey");

-- CreateIndex
CREATE INDEX "ReadingVocabularyEntry_unitId_order_idx" ON "ReadingVocabularyEntry"("unitId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingVocabularyEntry_unitId_word_key" ON "ReadingVocabularyEntry"("unitId", "word");

-- CreateIndex
CREATE INDEX "ReadingMistake_unitId_order_idx" ON "ReadingMistake"("unitId", "order");

-- AddForeignKey
ALTER TABLE "ReadingUnit" ADD CONSTRAINT "ReadingUnit_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSkill" ADD CONSTRAINT "ReadingSkill_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "ReadingUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingQuestionGroup" ADD CONSTRAINT "ReadingQuestionGroup_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "ReadingUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingQuestion" ADD CONSTRAINT "ReadingQuestion_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ReadingQuestionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingChoice" ADD CONSTRAINT "ReadingChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ReadingQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingMatchItem" ADD CONSTRAINT "ReadingMatchItem_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ReadingQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingVocabularyEntry" ADD CONSTRAINT "ReadingVocabularyEntry_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "ReadingUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingMistake" ADD CONSTRAINT "ReadingMistake_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "ReadingUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
