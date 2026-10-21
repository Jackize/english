import { prisma } from "./prisma";
import { getPlantStage, type LevelCode } from "./curriculum";

export interface LessonCard {
  id: string;
  title: string;
  summary: string | null;
  order: number;
  xp: number;
  estimatedMinutes: number;
  track: "grammar" | "vocabulary";
  questionCount: number;
  wordCount: number;
  completed: boolean;
  theoryDone: boolean;
  bestScore: number;
  quizTotal: number;
}

export interface TopicGroup {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  lessons: LessonCard[];
}

export interface LevelOverview {
  id: string;
  code: LevelCode;
  name: string;
  tagline: string;
  description: string;
  order: number;
  grammar: { total: number; completed: number; lessons: LessonCard[] };
  vocabulary: {
    total: number;
    completed: number;
    lessons: LessonCard[];
    topics: TopicGroup[];
  };
  total: number;
  completed: number;
}

export interface Overview {
  levels: LevelOverview[];
  totalLessons: number;
  completedLessons: number;
  percent: number;
  xp: number;
  streak: number;
  reviewCount: number;
  counts: {
    grammar: { total: number; completed: number };
    vocabulary: { total: number; completed: number; topics: number };
  };
  nextLesson: (LessonCard & { levelCode: LevelCode; levelName: string; topicName: string | null }) | null;
  plant: ReturnType<typeof getPlantStage> & { remainingXp: number };
}

type LessonRecord = {
  id: string;
  title: string;
  summary: string | null;
  order: number;
  xp: number;
  estimatedMinutes: number;
  track: string;
  topicId: string | null;
  levelId: string;
  questions: { id: string }[];
  vocab: { id: string }[];
};

function toLessonCard(
  lesson: LessonRecord,
  progress:
    | { completed: boolean; theoryDone: boolean; bestScore: number; quizTotal: number }
    | undefined,
): LessonCard {
  return {
    id: lesson.id,
    title: lesson.title,
    summary: lesson.summary,
    order: lesson.order,
    xp: lesson.xp,
    estimatedMinutes: lesson.estimatedMinutes,
    track: lesson.track === "vocabulary" ? "vocabulary" : "grammar",
    questionCount: lesson.questions.length,
    wordCount: lesson.vocab.length,
    completed: progress?.completed ?? false,
    theoryDone: progress?.theoryDone ?? false,
    bestScore: progress?.bestScore ?? 0,
    quizTotal: progress?.quizTotal ?? lesson.questions.length,
  };
}

