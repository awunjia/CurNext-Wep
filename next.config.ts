import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    const locale = ":locale(en|fr|fi|sv|es)";
    return [
      {
        source: `/${locale}/request-quote`,
        destination: `/${locale}/pricing#request-quote`,
        permanent: true,
      },
      {
        source: `/${locale}/request-demo`,
        destination: `/${locale}/pricing#request-quote`,
        permanent: true,
      },
      {
        source: `/${locale}/playground`,
        destination: `/${locale}/integrations`,
        permanent: true,
      },
      {
        source: `/${locale}/partners`,
        destination: `/${locale}/technologies`,
        permanent: true,
      },
      {
        source: `/${locale}/data-centers`,
        destination: `/${locale}/datacenters`,
        permanent: true,
      },
      {
        source: `/${locale}/dpa`,
        destination: `/${locale}/data/data-processing-agreement`,
        permanent: true,
      },
      // Legacy unprefixed marketing URLs → English
      {
        source: "/request-quote",
        destination: "/en/pricing#request-quote",
        permanent: true,
      },
      {
        source: "/request-demo",
        destination: "/en/pricing#request-quote",
        permanent: true,
      },
      {
        source: "/playground",
        destination: "/en/integrations",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/en/technologies",
        permanent: true,
      },
      {
        source: "/data-centers",
        destination: "/en/datacenters",
        permanent: true,
      },
      {
        source: "/dpa",
        destination: "/en/data/data-processing-agreement",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
