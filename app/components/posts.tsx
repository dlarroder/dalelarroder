'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '../blog/utils';

export function BlogPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <ul>
      {posts.map((post, index) => (
        <motion.li
          key={post.slug}
          className="py-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
                  <Link href={`/blog/${post.slug}`}>
                    <span className="text-primary-500 duration-300 hover:text-primary-400">
                      {post.metadata.title}
                    </span>
                  </Link>
                </span>

                <div className="max-w-none text-gray-900 dark:text-gray-100">
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
