'use client';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import ActivityTooltip from './activity-tooltip';
import type { ContributionCalendar } from './github';

interface Props {
	contributions: ContributionCalendar;
}

const WEEK_GAP = 3;
const WEEK_WIDTH = 12 + WEEK_GAP;

interface HoveredCell {
	count: number;
	date: Date;
	x: number;
	y: number;
}

export default function Calendar({ contributions }: Props) {
	const { weeks, months, colors } = contributions;
	const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	// A full year is wider than the page, so start at the most recent weeks.
	// Switching years shows the skeleton, so this remounts for each year.
	useLayoutEffect(() => {
		const scroller = scrollRef.current;
		if (scroller) scroller.scrollLeft = scroller.scrollWidth;
	}, []);

	const handleCellMouseEnter = (
		e: React.MouseEvent<HTMLSpanElement>,
		count: number,
		date: Date,
	) => {
		const cellRect = e.currentTarget.getBoundingClientRect();
		setHoveredCell({
			count,
			date,
			x: cellRect.left + cellRect.width / 2,
			y: cellRect.top,
		});
	};

	return (
		<div className='relative flex min-w-0 flex-1 flex-col space-y-2'>
			<div
				ref={scrollRef}
				className='overflow-x-auto'
				onScroll={() => setHoveredCell(null)}
			>
				<div className='flex w-max flex-col space-y-2'>
					{/* Months can share a week, so labels may run past the grid and get clipped */}
					<ul className='flex w-0 min-w-full gap-0.75 overflow-hidden text-sm dark:text-neutral-400'>
						{months.map((month) => (
							<li
								key={month.firstDay}
								className={classNames(
									'shrink-0',
									month.totalWeeks < 2 && 'invisible',
								)}
								// Each week is a 12px column plus a 3px gap, so labels sit over their weeks
								style={{ width: WEEK_WIDTH * month.totalWeeks - WEEK_GAP }}
							>
								{month.name}
							</li>
						))}
					</ul>

					<div
						role='presentation'
						className='flex gap-0.75'
						onMouseLeave={() => setHoveredCell(null)}
					>
						{weeks?.map((week) => (
							<div key={week.firstDay}>
								{week.contributionDays.map((contribution) => {
									const backgroundColor =
										contribution.contributionCount > 0 && contribution.color;

									const randomizedDelay =
										Math.random() * week.contributionDays.length * 0.2;

									return (
										<motion.span
											key={contribution.date}
											initial='initial'
											animate='animate'
											variants={{
												initial: { opacity: 0, translateY: -20 },
												animate: {
													opacity: 1,
													translateY: 0,
													transition: { delay: randomizedDelay },
												},
											}}
											onMouseEnter={(e) =>
												handleCellMouseEnter(
													e,
													contribution.contributionCount,
													new Date(contribution.date),
												)
											}
											className='my-0.5 block h-3 w-3 rounded-xs bg-neutral-200 dark:bg-[#161B22] cursor-default'
											style={backgroundColor ? { backgroundColor } : undefined}
										/>
									);
								})}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='flex flex-wrap items-center justify-between gap-2'>
				<div className='flex items-center gap-2 text-sm'>
					<span className='dark:text-neutral-400'>Less</span>
					<ul className='flex gap-1'>
						<motion.li className='h-2.5 w-2.5 rounded-xs bg-neutral-300 dark:bg-neutral-800' />
						{colors.map((item, index) => (
							<motion.li
								key={item}
								initial='initial'
								animate='animate'
								variants={{
									initial: { opacity: 0 },
									animate: {
										opacity: 1,
										transition: { delay: index * 0.06 },
									},
								}}
								className='h-2.5 w-2.5 rounded-xs'
								style={{ backgroundColor: item }}
							/>
						))}
					</ul>
					<span>More</span>
				</div>
			</div>

			<AnimatePresence>
				{hoveredCell && (
					<ActivityTooltip
						key='activity-tooltip'
						count={hoveredCell.count}
						date={hoveredCell.date}
						x={hoveredCell.x}
						y={hoveredCell.y}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
