import type { Metadata } from "next";

import { CareersPage } from "@/components/careers-page";
import {
  CAREERS_ROLES_PAGE_SIZE,
  formatEmploymentType,
  formatWorkArrangement,
  htmlToPlainSummary,
  type CareerRole,
} from "@/config/careers";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Careers | CurNext",
  description:
    "CurNext is an equal opportunity workplace. Explore open roles with remote work, a four-day week, 30+ holidays, and health insurance.",
  openGraph: {
    title: `Careers | ${siteConfig.name}`,
    description:
      "Equal opportunity careers at CurNext - united by delivering excellent products for monitoring.",
    url: `${siteConfig.url}/careers`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const requested = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(requested) && requested > 0 ? requested : 1;

  const where = {
    status: "OPEN" as const,
    deletedAt: null,
    publishedAt: { not: null },
  };

  const totalRoles = await prisma.jobOpening.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalRoles / CAREERS_ROLES_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const skip = (currentPage - 1) * CAREERS_ROLES_PAGE_SIZE;

  const openings = await prisma.jobOpening.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    skip,
    take: CAREERS_ROLES_PAGE_SIZE,
    select: {
      id: true,
      title: true,
      location: true,
      employmentType: true,
      workArrangement: true,
      description: true,
      publicSlug: true,
      department: {
        select: { name: true },
      },
    },
  });

  const roles: CareerRole[] = openings.map((opening) => {
    const arrangement = formatWorkArrangement(opening.workArrangement);
    const typeParts = [
      formatEmploymentType(opening.employmentType),
      arrangement,
    ].filter(Boolean);
    const slug = opening.publicSlug?.trim() || opening.id;

    return {
      id: opening.id,
      title: opening.title,
      team: opening.department?.name ?? "CurNext",
      location: opening.location?.trim() || "Location flexible",
      type: typeParts.join(" · "),
      summary:
        htmlToPlainSummary(opening.description) ||
        "See the role details and apply to learn more.",
      href: `/careers/${slug}`,
    };
  });

  return (
    <CareersPage
      roles={roles}
      page={currentPage}
      totalPages={totalPages}
      totalRoles={totalRoles}
    />
  );
}
