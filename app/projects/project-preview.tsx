'use client';

import gsap from 'gsap';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project, ProjectModal } from './types';

interface ProjectModalProps {
	modal: ProjectModal;
	projects: Project[];
}

const scaleAnimation = {
	initial: { scale: 0.9, opacity: 0, x: '-50%', y: '-50%' },
	enter: {
		scale: 1,
		opacity: 1,
		x: '-50%',
		y: '-50%',
		transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
	},
	closed: {
		scale: 0.9,
		opacity: 0,
		x: '-50%',
		y: '-50%',
		transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as const },
	},
} as const;

export default function ProjectPreview({ modal, projects }: ProjectModalProps) {
	const { active, index } = modal;
	const modalContainer = useRef<HTMLDivElement>(null);
	const cursor = useRef<HTMLDivElement>(null);
	const cursorLabel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const targets = [
			modalContainer.current,
			cursor.current,
			cursorLabel.current,
		];

		// Move Container
		const xMoveContainer = gsap.quickTo(modalContainer.current, 'left', {
			duration: 0.8,
			ease: 'power3',
		});
		const yMoveContainer = gsap.quickTo(modalContainer.current, 'top', {
			duration: 0.8,
			ease: 'power3',
		});

		// Move cursor
		const xMoveCursor = gsap.quickTo(cursor.current, 'left', {
			duration: 0.5,
			ease: 'power3',
		});
		const yMoveCursor = gsap.quickTo(cursor.current, 'top', {
			duration: 0.5,
			ease: 'power3',
		});

		// Move cursor label
		const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'left', {
			duration: 0.45,
			ease: 'power3',
		});
		const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'top', {
			duration: 0.45,
			ease: 'power3',
		});

		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			xMoveContainer(clientX);
			yMoveContainer(clientY);
			xMoveCursor(clientX);
			yMoveCursor(clientY);
			xMoveCursorLabel(clientX);
			yMoveCursorLabel(clientY);
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			gsap.killTweensOf(targets);
		};
	}, []);

	// Next scrolls a new page into view when any element it renders, portals
	// included, starts above the viewport. Fixed and centered until the cursor
	// moves, these never do, and they no longer stretch the page either.
	return createPortal(
		<>
			<motion.div
				className='pointer-events-none fixed top-1/2 left-1/2 z-10 flex h-[240px] w-[320px] items-center justify-center overflow-hidden rounded-xl bg-white'
				ref={modalContainer}
				variants={scaleAnimation}
				initial='initial'
				animate={active ? 'enter' : 'closed'}
			>
				<div
					className='absolute h-full w-full'
					style={{
						top: `${index * -100}%`,
						transition: 'top 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
					}}
				>
					{projects.map((project) => {
						const { src, color } = project;
						return (
							// Every screenshot fills the same 16px inset; squarer ones lose their
							// bottom edge, keeping each app's header in view
							<div
								className='h-full w-full p-4'
								style={{ backgroundColor: color }}
								key={`modal_${src}`}
							>
								<div className='relative h-full w-full overflow-hidden rounded-md'>
									<Image
										className='object-cover object-top'
										src={`/static/images/project/${src}`}
										fill
										sizes='288px'
										alt=''
									/>
								</div>
							</div>
						);
					})}
				</div>
			</motion.div>
			<motion.div
				className='font-base pointer-events-none fixed top-1/2 left-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent font-light text-accent-fg'
				ref={cursor}
				variants={scaleAnimation}
				initial='initial'
				animate={active ? 'enter' : 'closed'}
			></motion.div>
			<motion.div
				className='font-base pointer-events-none fixed top-1/2 left-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-transparent font-light text-white'
				ref={cursorLabel}
				variants={scaleAnimation}
				initial='initial'
				animate={active ? 'enter' : 'closed'}
			>
				View
			</motion.div>
		</>,
		document.body,
	);
}
