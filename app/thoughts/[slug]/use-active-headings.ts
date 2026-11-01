'use client';

import { useLenis } from 'lenis/react';
import { type MouseEvent, useEffect, useState } from 'react';

// Matches the headings' scroll-mt-20, so a section counts once it clears the top
const TOP_OFFSET = 80;

export type ActiveRange = { start: number; end: number } | null;

// Every section with any part on screen is active, so the range can span several
export function useActiveHeadings(ids: string[]) {
	const [range, setRange] = useState<ActiveRange>(null);

	useEffect(() => {
		const headings = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (headings.length === 0) return;

		const article = headings[0].closest('article');
		// Section boundaries in page coordinates, so scrolling never reads layout
		let tops: number[] = [];
		let articleEnd = Number.POSITIVE_INFINITY;

		const update = () => {
			const viewportTop = window.scrollY + TOP_OFFSET;
			const viewportBottom = window.scrollY + window.innerHeight;
			let start = -1;
			let end = -1;

			tops.forEach((top, index) => {
				const bottom = tops[index + 1] ?? articleEnd;
				if (top < viewportBottom && bottom > viewportTop) {
					if (start === -1) start = index;
					end = index;
				}
			});

			setRange((prev) => {
				if (start === -1) return null;
				if (prev?.start === start && prev.end === end) return prev;
				return { start, end };
			});
		};

		const measure = () => {
			tops = headings.map(
				(heading) => heading.getBoundingClientRect().top + window.scrollY,
			);
			if (article) {
				articleEnd = article.getBoundingClientRect().bottom + window.scrollY;
			}
			update();
		};

		// Images and code blocks can change the article's height after load
		const observer = new ResizeObserver(measure);
		if (article) observer.observe(article);
		measure();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', measure);
		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', measure);
		};
	}, [ids]);

	return range;
}

// Lenis owns the scroll, so hash links go through it instead of jumping natively
export function useScrollToHeading() {
	const lenis = useLenis();

	return (event: MouseEvent<HTMLAnchorElement>, id: string) => {
		const target = document.getElementById(id);
		if (!lenis || !target) return;
		event.preventDefault();
		// Lenis already applies the heading's scroll-margin-top
		lenis.scrollTo(target);
		history.replaceState(null, '', `#${id}`);
	};
}
