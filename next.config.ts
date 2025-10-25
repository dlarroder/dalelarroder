import type { NextConfig } from 'next';
import path from 'path';

const umami_url = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_URL ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  async rewrites() {
    return [
      {
        source: '/umami.js',
        destination: `${umami_url}/script.js`,
      },
      {
        source: '/api/send',
        destination: `${umami_url}/api/send`,
      },
    ];
  },
};

export default nextConfig;
