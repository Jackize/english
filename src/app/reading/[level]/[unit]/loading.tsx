import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-8 md:py-10">
          <Skeleton className="mb-5 h-4 w-64" />
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Skeleton className="mb-3 h-6 w-40 rounded-md" />
              <Skeleton className="h-10 w-full max-w-lg" />
              <Skeleton className="mt-3 h-4 w-full max-w-xl" />
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-28 rounded-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-32 w-full max-w-xs rounded-xl" />
          </div>
        </div>
      </div>
      <main className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-8">
        <Skeleton className="h-96 w-full rounded-2xl" />
      </main>
    </LoadingShell>
  );
}