export async function getOverview(userId?: string): Promise<Overview> {
  const levels = await prisma.level.findMany({
    orderBy: { order: "asc" },
    include: {
      topics: { orderBy: { order: "asc" } },
      lessons: {
        orderBy: [{ track: "asc" }, { order: "asc" }],
        include: {
          questions: { select: { id: true } },
          vocab: { select: { id: true } },
        },
      },
    },
  });

  const progressRows = userId
    ? await prisma.lessonProgress.findMany({
        where: { userId },
        select: {
          lessonId: true,
          completed: true,
          theoryDone: true,
          bestScore: true,
          quizTotal: true,
        },
      })
    : [];

  const progressByLesson = new Map(progressRows.map((row) => [row.lessonId, row]));

  let totalLessons = 0;
  let completedLessons = 0;
  let grammarTotal = 0;
  let grammarCompleted = 0;
  let vocabularyTotal = 0;
  let vocabularyCompleted = 0;
  let topicCount = 0;

  const levelOverviews: LevelOverview[] = levels.map((level) => {
    const grammarLessons: LessonCard[] = [];
    const vocabularyLessons: LessonCard[] = [];

    for (const lesson of level.lessons) {
      const card = toLessonCard(lesson, progressByLesson.get(lesson.id));
      if (card.track === "grammar") grammarLessons.push(card);
      else vocabularyLessons.push(card);
    }

    const topics: TopicGroup[] = level.topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      slug: topic.slug,
      icon: topic.icon,
      description: topic.description,
      lessons: vocabularyLessons.filter((lesson) => {
        const original = level.lessons.find((row) => row.id === lesson.id);
        return original?.topicId === topic.id;
      }),
    }));

    const topicless: TopicGroup | null =
      vocabularyLessons.some((lesson) => {
        const original = level.lessons.find((row) => row.id === lesson.id);
        return !original?.topicId;
      })
        ? {
            id: `${level.id}-general`,
            name: "Bài học khác",
            slug: "khac",
            icon: "menu_book",
            description: null,
            lessons: vocabularyLessons.filter((lesson) => {
              const original = level.lessons.find((row) => row.id === lesson.id);
              return !original?.topicId;
            }),
          }
        : null;

    const allTopics = topicless ? [...topics, topicless] : topics;
    const levelGrammarCompleted = grammarLessons.filter((lesson) => lesson.completed).length;
    const levelVocabCompleted = vocabularyLessons.filter((lesson) => lesson.completed).length;

    totalLessons += grammarLessons.length + vocabularyLessons.length;
    completedLessons += levelGrammarCompleted + levelVocabCompleted;
    grammarTotal += grammarLessons.length;
    grammarCompleted += levelGrammarCompleted;
    vocabularyTotal += vocabularyLessons.length;
    vocabularyCompleted += levelVocabCompleted;
    topicCount += level.topics.length;

    return {
      id: level.id,
      code: level.code as LevelCode,
      name: level.name,
      tagline: level.tagline ?? "",
      description: level.description ?? "",
      order: level.order,
      grammar: {
        total: grammarLessons.length,
        completed: levelGrammarCompleted,
        lessons: grammarLessons,
      },
      vocabulary: {
        total: vocabularyLessons.length,
        completed: levelVocabCompleted,
        lessons: vocabularyLessons,
        topics: allTopics,
      },
      total: grammarLessons.length + vocabularyLessons.length,
      completed: levelGrammarCompleted + levelVocabCompleted,
    };
  });

  const allLessons = levelOverviews.flatMap((level) =>
    [...level.grammar.lessons, ...level.vocabulary.lessons].map((lesson) => ({
      ...lesson,
      levelCode: level.code,
      levelName: level.name,
    })),
  );

  const ordered = levelOverviews.flatMap((level) => [
    ...level.grammar.lessons.map((lesson) => ({ lesson, level })),
    ...level.vocabulary.lessons.map((lesson) => ({ lesson, level })),
  ]);

  const next = ordered.find(({ lesson }) => !lesson.completed) ?? null;
  const nextLesson = next
    ? {
        ...next.lesson,
        levelCode: next.level.code,
        levelName: next.level.name,
        topicName: (() => {
          const topic = next.level.vocabulary.topics.find((group) =>
            group.lessons.some((lesson) => lesson.id === next.lesson.id),
          );
          return topic?.name ?? null;
        })(),
      }
    : null;

  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: { xp: true, streak: true },
      })
    : null;

  const reviewCount = userId
    ? await prisma.reviewItem.count({ where: { userId, resolved: false } })
    : 0;

  const percent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
  const plant = getPlantStage(percent);
  const totalXp = allLessons.reduce((sum, lesson) => sum + lesson.xp, 0);
  const remainingXp = plant.next
    ? Math.max(0, Math.ceil((plant.next.threshold / 100) * totalXp) - (user?.xp ?? 0))
    : 0;

  return {
    levels: levelOverviews,
    totalLessons,
    completedLessons,
    percent,
    xp: user?.xp ?? 0,
    streak: user?.streak ?? 0,
    reviewCount,
    counts: {
      grammar: { total: grammarTotal, completed: grammarCompleted },
      vocabulary: { total: vocabularyTotal, completed: vocabularyCompleted, topics: topicCount },
    },
    nextLesson,
    plant: { ...plant, remainingXp },
  };
}

