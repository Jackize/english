import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getConnectionString() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "Chưa cấu hình DATABASE_URL. Hãy thêm chuỗi kết nối PostgreSQL/Supabase vào .env.",
    );
  }

  // Supabase yêu cầu SSL. Tự bổ sung nếu chuỗi kết nối chưa khai báo.
  const isLocal = /localhost|127\.0\.0\.1/.test(url);
  if (isLocal || /[?&]sslmode=/.test(url)) return url;

  return `${url}${url.includes("?") ? "&" : "?"}sslmode=require`;
}

export function createPrismaClient(options: { max?: number; connectionTimeoutMillis?: number } = {}) {
  const adapter = new PrismaPg({
    connectionString: getConnectionString(),
    // Supabase pooler có giới hạn số client/session. Mặc định 1 connection
    // cho mỗi PrismaClient để tránh vượt pool_size khi build prerender song song.
    max: options.max ?? 1,
    connectionTimeoutMillis: options.connectionTimeoutMillis ?? 10_000,
    ...options,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
