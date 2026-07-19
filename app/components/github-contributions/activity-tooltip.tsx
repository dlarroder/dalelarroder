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
			style={{
				left: x,
				top: y,
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
			<div
				className='relative rounded-lg px-3 py-1.5 text-xs'
				style={{
					background: 'rgba(15, 15, 15, 0.92)',
					backdropFilter: 'blur(12px)',
					WebkitBackdropFilter: 'blur(12px)',
					border: '1px solid rgba(255, 255, 255, 0.08)',
					boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
				}}
			>
				<span className='font-semibold text-white'>{count} contributions</span>
				<span className='text-neutral-400'> · {formattedDate}</span>
				<div
					className='absolute left-1/2 bottom-0 translate-y-full -translate-x-1/2 w-0 h-0'
					style={{
						borderLeft: '5px solid transparent',
						borderRight: '5px solid transparent',
						borderTop: '5px solid rgba(15, 15, 15, 0.92)',
					}}
				/>
			</div>
		</motion.div>,
		document.body,
	);
}