export async function getLessonForLearner(lessonId: string, userId?: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      level: true,
      topic: true,
      sections: { orderBy: { order: "asc" } },
      vocab: { orderBy: { order: "asc" } },
      questions: {
        orderBy: { order: "asc" },
        include: {
          choices: {
            orderBy: { order: "asc" },
            select: { id: true, label: true, order: true },
          },
        },
      },
    },
  });

  if (!lesson) return null;

  const progress = userId
    ? await prisma.lessonProgress.findUnique({
        where: { userId_lessonId: { userId, lessonId } },
      })
    : null;

  return {
    id: lesson.id,
    title: lesson.title,
    summary: lesson.summary,
    xp: lesson.xp,
    estimatedMinutes: lesson.estimatedMinutes,
    track: lesson.track as "grammar" | "vocabulary",
    level: {
      code: lesson.level.code as LevelCode,
      name: lesson.level.name,
      tagline: lesson.level.tagline ?? "",
    },
    topic: lesson.topic
      ? { id: lesson.topic.id, name: lesson.topic.name, slug: lesson.topic.slug, icon: lesson.topic.icon }
      : null,
    sections: lesson.sections.map((section) => ({
      id: section.id,
      title: section.title,
      body: section.body,
      remember: section.remember,
    })),
    vocab: lesson.vocab.map((entry) => ({
      id: entry.id,
      word: entry.word,
      ipa: entry.ipa,
      wordForm: entry.wordForm,
      meaningVi: entry.meaningVi,
      meaningEn: entry.meaningEn,
      example: entry.example,
    })),
    questions: lesson.questions.map((question) => ({
      id: question.id,
      prompt: question.prompt,
      order: question.order,
      choices: question.choices.map((choice) => ({
        id: choice.id,
        label: choice.label,
      })),
    })),
    progress: {
      completed: progress?.completed ?? false,
      theoryDone: progress?.theoryDone ?? false,
      bestScore: progress?.bestScore ?? 0,
      quizTotal: progress?.quizTotal ?? lesson.questions.length,
      attempts: progress?.attempts ?? 0,
    },
  };
}

export type LearnerLesson = NonNullable<Awaited<ReturnType<typeof getLessonForLearner>>>;

export async function getReviewItems(userId: string) {
  const items = await prisma.reviewItem.findMany({
    where: { userId, resolved: false },
    orderBy: { lastWrongAt: "desc" },
    include: {
      question: {
        include: {
          choices: { orderBy: { order: "asc" }, select: { id: true, label: true, order: true } },
          lesson: { include: { level: true } },
        },
      },
    },
    take: 40,
  });

  return items.map((item) => ({
    id: item.id,
    wrongCount: item.wrongCount,
    lastWrongAt: item.lastWrongAt.toISOString(),
    question: {
      id: item.question.id,
      prompt: item.question.prompt,
      choices: item.question.choices.map((choice) => ({ id: choice.id, label: choice.label })),
    },
    lesson: {
      id: item.question.lesson.id,
      title: item.question.lesson.title,
      track: item.question.lesson.track as "grammar" | "vocabulary",
      levelCode: item.question.lesson.level.code as LevelCode,
    },
  }));
}

export async function getAdminLevels() {
  return prisma.level.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { lessons: true, topics: true } },
      lessons: {
        orderBy: [{ track: "asc" }, { order: "asc" }],
        include: {
          topic: true,
          _count: { select: { questions: true, vocab: true } },
        },
      },
    },
  });
}

export async function getAdminLesson(lessonId: string) {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      level: true,
      topic: true,
      sections: { orderBy: { order: "asc" } },
      vocab: { orderBy: { order: "asc" } },
      questions: {
        orderBy: { order: "asc" },
        include: { choices: { orderBy: { order: "asc" } } },
      },
    },
  });
}

export async function getTopicDetail(levelCode: string, slug: string, userId?: string) {
  const topic = await prisma.topic.findFirst({
    where: { slug, level: { code: levelCode } },
    include: {
      level: true,
      lessons: {
        orderBy: { order: "asc" },
        include: {
          questions: { select: { id: true } },
          vocab: { select: { id: true } },
        },
      },
    },
  });

  if (!topic) return null;

  const progressRows = userId
    ? await prisma.lessonProgress.findMany({
        where: { userId, lessonId: { in: topic.lessons.map((lesson) => lesson.id) } },
        select: {
          lessonId: true,
          completed: true,
          theoryDone: true,
          bestScore: true,
          quizTotal: true,
        },
      })
    : [];

  const progressByLesson = new Map(progressRows.map((row) => [row.lessonId, row]));

  const lessons = topic.lessons.map((lesson) => toLessonCard(lesson, progressByLesson.get(lesson.id)));

  return {
    id: topic.id,
    name: topic.name,
    slug: topic.slug,
    icon: topic.icon,
    description: topic.description,
    level: {
      code: topic.level.code as LevelCode,
      name: topic.level.name,
      tagline: topic.level.tagline ?? "",
    },
    lessons,
    total: lessons.length,
    completed: lessons.filter((lesson) => lesson.completed).length,
    wordCount: lessons.reduce((sum, lesson) => sum + lesson.wordCount, 0),
  };
}

export async function getLevelsWithTopics() {
  return prisma.level.findMany({
    orderBy: { order: "asc" },
    include: { topics: { orderBy: { order: "asc" } } },
  });
}
