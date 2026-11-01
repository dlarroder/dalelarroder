'use client';

import classNames from 'classnames';
import { useLayoutEffect, useRef, useState } from 'react';
import type { TocHeading } from '../extract-headings';
import { useActiveHeadings, useScrollToHeading } from './use-active-headings';

type ItemBox = { x: number; top: number; bottom: number };

const LINE_X = [1, 13];
// How far into an item the line starts bending toward the next level
const BEND = 6;

function linePath(items: ItemBox[]) {
	const points = items.flatMap((item, index) => {
		const prev = items[index - 1];
		const next = items[index + 1];
		const top = prev && prev.x !== item.x ? item.top + BEND : item.top;
		const bottom = next && next.x !== item.x ? item.bottom - BEND : item.bottom;
		return [`${item.x} ${top}`, `${item.x} ${bottom}`];
	});
	return `M ${points.join(' L ')}`;
}

export default function TableOfContents({
	headings,
}: {
	headings: TocHeading[];
}) {
	const listRef = useRef<HTMLOListElement>(null);
	const [items, setItems] = useState<ItemBox[]>([]);
	const range = useActiveHeadings(headings.map((heading) => heading.id));
	const scrollToHeading = useScrollToHeading();

	// The line follows the rendered items, so it is measured rather than computed
	useLayoutEffect(() => {
		const list = listRef.current;
		if (!list) return;

		const measure = () => {
			const nodes = list.querySelectorAll<HTMLElement>('[data-toc-item]');
			setItems(
				Array.from(nodes, (node, index) => ({
					x: LINE_X[Math.min(headings[index].level, LINE_X.length - 1)],
					top: node.offsetTop,
					bottom: node.offsetTop + node.offsetHeight,
				})),
			);
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(list);
		return () => observer.disconnect();
	}, [headings]);

	const height = items.at(-1)?.bottom ?? 0;
	const path = items.length > 0 ? linePath(items) : '';
	const thumb =
		range && items.length > 0
			? { top: items[range.start].top, bottom: items[range.end].bottom }
			: null;

	return (
		<nav aria-label='Table of contents' className='text-sm'>
			<p className='mb-3 font-semibold text-gray-900 dark:text-gray-100'>
				On this page
			</p>
			<div className='relative'>
				{path && (
					<>
						<svg
							aria-hidden
							className='absolute top-0 left-0 overflow-visible'
							width={14}
							height={height}
						>
							<path
								d={path}
								fill='none'
								strokeWidth={1}
								className='stroke-gray-200 dark:stroke-gray-300/20'
							/>
						</svg>
						<svg
							aria-hidden
							className={classNames(
								'absolute top-0 left-0 overflow-visible motion-safe:transition-[clip-path,opacity] motion-safe:duration-300',
								!thumb && 'opacity-0',
							)}
							width={14}
							height={height}
							style={{
								clipPath: thumb
									? `inset(${thumb.top}px -2px ${height - thumb.bottom}px -2px)`
									: undefined,
							}}
						>
							<path
								d={path}
								fill='none'
								strokeWidth={2}
								className='stroke-primary-500'
							/>
						</svg>
					</>
				)}
				<ol ref={listRef}>
					{headings.map((heading, index) => {
						const active =
							range !== null && index >= range.start && index <= range.end;
						return (
							<li key={heading.id} data-toc-item>
								<a
									href={`#${heading.id}`}
									onClick={(event) => scrollToHeading(event, heading.id)}
									aria-current={active ? 'location' : undefined}
									className={classNames(
										'block py-1.5 leading-snug motion-safe:transition-colors',
										heading.level === 0 ? 'pl-4' : 'pl-7',
										active
											? 'text-gray-900 dark:text-gray-100'
											: 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
									)}
								>
									{heading.text}
								</a>
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
}
