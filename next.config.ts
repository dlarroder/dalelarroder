const umami_url = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_URL ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
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
