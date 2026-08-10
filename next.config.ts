import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/request-quote",
        destination: "/pricing#request-quote",
        permanent: true,
      },
      {
        source: "/request-demo",
        destination: "/pricing#request-quote",
        permanent: true,
      },
      {
        source: "/playground",
        destination: "/integrations",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/technologies",
        permanent: true,
      },
      {
        source: "/data-centers",
        destination: "/datacenters",
        permanent: true,
      },
      {
        source: "/dpa",
        destination: "/data/data-processing-agreement",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
