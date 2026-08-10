-- CreateTable
CREATE TABLE "job_opening" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "job_opening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "job_opening_published_sort_order_idx" ON "job_opening"("published", "sort_order");

-- CreateIndex
CREATE INDEX "job_opening_created_at_idx" ON "job_opening"("created_at" DESC);

-- Seed initial openings
INSERT INTO "job_opening" ("id", "created_at", "updated_at", "title", "team", "location", "type", "summary", "published", "sort_order")
VALUES
  ('cjob_embedded_firmware', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Embedded Firmware Engineer', 'Hardware & firmware', 'Finland or remote (EU)', 'Full-time', 'Own L1 device firmware, OTAA provisioning, and reliable field updates for construction sites.', true, 10),
  ('cjob_full_stack', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Full-Stack Engineer', 'Platform', 'Finland, Canada, or remote', 'Full-time', 'Ship the CurNext web dashboard, APIs, and site tooling that turn sensor data into readiness decisions.', true, 20),
  ('cjob_field_applications', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Field Applications Engineer', 'Customer success', 'Finland / Canada / Cameroon', 'Full-time', 'Support installs, commissioning, and training so project teams get value from day one on site.', true, 30),
  ('cjob_solutions_sales', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Solutions Sales', 'Commercial', 'Finland or Canada', 'Full-time', 'Scope nodes, duration, and surfaces with contractors and owners - then close quotes that match real sites.', true, 40);
