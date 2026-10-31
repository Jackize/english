import { prisma } from "./prisma";
import { cache } from "react";
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

export interface DailyGoalProgress {
  targetLessons: number;
  targetMinutes: number;
  completedLessons: number;
  completedMinutes: number;
  percent: number;
  done: boolean;
}

export interface Overview {
  levels: LevelOverview[];
  totalLessons: number;
  completedLessons: number;
  percent: number;
  xp: number;
  streak: number;
  reviewCount: number;
  dailyGoal: DailyGoalProgress;
  onboarding: {
    completed: boolean;
    targetLevel: LevelCode | null;
    placementLevel: LevelCode | null;
  };
  counts: {
    grammar: { total: number; completed: number };
    vocabulary: { total: number; completed: number; topics: number };
  };
  nextLesson: (LessonCard & { levelCode: LevelCode; levelName: string; topicName: string | null }) | null;
  plant: ReturnType<typeof getPlantStage> & { remainingXp: number };
}

function startOfToday() {
  const value = new Date();
  value.setHours(0, 0, 0, 0);
  return value;
}

function endOfToday() {
  const value = startOfToday();
  value.setDate(value.getDate() + 1);
  return value;
}

const LEVEL_CODES = new Set<LevelCode>(["A1", "A2", "B1", "B2", "C1", "C2"]);

