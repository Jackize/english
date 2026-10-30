import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { buildVocabularyQuestions } from "@/lib/vocabulary-quiz";

const sectionSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  remember: z.string().optional().nullable(),
});

const wordSchema = z.object({
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
  prompt: z.string().min(1),
  explanation: z.string().optional().nullable(),
  choices: z.array(choiceSchema).min(2),
});

const payloadSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional().nullable(),
  levelId: z.string().min(1),
  track: z.enum(["grammar", "vocabulary"]),
  topicName: z.string().optional().nullable(),
  xp: z.number().int().min(1).max(200),
  estimatedMinutes: z.number().int().min(1).max(180),
  sections: z.array(sectionSchema),
  vocab: z.array(wordSchema),
  questions: z.array(questionSchema),
});

type QuestionInput = { prompt: string; explanation?: string | null; choices: { label: string; correct?: boolean }[] };

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const payload = payloadSchema.parse(await request.json());

    const existing = await prisma.lesson.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Không tìm thấy bài học" }, { status: 404 });
    }

    let topicId: string | null = null;
    if (payload.track === "vocabulary") {
      const topicName = payload.topicName?.trim() || "Chủ đề mới";
      const slug = slugify(topicName) || "chu-de-moi";
      const topic = await prisma.topic.upsert({
        where: { levelId_slug: { levelId: payload.levelId, slug } },
        update: { name: topicName },
        create: {
          levelId: payload.levelId,
          name: topicName,
          slug,
          icon: "auto_stories",
          order: 99,
        },
      });
      topicId = topic.id;
    }

    let questions: QuestionInput[] = payload.questions;
    if (payload.track === "vocabulary" && payload.vocab.length > 0) {
      questions = buildVocabularyQuestions(payload.vocab).map((question) => ({
        prompt: question.prompt,
        explanation: question.explanation,
        choices: question.choices,
      }));
    }

    for (const question of questions) {
      if (!question.choices.some((choice) => choice.correct)) {
        return NextResponse.json(
          { error: `Câu hỏi “${question.prompt}” chưa có đáp án đúng.` },
          { status: 400 },
        );
      }
    }

    const changingGroup =
      existing.levelId !== payload.levelId || existing.track !== payload.track;

    let order = existing.order;
    if (changingGroup) {
      const max = await prisma.lesson.aggregate({
        where: { levelId: payload.levelId, track: payload.track },
        _max: { order: true },
      });
      order = (max._max.order ?? 0) + 1;
    }

    await prisma.$transaction(async (tx) => {
      await tx.lessonSection.deleteMany({ where: { lessonId: id } });
      await tx.vocabEntry.deleteMany({ where: { lessonId: id } });
      await tx.question.deleteMany({ where: { lessonId: id } });

      await tx.lesson.update({
        where: { id },
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

      for (const [index, section] of payload.sections.entries()) {
        await tx.lessonSection.create({
          data: {
            lessonId: id,
            title: section.title,
            body: section.body,
            remember: section.remember ?? null,
            order: index,
          },
        });
      }

      for (const [index, word] of payload.vocab.entries()) {
        await tx.vocabEntry.create({
          data: {
            lessonId: id,
            word: word.word,
            ipa: word.ipa ?? null,
            wordForm: word.wordForm ?? null,
            meaningVi: word.meaningVi,
            meaningEn: word.meaningEn ?? null,
            example: word.example ?? null,
            order: index,
          },
        });
      }

      for (const [index, question] of questions.entries()) {
        await tx.question.create({
          data: {
            lessonId: id,
            prompt: question.prompt,
            explanation: question.explanation ?? null,
            order: index,
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
    });

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể lưu bài học" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await prisma.lesson.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Không thể xoá bài học" }, { status: 400 });
  }
}
