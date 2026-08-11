import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type BlogActor = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  displayName: string;
};

function displayName(user: {
  firstName: string | null;
  lastName: string | null;
  email: string;
}) {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email.split("@")[0] || "CurNext user";
}

/**
 * Resolves the signed-in Supabase user to an active CurNext `users` row.
 * Blog likes/comments require an existing product user (invite-only).
 */
export async function getBlogActor(): Promise<{
  supabaseUserId: string | null;
  actor: BlogActor | null;
  reason: "ok" | "signed_out" | "not_provisioned" | "inactive";
}> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabaseUserId: null, actor: null, reason: "signed_out" };
  }

  const appUser = await prisma.user.findFirst({
    where: { supabaseId: user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      isActive: true,
    },
  });

  if (!appUser) {
    return {
      supabaseUserId: user.id,
      actor: null,
      reason: "not_provisioned",
    };
  }

  if (!appUser.isActive) {
    return {
      supabaseUserId: user.id,
      actor: null,
      reason: "inactive",
    };
  }

  return {
    supabaseUserId: user.id,
    actor: {
      ...appUser,
      displayName: displayName(appUser),
    },
    reason: "ok",
  };
}

export function requireBlogActorJson(
  result: Awaited<ReturnType<typeof getBlogActor>>,
) {
  if (result.reason === "signed_out") {
    return {
      error: "Sign in required to interact with the blog.",
      code: "signed_out" as const,
      status: 401,
    };
  }
  if (result.reason === "not_provisioned") {
    return {
      error:
        "Your login is not linked to a CurNext account. Ask for an invite, then try again.",
      code: "not_provisioned" as const,
      status: 403,
    };
  }
  if (result.reason === "inactive") {
    return {
      error: "This CurNext account is inactive.",
      code: "inactive" as const,
      status: 403,
    };
  }
  return null;
}
