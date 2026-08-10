-- AlterTable
ALTER TABLE "newsletter_subscribers" ADD COLUMN "turnstile_hostname" TEXT;

-- CreateIndex
CREATE INDEX "newsletter_subscribers_ip_address_created_at_idx" ON "newsletter_subscribers"("ip_address", "created_at" DESC);
