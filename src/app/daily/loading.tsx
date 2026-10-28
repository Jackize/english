import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-14 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Skeleton className="mb-4 h-7 w-44 rounded-full" />
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="mt-4 h-4 w-full max-w-xl" />
          </div>
          <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-8 w-24" />
            <Skeleton className="mt-3 h-2 w-full rounded-full" />
          </div>
        </div>
        <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
        <div className="card overflow-hidden border-brand/20 bg-brand-soft/10 p-6 md:p-7">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-8 w-32" />
          <Skeleton className="mt-3 h-4 w-48" />
        </div>
        <div className="mt-10 space-y-9">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="mb-3 h-6 w-32" />
              <div className="grid gap-3 lg:grid-cols-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-32 rounded-2xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </LoadingShell>
  );
}