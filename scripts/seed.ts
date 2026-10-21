import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { buildVocabularyQuestions } from "../src/lib/vocabulary-quiz";
import { CURRICULUM, type SeedQuestion, type SeedWord } from "./curriculum-data";

function vocabularyQuestions(words: SeedWord[]): SeedQuestion[] {
  return buildVocabularyQuestions(words);
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

  for (const [i, section] of data.sections.entries()) {
    await prisma.lessonSection.create({
      data: {
        lessonId: lesson.id,
        title: section.title,
        body: section.body,
        remember: section.remember,
        order: i,
      },
    });
  }

  for (const [i, question] of data.questions.entries()) {
    await prisma.question.create({
      data: {
        lessonId: lesson.id,
        prompt: question.prompt,
        explanation: question.explanation,
        order: i,
        choices: {
          create: question.choices.map((choice, choiceIndex) => ({
            label: choice.label,
            isCorrect: Boolean(choice.correct),
            order: choiceIndex,
          })),
        },
      },
    });
  }

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

  for (const [i, section] of data.lesson.sections.entries()) {
    await prisma.lessonSection.create({
      data: {
        lessonId: lesson.id,
        title: section.title,
        body: section.body,
        remember: section.remember,
        order: i,
      },
    });
  }

  for (const [i, word] of data.lesson.words.entries()) {
    await prisma.vocabEntry.create({
      data: {
        lessonId: lesson.id,
        word: word.word,
        ipa: word.ipa,
        wordForm: word.wordForm,
        meaningVi: word.meaningVi,
        meaningEn: word.meaningEn,
        example: word.example,
        order: i,
      },
    });
  }

  const questions = vocabularyQuestions(data.lesson.words);
  for (const [i, question] of questions.entries()) {
    await prisma.question.create({
      data: {
        lessonId: lesson.id,
        prompt: question.prompt,
        explanation: question.explanation,
        order: i,
        choices: {
          create: question.choices.map((choice, choiceIndex) => ({
            label: choice.label,
            isCorrect: Boolean(choice.correct),
            order: choiceIndex,
          })),
        },
      },
    });
  }

  return { topic, lesson, words: data.lesson.words.length, questions: questions.length };
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

  for (const [levelIndex, levelData] of CURRICULUM.entries()) {
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

    for (const [i, lessonData] of levelData.grammar.entries()) {
      const result = await seedGrammarLesson(level.id, i + 1, lessonData);
      grammarCount += 1;
      grammarQuestions += result.questions;
    }

    for (const [i, topicData] of levelData.vocab.entries()) {
      const result = await seedVocabTopic(level.id, i + 1, topicData);
      vocabCount += 1;
      vocabQuestions += result.questions;
      wordCount += result.words;
    }
  }

  console.log(`Seeded ${CURRICULUM.length} CEFR levels`);
  console.log(`Grammar: ${grammarCount} lessons / ${grammarQuestions} questions`);
  console.log(`Vocabulary: ${vocabCount} topics & lessons / ${wordCount} words / ${vocabQuestions} questions`);
  console.log("Demo user: demo@eng-growth.app / demo1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
