'use client';

import classNames from 'classnames';
import { motion, useReducedMotion } from 'motion/react';

interface Props {
	selectedYear: number;
	onYearChange: (year: number) => void;
}

export default function YearSelect({ selectedYear, onYearChange }: Props) {
	const thisYear = new Date().getFullYear();
	const prefersReducedMotion = useReducedMotion();

	const yearOptions = Array.from({ length: 5 }, (_, i) => thisYear - i);

	return (
		// Sits above the calendar as a row of tabs, so the grid gets the full width
		<div className='flex gap-4 text-sm text-gray-500 dark:text-gray-400'>
			{yearOptions.map((year) => (
				<button
					type='button'
					onClick={() => {
						onYearChange(year);
					}}
					key={year}
					aria-pressed={selectedYear === year}
					className={classNames(
						'relative cursor-pointer pb-0.5 motion-safe:transition-colors',
						selectedYear === year
							? 'text-gray-900 dark:text-gray-100'
							: 'hover:text-gray-900 dark:hover:text-gray-100',
					)}
				>
					{year}
					{selectedYear === year && (
						<motion.div
							layoutId='year-select-indicator'
							className='absolute inset-x-0 -bottom-0.5 h-0.5 bg-accent'
							transition={
								prefersReducedMotion
									? { duration: 0 }
									: { type: 'spring', stiffness: 500, damping: 40 }
							}
						/>
					)}
				</button>
			))}
		</div>
	);
}
