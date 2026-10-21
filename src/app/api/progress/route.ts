import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getReviewStats } from "@/lib/study-service";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const filter = searchParams.get("filter") ?? "recent";

  const stats = await getReviewStats(session.user.id);

  const progress = await prisma.userWordProgress.findMany({
    where: {
      userId: session.user.id,
      ...(search
        ? {
            word: {
              OR: [
                { word: { contains: search } },
                { meaningVi: { contains: search } },
                { meaningEn: { contains: search } },
              ],
            },
          }
        : {}),
    },
    include: { word: true },
    orderBy:
      filter === "hardest"
        ? { reviewCount: "desc" }
        : filter === "easiest"
          ? { interval: "desc" }
          : { lastReviewed: "desc" },
    take: 50,
  });

  return NextResponse.json({
    stats,
    words: progress.map((p) => ({
      id: p.word.id,
      word: p.word.word,
      meaningEn: p.word.meaningEn,
      meaningVi: p.word.meaningVi,
      status: p.status,
      lastResult: p.lastResult,
      reviewCount: p.reviewCount,
      interval: p.interval,
      lastReviewed: p.lastReviewed?.toISOString(),
    })),
  });
}
