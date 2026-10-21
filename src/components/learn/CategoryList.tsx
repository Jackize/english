import Link from "next/link";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  wordCount: number;
}

interface CategoryListProps {
  categories: CategoryItem[];
  activeSlug?: string;
  documentSetName?: string;
}

export function CategoryList({ categories, activeSlug, documentSetName }: CategoryListProps) {
  return (
    <>
      <aside className="hidden w-64 flex-shrink-0 py-lg pr-lg md:block">
        {documentSetName && (
          <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant opacity-70">
            {documentSetName}
          </p>
        )}
        <div className="mb-md px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant opacity-70">
          Categories
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="/learn"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              !activeSlug
                ? "bg-secondary-container text-on-secondary-container"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            All Words
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/learn/${cat.slug}`}
              className={`flex items-center justify-between gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeSlug === cat.slug
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="truncate">{cat.name}</span>
              <span className="text-xs opacity-70">{cat.wordCount}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="no-scrollbar mb-lg w-full overflow-x-auto px-gutter md:hidden">
        <div className="flex w-max gap-3 pb-2">
          <Link
            href="/learn"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
              !activeSlug
                ? "bg-secondary-container text-on-secondary-container"
                : "border-[1.5px] border-outline-variant bg-surface text-on-surface-variant"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/learn/${cat.slug}`}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeSlug === cat.slug
                  ? "bg-secondary-container text-on-secondary-container"
                  : "border-[1.5px] border-outline-variant bg-surface text-on-surface-variant"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
