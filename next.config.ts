import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    // Static legacy redirects. Dynamic redirects are sourced from Sanity at build time.
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
    ];
  },
};

export default config;
