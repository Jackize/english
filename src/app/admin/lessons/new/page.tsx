import { getLevelsWithTopics } from "@/lib/learning";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NewLessonForm } from "@/components/admin/NewLessonForm";

export default async function NewLessonPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; track?: string }>;
}) {
  const levels = await getLevelsWithTopics();
  const params = await searchParams;
  const initialLevelId = levels.find((level) => level.id === params.level)?.id;
  const initialTrack = params.track === "vocabulary" ? "vocabulary" : "grammar";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="admin" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8">
          <NewLessonForm
            levels={levels.map((level) => ({ id: level.id, code: level.code, name: level.name }))}
            initialLevelId={initialLevelId}
            initialTrack={initialTrack}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
