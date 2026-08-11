"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { isActivePath } from "@/lib/nav-active";
import { cn } from "@/lib/utils";

type FooterNavLinkProps = {
  href: string;
  children: ReactNode;
};

export function FooterNavLink({ href, children }: FooterNavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block text-sm break-words transition-colors",
        active
          ? "text-foreground font-medium underline decoration-foreground/35 underline-offset-4"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
