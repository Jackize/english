import { addDays, calendarDaysBetween, startOfToday } from "./dates";
import { prisma, type Db } from "./prisma";

/**
 * Chuỗi ngày đang còn hiệu lực. touchStreak chỉ đặt lại chuỗi khi người học quay
 * lại, nên giá trị lưu trong DB có thể đã hết hạn nếu lần học cuối cách hôm nay
 * hơn một ngày. Mọi chỗ hiển thị chuỗi dùng hàm này để các con số khớp nhau.
 */
export function liveStreak(streak: number, lastStudyDate: Date | null | undefined) {
  if (!lastStudyDate) return 0;
  return calendarDaysBetween(lastStudyDate, new Date()) <= 1 ? streak : 0;
}

/**
 * Cập nhật chuỗi ngày học liên tiếp. Dùng chung cho bài học và các lượt ôn tập.
 *
 * Hai câu UPDATE có điều kiện thay cho đọc-rồi-ghi: điều kiện WHERE được
 * Postgres kiểm tra lại sau khi khoá dòng, nên hai request đồng thời không thể
 * cộng chuỗi hai lần. Sau câu đầu tiên `lastStudyDate` đã là hôm nay, nên câu
 * thứ hai không bao giờ khớp cùng lúc với câu đầu.
 */
export async function touchStreak(userId: string, db: Db = prisma) {
  const now = new Date();
  const today = startOfToday(now);
  const yesterday = addDays(today, -1);

  // Học hôm qua -> nối chuỗi.
  const continued = await db.user.updateMany({
    where: { id: userId, lastStudyDate: { gte: yesterday, lt: today } },
    data: { streak: { increment: 1 }, lastStudyDate: now },
  });
  if (continued.count > 0) return;

  // Chưa từng học hoặc đã đứt chuỗi -> bắt đầu lại từ 1.
  await db.user.updateMany({
    where: {
      id: userId,
      OR: [{ lastStudyDate: null }, { lastStudyDate: { lt: yesterday } }],
    },
    data: { streak: 1, lastStudyDate: now },
  });
}
