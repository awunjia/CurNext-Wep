import type { SdkLanguageId } from "@/config/sdk-packages";

const FETCH_TIMEOUT_MS = 8_000;

export type SdkVersionsMap = Partial<Record<SdkLanguageId, string>>;

async function fetchText(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json, text/xml, */*" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const text = await fetchText(url);
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export async function fetchNpmVersion(): Promise<string | undefined> {
  const data = await fetchJson<{ version?: string }>(
    "https://registry.npmjs.org/@curnext/sdk/latest",
  );
  return typeof data?.version === "string" ? data.version : undefined;
}

export async function fetchPackagistVersion(): Promise<string | undefined> {
  const data = await fetchJson<{
    packages?: Record<string, Array<{ version?: string }>>;
  }>("https://repo.packagist.org/p2/curnext/sdk.json");

  const versions = data?.packages?.["curnext/sdk"];
  if (!Array.isArray(versions)) return undefined;

  for (const entry of versions) {
    const v = entry.version;
    if (typeof v !== "string") continue;
    if (v.includes("dev") || v.includes("alpha") || v.includes("beta")) {
      continue;
    }
    return v.replace(/^v/, "");
  }
  return undefined;
}

export async function fetchGoVersion(): Promise<string | undefined> {
  const data = await fetchJson<{ Version?: string }>(
    "https://proxy.golang.org/github.com/awunjia/curnext-go/@latest",
  );
  return typeof data?.Version === "string" ? data.Version : undefined;
}

export async function fetchPypiVersion(): Promise<string | undefined> {
  const data = await fetchJson<{ info?: { version?: string } }>(
    "https://pypi.org/pypi/curnext/json",
  );
  return typeof data?.info?.version === "string"
    ? data.info.version
    : undefined;
}

async function fetchMavenFromSearch(): Promise<string | undefined> {
  const data = await fetchJson<{
    response?: { docs?: Array<{ latestVersion?: string; v?: string }> };
  }>(
    "https://search.maven.org/solrsearch/select?q=g:app.curnext+AND+a:curnext-sdk&rows=1&wt=json",
  );
  const doc = data?.response?.docs?.[0];
  if (!doc) return undefined;
  if (typeof doc.latestVersion === "string") return doc.latestVersion;
  if (typeof doc.v === "string") return doc.v;
  return undefined;
}

async function fetchMavenFromMetadata(): Promise<string | undefined> {
  const xml = await fetchText(
    "https://repo1.maven.org/maven2/app/curnext/curnext-sdk/maven-metadata.xml",
  );
  if (!xml) return undefined;
  const latest = xml.match(/<latest>([^<]+)<\/latest>/)?.[1];
  const release = xml.match(/<release>([^<]+)<\/release>/)?.[1];
  return latest || release || undefined;
}

export async function fetchMavenVersion(): Promise<string | undefined> {
  return (await fetchMavenFromSearch()) ?? (await fetchMavenFromMetadata());
}

export async function fetchAllSdkVersions(): Promise<SdkVersionsMap> {
  const [javascript, php, go, python, java] = await Promise.all([
    fetchNpmVersion(),
    fetchPackagistVersion(),
    fetchGoVersion(),
    fetchPypiVersion(),
    fetchMavenVersion(),
  ]);

  return {
    ...(javascript ? { javascript } : {}),
    ...(php ? { php } : {}),
    ...(go ? { go } : {}),
    ...(python ? { python } : {}),
    ...(java ? { java } : {}),
  };
}
