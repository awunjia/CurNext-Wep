export type BlogActor = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  displayName: string;
};

/**
 * Marketing site (curnext.app) does not host product login.
 * Users sign in on dash.curnext.app only.
 */
export async function getBlogActor(): Promise<{
  supabaseUserId: string | null;
  actor: BlogActor | null;
  reason: "ok" | "signed_out" | "not_provisioned" | "inactive";
}> {
  return { supabaseUserId: null, actor: null, reason: "signed_out" };
}

export function requireBlogActorJson(
  result: Awaited<ReturnType<typeof getBlogActor>>,
) {
  if (result.reason === "signed_out") {
    return {
      error: "Sign in on dash.curnext.app to interact with the blog.",
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
