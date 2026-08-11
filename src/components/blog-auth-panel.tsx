"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

type BlogAuthPanelProps = {
  nextPath: string;
  reason: "signed_out" | "not_provisioned" | "inactive";
  actorLabel?: string | null;
};

function localeAwareNext(locale: string, nextPath: string) {
  if (/^\/(en|fr|fi|sv|es)(\/|$)/.test(nextPath)) {
    return nextPath;
  }
  const path = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `/${locale}${path}`;
}

export function BlogAuthPanel({
  nextPath,
  reason,
  actorLabel,
}: BlogAuthPanelProps) {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [pending, setPending] = useState(false);

  async function signInWithGoogle() {
    setPending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const next = localeAwareNext(locale, nextPath);
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) {
        toast.error(error.message);
        setPending(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("couldNotSignIn"),
      );
      setPending(false);
    }
  }

  async function signOut() {
    setPending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      window.location.reload();
    } catch {
      toast.error(t("couldNotSignOut"));
      setPending(false);
    }
  }

  if (reason === "signed_out") {
    return (
      <div className="border-border/70 rounded-lg border px-4 py-4 sm:px-5">
        <p className="text-sm font-medium tracking-tight">{t("signInTitle")}</p>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          {t("signInBody")}
        </p>
        <button
          type="button"
          disabled={pending}
          onClick={() => void signInWithGoogle()}
          className={cn(buttonVariants({ size: "sm" }), "mt-3")}
        >
          {pending ? t("redirecting") : t("signInGoogle")}
        </button>
      </div>
    );
  }

  return (
    <div className="border-border/70 rounded-lg border px-4 py-4 sm:px-5">
      <p className="text-sm font-medium tracking-tight">
        {reason === "inactive" ? t("accountInactive") : t("accountRequired")}
      </p>
      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
        {reason === "inactive" ? t("inactiveBody") : t("notProvisioned")}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={siteConfig.links.dashboard}
          className={cn(buttonVariants({ size: "sm" }))}
        >
          {tCommon("openDashboard")}
        </a>
        <button
          type="button"
          disabled={pending}
          onClick={() => void signOut()}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          {t("signOut")}
          {actorLabel ? ` (${actorLabel})` : ""}
        </button>
      </div>
    </div>
  );
}
