import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-10 pt-16 text-center md:px-8 md:pt-20">
        <Skeleton className="mx-auto mb-6 h-7 w-44 rounded-full" />
        <Skeleton className="mx-auto h-12 w-full max-w-3xl" />
        <Skeleton className="mx-auto mt-6 h-4 w-full max-w-2xl" />
        <div className="mt-8 flex justify-center gap-3">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-36 rounded-full" />
          <Skeleton className="h-12 w-36 rounded-full" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-6 md:px-8">
        <div className="card overflow-hidden border-brand/20 bg-brand-soft/20 p-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-3 h-4 w-full max-w-md" />
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-[1120px] px-5 md:px-8">
        <div className="card p-6 md:p-10">
          <Skeleton className="h-40 w-full" />
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-[1120px] px-5 md:px-8">
        <Skeleton className="mb-6 h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </section>
    </LoadingShell>
  );
}