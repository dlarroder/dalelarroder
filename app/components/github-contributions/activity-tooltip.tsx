'use client';

import { motion } from 'motion/react';
import { createPortal } from 'react-dom';

interface Props {
	count: number;
	date: Date;
	x: number;
	y: number;
}

export default function ActivityTooltip({ count, date, x, y }: Props) {
	const formattedDate = date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	return createPortal(
		<motion.div
			className='pointer-events-none fixed z-50 whitespace-nowrap'
			// Position comes only from initial/animate, so the spring can slide it
			// between cells; a static left/top here would snap it instead
			style={{
				translate: '-50% calc(-100% - 12px)',
				transformOrigin: 'center bottom',
			}}
			initial={{ left: x, top: y, opacity: 0, scale: 0.95 }}
			animate={{ left: x, top: y, opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{
				left: { type: 'spring', stiffness: 500, damping: 40 },
				top: { type: 'spring', stiffness: 500, damping: 40 },
				opacity: { duration: 0.1 },
				scale: { duration: 0.1 },
			}}
		>
			<div className='relative rounded-lg border border-gray-200 bg-raised px-3 py-1.5 text-sm shadow-[0_4px_16px_rgb(70_45_25/0.07)] dark:border-gray-800 dark:shadow-[0_4px_16px_rgb(0_0_0/0.35)]'>
				<span className='font-semibold text-black dark:text-white'>
					{count} contributions
				</span>
				<span className='text-gray-500 dark:text-gray-400'>
					{' '}
					· {formattedDate}
				</span>
				<div
					className='absolute left-1/2 bottom-0 translate-y-full -translate-x-1/2 w-0 h-0'
					style={{
						borderLeft: '5px solid transparent',
						borderRight: '5px solid transparent',
						borderTop: '5px solid var(--surface-raised)',
					}}
				/>
			</div>
		</motion.div>,
		document.body,
	);
}
