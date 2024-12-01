import ListLayout from '@/layouts/MDX/ListLayout';
import MainLayout from '@/layouts/MainLayout';
import { POSTS_PER_PAGE } from '@/lib/types/default';

export const metadata = {
  title: 'Blog - Dale Larroder',
  description: 'My Blogs - Dale Larroder',
};

export default function Blog() {
  const posts = []; // TODO: fetch posts
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
