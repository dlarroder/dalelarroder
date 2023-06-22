import ListLayout from '@/layouts/MDX/ListLayout';
import MainLayout from '@/layouts/MainLayout';
import { sortedBlogPost } from '@/lib/utils/contentlayer';
import { POSTS_PER_PAGE } from '@/types/default';
import { allBlogs } from 'contentlayer/generated';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Blog - Dale Larroder',
  description: 'My Blogs - Dale Larroder',
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
