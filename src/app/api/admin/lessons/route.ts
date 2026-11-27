import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createLesson, createLessonSchema } from "@/lib/admin-lessons";
import { readJson, requireAdmin, toErrorResponse } from "@/lib/http";

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  try {
    const input = await readJson(request, createLessonSchema, "Không thể tạo bài học");
    const lesson = await createLesson(input);
    revalidatePath("/", "layout");
    return NextResponse.json({ id: lesson.id });
  } catch (error) {
    return toErrorResponse(error, "Không thể tạo bài học");
  }
}
