import { LoadingShell } from "@/components/loading/LoadingShell";
import { Skeleton } from "@/components/loading/Skeleton";

/**
 * Khung chờ có cùng bố cục với trang chủ khi đã đăng nhập (lời chào + nút tiếp
 * tục, rồi lưới kế hoạch/tiến độ và ôn tập/nhịp học), nên trang không bị nhảy
 * khi dữ liệu về. Khách chỉ thấy khung này trong chốc lát.
 */
export default function Loading() {
  const container = "mx-auto w-full max-w-[1120px] px-5 md:px-8";

  return (
    <LoadingShell>
      <p role="status" className="sr-only">
        Đang tải tiến độ học của bạn
      </p>

      {/* Lời chào */}
      <section className={`${container} pt-10 md:pt-14`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="w-full max-w-xl">
            <Skeleton className="h-10 w-4/5 md:h-12" />
            <Skeleton className="mt-4 h-4 w-full" />
          </div>
          <Skeleton className="h-12 w-60 rounded-full" />
        </div>
      </section>

      {/* Kế hoạch hôm nay + tiến độ */}
      <section className={`${container} mt-8 grid gap-5 lg:grid-cols-[1.45fr_1fr]`}>
        <div className="card-elevated p-5 md:p-6">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="mt-3 h-7 w-56" />
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <Skeleton className="h-[72px] rounded-xl" />
            <Skeleton className="h-[72px] rounded-xl" />
          </div>
        </div>
        <div className="card p-5 md:p-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-3 h-3 w-full" />
          <Skeleton className="mt-8 h-1.5 w-full rounded-full" />
        </div>
      </section>

      {/* Ôn tập + nhịp học */}
      <section className={`${container} mt-5 grid gap-5 lg:grid-cols-[1.45fr_1fr]`}>
        <div className="card-elevated p-5 md:p-6">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="mt-3 h-3 w-full max-w-md" />
        </div>
        <div className="card p-5 md:p-6">
          <Skeleton className="h-7 w-52" />
          <div className="mt-6 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 14 }).map((_, index) => (
              <Skeleton key={index} className="h-6 rounded-md" />
            ))}
          </div>
        </div>
      </section>
    </LoadingShell>
  );
}
