export type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const LEVEL_META: Record<
  LevelCode,
  { name: string; tagline: string; short: string; color: string; soft: string }
> = {
  A1: { name: "Khởi đầu", tagline: "Nền tảng vững chắc", short: "A1", color: "#17663d", soft: "#e6f3ea" },
  A2: { name: "Sơ cấp", tagline: "Giao tiếp tự tin hơn", short: "A2", color: "#1f7a4a", soft: "#e9f6ee" },
  B1: { name: "Trung cấp", tagline: "Xử lý tình huống đa dạng", short: "B1", color: "#24765e", soft: "#e8f5f0" },
  B2: { name: "Trung cao cấp", tagline: "Tư duy học thuật", short: "B2", color: "#0e7490", soft: "#ecfeff" },
  C1: { name: "Cao cấp", tagline: "Học thuật & tinh tế", short: "C1", color: "#245a7a", soft: "#e9f1f7" },
  C2: { name: "Thành thạo", tagline: "Tinh chỉnh như người bản xứ", short: "C2", color: "#8a5a14", soft: "#faf3e6" },
};

export interface PlantStage {
  index: number;
  key: string;
  label: string;
  threshold: number;
}

export const PLANT_STAGES: PlantStage[] = [
  { index: 1, key: "seed", label: "Hạt giống", threshold: 0 },
  { index: 2, key: "sprout", label: "Nảy mầm", threshold: 10 },
  { index: 3, key: "stem", label: "Phát triển thân", threshold: 25 },
  { index: 4, key: "branch", label: "Phân cành", threshold: 45 },
  { index: 5, key: "leaf", label: "Ra lá", threshold: 70 },
  { index: 6, key: "fruit", label: "Kết trái", threshold: 100 },
];

export function getPlantStage(percent: number) {
  const clamped = Math.min(100, Math.max(0, percent));
  let current = PLANT_STAGES[0];
  for (const stage of PLANT_STAGES) {
    if (clamped >= stage.threshold) current = stage;
  }
  const next = PLANT_STAGES.find((stage) => stage.threshold > clamped) ?? null;
  return { current, next, percent: clamped };
}

export const TRACK_META = {
  grammar: {
    key: "grammar" as const,
    label: "Ngữ pháp",
    short: "Ngữ pháp",
    icon: "rule",
    href: "/grammar",
    description:
      "Từ cấu trúc câu cơ bản đến cách diễn đạt học thuật, chia theo sáu bậc CEFR.",
  },
  vocabulary: {
    key: "vocabulary" as const,
    label: "Từ vựng",
    short: "Từ vựng",
    icon: "auto_stories",
    href: "/vocabulary",
    description:
      "Từ, cụm từ và thành ngữ theo chủ đề, gắn với từng cấp độ từ A1 đến C2.",
  },
};

export type TrackKey = keyof typeof TRACK_META;

export function levelSortValue(code: string) {
  return ["A1", "A2", "B1", "B2", "C1", "C2"].indexOf(code);
}
