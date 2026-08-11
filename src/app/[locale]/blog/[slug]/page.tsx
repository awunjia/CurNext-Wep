import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostPageView } from "@/components/blog-post-page";
import { getBlogActor } from "@/lib/blog/auth";
import {
  getPublishedPostBySlug,
  listVisibleComments,
} from "@/lib/blog/queries";
import { withLocaleMetadata } from "@/lib/i18n-metadata";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return withLocaleMetadata({
      locale,
      path: `/blog/${slug}`,
      title: "Post not found",
      description: "CurNext blog article.",
    });
  }

  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.excerpt || "CurNext blog article.";
  const base = withLocaleMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title,
    description,
  });

  return {
    ...base,
    robots: {
      index: post.robotsIndex,
      follow: post.robotsFollow,
    },
    openGraph: {
      ...base.openGraph,
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      type: "article",
      images:
        post.ogImageUrl || post.coverImageUrl
          ? [{ url: (post.ogImageUrl || post.coverImageUrl)! }]
          : base.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      images:
        post.ogImageUrl || post.coverImageUrl
          ? [(post.ogImageUrl || post.coverImageUrl)!]
          : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const [comments, auth] = await Promise.all([
    listVisibleComments(post.id),
    getBlogActor(),
  ]);

  let liked = false;
  if (auth.actor) {
    const like = await prisma.blogPostLike.findUnique({
      where: {
        postId_userId: { postId: post.id, userId: auth.actor.id },
      },
      select: { id: true },
    });
    liked = Boolean(like);
  }

  return (
    <BlogPostPageView
      post={post}
      liked={liked}
      authReason={auth.reason}
      actor={auth.actor}
      comments={comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
        editedAt: comment.editedAt ? comment.editedAt.toISOString() : null,
      }))}
    />
  );
}
