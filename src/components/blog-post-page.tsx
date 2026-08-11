import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";

import {
  BlogInteractions,
  type BlogCommentView,
} from "@/components/blog-interactions";
import { Link } from "@/i18n/navigation";
import type { BlogActor } from "@/lib/blog/auth";
import { authorDisplayName } from "@/lib/blog/queries";
import { sectionHeadingClassName } from "@/lib/typography";
import { siteConfig } from "@/config/site";

type BlogPostPageProps = {
  post: {
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImageUrl: string | null;
    coverImageAlt: string | null;
    readingTimeMinutes: number | null;
    publishedAt: Date | null;
    category: { name: string; slug: string } | null;
    author: {
      firstName: string | null;
      lastName: string | null;
      email: string;
      avatarUrl: string | null;
    } | null;
    tags: { tag: { name: string; slug: string } }[];
    _count: { likes: number; comments: number };
  };
  comments: BlogCommentView[];
  liked: boolean;
  authReason: "ok" | "signed_out" | "not_provisioned" | "inactive";
  actor: BlogActor | null;
};

export async function BlogPostPageView({
  post,
  comments,
  liked,
  authReason,
  actor,
}: BlogPostPageProps) {
  const t = await getTranslations("blog");
  const locale = await getLocale();

  function formatDate(value: Date | null) {
    if (!value) return "";
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(value);
  }

  return (
    <main className="flex flex-1 flex-col">
      <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {t("back")}
        </Link>

        <header className="mt-8">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            {siteConfig.name}
            {post.category ? ` · ${post.category.name}` : ""}
          </p>
          <h1 className={sectionHeadingClassName}>{post.title}</h1>
          <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span>{t("by", { name: authorDisplayName(post.author) })}</span>
            {post.publishedAt ? (
              <>
                <span aria-hidden>·</span>
                <time dateTime={post.publishedAt.toISOString()}>
                  {formatDate(post.publishedAt)}
                </time>
              </>
            ) : null}
            {post.readingTimeMinutes ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  {t("minReadLong", { count: post.readingTimeMinutes })}
                </span>
              </>
            ) : null}
          </div>
          {post.excerpt ? (
            <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg">
              {post.excerpt}
            </p>
          ) : null}
        </header>

        {post.coverImageUrl ? (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 48rem"
              priority
            />
          </div>
        ) : null}

        <div className="mt-10 space-y-4 text-[15px] leading-relaxed sm:text-base">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="mt-10 text-xl font-semibold tracking-tight first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 text-lg font-semibold tracking-tight">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-muted-foreground leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="text-muted-foreground list-disc space-y-2 pl-5">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="text-muted-foreground list-decimal space-y-2 pl-5">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="text-foreground font-semibold">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-foreground font-medium underline-offset-4 hover:underline"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-border text-muted-foreground border-l-2 pl-4 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.9em]">
                  {children}
                </code>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {post.tags.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-2">
            {post.tags.map(({ tag }) => (
              <li
                key={tag.slug}
                className="text-muted-foreground border-border/70 rounded-full border px-2.5 py-1 text-xs"
              >
                {tag.name}
              </li>
            ))}
          </ul>
        ) : null}

        <BlogInteractions
          slug={post.slug}
          nextPath={`/blog/${post.slug}`}
          initialLikeCount={post._count.likes}
          initialLiked={liked}
          initialComments={comments}
          authReason={authReason}
          actor={actor}
        />
      </article>
    </main>
  );
}
