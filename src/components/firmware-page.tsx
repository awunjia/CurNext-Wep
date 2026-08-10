"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  firmwareCatalogSamples,
  firmwareFlags,
  firmwareHistorySamples,
  firmwareHonesty,
  firmwareOta,
  firmwarePage,
  firmwareSecurity,
  firmwareStack,
  firmwareTrees,
} from "@/config/firmware";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "versions", label: "Versions" },
  { id: "architecture", label: "Architecture" },
  { id: "history", label: "History" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function FirmwarePage() {
  const [tab, setTab] = useState<TabId>("versions");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [productionOnly, setProductionOnly] = useState(false);

  const deviceTypes = useMemo(() => {
    const set = new Set(firmwareCatalogSamples.map((row) => row.deviceType));
    return Array.from(set).sort();
  }, []);

  const filteredCatalog = useMemo(() => {
    return firmwareCatalogSamples.filter((row) => {
      if (deviceFilter !== "all" && row.deviceType !== deviceFilter) {
        return false;
      }
      if (productionOnly && !row.isProduction) return false;
      return true;
    });
  }, [deviceFilter, productionOnly]);

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="firmware-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 id="firmware-heading" className={sectionHeadingClassName}>
              {firmwarePage.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {firmwarePage.description}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {firmwarePage.supportLine}
            </p>
          </div>

          <div className="border-border/70 mt-10 rounded-lg border p-5 sm:mt-12 sm:p-6">
            <h2 className={itemHeadingClassName}>{firmwareHonesty.title}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
              {firmwareHonesty.body}
            </p>
            <ul className="text-muted-foreground mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {firmwareHonesty.bullets.map((item) => (
                <li key={item} className="leading-relaxed">
                  - {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="firmware-tabs-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <h2 id="firmware-tabs-heading" className="sr-only">
            Firmware sections
          </h2>

          <div
            role="tablist"
            aria-label="Firmware views"
            className="flex flex-wrap gap-2"
          >
            {tabs.map((item) => {
              const selected = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/70 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {tab === "versions" ? (
            <div className="mt-8 space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <h3 className={sectionHeadingClassName}>Version catalog</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Sample catalog rows for illustration. Live fleet data and
                    artifact downloads live in operations - not as a public
                    flasher on this site.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="min-w-[10rem]">
                    <label htmlFor="firmware-device-type" className="sr-only">
                      Device type
                    </label>
                    <select
                      id="firmware-device-type"
                      value={deviceFilter}
                      onChange={(event) => setDeviceFilter(event.target.value)}
                      className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-9 w-full rounded-lg border px-2.5 text-sm outline-none focus-visible:ring-3"
                    >
                      <option value="all">All device types</option>
                      {deviceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="border-border/70 flex h-9 items-center gap-2 rounded-lg border px-3 text-sm">
                    <input
                      type="checkbox"
                      checked={productionOnly}
                      onChange={(event) =>
                        setProductionOnly(event.target.checked)
                      }
                      className="size-3.5"
                    />
                    Production only
                  </label>
                </div>
              </div>

              <div className="border-border/70 overflow-x-auto border-y">
                <table className="w-full min-w-[48rem] text-left text-sm">
                  <caption className="sr-only">
                    Firmware version catalog samples
                  </caption>
                  <thead>
                    <tr className="border-border/70 border-b">
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Version
                      </th>
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Device
                      </th>
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Flags
                      </th>
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Released
                      </th>
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Checksum
                      </th>
                      <th className="text-muted-foreground py-3 font-medium tracking-wide uppercase">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCatalog.map((row) => (
                      <tr
                        key={`${row.deviceType}-${row.version}`}
                        className="border-border/60 border-b last:border-b-0"
                      >
                        <td className="py-4 pr-4 align-top font-mono text-[13px] font-medium">
                          {row.version}
                        </td>
                        <td className="py-4 pr-4 align-top font-mono text-[13px]">
                          {row.deviceType}
                        </td>
                        <td className="py-4 pr-4 align-top">
                          <div className="flex flex-wrap gap-1.5">
                            <span
                              className={cn(
                                "rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase",
                                row.isProduction
                                  ? "border-emerald-600/50 text-emerald-700 dark:text-emerald-400"
                                  : "border-border text-muted-foreground",
                              )}
                            >
                              {row.isProduction ? "Production" : "Non-prod"}
                            </span>
                            <span
                              className={cn(
                                "rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase",
                                row.ceMarked
                                  ? "border-sky-600/50 text-sky-700 dark:text-sky-400"
                                  : "border-border text-muted-foreground",
                              )}
                            >
                              {row.ceMarked ? "CE" : "No CE"}
                            </span>
                          </div>
                        </td>
                        <td className="text-muted-foreground py-4 pr-4 align-top font-mono text-[13px]">
                          {row.releasedAt}
                        </td>
                        <td className="text-muted-foreground py-4 pr-4 align-top font-mono text-[12px]">
                          {row.checksumSha256}
                        </td>
                        <td className="text-muted-foreground py-4 align-top leading-relaxed">
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCatalog.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No catalog rows match these filters.
                </p>
              ) : null}

              <ul className="grid gap-6 sm:grid-cols-3">
                {firmwareFlags.map((flag) => (
                  <li key={flag.title} className="min-w-0">
                    <h4 className={itemHeadingClassName}>{flag.title}</h4>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {flag.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {tab === "architecture" ? (
            <div className="mt-8 space-y-10">
              <div>
                <h3 className={sectionHeadingClassName}>
                  {firmwareStack.title}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed sm:text-[15px]">
                  {firmwareStack.lead}
                </p>
                <ol className="border-border/70 mt-6 divide-y border-y">
                  {firmwareStack.layers.map((layer) => (
                    <li
                      key={layer.id}
                      className="grid gap-2 py-4 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-8"
                    >
                      <p className="font-mono text-xs font-medium tracking-[0.14em] uppercase">
                        {layer.id}
                      </p>
                      <div>
                        <h4 className={itemHeadingClassName}>{layer.title}</h4>
                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                          {layer.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className={sectionHeadingClassName}>Package trees</h3>
                <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
                  Firmware sources live under product trees for the edge and
                  field units that receive OTA.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {firmwareTrees.map((tree) => (
                    <li
                      key={tree.id}
                      className="border-border/70 rounded-lg border p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-mono text-sm font-semibold tracking-tight">
                          {tree.name}
                        </h4>
                        <span className="text-muted-foreground font-mono text-[11px]">
                          {tree.path}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {tree.role}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed">
                        OTA: {tree.ota}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className={sectionHeadingClassName}>{firmwareOta.title}</h3>
                <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed sm:text-[15px]">
                  {firmwareOta.lead}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {firmwareOta.targets.map((target) => (
                    <li
                      key={target.id}
                      className="border-border/70 rounded-lg border p-4"
                    >
                      <p className="font-mono text-xs font-medium tracking-[0.12em] uppercase">
                        {target.label}
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {target.detail}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4 text-sm">
                  Edge job states:{" "}
                  <span className="font-mono text-[13px] text-foreground">
                    {firmwareOta.edgeStates.join(" | ")}
                  </span>
                </p>
                <p className="border-border/70 bg-muted/30 text-muted-foreground mt-4 rounded-lg border px-4 py-3 text-sm leading-relaxed">
                  {firmwareOta.note}
                </p>
              </div>

              <div>
                <h3 className={sectionHeadingClassName}>
                  {firmwareSecurity.title}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed sm:text-[15px]">
                  {firmwareSecurity.lead}
                </p>
                <ul className="text-muted-foreground mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  {firmwareSecurity.items.map((item) => (
                    <li key={item} className="leading-relaxed">
                      - {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {tab === "history" ? (
            <div className="mt-8 space-y-6">
              <div className="max-w-2xl">
                <h3 className={sectionHeadingClassName}>Install history</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  Sample DeviceFirmwareAssignment-style rows with placeholder
                  device codes. Live history is reviewed in operations alongside
                  device timelines.
                </p>
              </div>

              <div className="border-border/70 overflow-x-auto border-y">
                <table className="w-full min-w-[40rem] text-left text-sm">
                  <caption className="sr-only">
                    Sample firmware install history
                  </caption>
                  <thead>
                    <tr className="border-border/70 border-b">
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Device
                      </th>
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Version
                      </th>
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Previous
                      </th>
                      <th className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase">
                        Method
                      </th>
                      <th className="text-muted-foreground py-3 font-medium tracking-wide uppercase">
                        Installed
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {firmwareHistorySamples.map((row) => (
                      <tr
                        key={`${row.deviceCode}-${row.installedAt}`}
                        className="border-border/60 border-b last:border-b-0"
                      >
                        <td className="py-4 pr-4 align-top font-mono text-[13px]">
                          {row.deviceCode}
                        </td>
                        <td className="py-4 pr-4 align-top font-mono text-[13px] font-medium">
                          {row.version}
                        </td>
                        <td className="text-muted-foreground py-4 pr-4 align-top font-mono text-[13px]">
                          {row.previousVersion}
                        </td>
                        <td className="py-4 pr-4 align-top">
                          <span className="border-border/70 rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase">
                            {row.method}
                          </span>
                        </td>
                        <td className="text-muted-foreground py-4 align-top font-mono text-[13px]">
                          {row.installedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Operations
            </p>
            <h2 className={sectionHeadingClassName}>
              Need catalog access for your fleet?
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Project and installer workflows manage reported versions in the
              product. Talk to us about site rollout - not a public binary
              download portal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 px-5",
              )}
            >
              Contact sales
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={siteConfig.links.docs}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 gap-2 px-5",
              )}
            >
              Docs
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
