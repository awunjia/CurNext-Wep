export type SdkStatus = "live" | "beta" | "coming_soon";

export type SdkRegistry =
  | "npm"
  | "Packagist"
  | "pkg.go.dev"
  | "PyPI"
  | "Maven Central"
  | "pub.dev";

export type SdkLanguageId =
  | "javascript"
  | "php"
  | "go"
  | "python"
  | "java"
  | "flutter";

export type SdkPackage = {
  id: SdkLanguageId;
  name: string;
  short: string;
  stack: string;
  packageName: string;
  /** Fallback only - live versions overlay from /api/sdk/versions */
  version: string;
  status: SdkStatus;
  registry: SdkRegistry;
  /** Empty when not published yet - do not invent fake package URLs */
  registryUrl: string;
  install: string;
  summary: string;
  highlights: string[];
  accent: string;
  quickStart: string;
  errorHandling: string;
};

export const SDK_API_DOCS_URL = "https://api.curnext.app/docs";

export const sdkHero = {
  eyebrow: "SDKs",
  title: "Bring CurNext into the apps you already run",
  lead: "Restricting the experience to our client is not enough. CurNext SDKs give your teams the freedom to extend readiness intelligence into the applications, workflows, and stacks you already operate.",
} as const;

export const sdkPageHeader = {
  title: "SDK",
  description:
    "Official client libraries for the CurNext REST API. Pick a language below for install steps and examples.",
} as const;

export const sdkIntro = {
  heading: "What you can build",
  paragraph:
    "SDKs wrap the versioned REST API. Create a project API key, then call readiness, projects, devices, alerts, measurements, and webhooks from your own stack.",
  docsLabel: "api.curnext.app/docs",
  docsHref: SDK_API_DOCS_URL,
  useCases: [
    {
      title: "Pull readiness & telemetry",
      body: "Fetch surface readiness, predictions, devices, and latest measurements into dashboards or reports.",
    },
    {
      title: "Automate site workflows",
      body: "Resolve alerts, list audit events, and drive ops from scripts and internal tools.",
    },
    {
      title: "Integrate with your stack",
      body: "Use the same REST surface from Node, PHP, Go, Python, Java, or Flutter apps you already run.",
    },
    {
      title: "Work with webhooks",
      body: "List webhook endpoints via SDK. Create and manage receivers in the dashboard for events like SURFACE_READY, ALERT_CREATED, and DEVICE_DISPLACED.",
    },
  ],
} as const;

