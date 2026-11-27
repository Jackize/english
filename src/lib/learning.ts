import { cache } from "react";
import { getPlantStage, toLevelCode, type LevelCode } from "./curriculum";
import { endOfToday, startOfToday } from "./dates";
import { prisma } from "./prisma";
import { liveStreak } from "./streak";

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
  _count: { questions: number; vocab: number };
};

function toLessonCard(
  lesson: LessonRecord,
  progress:
    | { completed: boolean; bestScore: number; quizTotal: number }
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
    questionCount: lesson._count.questions,
    wordCount: lesson._count.vocab,
    completed: progress?.completed ?? false,
    bestScore: progress?.bestScore ?? 0,
    quizTotal: progress?.quizTotal ?? lesson._count.questions,
  };
}

// ---------------------------------------------------------------------------
// Curriculum (level/topic/lesson) là dữ liệu gần như tĩnh — cache trong RAM để
// khỏi round-trip DB (~250ms/lần query tới Supabase) ở mỗi request.
// - TTL 60s để thay đổi seed/migrate vẫn tự cập nhật.
// - Lưu promise (không phải kết quả) để khi cache hết hạn, các request đồng
//   thời dùng chung một query thay vì cùng bắn query (cache stampede).
// - Trang admin gọi invalidateCurriculumCache() sau khi sửa bài, nên thay đổi
//   hiện ra ngay trên instance đó. Nhiều instance thì vẫn trễ tối đa 60s.
// ---------------------------------------------------------------------------
const CURRICULUM_TTL_MS = 60_000;

async function fetchCurriculumLevels() {
  return prisma.level.findMany({
    orderBy: { order: "asc" },
    include: {
      topics: { orderBy: { order: "asc" } },
      lessons: {
        orderBy: [{ track: "asc" }, { order: "asc" }],
        include: {
          _count: { select: { questions: true, vocab: true } },
        },
      },
    },
  });
}

type CurriculumLevels = Awaited<ReturnType<typeof fetchCurriculumLevels>>;

let curriculumCache: { promise: Promise<CurriculumLevels>; at: number } | null = null;

function getCurriculumLevels(): Promise<CurriculumLevels> {
  if (curriculumCache && Date.now() - curriculumCache.at < CURRICULUM_TTL_MS) {
    return curriculumCache.promise;
  }
  const entry = { promise: fetchCurriculumLevels(), at: Date.now() };
  curriculumCache = entry;
  // Query lỗi thì bỏ cache để request sau thử lại, không giữ lỗi suốt 60s.
  entry.promise.catch(() => {
    if (curriculumCache === entry) curriculumCache = null;
  });
  return entry.promise;
}

export function invalidateCurriculumCache() {
  curriculumCache = null;
}

/**
 * Trạng thái học của một user trong request hiện tại: tiến độ từng bài, thông
 * tin user và số mục ôn đến hạn. Dùng chung cho trang, header và nút "Tiếp tục
 * học" (React cache) nên mỗi request chỉ query DB một lần, các query chạy song
 * song.
 */
