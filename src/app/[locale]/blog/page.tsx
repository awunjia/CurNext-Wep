import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BlogIndexPage } from "@/components/blog-index-page";
import {
  BLOG_PAGE_SIZE,
  countPublishedPosts,
  listPublishedPosts,
} from "@/lib/blog/queries";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return withLocaleMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const requested = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(requested) && requested > 0 ? requested : 1;

  const totalPosts = await countPublishedPosts();
  const totalPages = Math.max(1, Math.ceil(totalPosts / BLOG_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const posts = await listPublishedPosts(currentPage, BLOG_PAGE_SIZE);

  return (
    <BlogIndexPage
      posts={posts}
      page={currentPage}
      totalPages={totalPages}
      totalPosts={totalPosts}
    />
  );
}
