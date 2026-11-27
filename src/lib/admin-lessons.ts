import { z } from "zod";
import { BadRequestError, NotFoundError, isRecordNotFound, isUniqueViolation } from "./errors";
import { invalidateCurriculumCache } from "./learning";
import { prisma, TX_OPTIONS, type Db } from "./prisma";
import { slugify } from "./utils";
import { buildVocabularyQuestions } from "./vocabulary-quiz";

// ---------------------------------------------------------------------------
// Input schemas
// `id` is the database id of a row the editor loaded. Rows added in the editor
// carry a client-only key (or nothing), which never matches a row of this
// lesson, so they are created.
// ---------------------------------------------------------------------------

const rowId = z.string().min(1).optional();

const sectionSchema = z.object({
  id: rowId,
  title: z.string().min(1),
  body: z.string().min(1),
  remember: z.string().optional().nullable(),
});

const wordSchema = z.object({
  id: rowId,
  word: z.string().min(1),
  ipa: z.string().optional().nullable(),
  wordForm: z.string().optional().nullable(),
  meaningVi: z.string().min(1),
  meaningEn: z.string().optional().nullable(),
  example: z.string().optional().nullable(),
});

const choiceSchema = z.object({
  label: z.string().min(1),
  correct: z.boolean().optional(),
});

const questionSchema = z.object({
  id: rowId,
  prompt: z.string().min(1),
  explanation: z.string().optional().nullable(),
  choices: z.array(choiceSchema).min(2),
});

const trackSchema = z.enum(["grammar", "vocabulary"]);

export const lessonPayloadSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional().nullable(),
  levelId: z.string().min(1),
  track: trackSchema,
  topicName: z.string().optional().nullable(),
  xp: z.number().int().min(1).max(200),
  estimatedMinutes: z.number().int().min(1).max(180),
  sections: z.array(sectionSchema),
  vocab: z.array(wordSchema),
  questions: z.array(questionSchema),
});

export const createLessonSchema = z.object({
  levelId: z.string().min(1),
  track: trackSchema,
  title: z.string().optional(),
});

export type LessonPayload = z.infer<typeof lessonPayloadSchema>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
type Track = z.infer<typeof trackSchema>;

type QuestionInput = {
  id?: string;
  prompt: string;
  explanation?: string | null;
  choices: { label: string; correct?: boolean }[];
};

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const DEFAULT_TOPIC = { name: "Chủ đề mới", slug: "chu-de-moi" };

async function nextLessonOrder(db: Db, levelId: string, track: Track) {
  const max = await db.lesson.aggregate({
    where: { levelId, track },
    _max: { order: true },
  });
  return (max._max.order ?? 0) + 1;
}

async function assertLevelExists(db: Db, levelId: string) {
  const level = await db.level.findUnique({ where: { id: levelId }, select: { id: true } });
  if (!level) throw new BadRequestError("Cấp độ không tồn tại.");
}

/**
 * `order` is unique per (track, level) and computed as max + 1, so two admins
 * saving at the same moment can collide. Retry the whole transaction a few
 * times instead of surfacing a raw constraint error.
 */
async function withOrderRetry<T>(run: () => Promise<T>, attempts = 3): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await run();
    } catch (error) {
      if (attempt >= attempts || !isUniqueViolation(error)) throw error;
    }
  }
}

/** For vocabulary lessons the quiz is generated from the word list. */
function resolveQuestions(payload: LessonPayload): QuestionInput[] {
  if (payload.track === "vocabulary" && payload.vocab.length > 0) {
    return buildVocabularyQuestions(payload.vocab).map((question) => ({
      prompt: question.prompt,
      explanation: question.explanation,
      choices: question.choices,
    }));
  }
  return payload.questions;
}

const sameText = (a: string | null | undefined, b: string | null | undefined) =>
  (a ?? null) === (b ?? null);

// ---------------------------------------------------------------------------
// Child-row synchronisation
//
// The previous implementation deleted every section/word/question and created
// them again on each save. Because VocabReviewItem and ReviewItem cascade on
// delete, that silently wiped every learner's review history for the lesson
// whenever an admin fixed a typo. Rows are now matched by id, updated only
// when something changed, and deleted only when the admin removed them.
// ---------------------------------------------------------------------------

