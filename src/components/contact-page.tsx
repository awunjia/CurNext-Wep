import Image from "next/image";
import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/contact-form";
import { contactChannels } from "@/config/contact";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";

export async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="contact-channels-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h1
              id="contact-channels-heading"
              className={sectionHeadingClassName}
            >
              {t("channelsTitle")}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("channelsLead")}
            </p>
          </div>

          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">{t("tableCaption")}</caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    {t("team")}
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    {t("email")}
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    {t("useFor")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {contactChannels.map((channel) => {
                  return (
                    <tr
                      key={channel.id}
                      className="border-border/60 border-b last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="py-4 pr-6 align-top font-medium"
                      >
                        {t(`channels.${channel.id}.title`)}
                      </th>
                      <td className="py-4 pr-6 align-top">
                        <a
                          href={`mailto:${channel.email}`}
                          className="inline-flex items-center gap-1.5 font-mono text-[13px] underline-offset-4 hover:underline"
                        >
                          <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                          {channel.email}
                        </a>
                      </td>
                      <td className="text-muted-foreground py-4 align-top leading-relaxed">
                        {t(`channels.${channel.id}.body`)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ul className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10">
            <li className="min-w-0">
              <h2 className={itemHeadingClassName}>
                {t("offices.registered.title")}
              </h2>
              <ul className="text-muted-foreground mt-2 space-y-1 text-sm leading-relaxed sm:text-[15px]">
                <li>{t("offices.registered.line1")}</li>
                <li>{t("offices.registered.line2")}</li>
                <li>
                  {t("offices.registered.line3", { id: siteConfig.businessId })}
                </li>
              </ul>
            </li>
            <li className="min-w-0">
              <h2 className={itemHeadingClassName}>
                {t("offices.response.title")}
              </h2>
              <ul className="text-muted-foreground mt-2 space-y-1 text-sm leading-relaxed sm:text-[15px]">
                <li>{t("offices.response.line1")}</li>
                <li>{t("offices.response.line2")}</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="contact-form-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div className="max-w-md">
              <h2 id="contact-form-heading" className={sectionHeadingClassName}>
                {t("formTitle")}
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                {t("formLead")}
              </p>
              <div className="mt-8 max-w-sm">
                <Image
                  src="/contact/consultation.png"
                  alt=""
                  width={1024}
                  height={1024}
                  className="h-auto w-full bg-transparent"
                  sizes="(max-width: 1024px) 80vw, 360px"
                  priority
                />
              </div>
            </div>
            <div className="border-border/70 min-w-0 rounded-lg border p-5 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
