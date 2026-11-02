'use client';

import classNames from 'classnames';
import type { TocHeading } from '../extract-headings';
import { useActiveHeadings, useScrollToHeading } from './use-active-headings';

export default function TableOfContents({
	headings,
}: {
	headings: TocHeading[];
}) {
	const range = useActiveHeadings(headings.map((heading) => heading.id));
	const scrollToHeading = useScrollToHeading();

	return (
		<nav aria-label='Table of contents' className='text-sm'>
			<ol className='space-y-1'>
				{headings.map((heading, index) => {
					const active =
						range !== null && index >= range.start && index <= range.end;
					return (
						<li key={heading.id}>
							<a
								href={`#${heading.id}`}
								onClick={(event) => scrollToHeading(event, heading.id)}
								aria-current={active ? 'location' : undefined}
								className={classNames(
									'block py-0.5 leading-snug motion-safe:transition-colors',
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
		</nav>
	);
}
