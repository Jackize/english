import "dotenv/config";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { createPrismaClient } from "../src/lib/prisma";
import { buildVocabularyQuestions } from "../src/lib/vocabulary-quiz";
import type { ReadingUnit } from "../src/lib/reading-types";
import { A1_READING_UNITS } from "./a1-reading";
import { CURRICULUM, type SeedQuestion, type SeedWord } from "./curriculum-data";

// Seed chạy tuần tự; chỉ mở một kết nối để tránh làm cạn pooler của Supabase.
const prisma = createPrismaClient({ max: 1, connectionTimeoutMillis: 15000 });

function vocabularyQuestions(words: SeedWord[]): SeedQuestion[] {
  return buildVocabularyQuestions(words);
}

async function createQuestions(lessonId: string, questions: SeedQuestion[]) {
  const questionRows = questions.map((question, index) => ({
    id: randomUUID(),
    lessonId,
    prompt: question.prompt,
    explanation: question.explanation,
    order: index,
  }));

  await prisma.question.createMany({ data: questionRows });
  await prisma.questionChoice.createMany({
    data: questions.flatMap((question, index) =>
      question.choices.map((choice, choiceIndex) => ({
        id: randomUUID(),
        questionId: questionRows[index].id,
        label: choice.label,
        isCorrect: Boolean(choice.correct),
        order: choiceIndex,
      })),
    ),
  });
}

async function seedGrammarLesson(
  levelId: string,
  order: number,
  data: (typeof CURRICULUM)[number]["grammar"][number],
) {
  const lesson = await prisma.lesson.upsert({
    where: { track_levelId_order: { track: "grammar", levelId, order } },
    update: {
      title: data.title,
      summary: data.summary,
      xp: 10,
      estimatedMinutes: 12,
    },
    create: {
      track: "grammar",
      levelId,
      order,
      title: data.title,
      summary: data.summary,
      xp: 10,
      estimatedMinutes: 12,
    },
  });

  await prisma.lessonSection.deleteMany({ where: { lessonId: lesson.id } });
  await prisma.question.deleteMany({ where: { lessonId: lesson.id } });

  await prisma.lessonSection.createMany({
    data: data.sections.map((section, i) => ({
      lessonId: lesson.id,
      title: section.title,
      body: section.body,
      remember: section.remember,
      order: i,
    })),
  });

  await createQuestions(lesson.id, data.questions);

  return { lesson, sections: data.sections.length, questions: data.questions.length };
}

async function seedVocabTopic(
  levelId: string,
  topicOrder: number,
  data: (typeof CURRICULUM)[number]["vocab"][number],
) {
  const topic = await prisma.topic.upsert({
    where: { levelId_slug: { levelId, slug: data.slug } },
    update: {
      name: data.name,
      description: data.description,
      icon: data.icon,
      order: topicOrder,
    },
    create: {
      levelId,
      name: data.name,
      slug: data.slug,
      description: data.description,
      icon: data.icon,
      order: topicOrder,
    },
  });

  const lesson = await prisma.lesson.upsert({
    where: { track_levelId_order: { track: "vocabulary", levelId, order: topicOrder + 1 } },
    update: {
      title: data.lesson.title,
      summary: data.lesson.summary,
      topicId: topic.id,
      xp: 10,
      estimatedMinutes: 10,
    },
    create: {
      track: "vocabulary",
      levelId,
      topicId: topic.id,
      order: topicOrder + 1,
      title: data.lesson.title,
      summary: data.lesson.summary,
      xp: 10,
      estimatedMinutes: 10,
    },
  });

  await prisma.lessonSection.deleteMany({ where: { lessonId: lesson.id } });
  await prisma.vocabEntry.deleteMany({ where: { lessonId: lesson.id } });
  await prisma.question.deleteMany({ where: { lessonId: lesson.id } });

  await prisma.lessonSection.createMany({
    data: data.lesson.sections.map((section, i) => ({
      lessonId: lesson.id,
      title: section.title,
      body: section.body,
      remember: section.remember,
      order: i,
    })),
  });

  await prisma.vocabEntry.createMany({
    data: data.lesson.words.map((word, i) => ({
      lessonId: lesson.id,
      word: word.word,
      ipa: word.ipa,
      wordForm: word.wordForm,
      meaningVi: word.meaningVi,
      meaningEn: word.meaningEn,
      example: word.example,
      order: i,
    })),
  });

  const questions = vocabularyQuestions(data.lesson.words);
  await createQuestions(lesson.id, questions);

  return { topic, lesson, words: data.lesson.words.length, questions: questions.length };
}

