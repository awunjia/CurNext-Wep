#!/bin/sh
set -u

# Prefer a healthy HTTP origin over blocking forever on migrate.
# Migrations can be re-run once DATABASE_URL / DIRECT_URL are correct.
if [ -n "${DATABASE_URL:-}" ] && [ -f ./node_modules/prisma/build/index.js ]; then
  echo "Applying Prisma migrations..."
  if ! node ./node_modules/prisma/build/index.js migrate deploy; then
    echo "WARNING: prisma migrate deploy failed. Check DATABASE_URL and DIRECT_URL."
    echo "Continuing startup so Cloudflare stops returning 502."
  fi
else
  echo "Skipping Prisma migrations (DATABASE_URL unset or Prisma CLI missing)."
fi

if [ ! -f ./server.js ]; then
  echo "FATAL: server.js missing from standalone image."
  ls -la
  exit 1
fi

echo "Starting Next.js on PORT=${PORT:-3000} HOSTNAME=${HOSTNAME:-0.0.0.0}"
exec node server.js
