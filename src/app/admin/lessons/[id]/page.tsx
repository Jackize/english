import { notFound } from "next/navigation";
import { getAdminLesson, getLevelsWithTopics } from "@/lib/learning";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LessonEditor, type AdminLessonData } from "@/components/admin/LessonEditor";

export default async function AdminLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [lesson, levels] = await Promise.all([getAdminLesson(id), getLevelsWithTopics()]);

  if (!lesson) notFound();

  const data: AdminLessonData = {
    id: lesson.id,
    title: lesson.title,
    summary: lesson.summary ?? "",
    levelId: lesson.levelId,
    track: lesson.track === "vocabulary" ? "vocabulary" : "grammar",
    xp: lesson.xp,
    estimatedMinutes: lesson.estimatedMinutes,
    topicName: lesson.topic?.name ?? "",
    sections: lesson.sections.map((section) => ({
      id: section.id,
      title: section.title,
      body: section.body,
      remember: section.remember ?? "",
    })),
    vocab: lesson.vocab.map((word) => ({
      id: word.id,
      word: word.word,
      ipa: word.ipa ?? "",
      wordForm: word.wordForm ?? "",
      meaningVi: word.meaningVi,
      meaningEn: word.meaningEn ?? "",
      example: word.example ?? "",
    })),
    questions: lesson.questions.map((question) => ({
      id: question.id,
      prompt: question.prompt,
      explanation: question.explanation ?? "",
      choices: question.choices.map((choice) => ({
        id: choice.id,
        label: choice.label,
        isCorrect: choice.isCorrect,
      })),
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="admin" />
      <main className="flex-1">
        <LessonEditor
          lesson={data}
          levels={levels.map((level) => ({
            id: level.id,
            code: level.code,
            name: level.name,
          }))}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
