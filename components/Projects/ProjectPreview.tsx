'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Project, ProjectModal } from './types';

interface ProjectModalProps {
  modal: ProjectModal;
  projects: Project[];
}

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function ProjectPreview({ modal, projects }: ProjectModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window !== undefined) {
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
      const xMoveCursor = gsap.quickTo(cursor.current, 'left', { duration: 0.5, ease: 'power3' });
      const yMoveCursor = gsap.quickTo(cursor.current, 'top', { duration: 0.5, ease: 'power3' });

      // Move cursor label
      const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'left', {
        duration: 0.45,
        ease: 'power3',
      });
      const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'top', {
        duration: 0.45,
        ease: 'power3',
      });

      window.addEventListener('mousemove', (e) => {
        const { pageX, pageY } = e;
        xMoveContainer(pageX);
        yMoveContainer(pageY);
        xMoveCursor(pageX);
        yMoveCursor(pageY);
        xMoveCursorLabel(pageX);
        yMoveCursorLabel(pageY);
      });
    }
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none absolute flex h-[350px] w-[400px] items-center justify-center overflow-hidden bg-white"
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      >
        <div
          className="absolute h-full w-full"
          style={{ top: index * -100 + '%', transition: 'top 0.6s cubic-bezier(0.76, 0, 0.24, 1)' }}
        >
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ backgroundColor: color }}
                key={`modal_${index}`}
              >
                <Image
                  className="h-auto"
                  src={`/static/images/project/${src}`}
                  width={300}
                  height={300}
                  alt="image"
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        className="font-base pointer-events-none absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 font-light text-white"
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      ></motion.div>
      <motion.div
        className="font-base pointer-events-none absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-transparent font-light text-white"
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      >
        View
      </motion.div>
    </>
  );
}
