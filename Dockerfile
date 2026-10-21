# ============================================================
# Docker image cho English Vocabulary App
# Build: Next.js production (prisma generate + next build)
# Runtime: node:22-slim, chạy next start trên cổng 3000
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
# Build cần DATABASE_URL để Next thu thập page data (Prisma khởi tạo lúc import)
# Truyền qua BuildKit secret → không lưu trong image/history
RUN --mount=type=secret,id=database_url,env=DATABASE_URL npm run build

# ---------- Stage 2: Runtime ----------
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production

# Copy toàn bộ app đã build (bao gồm node_modules + .next + generated prisma client)
COPY --from=build /app ./

EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
