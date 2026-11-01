'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import type { PostSummary } from '../thoughts/utils';

export function Thoughts({ posts }: { posts: PostSummary[] }) {
	const prefersReducedMotion = useReducedMotion();

	return (
		<ul>
			{posts.map((post, index) => (
				<motion.li
					key={post.slug}
					className='border-b border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 hover:border-gray-400 transition-colors duration-500'
					initial={{
						scale: prefersReducedMotion ? 1 : 0.8,
						opacity: 0,
						filter: prefersReducedMotion ? 'blur(0px)' : 'blur(2px)',
					}}
					animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
					transition={{
						duration: prefersReducedMotion ? 0.2 : 0.6,
						delay: prefersReducedMotion ? 0 : index / 10,
					}}
				>
					<Link
						href={`/thoughts/${post.slug}`}
						aria-label={`Read "${post.title}"`}
					>
						<article className='space-y-2 py-5 border-b border-gray-300/20'>
							<div className='flex w-full items-center justify-between'>
								<h2 className='text-md w-full max-w-2xl truncate whitespace-nowrap pr-2 font-medium text-black dark:text-white group-hover:underline md:w-auto md:flex-none md:text-xl'>
									{post.title}
								</h2>
								<div className='mx-1 flex flex-1 border-b border-primary-500' />
								<time
									dateTime={post.publishedAt}
									className='w-max whitespace-nowrap text-sm pl-2 text-gray-500 dark:text-gray-400'
								>
									{post.date}
								</time>
							</div>
							<p className='text-gray-500 dark:text-gray-400'>{post.summary}</p>
						</article>
					</Link>
				</motion.li>
			))}
		</ul>
	);
}