async function syncSections(tx: Db, lessonId: string, input: LessonPayload["sections"]) {
  const existing = await tx.lessonSection.findMany({ where: { lessonId } });
  const byId = new Map(existing.map((row) => [row.id, row]));
  const kept = new Set<string>();
  const toCreate: { lessonId: string; title: string; body: string; remember: string | null; order: number }[] = [];

  for (const [order, section] of input.entries()) {
    const remember = section.remember ?? null;
    const current = section.id ? byId.get(section.id) : undefined;
    if (!current || kept.has(current.id)) {
      toCreate.push({ lessonId, title: section.title, body: section.body, remember, order });
      continue;
    }
    kept.add(current.id);
    if (
      current.title !== section.title ||
      current.body !== section.body ||
      !sameText(current.remember, remember) ||
      current.order !== order
    ) {
      await tx.lessonSection.update({
        where: { id: current.id },
        data: { title: section.title, body: section.body, remember, order },
      });
    }
  }

  await tx.lessonSection.deleteMany({ where: { lessonId, id: { notIn: [...kept] } } });
  if (toCreate.length > 0) await tx.lessonSection.createMany({ data: toCreate });
}

async function syncVocab(tx: Db, lessonId: string, input: LessonPayload["vocab"]) {
  const existing = await tx.vocabEntry.findMany({ where: { lessonId } });
  const byId = new Map(existing.map((row) => [row.id, row]));
  const kept = new Set<string>();
  const toCreate: {
    lessonId: string;
    word: string;
    ipa: string | null;
    wordForm: string | null;
    meaningVi: string;
    meaningEn: string | null;
    example: string | null;
    order: number;
  }[] = [];

  for (const [order, word] of input.entries()) {
    const data = {
      word: word.word,
      ipa: word.ipa ?? null,
      wordForm: word.wordForm ?? null,
      meaningVi: word.meaningVi,
      meaningEn: word.meaningEn ?? null,
      example: word.example ?? null,
      order,
    };
    const current = word.id ? byId.get(word.id) : undefined;
    if (!current || kept.has(current.id)) {
      toCreate.push({ lessonId, ...data });
      continue;
    }
    kept.add(current.id);
    const changed =
      current.word !== data.word ||
      !sameText(current.ipa, data.ipa) ||
      !sameText(current.wordForm, data.wordForm) ||
      current.meaningVi !== data.meaningVi ||
      !sameText(current.meaningEn, data.meaningEn) ||
      !sameText(current.example, data.example) ||
      current.order !== order;
    if (changed) await tx.vocabEntry.update({ where: { id: current.id }, data });
  }

  // Only words the admin actually removed lose their review history.
  await tx.vocabEntry.deleteMany({ where: { lessonId, id: { notIn: [...kept] } } });
  if (toCreate.length > 0) await tx.vocabEntry.createMany({ data: toCreate });
}

async function syncQuestions(
  tx: Db,
  lessonId: string,
  input: QuestionInput[],
  matchBy: "id" | "prompt",
) {
  const existing = await tx.question.findMany({
    where: { lessonId },
    include: { choices: { orderBy: { order: "asc" } } },
  });
  const byId = new Map(existing.map((row) => [row.id, row]));
  // Generated vocabulary questions have no stable client id; their prompt
  // ("Từ “x” có nghĩa là gì?") identifies the word, so match on it.
  const byPrompt = new Map<string, typeof existing>();
  for (const row of existing) {
    const list = byPrompt.get(row.prompt);
    if (list) list.push(row);
    else byPrompt.set(row.prompt, [row]);
  }

  const kept = new Set<string>();
  const choicesToReplace: string[] = [];
  const choiceRows: { questionId: string; label: string; isCorrect: boolean; order: number }[] = [];
  const toCreate: { question: QuestionInput; order: number }[] = [];

  const toChoiceRows = (questionId: string, question: QuestionInput) =>
    question.choices.map((choice, index) => ({
      questionId,
      label: choice.label,
      isCorrect: Boolean(choice.correct),
      order: index,
    }));

  for (const [order, question] of input.entries()) {
    const current =
      matchBy === "id"
        ? question.id
          ? byId.get(question.id)
          : undefined
        : byPrompt.get(question.prompt)?.find((row) => !kept.has(row.id));
    if (!current || kept.has(current.id)) {
      toCreate.push({ question, order });
      continue;
    }
    kept.add(current.id);

    const explanation = question.explanation ?? null;
    if (
      current.prompt !== question.prompt ||
      !sameText(current.explanation, explanation) ||
      current.order !== order
    ) {
      await tx.question.update({
        where: { id: current.id },
        data: { prompt: question.prompt, explanation, order },
      });
    }

    const nextChoices = toChoiceRows(current.id, question);
    const choicesChanged =
      current.choices.length !== nextChoices.length ||
      current.choices.some(
        (choice, index) =>
          choice.label !== nextChoices[index].label ||
          choice.isCorrect !== nextChoices[index].isCorrect,
      );
    if (choicesChanged) {
      choicesToReplace.push(current.id);
      choiceRows.push(...nextChoices);
    }
  }

  // Deleting a question cascades to its ReviewItems, which is correct here:
  // the admin removed the question itself.
  await tx.question.deleteMany({ where: { lessonId, id: { notIn: [...kept] } } });

  if (choicesToReplace.length > 0) {
    await tx.questionChoice.deleteMany({ where: { questionId: { in: choicesToReplace } } });
  }

  if (toCreate.length > 0) {
    const created = await tx.question.createManyAndReturn({
      data: toCreate.map(({ question, order }) => ({
        lessonId,
        prompt: question.prompt,
        explanation: question.explanation ?? null,
        order,
      })),
      select: { id: true, order: true },
    });
    const idByOrder = new Map(created.map((row) => [row.order, row.id]));
    for (const { question, order } of toCreate) {
      const id = idByOrder.get(order);
      if (id) choiceRows.push(...toChoiceRows(id, question));
    }
  }

  if (choiceRows.length > 0) await tx.questionChoice.createMany({ data: choiceRows });
}

