import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-6 pt-10 md:px-8">
        <Skeleton className="mb-3 h-7 w-44 rounded-full" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-2 h-4 w-full max-w-xl" />
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-line bg-surface-muted/40 p-4 md:px-6">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-11 w-11 rounded-xl" />
                  <div>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="mt-1 h-3 w-40" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
              <div className="divide-y divide-line/70">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="m-4 h-14 rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </LoadingShell>
  );
}