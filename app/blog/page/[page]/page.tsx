import ListLayout from '@/layouts/MDX/ListLayout';
import MainLayout from '@/layouts/MainLayout';
import { sortedBlogPost } from '@/lib/utils/contentlayer';
import { POSTS_PER_PAGE } from '@/types/default';
import { allBlogs } from 'contentlayer/generated';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Blog - Expert laravel',
  description: 'My Blogs - Expert laravel new',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.expertlaravel.com/blog'),
  alternates: {
    canonical: '/',
  },
  keywords: 'Blog, Expert, laravel',
  images: ['static/ExpertLaravel.webp'],
  // authors: 'Jigar Patel',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    // url: 'https://www.expertlaravel.com/blog',
    title: 'Expert Laravel',
    description: 'Expert Laravel Portfolio Website',
    siteName: 'Expert Laravel',

    images: [
      {
        url: 'static/ExpertLaravel.webp',
        width: '800',
        height: '600',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Laravel',
    site: '@jbcodeapp',
    description: 'Expert Laravel Portfolio Website',
    // image: 'https://example.com/twitter-card.png',
  },
};

export default function BlogPage({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page);
  const posts = sortedBlogPost(allBlogs);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const pagination = {
    currentPage: pageNumber,
    totalPages,
  };

  if (pageNumber > totalPages) {
    redirect('/blog');
  }

  return (
    <MainLayout>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </MainLayout>
  );
}
