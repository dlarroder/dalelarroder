'use client';

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
		<div className='flex flex-col space-y-2 text-sm'>
			{yearOptions.map((year) => (
				<button
					type='button'
					onClick={() => {
						onYearChange(year);
					}}
					key={year}
					className='relative cursor-pointer border-b-2 border-transparent'
				>
					{year}
					{selectedYear === year && (
						<motion.div
							layoutId='year-select-indicator'
							className='absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary-500'
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
