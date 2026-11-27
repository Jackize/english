import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, requireUser, toErrorResponse } from "@/lib/http";
import { submitQuiz } from "@/lib/progress";

const answerMap = z.record(z.string(), z.string());

const schema = z.object({
  answers: answerMap.optional(),
  // undefined = bài không có phần tự luận; {} = có nhưng bỏ trống hết.
  writtenAnswers: answerMap.optional(),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireUser();
  if (!guard.ok) return guard.response;

  const { id } = await params;

  try {
    const body = await readJson(request, schema, "Quiz failed");
    const result = await submitQuiz(guard.value.id, id, body.answers ?? {}, body.writtenAnswers);
    return NextResponse.json(result);
  } catch (error) {
    return toErrorResponse(error, "Quiz failed");
  }
}