export const getUserLearningState = cache(async (userId: string) => {
  const dueBefore = endOfToday();
  const [progressRows, user, reviewCountRows] = await Promise.all([
    prisma.lessonProgress.findMany({
      where: { userId },
      select: {
        lessonId: true,
        completed: true,
        completedAt: true,
        bestScore: true,
        quizTotal: true,
        updatedAt: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        xp: true,
        streak: true,
        lastStudyDate: true,
        dailyGoalLessons: true,
        dailyGoalMinutes: true,
        onboardedAt: true,
        targetLevel: true,
        placementLevel: true,
      },
    }),
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT (
        (SELECT COUNT(*) FROM "ReviewItem"
          WHERE "userId" = ${userId}
            AND "resolved" = false
            AND "dueAt" < ${dueBefore})
        +
        (SELECT COUNT(*) FROM "VocabReviewItem"
          WHERE "userId" = ${userId}
            AND "dueAt" < ${dueBefore})
      )::bigint AS count
    `,
  ]);

  return {
    progressRows,
    user,
    reviewCount: Number(reviewCountRows[0]?.count ?? 0),
  };
});

export const getOverview = cache(async (userId?: string, levelCode?: LevelCode): Promise<Overview> => {
  // Curriculum (cache RAM) và trạng thái user được lấy song song.
  const [levels, state] = await Promise.all([
    getCurriculumLevels(),
    userId ? getUserLearningState(userId) : Promise.resolve(null),
  ]);

  const progressRows = state?.progressRows ?? [];
  const user = state?.user ?? null;
  const reviewCount = state?.reviewCount ?? 0;

  const minutesByLesson = new Map<string, number>();
  for (const level of levels) {
    for (const lesson of level.lessons) minutesByLesson.set(lesson.id, lesson.estimatedMinutes);
  }

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

    // Gom bài từ vựng theo topic trong một lượt (giữ nguyên thứ tự bài).
    const lessonTopicId = new Map(level.lessons.map((row) => [row.id, row.topicId]));
    const lessonsByTopic = new Map<string | null, LessonCard[]>();
    for (const lesson of vocabularyLessons) {
      const topicId = lessonTopicId.get(lesson.id) || null;
      const bucket = lessonsByTopic.get(topicId);
      if (bucket) bucket.push(lesson);
      else lessonsByTopic.set(topicId, [lesson]);
    }

    const topics: TopicGroup[] = level.topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      slug: topic.slug,
      icon: topic.icon,
      description: topic.description,
      lessons: lessonsByTopic.get(topic.id) ?? [],
    }));

    const topiclessLessons = lessonsByTopic.get(null);
    const topicless: TopicGroup | null = topiclessLessons
      ? {
          id: `${level.id}-general`,
          name: "Bài học khác",
          slug: "khac",
          icon: "menu_book",
          description: null,
          lessons: topiclessLessons,
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
    (sum, row) => sum + (minutesByLesson.get(row.lessonId) ?? 0),
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
    streak: liveStreak(user?.streak ?? 0, user?.lastStudyDate),
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
  const state = await getUserLearningState(userId);
  return state.user ? { streak: liveStreak(state.user.streak, state.user.lastStudyDate), xp: state.user.xp } : null;
});

export const getContinueLesson = cache(async (userId?: string) => {
  if (!userId) return null;

  // Không query thêm: dùng lại tiến độ đã lấy trong getUserLearningState.
  const [levels, state] = await Promise.all([
    getCurriculumLevels(),
    getUserLearningState(userId),
  ]);

  const lessonIndex = new Map<
    string,
    { lesson: CurriculumLevels[number]["lessons"][number]; level: CurriculumLevels[number] }
  >();
  for (const level of levels) {
    for (const lesson of level.lessons) lessonIndex.set(lesson.id, { lesson, level });
  }

  const toContinue = (entry: NonNullable<ReturnType<typeof lessonIndex.get>>) => ({
    id: entry.lesson.id,
    title: entry.lesson.title,
    track: entry.lesson.track === "vocabulary" ? ("vocabulary" as const) : ("grammar" as const),
    levelCode: entry.level.code as LevelCode,
    levelName: entry.level.name,
  });

  // Ưu tiên bài đang học dở gần nhất, thay vì luôn quay về bài đầu tiên chưa xong.
  const inProgress = state.progressRows
    .filter((row) => !row.completed && row.bestScore > 0)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .map((row) => lessonIndex.get(row.lessonId))
    .find(Boolean);
  if (inProgress) return toContinue(inProgress);

  const completed = new Set(
    state.progressRows.filter((row) => row.completed).map((row) => row.lessonId),
  );

  for (const level of levels) {
    for (const lesson of level.lessons) {
      if (!completed.has(lesson.id)) return toContinue({ lesson, level });
    }
  }

  return null;
});

export async function getLessonForLearner(lessonId: string, userId?: string) {
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
      : null,
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
  const [topic, progressRows] = await Promise.all([
    prisma.topic.findFirst({
      where: { slug, level: { code: levelCode } },
      include: {
        level: true,
        lessons: {
          orderBy: { order: "asc" },
          include: {
            _count: { select: { questions: true, vocab: true } },
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
            bestScore: true,
            quizTotal: true,
          },
        })
      : [],
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

export interface HomeShowcase {
  question: {
    lessonTitle: string;
    prompt: string;
    explanation: string | null;
    choices: { id: string; label: string; isCorrect: boolean }[];
  } | null;
  words: string[];
}

// Nội dung thật cho trang chủ của khách: một câu ngữ pháp A1 để thử ngay trên
// trang, và vài từ A1 để minh hoạ chuyện "học rồi quên". Ưu tiên câu có đáp án là
// cả một câu (dễ sai vì dịch từ tiếng Việt), không có thì lấy câu đầu tiên.
export const getHomeShowcase = cache(async (): Promise<HomeShowcase> => {
  const [lesson, vocab] = await Promise.all([
    prisma.lesson.findFirst({
      where: { track: "grammar", level: { code: "A1" }, questions: { some: {} } },
      orderBy: { order: "asc" },
      select: {
        title: true,
        questions: {
          orderBy: { order: "asc" },
          select: {
            prompt: true,
            explanation: true,
            choices: {
              orderBy: { order: "asc" },
              select: { id: true, label: true, isCorrect: true },
            },
          },
        },
      },
    }),
    prisma.vocabEntry.findMany({
      where: { lesson: { track: "vocabulary", level: { code: "A1" } } },
      orderBy: [{ lesson: { order: "asc" } }, { order: "asc" }],
      take: 5,
      select: { word: true },
    }),
  ]);

  const usable = (lesson?.questions ?? []).filter(
    (question) =>
      question.choices.length >= 2 &&
      question.choices.filter((choice) => choice.isCorrect).length === 1,
  );
  const picked =
    usable.find((question) => question.choices.every((choice) => choice.label.length > 12)) ??
    usable[0] ??
    null;

  return {
    question:
      lesson && picked
        ? {
            lessonTitle: lesson.title,
            prompt: picked.prompt,
            explanation: picked.explanation,
            choices: picked.choices,
          }
        : null,
    words: vocab.map((entry) => entry.word),
  };
});
