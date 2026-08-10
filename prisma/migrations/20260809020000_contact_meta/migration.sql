-- AlterTable
ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "turnstile_hostname" TEXT;
ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "ip_address" TEXT;
ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "read_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "contacts_read_at_idx" ON "contacts"("read_at");
