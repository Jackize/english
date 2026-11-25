#!/usr/bin/env bash
# ============================================================
# Backup Postgres trên VPS (pg_dump dạng custom, nén sẵn).
#
# Chạy trong thư mục ${VPS_DEPLOY_PATH}:
#   ./repo/scripts/vps/backup-db.sh
#
# Biến môi trường (tuỳ chọn):
#   BACKUP_DIR    thư mục lưu (mặc định ./backups)
#   KEEP_DAYS     số ngày giữ bản backup trên VPS (mặc định 14)
#   RCLONE_REMOTE nếu đặt (vd "r2:eng-growth-backups"), copy bản backup ra
#                 ngoài VPS bằng rclone — NÊN dùng, vì backup chỉ nằm trên VPS
#                 thì hỏng VPS là mất cả hai.
#
# Cron mỗi ngày 3h15 sáng (crontab -e):
#   15 3 * * * cd /đường/dẫn/deploy && ./repo/scripts/vps/backup-db.sh >> backups/backup.log 2>&1
#
# Khôi phục từ một file backup:
#   docker compose exec -T db sh -c 'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists --no-owner --no-acl --single-transaction' < backups/<file>.dump
# ============================================================
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-$(pwd)/backups}"
KEEP_DAYS="${KEEP_DAYS:-14}"
mkdir -p "$BACKUP_DIR"

file="$BACKUP_DIR/eng_growth-$(date +%Y%m%d-%H%M%S).dump"
tmp="$file.partial"

docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --no-acl -Fc' > "$tmp"
if [ ! -s "$tmp" ]; then
  echo "$(date -Is) Backup rỗng, bỏ qua" >&2
  rm -f "$tmp"
  exit 1
fi
mv "$tmp" "$file"
echo "$(date -Is) OK $(du -h "$file" | cut -f1) $file"

find "$BACKUP_DIR" -name 'eng_growth-*.dump' -mtime +"$KEEP_DAYS" -delete

if [ -n "${RCLONE_REMOTE:-}" ]; then
  rclone copy "$file" "$RCLONE_REMOTE"
  echo "$(date -Is) Đã copy lên $RCLONE_REMOTE"
fi
