import ListLayout from '@/layouts/MDX/ListLayout';
import MainLayout from '@/layouts/MainLayout';
import { allCoreContent } from '@/lib/utils/contentlayer';
import kebabCase from '@/lib/utils/kebabCase';
import { allBlogs } from 'contentlayer/generated';

const baseSiteURL = process.env.NEXT_PUBLIC_SITE_URL;
const siteURLWithBlog = `${baseSiteURL}tag`;

export const metadata = {
  title: 'Blog - Expert laravel',
  description: 'My Tags - Expert laravel',
  metadataBase: new URL(siteURLWithBlog),
  alternates: {
    canonical: siteURLWithBlog,
  },
  authors: 'Jigar Patel',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: siteURLWithBlog,
    title: 'Expert Laravel',
    description: 'Expert Laravel Portfolio Website',
    siteName: 'Expert Laravel',
    images: [
      {
        url: '/static/ExpertLaravel.webp',
        width: '1903',
        height: '955',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Laravel',
    site: '@jbcodeapp',
    description: 'Expert Laravel Portfolio Website',
    image: '/static/ExpertLaravel.webp',
  },
};

export default function Tag({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const posts = allCoreContent(
    allBlogs.filter(
      (post) => post.draft !== true && post.tags?.map((t) => kebabCase(t)).includes(tag)
    )
  );

  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);

  return (
    <MainLayout>
      <ListLayout posts={posts} title={title} />
    </MainLayout>
  );
}
