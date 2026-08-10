import { NextResponse } from "next/server";

import { fetchAllSdkVersions } from "@/lib/sdk-registry-versions";

export const revalidate = 300;

export async function GET() {
  try {
    const versions = await fetchAllSdkVersions();
    return NextResponse.json(
      { versions, fetchedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { versions: {}, error: "Failed to fetch registry versions" },
      { status: 502 },
    );
  }
}
