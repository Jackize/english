import { prisma } from "./prisma";

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

/**
 * Chuỗi ngày đang còn hiệu lực. touchStreak chỉ đặt lại chuỗi khi người học quay
 * lại, nên giá trị lưu trong DB có thể đã hết hạn nếu lần học cuối cách hôm nay
 * hơn một ngày. Mọi chỗ hiển thị chuỗi dùng hàm này để các con số khớp nhau.
 */
export function liveStreak(streak: number, lastStudyDate: Date | null | undefined) {
  if (!lastStudyDate) return 0;
  const diffDays = Math.round(
    (startOfDay(new Date()).getTime() - startOfDay(lastStudyDate).getTime()) / 86_400_000,
  );
  return diffDays <= 1 ? streak : 0;
}

/**
 * Cập nhật chuỗi ngày học liên tiếp. Hàm này được dùng chung bởi bài học và
 * các lượt ôn tập (câu hỏi + từ vựng).
 */
export async function touchStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastStudyDate: true, streak: true },
  });
  if (!user) return;

  const today = startOfDay(new Date());
  const last = user.lastStudyDate ? startOfDay(user.lastStudyDate) : null;

  if (last && last.getTime() === today.getTime()) return;

  let streak = 1;
  if (last) {
    const diffDays = Math.round((today.getTime() - last.getTime()) / 86_400_000);
    streak = diffDays === 1 ? user.streak + 1 : 1;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { streak, lastStudyDate: new Date() },
  });
}