function toLevelCode(value: string | null | undefined): LevelCode | null {
  return value && LEVEL_CODES.has(value as LevelCode) ? (value as LevelCode) : null;
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

// ---------------------------------------------------------------------------
// Curriculum (level/topic/lesson) là dữ liệu tĩnh — cache trong RAM để khỏi
// round-trip DB (~250ms/lần query tới Supabase) ở mỗi request.
// TTL 60s để thay đổi seed/migrate vẫn tự cập nhật.
// ---------------------------------------------------------------------------
async function fetchCurriculumLevels() {
  return prisma.level.findMany({
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
}

type CurriculumLevels = Awaited<ReturnType<typeof fetchCurriculumLevels>>;

let curriculumCache: { data: CurriculumLevels; at: number } | null = null;

async function getCurriculumLevels() {
  if (curriculumCache && Date.now() - curriculumCache.at < 60_000) {
    return curriculumCache.data;
  }
  const data = await fetchCurriculumLevels();
  curriculumCache = { data, at: Date.now() };
  return data;
}

export const getOverview = cache(async (userId?: string, levelCode?: LevelCode): Promise<Overview> => {
  // Query user-dependent chạy SONG SONG (trước đây là 4 query tuần tự
  // ≈ 4 × 250ms round-trip = ~1s chỉ để chờ DB).
  const [levels, progressRows, user, reviewCount] = await Promise.all([
    getCurriculumLevels(),
    userId
      ? prisma.lessonProgress.findMany({
          where: { userId },
          select: {
            lessonId: true,
            completed: true,
            completedAt: true,
            theoryDone: true,
            bestScore: true,
            quizTotal: true,
            lesson: { select: { estimatedMinutes: true } },
          },
        })
      : Promise.resolve([]),
    userId
      ? prisma.user.findUnique({
          where: { id: userId },
          select: {
            xp: true,
            streak: true,
            dailyGoalLessons: true,
            dailyGoalMinutes: true,
            onboardedAt: true,
            targetLevel: true,
            placementLevel: true,
          },
        })
      : Promise.resolve(null),
    userId
      ? prisma.reviewItem.count({
          where: { userId, resolved: false, dueAt: { lt: endOfToday() } },
        })
      : Promise.resolve(0),
  ]);

  const progressByLesson = new Map(progressRows.map((row) => [row.lessonId, row]));

  let totalLessons = 0;
  let completedLessons = 0;
  let grammarTotal = 0;
  let grammarCompleted = 0;
  let vocabularyTotal = 0;
  let vocabularyCompleted = 0;
  let topicCount = 0;
  let totalXp = 0;

  const levelOverviews: LevelOverview[] = levels.map((level) => {
    const grammarLessons: LessonCard[] = [];
    const vocabularyLessons: LessonCard[] = [];

    for (const lesson of level.lessons) {
      const card = toLessonCard(lesson, progressByLesson.get(lesson.id));
      if (card.track === "grammar") grammarLessons.push(card);
      else vocabularyLessons.push(card);
    }

    // Map lessonId -> topicId để tránh O(n²) find trong level.lessons.
    const lessonTopicId = new Map(level.lessons.map((row) => [row.id, row.topicId]));

    const topics: TopicGroup[] = level.topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      slug: topic.slug,
      icon: topic.icon,
      description: topic.description,
      lessons: vocabularyLessons.filter(
        (lesson) => lessonTopicId.get(lesson.id) === topic.id,
      ),
    }));

    const hasTopicless = vocabularyLessons.some(
      (lesson) => !lessonTopicId.get(lesson.id),
    );
    const topicless: TopicGroup | null = hasTopicless
      ? {
          id: `${level.id}-general`,
          name: "Bài học khác",
          slug: "khac",
          icon: "menu_book",
          description: null,
          lessons: vocabularyLessons.filter(
            (lesson) => !lessonTopicId.get(lesson.id),
          ),
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
    totalXp += [...grammarLessons, ...vocabularyLessons].reduce(
      (sum, lesson) => sum + lesson.xp,
      0,
    );

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

  // Tìm bài chưa hoàn thành đầu tiên theo thứ tự level/track, tránh build mảng lớn.
  let nextPair: { lesson: LessonCard; level: LevelOverview } | null = null;
  for (const level of levelOverviews) {
    for (const lesson of [...level.grammar.lessons, ...level.vocabulary.lessons]) {
      if (!lesson.completed) {
        nextPair = { lesson, level };
        break;
      }
    }
    if (nextPair) break;
  }

  const nextLesson = nextPair
    ? {
        ...nextPair.lesson,
        levelCode: nextPair.level.code,
        levelName: nextPair.level.name,
        topicName: (() => {
          const topic = nextPair.level.vocabulary.topics.find((group) =>
            group.lessons.some((lesson) => lesson.id === nextPair.lesson.id),
          );
          return topic?.name ?? null;
        })(),
      }
    : null;

  const percent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
  const plant = getPlantStage(percent);
  const remainingXp = plant.next
    ? Math.max(0, Math.ceil((plant.next.threshold / 100) * totalXp) - (user?.xp ?? 0))
    : 0;

  const today = startOfToday();
  const todayRows = progressRows.filter(
    (row) => row.completed && row.completedAt && row.completedAt >= today,
  );
  const completedToday = todayRows.length;
  const completedMinutesToday = todayRows.reduce(
    (sum, row) => sum + row.lesson.estimatedMinutes,
    0,
  );
  const targetLessons = Math.max(1, user?.dailyGoalLessons ?? 2);
  const targetMinutes = Math.max(1, user?.dailyGoalMinutes ?? 20);
  const goalPercent = Math.min(
    100,
    Math.round(
      Math.max(completedToday / targetLessons, completedMinutesToday / targetMinutes) * 100,
    ),
  );

  const visibleLevels = levelCode
    ? levelOverviews.filter((level) => level.code === levelCode)
    : levelOverviews;

  return {
    levels: visibleLevels,
    totalLessons,
    completedLessons,
    percent,
    xp: user?.xp ?? 0,
    streak: user?.streak ?? 0,
    reviewCount,
    dailyGoal: {
      targetLessons,
      targetMinutes,
      completedLessons: completedToday,
      completedMinutes: completedMinutesToday,
      percent: goalPercent,
      done: goalPercent >= 100,
    },
    onboarding: {
      completed: Boolean(user?.onboardedAt),
      targetLevel: toLevelCode(user?.targetLevel),
      placementLevel: toLevelCode(user?.placementLevel),
    },
    counts: {
      grammar: { total: grammarTotal, completed: grammarCompleted },
      vocabulary: { total: vocabularyTotal, completed: vocabularyCompleted, topics: topicCount },
    },
    nextLesson,
    plant: { ...plant, remainingXp },
  };
});

export const getHeaderStats = cache(async (userId?: string) => {
  if (!userId) return null;
  return prisma.user.findUnique({
    where: { id: userId },
    select: { streak: true, xp: true },
  });
});

export const getContinueLesson = cache(async (userId?: string) => {
  if (!userId) return null;

  const [levels, completedRows, inProgress] = await Promise.all([
    getCurriculumLevels(),
    prisma.lessonProgress.findMany({
      where: { userId, completed: true },
      select: { lessonId: true },
    }),
    // Ưu tiên bài đang học dở gần nhất, thay vì luôn quay về bài đầu tiên chưa xong.
    prisma.lessonProgress.findFirst({
      where: {
        userId,
        completed: false,
        OR: [{ theoryDone: true }, { bestScore: { gt: 0 } }],
      },
      orderBy: { updatedAt: "desc" },
      include: { lesson: { include: { level: true } } },
    }),
  ]);

  if (inProgress) {
    return {
      id: inProgress.lesson.id,
      title: inProgress.lesson.title,
      track:
        inProgress.lesson.track === "vocabulary"
          ? ("vocabulary" as const)
          : ("grammar" as const),
      levelCode: inProgress.lesson.level.code as LevelCode,
      levelName: inProgress.lesson.level.name,
    };
  }

  const completed = new Set(completedRows.map((row) => row.lessonId));

  for (const level of levels) {
    for (const lesson of level.lessons) {
      if (completed.has(lesson.id)) continue;

      return {
        id: lesson.id,
        title: lesson.title,
        track: lesson.track === "vocabulary" ? ("vocabulary" as const) : ("grammar" as const),
        levelCode: level.code as LevelCode,
        levelName: level.name,
      };
    }
  }

  return null;
});

export async function getLessonForLearner(lessonId: string, userId?: string) {
  // Song song: lesson (query lớn, nhiều include) + progress (query nhỏ)
  const [lesson, progress] = await Promise.all([
    prisma.lesson.findUnique({
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
    }),
    userId
      ? prisma.lessonProgress.findUnique({
          where: { userId_lessonId: { userId, lessonId } },
        })
      : Promise.resolve(null),
  ]);

  if (!lesson) return null;

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
    where: { userId, resolved: false, dueAt: { lt: endOfToday() } },
    orderBy: [{ dueAt: "asc" }, { lastWrongAt: "desc" }],
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
    dueAt: item.dueAt.toISOString(),
    intervalDays: item.intervalDays,
    correctStreak: item.correctStreak,
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
  // Song song: topic + progress (progress tra theo relation topic nên không
  // cần chờ danh sách lessonId — trước đây là 2 query tuần tự).
  const [topic, progressRows] = await Promise.all([
    prisma.topic.findFirst({
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
    }),
    userId
      ? prisma.lessonProgress.findMany({
          where: {
            userId,
            lesson: { topic: { slug, level: { code: levelCode } } },
          },
          select: {
            lessonId: true,
            completed: true,
            theoryDone: true,
            bestScore: true,
            quizTotal: true,
          },
        })
      : Promise.resolve([]),
  ]);

  if (!topic) return null;

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
