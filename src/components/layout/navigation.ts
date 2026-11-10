export type NavKey =
  | "home"
  | "daily"
  | "roadmap"
  | "grammar"
  | "vocabulary"
  | "learned"
  | "reading"
  | "writing"
  | "review"
  | "admin";

export interface NavLink {
  href: string;
  key: NavKey;
  label: string;
}

export interface NavGroup {
  key: "today" | "path" | "skills" | "review";
  label: string;
  /** Có href thì cả nhóm là một link; không có thì là nhóm mở dropdown. */
  href?: string;
  items: NavLink[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "today",
    label: "Hôm nay",
    href: "/daily",
    items: [{ href: "/daily", key: "daily", label: "Kế hoạch hôm nay" }],
  },
  {
    key: "path",
    label: "Lộ trình",
    href: "/roadmap",
    items: [{ href: "/roadmap", key: "roadmap", label: "Lộ trình A1 → C2" }],
  },
  {
    key: "skills",
    label: "Kỹ năng",
    items: [
      { href: "/grammar", key: "grammar", label: "Ngữ pháp" },
      { href: "/vocabulary", key: "vocabulary", label: "Từ vựng" },
      { href: "/vocabulary/learned", key: "learned", label: "Từ đã học" },
      { href: "/reading", key: "reading", label: "Đọc hiểu" },
      { href: "/writing", key: "writing", label: "Viết" },
    ],
  },
  {
    key: "review",
    label: "Ôn tập",
    href: "/review",
    items: [{ href: "/review", key: "review", label: "Ôn tập từ vựng & câu sai" }],
  },
];

export const NAV_LINKS: NavLink[] = NAV_GROUPS.flatMap((group) => group.items);

export function isGroupActive(group: NavGroup, active?: NavKey) {
  return Boolean(active) && group.items.some((item) => item.key === active);
}
