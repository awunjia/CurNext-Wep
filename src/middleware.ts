import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const handleI18n = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Keep API and auth callback outside locale prefixes.
  if (pathname.startsWith("/api") || pathname.startsWith("/auth")) {
    return updateSession(request);
  }

  const response = handleI18n(request);

  // Refresh Supabase cookies on marketing pages when configured.
  const sessionResponse = await updateSession(request);
  for (const cookie of sessionResponse.cookies.getAll()) {
    response.cookies.set(cookie);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
