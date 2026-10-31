import { getSession } from "@/lib/auth";
import { getContinueLesson, getHeaderStats } from "@/lib/learning";
import { HeaderBar } from "./HeaderBar";
import type { NavKey } from "./navigation";

export type { NavKey };

export async function SiteHeader({ active }: { active?: NavKey }) {
  const session = await getSession();
  const user = session?.user ?? null;
  const [continueLesson, stats] = user
    ? await Promise.all([getContinueLesson(user.id), getHeaderStats(user.id)])
    : [null, null];

  return (
    <HeaderBar
      active={active}
      user={
        user
          ? {
              name: user.name ?? null,
              email: user.email ?? null,
              role: user.role,
              streak: stats?.streak ?? 0,
            }
          : null
      }
      continueLesson={continueLesson ? { id: continueLesson.id, title: continueLesson.title } : null}
    />
  );
}
