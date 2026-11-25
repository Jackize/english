# ============================================================
# Docker image cho English Vocabulary App
# Build: Next.js production (prisma generate + next build)
# Runtime: node:22-slim, chạy standalone server trên cổng 3000
# ============================================================

# ---------- Stage 1: Build ----------
FROM node:22 AS build
WORKDIR /app

# Copy dependency files trước để cache layer npm ci
COPY package.json package-lock.json ./
# Prisma cần schema + config ngay từ postinstall (prisma generate)
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci

# Copy source và build production
COPY . .
# Build không cần kết nối DB (mọi trang render động, Prisma chỉ kết nối khi có
# query). Stage này cũng được dùng làm image chạy `prisma migrate deploy`
# (service "migrate" trong docker-compose) vì có sẵn Prisma CLI + migrations.
RUN npm run build

# ---------- Stage 2: Runtime ----------
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Ranh giới "hôm nay" (streak, mục tiêu ngày, lịch ôn) tính theo giờ Việt Nam.
# Node có sẵn dữ liệu múi giờ (ICU) nên không cần cài tzdata.
ENV TZ=Asia/Ho_Chi_Minh

# Chỉ copy output standalone + static assets + public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
