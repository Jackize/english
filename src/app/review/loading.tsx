import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-8 pt-12 md:px-8">
        <Skeleton className="mb-4 h-7 w-44 rounded-full" />
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="mt-3 h-4 w-full max-w-xl" />
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 md:px-8">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      </section>
    </LoadingShell>
  );
}