'use client';

import classNames from 'classnames';
import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface SquareArrowLeftIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareArrowLeftIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const squareVariants: Variants = {
	normal: { transition: { duration: 0.4 } },
	animate: { transition: { duration: 0.6, ease: 'easeInOut' } },
};

const pathVariants: Variants = {
	normal: { d: 'm12 8-4 4 4 4', translateX: 0, opacity: 1 },
	animate: {
		d: 'm12 8-4 4 4 4',
		translateX: [0, 3, 0],
		transition: { duration: 0.4 },
	},
};

const secondPathVariants: Variants = {
	normal: { d: 'M16 12H8', opacity: 1 },
	animate: {
		d: ['M16 12H8', 'M16 12H13', 'M16 12H8'],
		transition: { duration: 0.4 },
	},
};

const SquareArrowLeftIcon = forwardRef<
	SquareArrowLeftIconHandle,
	SquareArrowLeftIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start('animate'),
			stopAnimation: () => controls.start('normal'),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start('animate');
			else onMouseEnter?.(e);
		},
		[controls, onMouseEnter],
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start('normal');
			else onMouseLeave?.(e);
		},
		[controls, onMouseLeave],
	);

	return (
		<div
			className={classNames(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className,
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={size}
				height={size}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<motion.rect
					width='18'
					height='18'
					x='3'
					y='3'
					rx='2'
					variants={squareVariants}
					animate={controls}
					initial='normal'
				/>
				<motion.path
					variants={pathVariants}
					animate={controls}
					initial='normal'
					d='m12 8-4 4 4 4'
				/>
				<motion.path
					variants={secondPathVariants}
					animate={controls}
					initial='normal'
					d='M16 12H8'
				/>
			</svg>
		</div>
	);
});

SquareArrowLeftIcon.displayName = 'SquareArrowLeftIcon';

export { SquareArrowLeftIcon };
