import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Xoá toàn bộ dữ liệu học tập của người dùng hiện tại:
 * tiến độ bài học, lượt làm bài, lịch ôn từ vựng/câu sai, XP và chuỗi ngày học.
 * Tài khoản, mục tiêu ngày và lộ trình vẫn được giữ nguyên.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => null)) as { confirm?: string } | null;
    if (body?.confirm !== "XÓA") {
      return NextResponse.json(
        { error: "Cần xác nhận bằng cách gõ đúng chữ XÓA." },
        { status: 400 },
      );
    }

    const userId = session.user.id;

    await prisma.$transaction([
      prisma.reviewItem.deleteMany({ where: { userId } }),
      prisma.vocabReviewItem.deleteMany({ where: { userId } }),
      prisma.quizAttempt.deleteMany({ where: { userId } }),
      prisma.lessonProgress.deleteMany({ where: { userId } }),
      prisma.user.update({
        where: { id: userId },
        data: {
          xp: 0,
          streak: 0,
          lastStudyDate: null,
        },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Chưa xoá được dữ liệu học tập. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
