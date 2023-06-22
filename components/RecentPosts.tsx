import PostCard from '@/components/PostCard';
import { Blog } from 'contentlayer/generated';
import Link from 'next/link';

const MAX_DISPLAY = 2;

interface RecentPosts {
  posts: Omit<Blog, 'body' | '_raw' | '_id'>[];
}

export default function RecentPosts({ posts }: RecentPosts) {
  const slicedPost = posts.slice(0, MAX_DISPLAY);

  return (
    <div className="mt-6">
      <div className="divide-gray-200 dark:divide-gray-700">
        <h3 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Recent Posts
        </h3>
        <PostCard posts={slicedPost} showTags={false} />
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link href="/blog">
            <span className="underline-magical cursor-pointer font-bold" aria-label="all posts">
              Read All Post &rarr;
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
