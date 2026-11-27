/**
 * Day arithmetic for streaks, daily goals and review schedules.
 *
 * Everything runs in the server's local time zone. Production pins it with
 * `TZ=Asia/Ho_Chi_Minh` (see Dockerfile), so "today" means a Vietnamese
 * calendar day. Keep every day boundary going through this module so streak,
 * daily-goal and due-date counts always agree with each other.
 */

const MS_PER_DAY = 86_400_000;

export function startOfDay(date: Date): Date {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

export function addDays(date: Date, days: number): Date {
  const value = new Date(date);
  value.setDate(value.getDate() + days);
  return value;
}

export function startOfToday(now: Date = new Date()): Date {
  return startOfDay(now);
}

/** Exclusive upper bound of today: anything with `dueAt < endOfToday()` is due today. */
export function endOfToday(now: Date = new Date()): Date {
  return addDays(startOfDay(now), 1);
}

/** Whole calendar days from `from` to `to` (rounded, so DST shifts don't matter). */
export function calendarDaysBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_PER_DAY);
}

/** yyyy-mm-dd in server local time. */
export function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
