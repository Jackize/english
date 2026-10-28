import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-14 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Skeleton className="mb-4 h-7 w-40 rounded-full" />
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="mt-4 h-4 w-full max-w-xl" />
          </div>
          <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-8 w-32" />
            <Skeleton className="mt-3 h-2 w-full rounded-full" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-line bg-surface-muted/40 p-5 md:p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-14 rounded-xl" />
                  <div>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="mt-2 h-3 w-64" />
                  </div>
                </div>
                <Skeleton className="h-10 w-32 rounded-xl" />
              </div>
              <div className="grid gap-6 p-5 md:grid-cols-2 md:p-6">
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-14 rounded-xl" />
                  ))}
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-14 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </LoadingShell>
  );
}