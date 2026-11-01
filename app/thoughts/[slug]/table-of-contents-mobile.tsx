'use client';

import classNames from 'classnames';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { TocHeading } from '../extract-headings';
import { useActiveHeadings, useScrollToHeading } from './use-active-headings';

function ProgressRing() {
	const { scrollYProgress } = useScroll();

	return (
		<svg
			aria-hidden
			viewBox='0 0 20 20'
			className='h-5 w-5 shrink-0 -rotate-90'
		>
			<circle
				cx={10}
				cy={10}
				r={8}
				fill='none'
				strokeWidth={2}
				className='stroke-gray-200 dark:stroke-gray-300/20'
			/>
			<motion.circle
				cx={10}
				cy={10}
				r={8}
				fill='none'
				strokeWidth={2}
				strokeLinecap='round'
				className='stroke-primary-500'
				style={{ pathLength: scrollYProgress }}
			/>
		</svg>
	);
}

export default function TableOfContentsMobile({
	title,
	headings,
}: {
	title: string;
	headings: TocHeading[];
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);
	const [open, setOpen] = useState(false);
	const range = useActiveHeadings(headings.map((heading) => heading.id));
	const scrollToHeading = useScrollToHeading();

	// Only top-level sections, so the list stays short on a phone
	const sections = headings
		.map((heading, index) => ({ ...heading, index }))
		.filter((heading) => heading.level === 0);
	const currentId = range
		? sections.findLast((section) => section.index <= range.start)?.id
		: undefined;

	// Shows once the page title scrolls away, where it takes over as the header
	useEffect(() => {
		const pageTitle = document.querySelector('main h1');
		if (!pageTitle) return;
		const observer = new IntersectionObserver(([entry]) => {
			const passed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
			setVisible(passed);
			if (!passed) setOpen(false);
		});
		observer.observe(pageTitle);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};
		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					ref={containerRef}
					initial={{ opacity: 0, y: -12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -12 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					className='fixed inset-x-4 top-4 z-40 mx-auto max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-lg backdrop-blur-md dark:border-gray-300/20 dark:bg-gray-900/80 lg:hidden'
				>
					<button
						type='button'
						onClick={() => setOpen((value) => !value)}
						aria-expanded={open}
						aria-controls='mobile-toc'
						className='flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100'
					>
						<ProgressRing />
						<span className={classNames('flex-1', !open && 'truncate')}>
							{title}
						</span>
						<svg
							aria-hidden
							viewBox='0 0 24 24'
							className={classNames(
								'h-4 w-4 shrink-0 motion-safe:transition-transform',
								open && 'rotate-180',
							)}
							fill='none'
							stroke='currentColor'
							strokeWidth={2}
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='m6 9 6 6 6-6' />
						</svg>
					</button>
					<AnimatePresence initial={false}>
						{open && (
							<motion.nav
								id='mobile-toc'
								aria-label='Table of contents'
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
							>
								<ol className='max-h-[60svh] overflow-y-auto px-4 pb-3 text-sm'>
									{sections.map((section) => (
										<li key={section.id}>
											<a
												href={`#${section.id}`}
												onClick={(event) => {
													scrollToHeading(event, section.id);
													setOpen(false);
												}}
												aria-current={
													section.id === currentId ? 'location' : undefined
												}
												className={classNames(
													'block truncate py-1.5 pl-8',
													section.id === currentId
														? 'text-primary-500'
														: 'text-gray-500 dark:text-gray-400',
												)}
											>
												{section.text}
											</a>
										</li>
									))}
								</ol>
							</motion.nav>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
