import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getReviewQueue, getTodayProgress, recordReview } from "@/lib/study-service";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category") ?? undefined;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const [queue, progress] = await Promise.all([
    getReviewQueue(session.user.id, categorySlug, 1),
    getTodayProgress(session.user.id, user.dailyGoal),
  ]);

  return NextResponse.json({
    word: queue[0] ?? null,
    progress: { ...progress, streak: user.streak },
  });
}

const reviewSchema = z.object({
  wordId: z.string(),
  result: z.enum(["know", "hard", "again"]),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { wordId, result } = reviewSchema.parse(await request.json());
    const updated = await recordReview(session.user.id, wordId, result);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Review failed" }, { status: 400 });
  }
}
