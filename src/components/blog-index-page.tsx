import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageSquare,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { authorDisplayName } from "@/lib/blog/queries";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export type BlogListPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  readingTimeMinutes: number | null;
  publishedAt: Date | null;
  category: { name: string; slug: string } | null;
  author: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  } | null;
  _count: { likes: number; comments: number };
};

type BlogIndexPageProps = {
  posts: BlogListPost[];
  page: number;
  totalPages: number;
  totalPosts: number;
};

function blogPageHref(page: number) {
  if (page <= 1) return "/blog";
  return `/blog?page=${page}`;
}

export async function BlogIndexPage({
  posts,
  page,
  totalPages,
  totalPosts,
}: BlogIndexPageProps) {
  const t = await getTranslations("blog");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();

  function formatDate(value: Date | null) {
    if (!value) return "";
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(value);
  }

  function MetaRow({ post }: { post: BlogListPost }) {
    return (
      <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-[0.12em] uppercase">
        {post.category ? <span>{post.category.name}</span> : null}
        {post.publishedAt ? (
          <>
            {post.category ? <span aria-hidden>·</span> : null}
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
          </>
        ) : null}
        {post.readingTimeMinutes ? (
          <>
            <span aria-hidden>·</span>
            <span>{t("minRead", { count: post.readingTimeMinutes })}</span>
          </>
        ) : null}
      </div>
    );
  }

  function Engagement({ post }: { post: BlogListPost }) {
    return (
      <p className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span>{t("by", { name: authorDisplayName(post.author) })}</span>
        <span className="inline-flex items-center gap-1">
          <Heart className="size-3 opacity-70" aria-hidden />
          {post._count.likes}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageSquare className="size-3 opacity-70" aria-hidden />
          {post._count.comments}
        </span>
      </p>
    );
  }

  const [featured, ...rest] = posts;
  const showFeatured = page === 1 && featured;

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="blog-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                {siteConfig.name}
              </p>
              <h1 id="blog-heading" className={sectionHeadingClassName}>
                {t("title")}
              </h1>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                {t("lead")}
              </p>
            </div>
            {totalPosts > 0 ? (
              <p className="text-muted-foreground shrink-0 text-sm tabular-nums">
                {t("articles", { count: totalPosts })}
              </p>
            ) : null}
          </div>

          {posts.length === 0 ? (
            <p className="text-muted-foreground border-border/70 mt-12 border-y py-10 text-sm">
              {t("empty")}
            </p>
          ) : (
            <>
              {showFeatured ? (
                <article className="border-border/70 mt-12 grid gap-8 border-y py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-12 lg:py-12">
                  {featured.coverImageUrl ? (
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="relative block aspect-[16/10] overflow-hidden bg-muted lg:aspect-[5/3]"
                    >
                      <Image
                        src={featured.coverImageUrl}
                        alt={featured.coverImageAlt || ""}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                      />
                    </Link>
                  ) : (
                    <div className="bg-muted aspect-[16/10] lg:aspect-[5/3]" />
                  )}
                  <div className="min-w-0 lg:py-2">
                    <p className="text-muted-foreground mb-3 text-[11px] font-medium tracking-[0.16em] uppercase">
                      {t("latest")}
                    </p>
                    <MetaRow post={featured} />
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                      <Link
                        href={`/blog/${featured.slug}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {featured.title}
                      </Link>
                    </h2>
                    {featured.excerpt ? (
                      <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-[15px]">
                        {featured.excerpt}
                      </p>
                    ) : null}
                    <Engagement post={featured} />
                    <Link
                      href={`/blog/${featured.slug}`}
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "mt-6 h-9 gap-1.5",
                      )}
                    >
                      {tCommon("readArticle")}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                </article>
              ) : null}

              {(showFeatured ? rest : posts).length > 0 ? (
                <ul
                  className={cn(
                    "grid gap-x-8 gap-y-0 sm:grid-cols-2",
                    showFeatured
                      ? "mt-2"
                      : "mt-12 border-t border-border/70 lg:grid-cols-3",
                  )}
                >
                  {(showFeatured ? rest : posts).map((post) => (
                    <li
                      key={post.id}
                      className="border-border/70 flex flex-col border-b py-8"
                    >
                      {post.coverImageUrl ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="relative mb-5 block aspect-[16/10] overflow-hidden bg-muted"
                        >
                          <Image
                            src={post.coverImageUrl}
                            alt={post.coverImageAlt || ""}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </Link>
                      ) : null}
                      <MetaRow post={post} />
                      <h2 className={cn(itemHeadingClassName, "mt-3")}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="underline-offset-4 hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt ? (
                        <p className="text-muted-foreground mt-3 line-clamp-3 flex-1 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                      ) : (
                        <div className="flex-1" />
                      )}
                      <Engagement post={post} />
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-foreground mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                      >
                        {tCommon("readArticle")}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}

              {totalPages > 1 ? (
                <nav
                  aria-label={t("pagesAria")}
                  className="border-border/70 mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
                >
                  <p className="text-muted-foreground text-sm tabular-nums">
                    {t("pageOf", { page, total: totalPages })}
                  </p>
                  <div className="flex items-center gap-2">
                    {page > 1 ? (
                      <Link
                        href={blogPageHref(page - 1)}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-9 gap-1 px-3",
                        )}
                      >
                        <ChevronLeft className="size-4" aria-hidden />
                        {tCommon("previous")}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-9 gap-1 px-3 opacity-40",
                        )}
                        aria-disabled
                      >
                        <ChevronLeft className="size-4" aria-hidden />
                        {tCommon("previous")}
                      </span>
                    )}
                    {page < totalPages ? (
                      <Link
                        href={blogPageHref(page + 1)}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-9 gap-1 px-3",
                        )}
                      >
                        {tCommon("next")}
                        <ChevronRight className="size-4" aria-hidden />
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-9 gap-1 px-3 opacity-40",
                        )}
                        aria-disabled
                      >
                        {tCommon("next")}
                        <ChevronRight className="size-4" aria-hidden />
                      </span>
                    )}
                  </div>
                </nav>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
