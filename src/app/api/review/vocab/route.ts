import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { answerVocabularyReview } from "@/lib/vocab-review";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { itemId?: string; answer?: string };
    if (!body.itemId) {
      return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
    }

    const result = await answerVocabularyReview(
      session.user.id,
      body.itemId,
      body.answer ?? "",
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Vocabulary review failed" },
      { status: 400 },
    );
  }
}
