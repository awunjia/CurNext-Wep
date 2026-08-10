import Image from "next/image";
import { Mail } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { contactChannels, contactOffices } from "@/config/contact";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";

export function ContactPage() {
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
              Direct email
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Prefer inbox-to-inbox? Use the addresses below.
            </p>
          </div>

          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">
                CurNext contact email addresses
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Use for
                  </th>
                </tr>
              </thead>
              <tbody>
                {contactChannels.map((channel) => (
                  <tr
                    key={channel.title}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {channel.title}
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
                      {channel.body}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10">
            {contactOffices.map((office) => (
              <li key={office.title} className="min-w-0">
                <h2 className={itemHeadingClassName}>{office.title}</h2>
                <ul className="text-muted-foreground mt-2 space-y-1 text-sm leading-relaxed sm:text-[15px]">
                  {office.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
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
                Send a message
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                We read every message and reply from a CurNext address. Most
                inquiries get a first response within one business day. Complex
                product, API, or compliance questions can take longer while the
                right team reviews context from your site or stack.
              </p>
              <div className="mt-8 max-w-sm">
                <Image
                  src="/contact/consultation.png"
                  alt=""
                  width={1024}
                  height={1024}
                  className="h-auto w-full bg-transparent"
                  sizes="(max-width: 1024px) 80vw, 360px"
                  priority={false}
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
