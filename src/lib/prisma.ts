import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

function getConnectionString() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    // Lúc `next build` không cần DB (mọi trang đều render động), nên cho phép
    // build mà không có DATABASE_URL. Client chỉ thực sự kết nối khi có query.
    if (isBuildPhase) return "postgresql://build:build@127.0.0.1:5432/build";
    throw new Error(
      "Chưa cấu hình DATABASE_URL. Hãy thêm chuỗi kết nối PostgreSQL/Supabase vào .env.",
    );
  }

  // Supabase yêu cầu SSL. Tự bổ sung nếu chuỗi kết nối chưa khai báo.
  const isLocal = /localhost|127\.0\.0\.1/.test(url);
  if (isLocal || /[?&]sslmode=/.test(url)) return url;

  return `${url}${url.includes("?") ? "&" : "?"}sslmode=require`;
}

/**
 * Số connection tối đa của pool (biến môi trường DB_POOL_MAX, mặc định 1).
 * Pooler của Supabase (nhất là session mode, port 5432) hay treo khi mở nhiều
 * connection cùng lúc, nên mặc định giữ 1: các query trong Promise.all sẽ xếp
 * hàng trên cùng connection (vẫn đúng, chỉ không song song).
 * Khi DB nằm cùng máy/cùng mạng (Postgres trên VPS) thì đặt DB_POOL_MAX=10.
 */
function getPoolMax() {
  const fromEnv = Number(process.env.DB_POOL_MAX);
  if (!isBuildPhase && Number.isInteger(fromEnv) && fromEnv > 0) return fromEnv;
  return 1;
}

export function createPrismaClient(options: { max?: number; connectionTimeoutMillis?: number } = {}) {
  const adapter = new PrismaPg({
    connectionString: getConnectionString(),
    max: options.max ?? getPoolMax(),
    connectionTimeoutMillis: options.connectionTimeoutMillis ?? 10_000,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
