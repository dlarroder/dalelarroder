'use client';

import classNames from 'classnames';
import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface MoonIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MoonIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		rotate: 0,
	},
	animate: {
		rotate: [0, -10, 10, -5, 5, 0],
	},
};

const svgTransition: Transition = {
	duration: 1.2,
	ease: 'easeInOut',
};

const MoonIcon = forwardRef<MoonIconHandle, MoonIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
				if (!isControlledRef.current) {
					controls.start('animate');
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter],
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start('normal');
				} else {
					onMouseLeave?.(e);
				}
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
				<motion.svg
					xmlns='http://www.w3.org/2000/svg'
					width={size}
					height={size}
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					variants={svgVariants}
					animate={controls}
					transition={svgTransition}
				>
					<path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
				</motion.svg>
			</div>
		);
	},
);

MoonIcon.displayName = 'MoonIcon';

export { MoonIcon };
