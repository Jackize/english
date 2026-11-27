import { NextResponse } from "next/server";
import { requireUser, toErrorResponse } from "@/lib/http";
import { completeVocabLesson } from "@/lib/progress";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireUser();
  if (!guard.ok) return guard.response;

  const { id } = await params;

  try {
    return NextResponse.json(await completeVocabLesson(guard.value.id, id));
  } catch (error) {
    return toErrorResponse(error, "Complete failed");
  }
}