export const sdkPackages: SdkPackage[] = [
  {
    id: "javascript",
    name: "JavaScript / TypeScript",
    short: "JS / TS",
    stack: "Node, React, Next.js & browsers",
    packageName: "@curnext/sdk",
    version: "1.2.1",
    status: "live",
    registry: "npm",
    registryUrl: "https://www.npmjs.com/package/@curnext/sdk",
    install: "npm install @curnext/sdk",
    summary:
      "Typed Fetch client for web apps, Node services, and TypeScript backends that need readiness and project context.",
    highlights: ["Typed client", "Node & browsers", "Fetch API"],
    accent: "#F7DF1E",
    quickStart: `import { CurNext } from "@curnext/sdk";

const client = new CurNext({
  apiKey: process.env.CURNEXT_API_KEY!,
  // baseUrl defaults to https://api.curnext.app
  // baseUrl: "http://localhost:4000",
});

const health = await client.health.get();
// { status: "ok", service: "curnext-api", version: "...", api: "/api/v1" }

const { projects } = await client.projects.list();
const readiness = await client.projects.getReadiness("SURFACE_EXTERNAL_ID");

console.log(readiness.status, readiness.readiness_score);`,
    errorHandling: `import { CurNextApiError } from "@curnext/sdk";

try {
  const readiness = await client.projects.getReadiness("SURFACE_ID");
  console.log(readiness.status);
} catch (error) {
  if (error instanceof CurNextApiError) {
    // 401 invalid key | 404 not found | 429 rate limited
    console.error(error.statusCode, error.message, error.code, error.body);
    return;
  }
  throw error;
}`,
  },
  {
    id: "php",
    name: "PHP",
    short: "PHP",
    stack: "Laravel & Symfony",
    packageName: "curnext/sdk",
    version: "1.0.0",
    status: "live",
    registry: "Packagist",
    registryUrl: "https://packagist.org/packages/curnext/sdk",
    install: "composer require curnext/sdk",
    summary:
      "PHP 8.1+ client for Laravel, Symfony, and plain PHP that pulls readiness into portals, ERP, and automation.",
    highlights: ["PHP 8.1+", "cURL + JSON", "Laravel & Symfony"],
    accent: "#777BB4",
    quickStart: `<?php

use Curnext\\Sdk\\CurNext;

$client = new CurNext(
    apiKey: getenv('CURNEXT_API_KEY') ?: '',
    // baseUrl defaults to https://api.curnext.app
    // baseUrl: 'http://localhost:4000',
);

$health = $client->health->get();
$projects = $client->projects->list();
$readiness = $client->projects->getReadiness('SURFACE_EXTERNAL_ID');

echo $readiness['status'], ' ', $readiness['readiness_score'] ?? '', PHP_EOL;`,
    errorHandling: `use Curnext\\Sdk\\CurNextApiException;

try {
    $readiness = $client->projects->getReadiness('SURFACE_ID');
    echo $readiness['status'];
} catch (CurNextApiException $e) {
    // 401 invalid key | 404 not found | 429 rate limited
    error_log($e->getStatusCode() . ' ' . $e->getMessage());
    var_export($e->getBody());
    throw $e;
}`,
  },
  {
    id: "go",
    name: "Go",
    short: "Go",
    stack: "net/http, Gin & Echo",
    packageName: "github.com/awunjia/curnext-go",
    version: "v1.0.0",
    status: "live",
    registry: "pkg.go.dev",
    registryUrl: "https://pkg.go.dev/github.com/awunjia/curnext-go",
    install: "go get github.com/awunjia/curnext-go@v1.0.0",
    summary:
      "Idiomatic Go client for gateways, site services, and microservices that talk to CurNext over HTTPS.",
    highlights: ["context.Context", "Typed errors", "net/http"],
    accent: "#00ADD8",
    quickStart: `package main

import (
	"context"
	"fmt"
	"log"
	"os"

	curnext "github.com/awunjia/curnext-go"
)

func main() {
	client, err := curnext.NewClient(curnext.Config{
		APIKey: os.Getenv("CURNEXT_API_KEY"),
		// BaseURL defaults to https://api.curnext.app
		// BaseURL: "http://localhost:4000",
	})
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()
	health, err := client.Health.Get(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(health.Status, health.Service)

	readiness, err := client.Projects.GetReadiness(ctx, "SURFACE_EXTERNAL_ID")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(readiness.Status, readiness.ReadinessScore)
}`,
    errorHandling: `import (
	"context"
	"errors"
	"log"

	curnext "github.com/awunjia/curnext-go"
)

readiness, err := client.Projects.GetReadiness(ctx, "SURFACE_ID")
if err != nil {
	var apiErr *curnext.APIError
	if errors.As(err, &apiErr) {
		// 401 invalid key | 404 not found | 429 rate limited
		log.Printf("%d %s %#v", apiErr.StatusCode, apiErr.Message, apiErr.Body)
		return
	}
	log.Fatal(err)
}
_ = readiness.Status`,
  },
  {
    id: "python",
    name: "Python",
    short: "Python",
    stack: "Django, FastAPI & scripts",
    packageName: "curnext",
    version: "1.0.0",
    status: "live",
    registry: "PyPI",
    registryUrl: "https://pypi.org/project/curnext/",
    install: "pip install curnext",
    summary:
      "Python client for data pipelines, FastAPI services, and scripts that pull readiness and telemetry.",
    highlights: ["pip install", "Dict responses", "Django & FastAPI"],
    accent: "#3776AB",
    quickStart: `import os
from curnext import CurNext

client = CurNext(
    api_key=os.environ["CURNEXT_API_KEY"],
    # base_url defaults to https://api.curnext.app
    # base_url="http://localhost:4000",
)

health = client.health.get()
projects = client.projects.list()
readiness = client.projects.get_readiness("SURFACE_EXTERNAL_ID")

print(readiness["status"], readiness.get("readiness_score"))`,
    errorHandling: `from curnext import CurNextApiError

try:
    readiness = client.projects.get_readiness("SURFACE_ID")
    print(readiness["status"])
except CurNextApiError as exc:
    # 401 invalid key | 404 not found | 429 rate limited
    print(exc.status_code, exc.message, exc.code, exc.body)
    raise`,
  },
  {
    id: "java",
    name: "Java",
    short: "Java",
    stack: "Spring Boot & Quarkus",
    packageName: "app.curnext:curnext-sdk",
    version: "1.0.0",
    status: "live",
    registry: "Maven Central",
    registryUrl:
      "https://central.sonatype.com/artifact/app.curnext/curnext-sdk",
    install: 'implementation("app.curnext:curnext-sdk:1.0.0")',
    summary:
      "JVM client for Spring Boot, Quarkus, and enterprise services. Maven groupId app.curnext; imports stay io.curnext.sdk.*.",
    highlights: ["Java 17+", "Gradle & Maven", "Jackson"],
    accent: "#ED8B00",
    quickStart: `import io.curnext.sdk.CurNext;
import io.curnext.sdk.ApiObject;

var client = CurNext.builder()
    .apiKey(System.getenv("CURNEXT_API_KEY"))
    // .baseUrl("https://api.curnext.app")
    // .baseUrl("http://localhost:4000")
    .build();

ApiObject health = client.health().get();
ApiObject readiness = client.projects().getReadiness("SURFACE_EXTERNAL_ID");
System.out.println(readiness.status() + " " + readiness.readinessScore());`,
    errorHandling: `import io.curnext.sdk.CurNextApiException;

try {
  var readiness = client.projects().getReadiness("SURFACE_ID");
  System.out.println(readiness.status());
} catch (CurNextApiException e) {
  // 401 invalid key | 404 not found | 429 rate limited
  System.err.println(e.getStatusCode() + " " + e.getMessage());
  throw e;
}`,
  },
  {
    id: "flutter",
    name: "Flutter",
    short: "Flutter",
    stack: "Dart, iOS, Android & desktop",
    packageName: "curnext",
    version: "1.0.0",
    status: "live",
    registry: "pub.dev",
    registryUrl: "https://pub.dev/packages/curnext",
    install: "flutter pub add curnext",
    summary:
      "Official Dart / Flutter client for mobile, desktop, and web apps that need readiness, devices, and alerts in the field.",
    highlights: ["Dart 3.3+", "Flutter", "Mobile, desktop & web"],
    accent: "#02569B",
    quickStart: `import 'package:curnext/curnext.dart';

final client = CurNext(
  apiKey: const String.fromEnvironment('CURNEXT_API_KEY'),
  // baseUrl defaults to https://api.curnext.app
  // baseUrl: 'http://localhost:4000',
);

final health = await client.health.get();
// { status: ok, service: curnext-api, version: "...", api: /api/v1 }

final projects = await client.projects.list();
final readiness =
    await client.projects.getReadiness('SURFACE_EXTERNAL_ID');

print('\${readiness['status']} \${readiness['readiness_score']}');

client.close();`,
    errorHandling: `try {
  final readiness =
      await client.projects.getReadiness('SURFACE_ID');
  print(readiness['status']);
} on CurNextApiException catch (e) {
  // 401 invalid key | 404 not found | 429 rate limited
  print('\${e.statusCode} \${e.message}');
  rethrow;
}`,
  },
];

