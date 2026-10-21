import Link from "next/link";
import { getAdminLevels } from "@/lib/learning";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DeleteLessonButton } from "@/components/admin/DeleteLessonButton";

export default async function AdminPage() {
  const levels = await getAdminLevels();

  const lessonCount = levels.reduce((sum, level) => sum + level.lessons.length, 0);
  const questionCount = levels.reduce(
    (sum, level) =>
      sum + level.lessons.reduce((lessonSum, lesson) => lessonSum + lesson._count.questions, 0),
    0,
  );
  const wordCount = levels.reduce(
    (sum, level) =>
      sum + level.lessons.reduce((lessonSum, lesson) => lessonSum + lesson._count.vocab, 0),
    0,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="admin" />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1120px] px-5 pb-6 pt-10 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                Quản trị nội dung
              </div>
              <h1 className="display text-3xl text-ink md:text-4xl">Bài học & lộ trình</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Thêm, sửa hoặc xoá bài học. Với bài từ vựng, danh sách từ sẽ tự sinh câu hỏi kiểm
                tra.
              </p>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand/30 hover:text-brand"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              Xem lộ trình
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Cấp độ", value: levels.length, icon: "stairs" },
              { label: "Bài học", value: lessonCount, icon: "menu_book" },
              { label: "Câu hỏi", value: questionCount, icon: "quiz" },
              { label: "Từ vựng", value: wordCount, icon: "auto_stories" },
            ].map((stat) => (
              <div key={stat.label} className="card p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  <span className="material-symbols-outlined text-[15px] text-brand">{stat.icon}</span>
                  {stat.label}
                </div>
                <div className="display mt-1.5 text-2xl text-ink">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
          <div className="space-y-6">
            {levels.map((level) => {
              const meta = LEVEL_META[level.code as LevelCode];
              const grammar = level.lessons.filter((lesson) => lesson.track === "grammar");
              const vocabulary = level.lessons.filter((lesson) => lesson.track === "vocabulary");

              return (
                <div key={level.id} className="card overflow-hidden">
                  <div className="flex flex-col gap-3 border-b border-line bg-surface-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="display flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold"
                        style={{ background: meta.soft, color: meta.color }}
                      >
                        {level.code}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-ink">
                          {meta.name}
                          <span className="ml-2 text-xs font-normal text-muted">{meta.tagline}</span>
                        </h2>
                        <p className="text-[11px] text-muted">
                          {grammar.length} bài ngữ pháp · {vocabulary.length} bài từ vựng
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/lessons/new?level=${level.id}&track=grammar`}
                        className="rounded-full bg-brand px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-brand-dark"
                      >
                        + Ngữ pháp
                      </Link>
                      <Link
                        href={`/admin/lessons/new?level=${level.id}&track=vocabulary`}
                        className="rounded-full bg-mint px-3.5 py-1.5 text-[11px] font-semibold text-brand-dark hover:brightness-95"
                      >
                        + Từ vựng
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y divide-line/70">
                    {level.lessons.length === 0 ? (
                      <p className="px-4 py-5 text-xs text-muted md:px-6">
                        Chưa có bài học nào ở cấp độ này.
                      </p>
                    ) : (
                      level.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6"
                        >
                          <div className="flex min-w-0 items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                                lesson.track === "grammar"
                                  ? "bg-brand-soft text-brand"
                                  : "bg-surface-muted text-muted"
                              }`}
                            >
                              {String(lesson.order).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="truncate text-sm font-semibold text-ink">
                                  {lesson.title}
                                </span>
                                <span className="rounded bg-surface-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted">
                                  {lesson.track === "grammar" ? "Ngữ pháp" : "Từ vựng"}
                                </span>
                                {lesson.topic ? (
                                  <span className="text-[10px] text-muted">{lesson.topic.name}</span>
                                ) : null}
                              </div>
                              <div className="mt-0.5 text-[10px] text-muted">
                                {lesson._count.questions} câu hỏi · {lesson._count.vocab} từ ·{" "}
                                {lesson.xp} XP
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-shrink-0 items-center gap-2 pl-10 sm:pl-0">
                            <Link
                              href={`/admin/lessons/${lesson.id}`}
                              className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold text-ink hover:border-brand/30 hover:text-brand"
                            >
                              Sửa
                            </Link>
                            <Link
                              href={`/lesson/${lesson.id}`}
                              className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-muted hover:text-brand"
                            >
                              Xem
                            </Link>
                            <DeleteLessonButton lessonId={lesson.id} title={lesson.title} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-line bg-surface-muted/40 p-4 text-xs leading-relaxed text-muted">
            <span className="font-semibold text-ink">Mẹo:</span> Nội dung bài học hỗ trợ dòng bắt
            đầu bằng <code className="rounded bg-surface px-1">-</code> để tạo gạch đầu dòng và{" "}
            <code className="rounded bg-surface px-1">**chữ**</code> để in đậm. Với bài từ vựng,
            chỉ cần nhập danh sách từ — hệ thống tự tạo câu hỏi trắc nghiệm.
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
