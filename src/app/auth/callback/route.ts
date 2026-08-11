import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";

const LOCALE_NEXT =
  /^\/(en|fr|fi|sv|es)(\/.*)?$/;

function safeNextPath(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/en/blog";
  }
  // Prefer locale-prefixed return paths; bare marketing paths default to English.
  if (LOCALE_NEXT.test(next)) {
    return next;
  }
  if (next.startsWith("/blog") || next.startsWith("/careers")) {
    return `/en${next}`;
  }
  return "/en/blog";
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"));

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${siteConfig.url}/en/blog?auth_error=1`,
  );
}
