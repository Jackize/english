import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, requireUser, toErrorResponse } from "@/lib/http";
import { resetLearningProgress } from "@/lib/settings";

const schema = z.object({ confirm: z.literal("XÓA") });

/**
 * Xoá toàn bộ dữ liệu học tập của người dùng hiện tại:
 * tiến độ bài học, lượt làm bài, lịch ôn từ vựng/câu sai, XP và chuỗi ngày học.
 * Tài khoản, mục tiêu ngày và lộ trình vẫn được giữ nguyên.
 */
export async function POST(request: Request) {
  const guard = await requireUser();
  if (!guard.ok) return guard.response;

  try {
    await readJson(request, schema, "Cần xác nhận bằng cách gõ đúng chữ XÓA.");
    await resetLearningProgress(guard.value.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error, "Chưa xoá được dữ liệu học tập. Vui lòng thử lại.");
  }
}
