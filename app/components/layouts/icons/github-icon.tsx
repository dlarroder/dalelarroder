'use client';

import classNames from 'classnames';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface GithubIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GithubIconProps extends HTMLAttributes<HTMLButtonElement> {
	size?: number;
}

const bodyVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		scale: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		scale: [0.9, 1],
		transition: {
			duration: 0.4,
		},
	},
};

const tailVariants: Variants = {
	normal: {
		pathLength: 1,
		rotate: 0,
		transition: {
			duration: 0.3,
		},
	},
	draw: {
		pathLength: [0, 1],
		rotate: 0,
		transition: {
			duration: 0.5,
		},
	},
	wag: {
		pathLength: 1,
		rotate: [0, -15, 15, -10, 10, -5, 5],
		transition: {
			duration: 2.5,
			ease: 'easeInOut',
			repeat: Number.POSITIVE_INFINITY,
		},
	},
};

const GithubIcon = forwardRef<GithubIconHandle, GithubIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const bodyControls = useAnimation();
		const tailControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => {
					bodyControls.start('animate');
					await tailControls.start('draw');
					tailControls.start('wag');
				},
				stopAnimation: () => {
					bodyControls.start('normal');
					tailControls.start('normal');
				},
			};
		});

		const handleMouseEnter = async (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!isControlledRef.current) {
				bodyControls.start('animate');
				await tailControls.start('draw');
				tailControls.start('wag');
			} else {
				onMouseEnter?.(e);
			}
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!isControlledRef.current) {
				bodyControls.start('normal');
				tailControls.start('normal');
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
					aria-label='GitHub icon'
				>
					<title>GitHub icon</title>
					<motion.path
						variants={bodyVariants}
						initial='normal'
						animate={bodyControls}
						d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'
					/>
					<motion.path
						variants={tailVariants}
						initial='normal'
						animate={tailControls}
						d='M9 18c-4.51 2-5-2-7-2'
					/>
				</svg>
			</button>
		);
	},
);

GithubIcon.displayName = 'GithubIcon';

export { GithubIcon };
