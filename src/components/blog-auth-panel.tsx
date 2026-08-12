"use client";

import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type BlogAuthPanelProps = {
  nextPath: string;
  reason: "signed_out" | "not_provisioned" | "inactive";
  actorLabel?: string | null;
};

export function BlogAuthPanel({
  reason,
}: BlogAuthPanelProps) {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");

  const title =
    reason === "inactive"
      ? t("accountInactive")
      : reason === "not_provisioned"
        ? t("accountRequired")
        : t("signInTitle");

  const body =
    reason === "inactive"
      ? t("inactiveBody")
      : reason === "not_provisioned"
        ? t("notProvisioned")
        : t("signInBody");

  return (
    <div className="border-border/70 rounded-lg border px-4 py-4 sm:px-5">
      <p className="text-sm font-medium tracking-tight">{title}</p>
      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{body}</p>
      <a
        href={siteConfig.links.dashboard}
        className={cn(buttonVariants({ size: "sm" }), "mt-3 inline-flex")}
      >
        {tCommon("openDashboard")}
      </a>
    </div>
  );
}
