// 'use client';

import ListLayout from '@/layouts/MDX/ListLayout';
import MainLayout from '@/layouts/MainLayout';
import { sortedBlogPost } from '@/lib/utils/contentlayer';
import { POSTS_PER_PAGE } from '@/types/default';
import { allBlogs } from 'contentlayer/generated';

const baseSiteURL = process.env.NEXT_PUBLIC_SITE_URL;
const siteURLWithBlog = `${baseSiteURL}blog`;

export const metadata = {
  title: 'Blog - Expert Laravel',
  description: 'My Blogs - Expert Laravel',
  metadataBase: new URL(siteURLWithBlog),
  alternates: {
    canonical: siteURLWithBlog,
  },

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
    // image: `${siteURLWithBlog}/twitter-card.png`,
  },
};

export default function Blog() {
  const activePosts = allBlogs.filter((p) => p.draft === false);
  const posts = sortedBlogPost(activePosts);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <MainLayout>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog"
      />
    </MainLayout>
  );
}