async function seedReadingUnit(levelId: string, data: ReadingUnit) {
  const unit = await prisma.readingUnit.upsert({
    where: { levelId_slug: { levelId, slug: data.slug } },
    update: {
      unitNumber: data.unitNumber,
      unitTotal: data.unitTotal,
      title: data.title,
      passageTitle: data.passageTitle,
      goal: data.goal,
      description: data.description,
      lengthWords: data.lengthWords,
      estimatedMinutes: data.estimatedMinutes,
      timeLabel: data.timeLabel,
      questionTypes: data.questionTypes,
      warmUp: data.warmUp,
      passage: data.passage,
      source: data.source,
    },
    create: {
      levelId,
      slug: data.slug,
      unitNumber: data.unitNumber,
      unitTotal: data.unitTotal,
      title: data.title,
      passageTitle: data.passageTitle,
      goal: data.goal,
      description: data.description,
      lengthWords: data.lengthWords,
      estimatedMinutes: data.estimatedMinutes,
      timeLabel: data.timeLabel,
      questionTypes: data.questionTypes,
      warmUp: data.warmUp,
      passage: data.passage,
      source: data.source,
    },
  });

  // Xoá nội dung con cũ rồi tạo lại để seed idempotent. Xoá group sẽ cascade
  // xuống question/choice/matchItem.
  await prisma.readingQuestionGroup.deleteMany({ where: { unitId: unit.id } });
  await prisma.readingVocabularyEntry.deleteMany({ where: { unitId: unit.id } });
  await prisma.readingMistake.deleteMany({ where: { unitId: unit.id } });
  await prisma.readingSkill.deleteMany({ where: { unitId: unit.id } });

  await prisma.readingSkill.create({
    data: {
      unitId: unit.id,
      title: data.skill.title,
      intro: data.skill.intro,
      bullets: data.skill.bullets,
    },
  });

  if (data.vocabulary.length > 0) {
    await prisma.readingVocabularyEntry.createMany({
      data: data.vocabulary.map((entry, index) => ({
        unitId: unit.id,
        word: entry.word,
        ipa: entry.ipa,
        meaningVi: entry.meaningVi,
        example: entry.example,
        order: index,
      })),
    });
  }

  if (data.mistakes.length > 0) {
    await prisma.readingMistake.createMany({
      data: data.mistakes.map((mistake, index) => ({
        unitId: unit.id,
        title: mistake.title,
        body: mistake.body,
        order: index,
      })),
    });
  }

  let questionCount = 0;

  for (const [groupIndex, group] of data.groups.entries()) {
    const groupRow = await prisma.readingQuestionGroup.create({
      data: {
        unitId: unit.id,
        badge: group.badge,
        label: group.label,
        instructionVi: group.instructionVi,
        order: groupIndex,
      },
    });

    const questionRows = group.questions.map((question, questionIndex) => ({
      id: randomUUID(),
      groupId: groupRow.id,
      number: question.number,
      kind: question.kind,
      prompt: question.prompt,
      explanation: question.explanation,
      evidence: question.evidence ?? null,
      answerKey:
        question.kind === "true-false" || question.kind === "mcq" ? question.answer : null,
      acceptedAnswers: question.kind === "short-answer" ? question.acceptedAnswers : [],
      modelAnswer: question.kind === "short-answer" ? question.modelAnswer : null,
      order: questionIndex,
    }));

    if (questionRows.length > 0) {
      await prisma.readingQuestion.createMany({ data: questionRows });
      questionCount += questionRows.length;
    }

    const choices = group.questions.flatMap((question, questionIndex) => {
      if (question.kind !== "mcq") return [];

      return question.options.map((option, optionIndex) => ({
        id: randomUUID(),
        questionId: questionRows[questionIndex].id,
        choiceKey: option.id,
        label: option.label,
        text: option.text,
        isCorrect: option.id === question.answer,
        order: optionIndex,
      }));
    });

    if (choices.length > 0) {
      await prisma.readingChoice.createMany({ data: choices });
    }

    const matchItems = group.questions.flatMap((question, questionIndex) => {
      if (question.kind !== "matching") return [];

      return [
        ...question.left.map((item, itemIndex) => ({
          id: randomUUID(),
          questionId: questionRows[questionIndex].id,
          side: "left",
          itemKey: item.id,
          label: item.label,
          matchKey: question.answer[item.id] ?? null,
          order: itemIndex,
        })),
        ...question.right.map((item, itemIndex) => ({
          id: randomUUID(),
          questionId: questionRows[questionIndex].id,
          side: "right",
          itemKey: item.id,
          label: item.label,
          matchKey: null,
          order: itemIndex,
        })),
      ];
    });

    if (matchItems.length > 0) {
      await prisma.readingMatchItem.createMany({ data: matchItems });
    }
  }

  return { unit, questions: questionCount, words: data.vocabulary.length };
}

