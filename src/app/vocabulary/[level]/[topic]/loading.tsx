import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-10 md:px-8">
        <Skeleton className="mb-6 h-4 w-48" />
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <div>
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="mt-2 h-4 w-64" />
            </div>
          </div>
          <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-2 w-full rounded-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </section>
    </LoadingShell>
  );
}