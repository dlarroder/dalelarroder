import path from 'node:path';
import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const umami_url = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_URL ?? '';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx'],
	reactCompiler: true,
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

// Must stay the outermost plugin
export default withContentCollections(nextConfig);
