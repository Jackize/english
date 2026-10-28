import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="card p-6 md:p-7">
          <div className="space-y-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
            <Skeleton className="h-11 w-40 rounded-full" />
          </div>
        </div>
      </section>
    </LoadingShell>
  );
}