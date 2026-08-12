import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const handleI18n = createMiddleware(routing);

export default handleI18n;

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
