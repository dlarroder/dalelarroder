'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import { projects } from './constants';
import ProjectItem from './project-item';
import ProjectPreview from './project-preview';
import type { ProjectModal } from './types';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export default function Projects() {
	const prefersReducedMotion = useReducedMotion();
	const { breakpoint } = useBreakpoint(BREAKPOINTS);
	const [modal, setModal] = useState<ProjectModal>({ active: false, index: 0 });

	return (
		<>
			{projects.map((project, index) => (
				<motion.div
					key={project.title}
					initial={{
						scale: prefersReducedMotion ? 1 : 0.8,
						opacity: 0,
						filter: prefersReducedMotion ? 'blur(0px)' : 'blur(2px)',
					}}
					animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
					transition={{
						duration: prefersReducedMotion ? 0.2 : 0.6,
						delay: prefersReducedMotion ? 0 : index / 10,
					}}
				>
					<ProjectItem
						index={index}
						title={project.title}
						url={project.url}
						role={project.role}
						setModal={setModal}
					/>
				</motion.div>
			))}
			{breakpoint === 'desktop' && (
				<ProjectPreview modal={modal} projects={projects} />
			)}
		</>
	);
}
