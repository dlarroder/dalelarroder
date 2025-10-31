'use client';

import classNames from 'classnames';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface XIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface XIconProps extends HTMLAttributes<HTMLButtonElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
	},
};

const XIcon = forwardRef<XIconHandle, XIconProps>(
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

		const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!isControlledRef.current) {
				controls.start('animate');
			} else {
				onMouseEnter?.(e);
			}
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!isControlledRef.current) {
				controls.start('normal');
			} else {
				onMouseLeave?.(e);
			}
		};
		return (
			<button
				type='button'
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
					aria-label='X icon'
				>
					<title>X icon</title>
					<motion.path
						variants={pathVariants}
						animate={controls}
						d='M18 6 6 18'
					/>
					<motion.path
						transition={{ delay: 0.2 }}
						variants={pathVariants}
						animate={controls}
						d='m6 6 12 12'
					/>
				</svg>
			</button>
		);
	},
);

XIcon.displayName = 'XIcon';

export { XIcon };
