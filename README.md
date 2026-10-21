# eng-growth — IELTS Roadmap A1 → C2

Web học IELTS theo lộ trình A1 → C2 dành cho người Việt: ngữ pháp và từ vựng tách thành hai nhánh, mỗi bài có phần kiến thức và bài kiểm tra, câu sai được lưu lại để ôn tập.

## Features

- **Lộ trình CEFR** — 6 cấp độ A1 → C2 với tiến độ từng cấp và từng bài
- **Ngữ pháp** — 24 bài, lý thuyết + trắc nghiệm
- **Từ vựng** — 12 chủ đề / 12 bài / 96 từ; câu hỏi quiz tự sinh từ danh sách từ
- **Ôn tập câu sai** — câu trả lời sai được lưu và luyện lại
- **Gamification** — XP, streak, cây phát triển 6 giai đoạn
- **Admin** — thêm / sửa / xóa bài học, nội dung lý thuyết, từ vựng và câu hỏi

## Tech Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Prisma 7 + PostgreSQL (Supabase)
- NextAuth.js (credentials)

## Getting Started

### 1. Tạo project Supabase

Trong Supabase Dashboard, vào **Project Settings → Database → Connection string** và lấy hai chuỗi:

- **Transaction pooler** (port `6543`) → dùng cho `DATABASE_URL`
- **Session pooler** (port `5432`) → dùng cho `DIRECT_URL` (migrate / seed)

### 2. Cấu hình biến môi trường

```bash
cp .env.example .env
```

Điền vào `.env`:

```env
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-<REGION>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
DIRECT_URL="postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-<REGION>.pooler.supabase.com:5432/postgres?sslmode=require"
AUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

> **Lưu ý SSL:** mặc định nên dùng `sslmode=require` (hoặc `verify-full`). Nếu mạng hiện tại bị lỗi `SSL connection reset` khi kết nối pooler, có thể tạm dùng **Session pooler (5432)** với `sslmode=disable` để chạy local. Không nên dùng `disable` cho production.

### 3. Cài đặt, migrate và seed

```bash
npm install
npm run db:deploy   # áp dụng migration lên Supabase
npm run db:seed     # tạo dữ liệu mẫu + tài khoản demo
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

### Demo Account

- Email: `demo@eng-growth.app`
- Password: `demo1234`

## Scripts

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Chạy dev server |
| `npm run build` | Generate Prisma Client + build production |
| `npm run db:deploy` | Áp dụng migration lên database (Supabase) |
| `npm run db:migrate` | Tạo migration mới khi phát triển local |
| `npm run db:seed` | Seed dữ liệu mẫu |

## Project Structure

```
src/
  app/           # Pages and API routes
  components/    # UI components
  lib/           # Auth, learning queries, progress, Prisma
prisma/          # Schema + PostgreSQL migrations
scripts/         # Seed data
```
