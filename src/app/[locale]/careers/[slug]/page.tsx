import { Link } from "@/i18n/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JobApplicationForm } from "@/components/job-application-form";
import {
  formatEmploymentType,
  formatWorkArrangement,
  htmlToPlainSummary,
} from "@/config/careers";
import { withLocaleMetadata } from "@/lib/i18n-metadata";
import { prisma } from "@/lib/prisma";
import { sectionHeadingClassName } from "@/lib/typography";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getOpening(slug: string) {
  return prisma.jobOpening.findFirst({
    where: {
      OR: [{ publicSlug: slug }, { id: slug }],
      status: "OPEN",
      deletedAt: null,
      publishedAt: { not: null },
    },
    select: {
      id: true,
      title: true,
      location: true,
      employmentType: true,
      workArrangement: true,
      description: true,
      responsibilities: true,
      requirements: true,
      publicSlug: true,
      department: { select: { name: true } },
    },
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const opening = await getOpening(slug);
  if (!opening) {
    return withLocaleMetadata({
      locale,
      path: `/careers/${slug}`,
      title: "Role not found",
      description: "Open role at CurNext.",
    });
  }

  const pathSlug = opening.publicSlug ?? opening.id;
  const description =
    htmlToPlainSummary(opening.description, 160) ||
    `Open role at CurNext: ${opening.title}`;

  return withLocaleMetadata({
    locale,
    path: `/careers/${pathSlug}`,
    title: opening.title,
    description,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const opening = await getOpening(slug);
  if (!opening) notFound();

  const arrangement = formatWorkArrangement(opening.workArrangement);
  const typeParts = [
    formatEmploymentType(opening.employmentType),
    arrangement,
  ].filter(Boolean);
  const team = opening.department?.name ?? "CurNext";
  const location = opening.location?.trim() || "Location flexible";

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative w-full bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <Link
            href="/careers#open-roles"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All open roles
          </Link>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                Open role
              </p>
              <h1 className={sectionHeadingClassName}>{opening.title}</h1>
              <p className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-[15px]">
                <span>{team}</span>
                <span aria-hidden className="text-border">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" aria-hidden />
                  {location}
                </span>
                {typeParts.length > 0 ? (
                  <>
                    <span aria-hidden className="text-border">
                      ·
                    </span>
                    <span>{typeParts.join(" · ")}</span>
                  </>
                ) : null}
              </p>

              <div className="mt-10 space-y-10 sm:mt-12">
                {opening.description ? (
                  <RoleHtmlBlock
                    title="About the role"
                    html={opening.description}
                  />
                ) : null}
                {opening.responsibilities ? (
                  <RoleHtmlBlock
                    title="Responsibilities"
                    html={opening.responsibilities}
                  />
                ) : null}
                {opening.requirements ? (
                  <RoleHtmlBlock
                    title="Requirements"
                    html={opening.requirements}
                  />
                ) : null}
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <JobApplicationForm
                jobOpeningId={opening.id}
                roleTitle={opening.title}
              />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function RoleHtmlBlock({ title, html }: { title: string; html: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold tracking-tight sm:text-lg">
        {title}
      </h2>
      <div
        className="text-muted-foreground careers-role-html mt-3 text-sm leading-relaxed sm:text-[15px] [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_p:first-child]:mt-0 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
