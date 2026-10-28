import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <LoadingShell>
      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-6 text-center">
            <Skeleton className="mx-auto h-8 w-48" />
            <Skeleton className="mx-auto mt-3 h-4 w-64" />
          </div>
          <div className="card p-6 md:p-7">
            <div className="space-y-5">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-11 w-full rounded-full" />
            </div>
            <Skeleton className="mt-6 h-20 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </LoadingShell>
  );
}