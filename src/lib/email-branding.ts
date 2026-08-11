import { readFileSync } from "node:fs";
import path from "node:path";

import { siteConfig } from "@/config/site";

export const CURNEXT_LOGO_CID = "curnext-logo";

export function emailSiteUrl(): string {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (configured && !configured.includes("localhost")) {
    return configured;
  }
  return `https://${siteConfig.domain}`;
}

/** Inline PNG for HTML emails (shows even when remote images are blocked). */
export function getCurnextLogoAttachment() {
  const filePath = path.join(process.cwd(), "public", "logo-mark-light.png");
  return {
    filename: "curnext-logo.png",
    content: readFileSync(filePath),
    cid: CURNEXT_LOGO_CID,
    contentType: "image/png",
    contentDisposition: "inline" as const,
  };
}

export function curnextLogoImgHtml(heightPx = 40): string {
  return `<img src="cid:${CURNEXT_LOGO_CID}" alt="CurNext" width="${Math.round((heightPx * 40) / 46)}" height="${heightPx}" style="display:block;border:0;outline:none;height:${heightPx}px;width:auto;" />`;
}
