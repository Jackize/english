import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-8">
        <Skeleton className="mb-6 h-4 w-48" />
        <Skeleton className="h-10 w-full max-w-lg" />
        <Skeleton className="mt-3 h-4 w-full max-w-xl" />
      </section>
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
        <div className="card p-6 md:p-8">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </LoadingShell>
  );
}