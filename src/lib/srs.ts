export type ReviewResult = "know" | "hard" | "again";

export interface SrsState {
  status: string;
  easeFactor: number;
  interval: number;
  nextReviewAt: Date | null;
  reviewCount: number;
  lastResult: ReviewResult;
}

const INTERVALS = [1, 3, 7, 14, 30];

export function applyReview(
  current: Pick<SrsState, "status" | "easeFactor" | "interval" | "reviewCount">,
  result: ReviewResult,
): SrsState {
  const now = new Date();
  let { easeFactor, interval, reviewCount, status } = current;

  reviewCount += 1;

  if (result === "again") {
    interval = 0;
    status = "learning";
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      status,
      easeFactor,
      interval,
      reviewCount,
      lastResult: result,
      nextReviewAt: tomorrow,
    };
  }

  if (result === "hard") {
    easeFactor = Math.max(1.3, easeFactor * 0.85);
    interval = Math.max(1, Math.round(interval * 1.2) || 1);
    status = interval >= 14 ? "mastered" : "reviewing";
    const next = new Date(now);
    next.setDate(next.getDate() + interval);
    return {
      status,
      easeFactor,
      interval,
      reviewCount,
      lastResult: result,
      nextReviewAt: next,
    };
  }

  const step = Math.min(reviewCount - 1, INTERVALS.length - 1);
  interval = INTERVALS[Math.max(0, step)];
  status = interval >= 14 ? "mastered" : reviewCount === 1 ? "learning" : "reviewing";
  const next = new Date(now);
  next.setDate(next.getDate() + interval);

  return {
    status,
    easeFactor,
    interval,
    reviewCount,
    lastResult: result,
    nextReviewAt: next,
  };
}

export function isDue(nextReviewAt: Date | null | undefined): boolean {
  if (!nextReviewAt) return true;
  return nextReviewAt <= new Date();
}
