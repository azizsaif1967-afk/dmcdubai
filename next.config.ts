import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  basePath: '/dmcdubai',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default config;
