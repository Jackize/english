import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Kiểm tra ngay một câu trả lời trong bài học.
 * Không trả về toàn bộ đáp án của bài — chỉ đáp án đúng của câu vừa chọn,
 * để client phản hồi tức thì mà không lộ trước nội dung quiz.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = (await request.json()) as { questionId?: string; choiceId?: string };
    if (!body.questionId || !body.choiceId) {
      return NextResponse.json({ error: "Missing questionId or choiceId" }, { status: 400 });
    }

    const question = await prisma.question.findFirst({
      where: { id: body.questionId, lessonId: id },
      include: { choices: { orderBy: { order: "asc" } } },
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const selected = question.choices.find((choice) => choice.id === body.choiceId);
    if (!selected) {
      return NextResponse.json({ error: "Choice not found" }, { status: 400 });
    }

    const correct = question.choices.find((choice) => choice.isCorrect);

    return NextResponse.json({
      correct: selected.isCorrect,
      selectedChoiceId: selected.id,
      correctChoiceId: correct?.id ?? "",
      correctLabel: correct?.label ?? "",
      explanation: question.explanation,
    });
  } catch {
    return NextResponse.json({ error: "Cannot check answer" }, { status: 400 });
  }
}
