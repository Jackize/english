import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 pt-8 md:px-8 md:pt-14">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-3 h-10 w-full max-w-md" />
        <Skeleton className="mt-3 h-4 w-full max-w-xl" />
        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-2xl" />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-[1120px] px-5 md:px-8">
        <Skeleton className="h-20 w-full rounded-2xl" />
      </section>

      <section className="mx-auto mt-6 w-full max-w-[1120px] px-5 md:px-8">
        <Skeleton className="h-56 w-full rounded-[1.5rem]" />
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1120px] px-5 md:px-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-96 w-full rounded-[1.25rem]" />
      </section>
    </LoadingShell>
  );
}
