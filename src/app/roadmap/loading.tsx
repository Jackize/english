import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

const container = "mx-auto w-full max-w-[1120px] px-5 md:px-8";

export default function Loading() {
  return (
    <LoadingShell>
      <section className={`${container} pb-8 pt-8 md:pb-10 md:pt-12`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-12">
          <div className="max-w-2xl">
            <Skeleton className="h-5 w-40 rounded-full" />
            <Skeleton className="mt-4 h-12 w-full max-w-lg" />
            <Skeleton className="mt-4 h-4 w-full max-w-xl" />
            <Skeleton className="mt-2 h-4 w-3/4 max-w-md" />
            <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-2 h-5 w-64" />
              <Skeleton className="mt-2 h-3 w-40" />
            </div>
          </div>
          <div className="card p-5 md:p-6">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-9 w-32" />
            <Skeleton className="mt-4 h-2 w-full rounded-full" />
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-1.5 h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="mt-3 h-5 w-32" />
              <Skeleton className="mt-1.5 h-3 w-24" />
              <Skeleton className="mt-6 h-2 w-full rounded-full" />
              <Skeleton className="mt-3 h-3 w-full" />
            </div>
          ))}
        </div>
      </section>
    </LoadingShell>
  );
}
