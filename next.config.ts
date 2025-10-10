import createMDXPlugin from '@next/mdx';
import addCodeBlock from '@renoun/mdx/rehype/add-code-block';
import addHeadings from '@renoun/mdx/remark/add-headings';

const umami_url = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_URL ?? '';

const withMDX = createMDXPlugin({
  options: {
    providerImportSource: 'renoun/mdx/components',
    remarkPlugins: [addHeadings],
    rehypePlugins: [addCodeBlock],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
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

export default withMDX(nextConfig);
