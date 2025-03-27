'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '../blog/utils';

export function Posts({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="mt-6">
      {posts.map((post, index) => (
        <motion.li
          key={post.slug}
          className="py-2 border-b border-gray-200 dark:border-gray-800"
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(2px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: index / 10 }}
        >
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read "${post.metadata.title}"`}
            legacyBehavior
          >
            <article className="cursor-pointer gap-3 space-y-2 bg-opacity-20 py-5 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div className="space-y-3 xl:col-span-4">
                <span className="text-2xl font-bold leading-8 tracking-tight">
                  <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
                </span>

                <div className="max-w-none text-gray-500 dark:text-gray-400">
                  {post.metadata.summary}
                </div>
              </div>
            </article>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
