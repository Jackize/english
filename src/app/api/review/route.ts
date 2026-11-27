import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, requireUser, toErrorResponse } from "@/lib/http";
import { answerReviewItem } from "@/lib/progress";

const schema = z.object({
  itemId: z.string().min(1),
  choiceId: z.string().min(1),
});

export async function POST(request: Request) {
  const guard = await requireUser();
  if (!guard.ok) return guard.response;

  try {
    const body = await readJson(request, schema, "Missing itemId or choiceId");
    return NextResponse.json(await answerReviewItem(guard.value.id, body.itemId, body.choiceId));
  } catch (error) {
    return toErrorResponse(error, "Review failed");
  }
}