async function cleanupTopics(levelId: string, slugs: string[]) {
  if (slugs.length === 0) return 0;

  const staleTopics = await prisma.topic.findMany({
    where: { levelId, slug: { in: slugs } },
    select: { id: true, slug: true },
  });

  for (const topic of staleTopics) {
    // Lesson có thể đã được upsert sang topic mới, nhưng vẫn dọn phần còn lại
    // để không để lại topic rỗng sau khi thay đổi chương trình.
    await prisma.lesson.deleteMany({ where: { topicId: topic.id } });
    await prisma.topic.delete({ where: { id: topic.id } });
  }

  return staleTopics.length;
}

async function main() {
  const passwordHash = await bcrypt.hash("demo1234", 10);
  await prisma.user.upsert({
    where: { email: "demo@eng-growth.app" },
    update: {},
    create: {
      email: "demo@eng-growth.app",
      passwordHash,
      name: "Demo User",
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@eng-growth.app";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin1234";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      passwordHash: adminPasswordHash,
      name: "Admin",
      role: "ADMIN",
    },
  });

  let grammarCount = 0;
  let grammarQuestions = 0;
  let vocabCount = 0;
  let vocabQuestions = 0;
  let wordCount = 0;
  let readingUnitCount = 0;
  let readingQuestionCount = 0;
  let readingWordCount = 0;
  let removedTopics = 0;
  let seededLevels = 0;

  // Cho phép seed từng phần để tránh giữ một kết nối quá lâu với pooler.
  const onlyLevel = process.env.SEED_LEVEL?.toUpperCase();
  const vocabFrom = Math.max(1, Number(process.env.SEED_VOCAB_FROM ?? 1) || 1);
  const vocabTo =
    Number(process.env.SEED_VOCAB_TO ?? Number.MAX_SAFE_INTEGER) || Number.MAX_SAFE_INTEGER;
  const skipGrammar = process.env.SEED_SKIP_GRAMMAR === "1";
  const skipVocab = process.env.SEED_SKIP_VOCAB === "1";
  const skipReading = process.env.SEED_SKIP_READING === "1";
  const skipCleanup = process.env.SEED_SKIP_CLEANUP === "1";

  for (const [levelIndex, levelData] of CURRICULUM.entries()) {
    if (onlyLevel && levelData.code !== onlyLevel) continue;
    seededLevels += 1;

    const level = await prisma.level.upsert({
      where: { code: levelData.code },
      update: {
        name: levelData.name,
        tagline: levelData.tagline,
        description: levelData.description,
        order: levelIndex,
      },
      create: {
        code: levelData.code,
        name: levelData.name,
        tagline: levelData.tagline,
        description: levelData.description,
        order: levelIndex,
      },
    });

    if (!skipGrammar) {
      for (const [i, lessonData] of levelData.grammar.entries()) {
        const result = await seedGrammarLesson(level.id, i + 1, lessonData);
        grammarCount += 1;
        grammarQuestions += result.questions;
      }
    }

    for (const [i, topicData] of levelData.vocab.entries()) {
      if (skipVocab) break;

      const topicNumber = i + 1;
      if (topicNumber < vocabFrom || topicNumber > vocabTo) continue;

      const result = await seedVocabTopic(level.id, topicNumber, topicData);
      vocabCount += 1;
      vocabQuestions += result.questions;
      wordCount += result.words;
    }

    if (!skipReading && levelData.code === "A1") {
      for (const unitData of A1_READING_UNITS) {
        const result = await seedReadingUnit(level.id, unitData);
        readingUnitCount += 1;
        readingQuestionCount += result.questions;
        readingWordCount += result.words;
      }
    }

    if (!skipCleanup && levelData.code === "A1") {
      // Chỉ dọn các topic A1 cũ đã được thay thế, không đụng vào topic
      // người dùng có thể đã tạo thêm trong admin.
      removedTopics += await cleanupTopics(level.id, ["gia-dinh-nha-cua"]);
    }
  }

  console.log(`Seeded ${seededLevels} CEFR level(s)`);
  console.log(`Grammar: ${grammarCount} lessons / ${grammarQuestions} questions`);
  console.log(`Vocabulary: ${vocabCount} topics & lessons / ${wordCount} words / ${vocabQuestions} questions`);
  console.log(
    `Reading: ${readingUnitCount} units / ${readingWordCount} words / ${readingQuestionCount} questions`,
  );
  if (removedTopics > 0) {
    console.log(`Removed ${removedTopics} stale A1 topic(s)`);
  }
  console.log("Demo user: demo@eng-growth.app / demo1234");
  console.log(`Admin user: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
