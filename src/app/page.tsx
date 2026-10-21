import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-container-lowest">
      <TopNav active="home" />
      <main className="flex flex-grow flex-col items-center justify-center px-gutter py-xl">
        <section className="flex w-full max-w-[800px] flex-col items-center gap-md text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-xs font-semibold text-primary">
            <span className="h-2 w-2 rounded-full bg-secondary-fixed" />
            Welcome to Refined Learning
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-on-surface md:text-5xl">
            Master English Vocabulary Naturally
          </h1>
          <p className="mb-lg max-w-[600px] text-lg text-on-surface-variant">
            The simplest way to expand your lexicon through distraction-free learning. Import from Google Docs and study with flashcards designed for Vietnamese learners.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="btn-primary flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium elevation-1 transition-all hover:elevation-2"
            >
              Get Started
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/login"
              className="rounded-full border-[1.5px] border-[#E5E7EB] px-8 py-4 text-sm font-medium text-[#374151] transition-all hover:bg-surface-container-low"
            >
              Sign In
            </Link>
          </div>
        </section>

        <section className="mt-24 grid w-full max-w-[var(--spacing-container-max)] grid-cols-1 gap-md md:grid-cols-3">
          {[
            {
              icon: "upload_file",
              title: "Google Doc Import",
              desc: "Paste a public Google Doc link and import vocabulary by category automatically.",
            },
            {
              icon: "check_circle",
              title: "Spaced Repetition",
              desc: "Scientifically proven algorithms ensure words enter your long-term memory.",
            },
            {
              icon: "translate",
              title: "Vietnamese First",
              desc: "Nghĩa tiếng Việt shown prominently with IPA, word form, and English definitions.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="card-elevation flex flex-col items-start gap-4 rounded-xl bg-white p-md transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-green-light text-accent-green-dark">
                <span className="material-symbols-outlined">{f.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-on-surface">{f.title}</h3>
              <p className="text-on-surface-variant">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="mt-xl w-full border-t border-outline-variant bg-surface-container-lowest py-8">
        <div className="mx-auto flex max-w-[var(--spacing-container-max)] flex-col items-center gap-4 px-gutter">
          <div className="text-sm font-bold text-on-surface-variant">eng-growth</div>
          <div className="text-xs text-on-surface-variant">© 2024 eng-growth Learning. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
