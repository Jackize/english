import { NextResponse } from "next/server";
import { z } from "zod";
import { NotFoundError, BadRequestError } from "@/lib/errors";
import { readJson, requireUser, toErrorResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  questionId: z.string().min(1),
  choiceId: z.string().min(1),
});

/**
 * Kiểm tra ngay một câu trả lời trong bài học.
 * Không trả về toàn bộ đáp án của bài — chỉ đáp án đúng của câu vừa chọn,
 * để client phản hồi tức thì mà không lộ trước nội dung quiz.
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireUser();
  if (!guard.ok) return guard.response;

  const { id } = await params;

  try {
    const body = await readJson(request, schema, "Missing questionId or choiceId");

    const question = await prisma.question.findFirst({
      where: { id: body.questionId, lessonId: id },
      select: {
        explanation: true,
        choices: { select: { id: true, label: true, isCorrect: true } },
      },
    });
    if (!question) throw new NotFoundError("Question not found");

    const selected = question.choices.find((choice) => choice.id === body.choiceId);
    if (!selected) throw new BadRequestError("Choice not found");

    const correct = question.choices.find((choice) => choice.isCorrect);

    return NextResponse.json({
      correct: selected.isCorrect,
      selectedChoiceId: selected.id,
      correctChoiceId: correct?.id ?? "",
      correctLabel: correct?.label ?? "",
      explanation: question.explanation,
    });
  } catch (error) {
    return toErrorResponse(error, "Cannot check answer");
  }
}
