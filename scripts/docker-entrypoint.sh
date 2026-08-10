#!/bin/sh
set -eu

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Applying Prisma migrations..."
  ./node_modules/.bin/prisma migrate deploy
else
  echo "Skipping Prisma migrations (DATABASE_URL not set)."
fi

exec node server.js
