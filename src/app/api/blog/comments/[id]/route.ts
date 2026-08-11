import { NextResponse } from "next/server";

import { getBlogActor, requireBlogActorJson } from "@/lib/blog/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await getBlogActor();
  const denied = requireBlogActorJson(auth);
  if (denied) {
    return NextResponse.json(
      { error: denied.error, code: denied.code },
      { status: denied.status },
    );
  }

  const comment = await prisma.blogComment.findFirst({
    where: {
      id,
      status: "VISIBLE",
      deletedAt: null,
    },
    select: { id: true, userId: true },
  });

  if (!comment) {
    return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  }

  if (comment.userId !== auth.actor!.id) {
    return NextResponse.json(
      { error: "You can only delete your own comments." },
      { status: 403 },
    );
  }

  await prisma.blogComment.update({
    where: { id: comment.id },
    data: {
      status: "DELETED",
      deletedAt: new Date(),
      body: "[deleted]",
    },
  });

  return NextResponse.json({ ok: true });
}
