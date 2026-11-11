# eng-growth — IELTS Roadmap A1 → C2

Web học IELTS theo lộ trình A1 → C2 dành cho người Việt: ngữ pháp và từ vựng tách thành hai nhánh, mỗi bài có phần kiến thức và bài kiểm tra, câu sai được lưu lại để ôn tập.

## Features

- **Lộ trình CEFR** — 6 cấp độ A1 → C2 với tiến độ từng cấp và từng bài
- **Kế hoạch theo ngày** — chia mỗi cấp độ thành các buổi học ngắn, mỗi ngày gồm 1 bài ngữ pháp + 1 chủ đề từ vựng, kèm mục tiêu hiện tại
- **Ngữ pháp** — 40 bài, lý thuyết + trắc nghiệm (A1: 20 bài / 120 câu hỏi)
- **Từ vựng** — 50 chủ đề / 200 bài / 3.500 từ; A1 gồm 25 chủ đề / 1.500 từ và A2 gồm 25 chủ đề / 2.000 từ, câu hỏi quiz tự sinh từ danh sách từ
- **Ôn tập câu sai** — câu trả lời sai được lưu và luyện lại
- **Gamification** — XP, streak, cây phát triển 6 giai đoạn
- **Admin** — thêm / sửa / xóa bài học, nội dung lý thuyết, từ vựng và câu hỏi

### A1 hiện có

- **20 bài ngữ pháp**: to be, mạo từ, danh từ số nhiều, this/that/these/those, there is/are, hiện tại đơn, hiện tại tiếp diễn, can, mệnh lệnh, some/any, much/many, giới từ thời gian, từ để hỏi, quá khứ đơn, be going to, would like, đại từ tân ngữ và so sánh hơn.
- **25 chủ đề từ vựng / 1.500 từ**: chào hỏi, quốc gia, gia đình, nhà cửa, thời gian, thói quen, thức ăn, trường học, nghề nghiệp, sở thích, quần áo, giao thông, địa điểm, sức khỏe, thời tiết, số đếm, màu sắc, động vật, ngoại hình, cảm xúc & tính cách, thể thao, du lịch, công nghệ, lễ hội, môi trường.
- **1.620 câu hỏi A1**: 120 câu ngữ pháp + 1.500 câu từ vựng, mỗi câu có giải thích.
- **Kế hoạch theo ngày**: mỗi ngày 1 bài ngữ pháp + 1 chủ đề từ vựng, tự động chia theo tiến độ từng cấp độ.

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

## CI/CD & Deploy (GitHub Actions)

Repository đã chuyển sang GitHub: `https://github.com/Jackize/english.git`.

### Quy trình

- **CI** (`.github/workflows/ci.yml`) — tự chạy mỗi khi `push` / mở PR lên `main`: `lint` + `typecheck` + `build`.
- **CD** (`.github/workflows/deploy.yml`) — **chỉ chạy khi bấm tay**, không tự deploy khi push.

### Deploy (bấm tay)

Vào GitHub → tab **Actions** → chọn workflow **Deploy** → **Run workflow** → chọn một trong hai:

| Job | Mô tả |
| --- | --- |
| `migrate` | Chạy `prisma migrate deploy` lên database (Supabase). Chỉ cần khi có migration mới. |
| `production` | Đồng bộ source lên VPS (rsync) → `docker compose build` → restart container → warm-up. |

### Secrets cần cấu hình trên GitHub

Vào **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Mô tả |
| --- | --- |
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL (transaction pooler, port `6543`) |
| `DIRECT_URL` | Chuỗi kết nối session pooler (port `5432`, dùng cho migrate) |
| `AUTH_SECRET` | Secret cho NextAuth |
| `NEXTAUTH_URL` | URL public của app (ví dụ `https://english.sanbong.cloud`) |
| `VPS_HOST` | Địa chỉ/domain của VPS deploy |
| `VPS_DEPLOY_PATH` | Đường dẫn thư mục deploy trên VPS |
| `VPS_DEPLOY_KEY` | Private SSH key (đã được thêm vào `authorized_keys` trên VPS) |

> Các giá trị giữ nguyên như cấu hình GitLab cũ (đổi nơi lưu: GitLab CI Variables → GitHub Actions Secrets).
