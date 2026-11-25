# Chuyển database từ Supabase sang Postgres trên VPS

Mục tiêu: DB nằm cùng máy với app (VPS ở VN) → mỗi query < 1ms thay vì
~150–250ms tới Supabase Sydney (`ap-southeast-2`).

Thời gian dừng web dự kiến: 5–10 phút (dump + build image). Nên làm lúc ít
người học (tối muộn).

Ký hiệu: `$DEPLOY` = giá trị secret `VPS_DEPLOY_PATH`, `$VPS` = `VPS_HOST`.

---

## Bước 0 — Chuẩn bị (không ảnh hưởng web đang chạy)

1. **Push code** của giai đoạn 2 lên `main`, đợi CI xanh. **Chưa bấm Deploy.**
2. **Tạo mật khẩu DB** (chỉ chữ + số):
   ```bash
   openssl rand -hex 24
   ```
3. **Thêm GitHub Secret** `POSTGRES_PASSWORD` = mật khẩu vừa tạo.
   Giữ nguyên `AUTH_SECRET`, `NEXTAUTH_URL`, `VPS_*`.
   `DATABASE_URL`, `DIRECT_URL` chưa xoá vội (cần để rollback) — xoá sau khi ổn định.
4. **Ghi lại chuỗi kết nối Supabase** (Session pooler, port 5432 — chính là `DIRECT_URL`).
   Dùng ở Bước 2.

## Bước 1 — Chuẩn bị trên VPS (web vẫn chạy với Supabase)

```bash
ssh root@$VPS
cd $DEPLOY
cp docker-compose.yml docker-compose.yml.bak      # để rollback
```

1. **Sửa `docker-compose.yml`** theo mẫu `deploy/docker-compose.example.yml`:
   - thêm service `db` và `migrate`, volume `pgdata`
   - service `web`: thêm `env_file: ./app.env` và `depends_on: db`;
     **giữ nguyên labels/networks Traefik**, thêm network `default` nếu web
     đang khai báo networks riêng
   - bỏ phần `secrets: database_url` ở build của web (không còn dùng)
   - nếu web đang lấy `DATABASE_URL`/`AUTH_SECRET` từ `environment:` hoặc file
     khác thì bỏ đi — từ giờ lấy từ `app.env` (GitHub Actions tự ghi)
2. **Tạo `db.env`** — mật khẩu PHẢI giống hệt secret `POSTGRES_PASSWORD`
   (Postgres chỉ đặt mật khẩu ở lần khởi tạo đầu tiên):
   ```bash
   umask 077
   cat > db.env <<'ENV'
   POSTGRES_USER=app
   POSTGRES_DB=eng_growth
   POSTGRES_PASSWORD=<mật khẩu ở Bước 0>
   ENV
   ```
3. **Chép script lên VPS** (chạy trên máy bạn, trong thư mục repo):
   ```bash
   scp -r scripts/vps root@$VPS:$DEPLOY/repo/scripts/
   ```
4. **Bật Postgres** (chưa ảnh hưởng web):
   ```bash
   docker compose up -d --wait db
   ```

## Bước 2 — Chuyển dữ liệu (bắt đầu dừng web)

```bash
cd $DEPLOY
docker compose stop web                      # dừng ghi vào Supabase
./repo/scripts/vps/migrate-from-supabase.sh '<chuỗi Supabase ở Bước 0.4>'
```

Script dump Supabase → restore vào `db` → in bảng so sánh số dòng từng bảng.
Phải thấy dòng **"Xong: dữ liệu khớp"**. File dump được giữ ở `backups/`.

## Bước 3 — Deploy app trỏ vào DB mới

GitHub → **Actions → Deploy → Run workflow → `production`**.

Workflow sẽ: rsync code → ghi `app.env` + `db.env` → build image →
`prisma migrate deploy` (không có gì mới thì bỏ qua) → bật lại web.

## Bước 4 — Kiểm tra

- Đăng nhập, mở trang chủ / roadmap: phải nhanh rõ rệt.
- Làm 1 bài kiểm tra, ôn vài từ → XP/streak/ôn tập cập nhật đúng.
- `docker compose logs --tail=50 web` không có lỗi kết nối DB.

## Bước 5 — Backup tự động (bắt buộc)

Không còn Supabase lo backup nữa.

```bash
cd $DEPLOY
./repo/scripts/vps/backup-db.sh             # chạy thử
crontab -e
# thêm dòng:
15 3 * * * cd <DEPLOY> && ./repo/scripts/vps/backup-db.sh >> backups/backup.log 2>&1
```

Nên đẩy backup ra ngoài VPS: cài `rclone`, cấu hình 1 remote (Cloudflare R2,
Backblaze B2, Google Drive...) rồi thêm `RCLONE_REMOTE=<remote>:<bucket>` vào
trước lệnh trong cron.

Khôi phục: xem chú thích đầu file `scripts/vps/backup-db.sh`.

Giữ project Supabase thêm 2–3 tuần làm dự phòng rồi mới xoá; sau đó xoá
secret `DATABASE_URL`, `DIRECT_URL` trên GitHub.

---

## Rollback (nếu Bước 3–4 có vấn đề)

```bash
cd $DEPLOY
cp docker-compose.yml.bak docker-compose.yml
```
Rồi chạy lại Deploy `production` từ commit cũ (trước giai đoạn 2), hoặc
`docker compose up -d web` nếu image cũ còn. Supabase vẫn nguyên dữ liệu tại
thời điểm dừng web ở Bước 2 (dữ liệu ghi vào DB mới sau đó sẽ không có ở Supabase).

## Sau khi chuyển xong — công việc thường ngày

- **Có migration mới**: chỉ cần Deploy `production` — migration tự chạy trên VPS
  trước khi web khởi động lại. Job `migrate` vẫn có để chạy riêng khi cần.
- **Seed / script Prisma** trên VPS:
  `docker compose --profile tools run --rm migrate npm run db:seed`
- **Mở psql**: `docker compose exec db sh -c 'psql -U $POSTGRES_USER -d $POSTGRES_DB'`
- **Pool connection**: `DB_POOL_MAX=10` (ghi trong `app.env` bởi workflow).
