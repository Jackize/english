#!/usr/bin/env bash
# ============================================================
# Chuyển dữ liệu từ Supabase sang Postgres trên VPS (chạy MỘT lần).
#
# Chạy trên VPS, trong thư mục ${VPS_DEPLOY_PATH} (nơi có docker-compose.yml):
#   ./repo/scripts/vps/migrate-from-supabase.sh 'postgresql://postgres.<ref>:<pass>@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require'
#
# Dùng chuỗi Session pooler (port 5432) hoặc Direct connection của Supabase.
# Script:
#   1. bật container db và chờ sẵn sàng
#   2. từ chối chạy nếu DB đích đã có dữ liệu (trừ khi thêm --force)
#   3. pg_dump schema "public" của Supabase → backups/supabase-<thời gian>.dump
#   4. pg_restore vào db trong một transaction (lỗi thì không ghi gì)
#   5. so sánh số dòng từng bảng giữa Supabase và VPS
# ============================================================
set -euo pipefail

SRC_URL="${1:-}"
FORCE="${2:-}"
if [ -z "$SRC_URL" ]; then
  echo "Cách dùng: $0 '<SUPABASE_URL>' [--force]" >&2
  exit 1
fi
if [ ! -f docker-compose.yml ] && [ ! -f compose.yml ]; then
  echo "Hãy chạy trong thư mục có docker-compose.yml (\${VPS_DEPLOY_PATH})." >&2
  exit 1
fi

# libpq không hiểu các tham số riêng của Prisma/pgbouncer → bỏ đi.
SRC_URL="$(printf '%s' "$SRC_URL" | sed -E ':a; s/([?&])(pgbouncer|connection_limit|pool_timeout|schema)=[^&]*(&|$)/\1/; ta; s/[?&]$//')"
case "$SRC_URL" in *sslmode=*) ;; *\?*) SRC_URL="${SRC_URL}&sslmode=require" ;; *) SRC_URL="${SRC_URL}?sslmode=require" ;; esac

PG_IMAGE="postgres:17-alpine"
DUMP_DIR="$(pwd)/backups"
DUMP_FILE="supabase-$(date +%Y%m%d-%H%M%S).dump"
mkdir -p "$DUMP_DIR"

db_psql() { docker compose exec -T db sh -c 'psql -v ON_ERROR_STOP=1 -qtAX -U "$POSTGRES_USER" -d "$POSTGRES_DB"' ; }
src_psql() { docker run --rm -i "$PG_IMAGE" psql -v ON_ERROR_STOP=1 -qtAX "$SRC_URL" ; }

echo "==> Bật container db"
docker compose up -d --wait db

echo "==> Kiểm tra DB đích còn trống"
existing="$(echo "SELECT count(*) FROM pg_tables WHERE schemaname = 'public';" | db_psql)"
if [ "$existing" != "0" ] && [ "$FORCE" != "--force" ]; then
  echo "DB trên VPS đã có $existing bảng. Dừng lại để không ghi đè." >&2
  echo "Nếu chắc chắn muốn ghi đè, chạy lại với tham số --force." >&2
  exit 1
fi

echo "==> Kiểm tra kết nối tới Supabase"
echo "SELECT version();" | src_psql

echo "==> pg_dump từ Supabase → backups/$DUMP_FILE"
docker run --rm -v "$DUMP_DIR:/dump" "$PG_IMAGE" \
  pg_dump "$SRC_URL" --schema=public --no-owner --no-acl -Fc -f "/dump/$DUMP_FILE"
ls -lh "$DUMP_DIR/$DUMP_FILE"

echo "==> pg_restore vào db (single transaction)"
docker compose exec -T db sh -c \
  'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists --no-owner --no-acl --single-transaction --exit-on-error' \
  < "$DUMP_DIR/$DUMP_FILE"

echo "==> ANALYZE"
echo "ANALYZE;" | db_psql

echo "==> So sánh số dòng (Supabase | VPS)"
tables="$(echo "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1;" | db_psql)"
mismatch=0
printf '%-28s %10s %10s\n' "TABLE" "SUPABASE" "VPS"
for t in $tables; do
  src_count="$(echo "SELECT count(*) FROM public.\"$t\";" | src_psql)"
  dst_count="$(echo "SELECT count(*) FROM public.\"$t\";" | db_psql)"
  mark=""
  if [ "$src_count" != "$dst_count" ]; then mark="  <-- KHÁC"; mismatch=1; fi
  printf '%-28s %10s %10s%s\n' "$t" "$src_count" "$dst_count" "$mark"
done

if [ "$mismatch" = "1" ]; then
  echo "CÓ BẢNG LỆCH SỐ DÒNG. Có thể app vẫn đang ghi vào Supabase trong lúc dump." >&2
  echo "Dừng web (docker compose stop web) rồi chạy lại với --force." >&2
  exit 2
fi
echo "==> Xong: dữ liệu khớp. File dump giữ tại backups/$DUMP_FILE"
