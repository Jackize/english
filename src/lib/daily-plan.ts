import type { LevelCode } from "./curriculum";
import type { LessonCard, LevelOverview, Overview, TopicGroup } from "./learning";

export type DailyTaskKind = "grammar" | "vocabulary";

export interface DailyTask {
  kind: DailyTaskKind;
  lesson: LessonCard;
  topicName: string | null;
}

export interface DailyDay {
  day: number;
  tasks: DailyTask[];
  completed: boolean;
  started: boolean;
  estimatedMinutes: number;
  questionCount: number;
  wordCount: number;
  xp: number;
}

export interface DailyPlan {
  levelId: string;
  levelCode: LevelCode;
  levelName: string;
  levelTagline: string;
  days: DailyDay[];
  totalDays: number;
  completedDays: number;
  percent: number;
  currentDay: DailyDay | null;
  nextTask: DailyTask | null;
  totalLessons: number;
  completedLessons: number;
  grammarCount: number;
  vocabularyCount: number;
  estimatedMinutes: number;
}

/**
 * Chia một cấp độ thành các buổi học ngắn: mỗi ngày một bài ngữ pháp và một
 * chủ đề từ vựng, ghép theo thứ tự. Nếu một track ngắn hơn, ngày cuối chỉ còn
 * bài của track còn lại.
 */
export function buildDailyPlan(level: LevelOverview): DailyPlan {
  const topicByLessonId = new Map<string, TopicGroup>();
  for (const topic of level.vocabulary.topics) {
    for (const lesson of topic.lessons) {
      topicByLessonId.set(lesson.id, topic);
    }
  }

  const grammarLessons = level.grammar.lessons;
  const vocabularyLessons = level.vocabulary.lessons;
  const dayCount = Math.max(grammarLessons.length, vocabularyLessons.length);

  const days: DailyDay[] = Array.from({ length: dayCount }, (_, index) => {
    const tasks: DailyTask[] = [];
    const grammarLesson = grammarLessons[index];

    if (grammarLesson) {
      tasks.push({
        kind: "grammar",
        lesson: grammarLesson,
        topicName: null,
      });
    }

    const vocabularyLesson = vocabularyLessons[index];
    if (vocabularyLesson) {
      const topic = topicByLessonId.get(vocabularyLesson.id);
      tasks.push({
        kind: "vocabulary",
        lesson: vocabularyLesson,
        topicName: topic?.name ?? null,
      });
    }

    return {
      day: index + 1,
      tasks,
      completed: tasks.length > 0 && tasks.every((task) => task.lesson.completed),
      started: tasks.some(
        (task) => task.lesson.completed || task.lesson.bestScore > 0,
      ),
      estimatedMinutes: tasks.reduce((sum, task) => sum + task.lesson.estimatedMinutes, 0),
      questionCount: tasks.reduce((sum, task) => sum + task.lesson.questionCount, 0),
      wordCount: tasks.reduce((sum, task) => sum + task.lesson.wordCount, 0),
      xp: tasks.reduce((sum, task) => sum + task.lesson.xp, 0),
    };
  });

  const completedDays = days.filter((day) => day.completed).length;
  const currentDay = days.find((day) => !day.completed) ?? null;
  const nextTask = currentDay?.tasks.find((task) => !task.lesson.completed) ?? null;
  const totalLessons = grammarLessons.length + vocabularyLessons.length;
  const completedLessons =
    grammarLessons.filter((lesson) => lesson.completed).length +
    vocabularyLessons.filter((lesson) => lesson.completed).length;

  return {
    levelId: level.id,
    levelCode: level.code,
    levelName: level.name,
    levelTagline: level.tagline,
    days,
    totalDays: days.length,
    completedDays,
    percent: days.length > 0 ? Math.round((completedDays / days.length) * 100) : 0,
    currentDay,
    nextTask,
    totalLessons,
    completedLessons,
    grammarCount: grammarLessons.length,
    vocabularyCount: vocabularyLessons.length,
    estimatedMinutes: days.reduce((sum, day) => sum + day.estimatedMinutes, 0),
  };
}

/**
 * Lấy kế hoạch của cấp độ được chọn. Nếu không truyền cấp độ, dùng cấp độ
 * đầu tiên còn bài chưa hoàn thành để "mục tiêu hôm nay" luôn có ý nghĩa.
 */
export function getDailyPlan(
  overview: Overview,
  levelCode?: LevelCode | null,
): DailyPlan | null {
  if (levelCode) {
    const selected = overview.levels.find((level) => level.code === levelCode);
    if (selected) return buildDailyPlan(selected);
  }

  const levels = overview.levels.filter((level) => level.total > 0);
  if (levels.length === 0) return null;

  const level = levels.find((row) => row.completed < row.total) ?? levels[levels.length - 1];
  return buildDailyPlan(level);
}
