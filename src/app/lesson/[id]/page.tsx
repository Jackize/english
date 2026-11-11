import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getLessonForLearner } from "@/lib/learning";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import dynamic from "next/dynamic";

const LessonExperience = dynamic(
  () => import("@/components/lesson/LessonExperience").then((mod) => mod.LessonExperience),
  {
    loading: () => (
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8">
        <div className="card p-6 text-sm text-muted">Đang tải bài học...</div>
      </div>
    ),
  },
);

export const revalidate = 3600;

export async function generateStaticParams() {
  const lessons = await prisma.lesson.findMany({ select: { id: true } });
  return lessons.map((lesson) => ({ id: lesson.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  const { id } = await params;
  const lesson = await getLessonForLearner(id, session?.user?.id);

  if (!lesson) notFound();

  // Bài từ vựng học dạng flashcard tập trung: ẩn header/footer để tránh xao
  // nhãng, chỉ giữ nút back + nội dung flashcard/bài tập.
  const isVocabulary = lesson.track === "vocabulary";

  return (
    <div className="flex min-h-screen flex-col">
      {!isVocabulary ? <SiteHeader active="grammar" /> : null}
      <main className="flex-1">
        <LessonExperience lesson={lesson} canSave={Boolean(session?.user)} />
      </main>
      {!isVocabulary ? <SiteFooter /> : null}
    </div>
  );
}
