-- CreateTable
CREATE TABLE "quote_requests" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT,
    "site_size" TEXT NOT NULL,
    "subscription_tier" TEXT NOT NULL,
    "solutions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "message" TEXT,
    "source" TEXT NOT NULL DEFAULT 'request-quote',
    "turnstile_hostname" TEXT,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "quote_requests_created_at_idx" ON "quote_requests"("created_at" DESC);

-- CreateIndex
CREATE INDEX "quote_requests_email_idx" ON "quote_requests"("email");

-- CreateIndex
CREATE INDEX "quote_requests_read_at_idx" ON "quote_requests"("read_at");
