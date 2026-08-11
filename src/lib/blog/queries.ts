import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const BLOG_PAGE_SIZE = 5;

/** String literals avoid Turbopack enum-import issues with @prisma/client. */
function publishedWhere(now = new Date()): Prisma.BlogPostWhereInput {
  return {
    status: "PUBLISHED",
    deletedAt: null,
    publishedAt: { not: null, lte: now },
  };
}

const listSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  coverImageUrl: true,
  coverImageAlt: true,
  readingTimeMinutes: true,
  publishedAt: true,
  category: { select: { name: true, slug: true } },
  author: {
    select: { firstName: true, lastName: true, email: true },
  },
  _count: {
    select: {
      likes: true,
      comments: {
        where: {
          status: "VISIBLE" as const,
          deletedAt: null,
        },
      },
    },
  },
} satisfies Prisma.BlogPostSelect;

export async function countPublishedPosts() {
  return prisma.blogPost.count({ where: publishedWhere() });
}

export async function listPublishedPosts(page = 1, pageSize = BLOG_PAGE_SIZE) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const skip = (safePage - 1) * pageSize;

  return prisma.blogPost.findMany({
    where: publishedWhere(),
    orderBy: { publishedAt: "desc" },
    skip,
    take: pageSize,
    select: listSelect,
  });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { ...publishedWhere(), slug },
    include: {
      category: { select: { name: true, slug: true } },
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
        },
      },
      tags: {
        include: { tag: { select: { name: true, slug: true } } },
      },
      _count: {
        select: {
          likes: true,
          comments: {
            where: {
              status: "VISIBLE",
              deletedAt: null,
            },
          },
        },
      },
    },
  });
}

export async function listVisibleComments(postId: string) {
  return prisma.blogComment.findMany({
    where: {
      postId,
      status: "VISIBLE",
      deletedAt: null,
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      body: true,
      parentId: true,
      createdAt: true,
      editedAt: true,
      userId: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
        },
      },
    },
  });
}

export function authorDisplayName(author: {
  firstName: string | null;
  lastName: string | null;
  email: string;
} | null) {
  if (!author) return "CurNext";
  const name = [author.firstName, author.lastName].filter(Boolean).join(" ").trim();
  return name || "CurNext";
}
