import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteLesson, lessonPayloadSchema, updateLesson } from "@/lib/admin-lessons";
import { InvalidBodyError, readJson, requireAdmin, toErrorResponse } from "@/lib/http";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Context) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { id } = await params;

  try {
    const payload = await readJson(request, lessonPayloadSchema, "Dữ liệu bài học không hợp lệ");
    await updateLesson(id, payload);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof InvalidBodyError && error.issues?.length) {
      // Trang admin hiển thị lỗi này cho người soạn bài: chỉ rõ trường sai.
      const issue = error.issues[0];
      const path = issue.path.join(".");
      return NextResponse.json(
        { error: `${error.message}: ${path ? `${path} — ` : ""}${issue.message}` },
        { status: 400 },
      );
    }
    return toErrorResponse(error, "Không thể lưu bài học");
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { id } = await params;

  try {
    await deleteLesson(id);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error, "Không thể xoá bài học");
  }
}
