'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { BlogPost } from '../blog/utils';

export function Posts({ posts }: { posts: BlogPost[] }) {
  return (
    <ul>
      {posts.map((post, index) => (
        <motion.li
          key={post.slug}
          className="border-b border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 hover:border-gray-400 transition-colors duration-500"
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(2px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: index / 10 }}
        >
          <Link href={`/blog/${post.slug}`} aria-label={`Read "${post.metadata.title}"`}>
            <article className="py-7 flex flex-col space-y-3">
              <span className="text-2xl font-bold leading-8 tracking-tight">
                {post.metadata.title}
              </span>
              <div className="max-w-none text-gray-500 dark:text-gray-400">
                {post.metadata.summary}
              </div>
            </article>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
