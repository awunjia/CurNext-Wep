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
        destination: `/${locale}/data/datacenters`,
        permanent: true,
      },
      {
        source: `/${locale}/datacenters`,
        destination: `/${locale}/data/datacenters`,
        permanent: true,
      },
      {
        source: `/${locale}/security`,
        destination: `/${locale}/data/security`,
        permanent: true,
      },
      {
        source: `/${locale}/compliance`,
        destination: `/${locale}/data/compliance`,
        permanent: true,
      },
      {
        source: `/${locale}/audit-trail`,
        destination: `/${locale}/data/audit-trail`,
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
        destination: "/en/data/datacenters",
        permanent: true,
      },
      {
        source: "/datacenters",
        destination: "/en/data/datacenters",
        permanent: true,
      },
      {
        source: "/security",
        destination: "/en/data/security",
        permanent: true,
      },
      {
        source: "/compliance",
        destination: "/en/data/compliance",
        permanent: true,
      },
      {
        source: "/audit-trail",
        destination: "/en/data/audit-trail",
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
