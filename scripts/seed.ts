import "dotenv/config";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { createPrismaClient } from "../src/lib/prisma";
import { buildVocabularyQuestions } from "../src/lib/vocabulary-quiz";
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

  let grammarCount = 0;
  let grammarQuestions = 0;
  let vocabCount = 0;
  let vocabQuestions = 0;
  let wordCount = 0;
  let removedTopics = 0;
  let seededLevels = 0;

  // Cho phép seed từng phần để tránh giữ một kết nối quá lâu với pooler.
  const onlyLevel = process.env.SEED_LEVEL?.toUpperCase();
  const vocabFrom = Math.max(1, Number(process.env.SEED_VOCAB_FROM ?? 1) || 1);
  const vocabTo =
    Number(process.env.SEED_VOCAB_TO ?? Number.MAX_SAFE_INTEGER) || Number.MAX_SAFE_INTEGER;
  const skipGrammar = process.env.SEED_SKIP_GRAMMAR === "1";
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
      const topicNumber = i + 1;
      if (topicNumber < vocabFrom || topicNumber > vocabTo) continue;

      const result = await seedVocabTopic(level.id, topicNumber, topicData);
      vocabCount += 1;
      vocabQuestions += result.questions;
      wordCount += result.words;
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
  if (removedTopics > 0) {
    console.log(`Removed ${removedTopics} stale A1 topic(s)`);
  }
  console.log("Demo user: demo@eng-growth.app / demo1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
