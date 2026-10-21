import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { answerReviewItem } from "@/lib/progress";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { itemId?: string; choiceId?: string };
    if (!body.itemId || !body.choiceId) {
      return NextResponse.json({ error: "Missing itemId or choiceId" }, { status: 400 });
    }
    const result = await answerReviewItem(session.user.id, body.itemId, body.choiceId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Review failed" },
      { status: 400 },
    );
  }
}
