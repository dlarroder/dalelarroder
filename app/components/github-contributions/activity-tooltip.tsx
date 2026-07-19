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
			className='pointer-events-none fixed z-50 rounded-md px-3 py-1.5 text-sm text-white bg-black whitespace-nowrap'
			style={{
				translate: '-50% calc(-100% - 8px)',
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
			{`${count} contributions on ${formattedDate}`}
		</motion.div>,
		document.body,
	);
}
