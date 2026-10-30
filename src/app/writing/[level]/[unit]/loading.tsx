import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-8 md:py-10">
          <Skeleton className="mb-5 h-4 w-64" />
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <Skeleton className="mb-3 h-6 w-40 rounded-md" />
              <Skeleton className="h-10 w-full max-w-lg" />
              <Skeleton className="mt-3 h-4 w-full max-w-xl" />
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-32 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto w-full max-w-[920px] px-5 py-8 md:px-8">
        <div className="mb-6 flex gap-2">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
        <Skeleton className="h-96 w-full rounded-2xl" />
      </main>
    </LoadingShell>
  );
}
