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
					{/* No row borders, so the title underline is the hover cue */}
					<Link
						href={`/thoughts/${post.slug}`}
						aria-label={`Read "${post.title}"`}
						className='group'
					>
						<article className='space-y-1 py-2'>
							<div className='flex w-full items-center justify-between'>
								<h2 className='text-md w-full min-w-0 truncate whitespace-nowrap pr-2 font-medium text-black dark:text-white group-hover:underline md:w-auto md:flex-initial md:text-lg'>
									{post.title}
								</h2>
								<time
									dateTime={post.publishedAt}
									className='w-max shrink-0 whitespace-nowrap text-sm pl-2 text-gray-500 dark:text-gray-400'
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
