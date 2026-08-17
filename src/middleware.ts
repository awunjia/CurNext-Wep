import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const handleI18n = createMiddleware(routing);

export default handleI18n;

export const config = {
  // Skip API routes and static assets so locale rewriting does not break JSON handlers.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
