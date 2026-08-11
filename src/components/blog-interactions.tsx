"use client";

import { useMemo, useState, useTransition } from "react";
import { Heart, MessageSquare, Reply, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import { BlogAuthPanel } from "@/components/blog-auth-panel";
import { buttonVariants } from "@/components/ui/button";
import type { BlogActor } from "@/lib/blog/auth";
import { cn } from "@/lib/utils";

export type BlogCommentView = {
  id: string;
  body: string;
  parentId: string | null;
  createdAt: string;
  editedAt: string | null;
  userId: string;
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    avatarUrl: string | null;
  };
};

type BlogInteractionsProps = {
  slug: string;
  nextPath: string;
  initialLikeCount: number;
  initialLiked: boolean;
  initialComments: BlogCommentView[];
  authReason: "ok" | "signed_out" | "not_provisioned" | "inactive";
  actor: BlogActor | null;
};

function commentName(user: BlogCommentView["user"]) {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email.split("@")[0] || "User";
}

export function BlogInteractions({
  slug,
  nextPath,
  initialLikeCount,
  initialLiked,
  initialComments,
  authReason,
  actor,
}: BlogInteractionsProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(initialLiked);
  const [comments, setComments] = useState(initialComments);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const canInteract = authReason === "ok" && !!actor;

  const roots = useMemo(
    () => comments.filter((c) => !c.parentId),
    [comments],
  );
  const repliesByParent = useMemo(() => {
    const map = new Map<string, BlogCommentView[]>();
    for (const comment of comments) {
      if (!comment.parentId) continue;
      const list = map.get(comment.parentId) ?? [];
      list.push(comment);
      map.set(comment.parentId, list);
    }
    return map;
  }, [comments]);

  function formatWhen(iso: string) {
    try {
      return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  function toggleLike() {
    if (!canInteract) {
      toast.message(t("signInToLike"));
      return;
    }
    startTransition(async () => {
      const response = await fetch(`/api/blog/${slug}/like`, { method: "POST" });
      const data = (await response.json()) as {
        liked?: boolean;
        likeCount?: number;
        error?: string;
      };
      if (!response.ok) {
        toast.error(data.error ?? t("couldNotLike"));
        return;
      }
      setLiked(Boolean(data.liked));
      setLikeCount(data.likeCount ?? likeCount);
    });
  }

  function submitComment() {
    if (!canInteract) {
      toast.message(t("signInToComment"));
      return;
    }
    const body = draft.trim();
    if (!body) {
      toast.error(t("writeCommentFirst"));
      return;
    }
    startTransition(async () => {
      const response = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, parentId: replyTo }),
      });
      const data = (await response.json()) as {
        comment?: BlogCommentView;
        error?: string;
      };
      if (!response.ok || !data.comment) {
        toast.error(data.error ?? t("couldNotPost"));
        return;
      }
      setComments((prev) => [
        ...prev,
        {
          ...data.comment!,
          createdAt:
            typeof data.comment!.createdAt === "string"
              ? data.comment!.createdAt
              : new Date(data.comment!.createdAt).toISOString(),
          editedAt: data.comment!.editedAt
            ? typeof data.comment!.editedAt === "string"
              ? data.comment!.editedAt
              : new Date(data.comment!.editedAt).toISOString()
            : null,
        },
      ]);
      setDraft("");
      setReplyTo(null);
      toast.success(replyTo ? t("replyPosted") : t("commentPosted"));
    });
  }

  function deleteComment(id: string) {
    if (!canInteract) return;
    startTransition(async () => {
      const response = await fetch(`/api/blog/comments/${id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        toast.error(data.error ?? t("couldNotDelete"));
        return;
      }
      setComments((prev) =>
        prev.filter((c) => c.id !== id && c.parentId !== id),
      );
      toast.success(t("commentDeleted"));
    });
  }

  return (
    <section
      className="mt-12 border-t border-border/70 pt-10"
      aria-label={t("interactionsAria")}
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={toggleLike}
          className={cn(
            buttonVariants({
              variant: liked ? "default" : "outline",
              size: "sm",
            }),
            "gap-1.5",
          )}
          aria-pressed={liked}
        >
          <Heart
            className={cn("size-3.5", liked && "fill-current")}
            aria-hidden
          />
          {liked ? t("liked") : t("like")}
          <span className="text-xs opacity-80">({likeCount})</span>
        </button>
        <p className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
          <MessageSquare className="size-3.5" aria-hidden />
          {t("commentCount", { count: comments.length })}
        </p>
      </div>

      {!canInteract ? (
        <div className="mt-6">
          <BlogAuthPanel
            nextPath={nextPath}
            reason={authReason === "ok" ? "signed_out" : authReason}
          />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="text-muted-foreground text-sm">
            {t("signedInAs", { name: actor!.displayName })}
          </p>
          {replyTo ? (
            <p className="text-muted-foreground text-xs">
              {t("replying")}{" "}
              <button
                type="button"
                className="underline-offset-4 hover:underline"
                onClick={() => setReplyTo(null)}
              >
                {t("cancelReply")}
              </button>
            </p>
          ) : null}
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            maxLength={2000}
            placeholder={replyTo ? t("writeReply") : t("writeComment")}
            className="border-border/70 bg-background focus-visible:border-ring focus-visible:ring-ring/40 w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-3"
          />
          <button
            type="button"
            disabled={pending || !draft.trim()}
            onClick={submitComment}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            {replyTo ? t("postReply") : t("postComment")}
          </button>
        </div>
      )}

      <ul className="mt-10 space-y-6">
        {roots.map((comment) => {
          const replies = repliesByParent.get(comment.id) ?? [];
          return (
            <li
              key={comment.id}
              className="border-border/60 border-b pb-6 last:border-b-0"
            >
              <CommentBlock
                comment={comment}
                canInteract={canInteract}
                isOwner={actor?.id === comment.userId}
                pending={pending}
                formatWhen={formatWhen}
                replyLabel={t("reply")}
                deleteLabel={t("delete")}
                onReply={() => {
                  if (!canInteract) {
                    toast.message(t("signInToReply"));
                    return;
                  }
                  setReplyTo(comment.id);
                }}
                onDelete={() => deleteComment(comment.id)}
              />
              {replies.length > 0 ? (
                <ul className="mt-4 space-y-4 border-l border-border/60 pl-4 sm:pl-5">
                  {replies.map((reply) => (
                    <li key={reply.id}>
                      <CommentBlock
                        comment={reply}
                        canInteract={canInteract}
                        isOwner={actor?.id === reply.userId}
                        pending={pending}
                        formatWhen={formatWhen}
                        replyLabel={t("reply")}
                        deleteLabel={t("delete")}
                        onReply={() => {
                          if (!canInteract) {
                            toast.message(t("signInToReply"));
                            return;
                          }
                          setReplyTo(comment.id);
                        }}
                        onDelete={() => deleteComment(reply.id)}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function CommentBlock({
  comment,
  canInteract,
  isOwner,
  pending,
  formatWhen,
  replyLabel,
  deleteLabel,
  onReply,
  onDelete,
}: {
  comment: BlogCommentView;
  canInteract: boolean;
  isOwner: boolean;
  pending: boolean;
  formatWhen: (iso: string) => string;
  replyLabel: string;
  deleteLabel: string;
  onReply: () => void;
  onDelete: () => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <p className="text-sm font-medium tracking-tight">
          {commentName(comment.user)}
        </p>
        <time
          dateTime={comment.createdAt}
          className="text-muted-foreground text-xs"
        >
          {formatWhen(comment.createdAt)}
        </time>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
        {comment.body}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!canInteract || pending}
          onClick={onReply}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-medium disabled:opacity-50"
        >
          <Reply className="size-3" aria-hidden />
          {replyLabel}
        </button>
        {isOwner ? (
          <button
            type="button"
            disabled={pending}
            onClick={onDelete}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-medium disabled:opacity-50"
          >
            <Trash2 className="size-3" aria-hidden />
            {deleteLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
