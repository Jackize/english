export const NAV_LINKS = [
  { href: "/", key: "home", label: "Trang chủ" },
  { href: "/daily", key: "daily", label: "Theo ngày" },
  { href: "/roadmap", key: "roadmap", label: "Lộ trình" },
  { href: "/grammar", key: "grammar", label: "Ngữ pháp" },
  { href: "/vocabulary", key: "vocabulary", label: "Từ vựng" },
  { href: "/reading", key: "reading", label: "Đọc hiểu" },
  { href: "/writing", key: "writing", label: "Viết" },
  { href: "/review", key: "review", label: "Ôn tập" },
] as const;

export type NavKey = (typeof NAV_LINKS)[number]["key"] | "admin";
