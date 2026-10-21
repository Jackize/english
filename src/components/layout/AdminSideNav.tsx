import Link from "next/link";

interface AdminSideNavProps {
  active?: "words" | "import";
}

export function AdminSideNav({ active = "words" }: AdminSideNavProps) {
  return (
    <nav className="fixed left-0 top-0 z-50 hidden h-full w-64 flex-col gap-2 border-r border-outline-variant/30 bg-surface-container-low p-4 md:flex">
      <div className="mb-8 px-4 py-2">
        <h1 className="text-xl font-semibold tracking-tight text-primary">eng-growth</h1>
        <p className="mt-1 text-xs font-semibold text-on-surface-variant">Manage Vocabulary</p>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href="/admin"
          className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            active === "words"
              ? "bg-secondary-container text-on-secondary-container"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">list_alt</span>
          Word List
        </Link>
        <Link
          href="/admin/import"
          className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            active === "import"
              ? "bg-secondary-container text-on-secondary-container"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">upload_file</span>
          Import Google Doc
        </Link>
        <Link
          href="/learn"
          className="mt-auto flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-[20px]">school</span>
          Back to Learn
        </Link>
      </div>
    </nav>
  );
}
