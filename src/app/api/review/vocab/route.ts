import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, requireUser, toErrorResponse } from "@/lib/http";
import { answerVocabularyReview } from "@/lib/vocab-review";

const schema = z.object({
  itemId: z.string().min(1),
  answer: z.string().optional(),
});

export async function POST(request: Request) {
  const guard = await requireUser();
  if (!guard.ok) return guard.response;

  try {
    const body = await readJson(request, schema, "Missing itemId");
    const result = await answerVocabularyReview(guard.value.id, body.itemId, body.answer ?? "");
    return NextResponse.json(result);
  } catch (error) {
    return toErrorResponse(error, "Vocabulary review failed");
  }
}
