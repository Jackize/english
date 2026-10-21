import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getLessonForLearner } from "@/lib/learning";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LessonExperience } from "@/components/lesson/LessonExperience";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;
  const lesson = await getLessonForLearner(id, session?.user?.id);

  if (!lesson) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active={lesson.track === "grammar" ? "grammar" : "vocabulary"} />
      <main className="flex-1">
        <LessonExperience lesson={lesson} />
      </main>
      <SiteFooter />
    </div>
  );
}
