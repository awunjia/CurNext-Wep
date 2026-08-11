import { NextResponse } from "next/server";

import { getBlogActor, requireBlogActorJson } from "@/lib/blog/auth";
import { getPublishedPostBySlug } from "@/lib/blog/queries";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ slug: string }> };

const MAX_BODY = 2000;

export async function POST(request: Request, { params }: Params) {
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

  let payload: { body?: string; parentId?: string | null };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = (payload.body ?? "").trim();
  if (!body) {
    return NextResponse.json({ error: "Comment cannot be empty." }, { status: 400 });
  }
  if (body.length > MAX_BODY) {
    return NextResponse.json(
      { error: `Comment must be ${MAX_BODY} characters or fewer.` },
      { status: 400 },
    );
  }

  const parentId = payload.parentId ?? null;
  if (parentId) {
    const parent = await prisma.blogComment.findFirst({
      where: {
        id: parentId,
        postId: post.id,
        status: "VISIBLE",
        deletedAt: null,
      },
      select: { id: true, parentId: true },
    });
    if (!parent) {
      return NextResponse.json({ error: "Parent comment not found." }, { status: 404 });
    }
    if (parent.parentId) {
      return NextResponse.json(
        { error: "Replies can only be nested one level deep." },
        { status: 400 },
      );
    }
  }

  const comment = await prisma.blogComment.create({
    data: {
      postId: post.id,
      userId: auth.actor!.id,
      parentId,
      body,
      status: "VISIBLE",
    },
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

  return NextResponse.json({ comment }, { status: 201 });
}
