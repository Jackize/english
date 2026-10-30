import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const createSchema = z.object({
  levelId: z.string().min(1),
  track: z.enum(["grammar", "vocabulary"]),
  title: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const data = createSchema.parse(await request.json());

    const max = await prisma.lesson.aggregate({
      where: { levelId: data.levelId, track: data.track },
      _max: { order: true },
    });

    let topicId: string | null = null;
    if (data.track === "vocabulary") {
      const topic = await prisma.topic.upsert({
        where: { levelId_slug: { levelId: data.levelId, slug: "chu-de-moi" } },
        update: {},
        create: {
          levelId: data.levelId,
          name: "Chủ đề mới",
          slug: "chu-de-moi",
          description: "Chủ đề được tạo từ trang quản trị.",
          icon: "auto_stories",
          order: 99,
        },
      });
      topicId = topic.id;
    }

    const lesson = await prisma.lesson.create({
      data: {
        levelId: data.levelId,
        track: data.track,
        topicId,
        order: (max._max.order ?? 0) + 1,
        title:
          data.title?.trim() ||
          (data.track === "grammar" ? "Bài ngữ pháp mới" : "Bài từ vựng mới"),
        summary: "Thêm mô tả ngắn cho bài học.",
        xp: 10,
        estimatedMinutes: 10,
        sections: {
          create: [
            {
              title: "Nội dung chính",
              body: "Nhập nội dung bài học tại đây.\n- Dùng dấu - ở đầu dòng để tạo gạch đầu dòng.\n- Dùng **hai dấu sao** để in đậm.",
              order: 0,
            },
          ],
        },
      },
    });

    revalidatePath("/", "layout");
    return NextResponse.json({ id: lesson.id });
  } catch {
    return NextResponse.json({ error: "Không thể tạo bài học" }, { status: 400 });
  }
}
