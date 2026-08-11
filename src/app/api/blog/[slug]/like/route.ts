import { NextResponse } from "next/server";

import { getBlogActor, requireBlogActorJson } from "@/lib/blog/auth";
import { getPublishedPostBySlug } from "@/lib/blog/queries";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ slug: string }> };

export async function POST(_request: Request, { params }: Params) {
  const { slug } = await params;
  const auth = await getBlogActor();
  const denied = requireBlogActorJson(auth);
  if (denied) {
    return NextResponse.json(
      { error: denied.error, code: denied.code },
      { status: denied.status },
    );
  }

  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  const existing = await prisma.blogPostLike.findUnique({
    where: {
      postId_userId: { postId: post.id, userId: auth.actor!.id },
    },
  });

  if (existing) {
    await prisma.blogPostLike.delete({ where: { id: existing.id } });
    const likeCount = await prisma.blogPostLike.count({
      where: { postId: post.id },
    });
    return NextResponse.json({ liked: false, likeCount });
  }

  await prisma.blogPostLike.create({
    data: { postId: post.id, userId: auth.actor!.id },
  });
  const likeCount = await prisma.blogPostLike.count({
    where: { postId: post.id },
  });
  return NextResponse.json({ liked: true, likeCount });
}