export function registryButtonLabel(registry: SdkRegistry): string {
  switch (registry) {
    case "npm":
      return "View on npm";
    case "Packagist":
      return "View on Packagist";
    case "pkg.go.dev":
      return "View on pkg.go.dev";
    case "PyPI":
      return "View on PyPI";
    case "Maven Central":
      return "View on Maven Central";
    case "pub.dev":
      return "View on pub.dev";
  }
}

export function statusBadgeLabel(status: SdkStatus): string {
  switch (status) {
    case "live":
      return "Live";
    case "beta":
      return "Beta";
    case "coming_soon":
      return "Coming soon";
  }
}

export function cardVersionLine(
  status: SdkStatus,
  version: string | undefined,
): string {
  if (status === "coming_soon" || !version) {
    return "Not published";
  }
  const display = version.startsWith("v") ? version : `v${version}`;
  if (status === "beta") {
    return `Beta ${display}`;
  }
  return display;
}

/** Overlay live registry version; rewrite Go/Java install strings. */
export function withLiveSdkVersion(
  pkg: SdkPackage,
  liveVersion: string | undefined,
): SdkPackage {
  if (!liveVersion) return pkg;

  if (pkg.id === "go") {
    const tagged = liveVersion.startsWith("v")
      ? liveVersion
      : `v${liveVersion}`;
    return {
      ...pkg,
      version: tagged,
      install: `go get github.com/awunjia/curnext-go@${tagged}`,
    };
  }

  if (pkg.id === "java") {
    const plain = liveVersion.replace(/^v/, "");
    return {
      ...pkg,
      version: plain,
      install: `implementation("app.curnext:curnext-sdk:${plain}")`,
    };
  }

  return {
    ...pkg,
    version: liveVersion.replace(/^v/, ""),
  };
}