// ---------------------------------------------------------------------------
// Use cases
// ---------------------------------------------------------------------------

export async function createLesson(input: CreateLessonInput) {
  await assertLevelExists(prisma, input.levelId);

  const lesson = await withOrderRetry(() =>
    prisma.$transaction(async (tx) => {
      let topicId: string | null = null;
      if (input.track === "vocabulary") {
        const topic = await tx.topic.upsert({
          where: { levelId_slug: { levelId: input.levelId, slug: DEFAULT_TOPIC.slug } },
          update: {},
          create: {
            levelId: input.levelId,
            name: DEFAULT_TOPIC.name,
            slug: DEFAULT_TOPIC.slug,
            description: "Chủ đề được tạo từ trang quản trị.",
            icon: "auto_stories",
            order: 99,
          },
        });
        topicId = topic.id;
      }

      return tx.lesson.create({
        data: {
          levelId: input.levelId,
          track: input.track,
          topicId,
          order: await nextLessonOrder(tx, input.levelId, input.track),
          title:
            input.title?.trim() ||
            (input.track === "grammar" ? "Bài ngữ pháp mới" : "Bài từ vựng mới"),
          summary: "Thêm mô tả ngắn cho bài học.",
          xp: 10,
          estimatedMinutes: 10,
          sections: {
            create: [
              {
                title: "Nội dung chính",
                body: "Nhập nội dung bài học tại đây.\n- Dùng dấu - ở đầu dòng để tạo gạch đầu dòng.\n- Dùng **hai dấu sao** để in đậm.",
                order: 0,
              },
            ],
          },
        },
        select: { id: true },
      });
    }, TX_OPTIONS),
  );

  invalidateCurriculumCache();
  return lesson;
}

export async function updateLesson(lessonId: string, payload: LessonPayload) {
  const questions = resolveQuestions(payload);
  for (const question of questions) {
    if (!question.choices.some((choice) => choice.correct)) {
      throw new BadRequestError(`Câu hỏi “${question.prompt}” chưa có đáp án đúng.`);
    }
  }

  const existing = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { levelId: true, track: true, order: true },
  });
  if (!existing) throw new NotFoundError("Không tìm thấy bài học");
  await assertLevelExists(prisma, payload.levelId);

  const changingGroup = existing.levelId !== payload.levelId || existing.track !== payload.track;
  const generatedQuiz = payload.track === "vocabulary" && payload.vocab.length > 0;

  await withOrderRetry(() =>
    prisma.$transaction(async (tx) => {
      let topicId: string | null = null;
      if (payload.track === "vocabulary") {
        const topicName = payload.topicName?.trim() || DEFAULT_TOPIC.name;
        const slug = slugify(topicName) || DEFAULT_TOPIC.slug;
        const topic = await tx.topic.upsert({
          where: { levelId_slug: { levelId: payload.levelId, slug } },
          update: { name: topicName },
          create: { levelId: payload.levelId, name: topicName, slug, icon: "auto_stories", order: 99 },
        });
        topicId = topic.id;
      }

      const order = changingGroup
        ? await nextLessonOrder(tx, payload.levelId, payload.track)
        : existing.order;

      await tx.lesson.update({
        where: { id: lessonId },
        data: {
          title: payload.title,
          summary: payload.summary ?? null,
          levelId: payload.levelId,
          track: payload.track,
          topicId,
          xp: payload.xp,
          estimatedMinutes: payload.estimatedMinutes,
          order,
        },
      });

      await syncSections(tx, lessonId, payload.sections);
      await syncVocab(tx, lessonId, payload.vocab);
      await syncQuestions(tx, lessonId, questions, generatedQuiz ? "prompt" : "id");
    }, TX_OPTIONS),
  );

  invalidateCurriculumCache();
}

export async function deleteLesson(lessonId: string) {
  try {
    await prisma.lesson.delete({ where: { id: lessonId } });
  } catch (error) {
    if (isRecordNotFound(error)) throw new NotFoundError("Không tìm thấy bài học");
    throw error;
  }
  invalidateCurriculumCache();
}
