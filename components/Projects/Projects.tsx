'use client';

import { useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import ProjectItem from './ProjectItem';
import ProjectPreview from './ProjectPreview';
import { projects } from './constants';
import { ProjectModal } from './types';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export default function Projects() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [modal, setModal] = useState<ProjectModal>({ active: false, index: 0 });

  return (
    <>
      {projects.map((project, index) => (
        <ProjectItem
          key={project.title}
          index={index}
          title={project.title}
          url={project.url}
          role={project.role}
          setModal={setModal}
        />
      ))}
      {breakpoint === 'desktop' && <ProjectPreview modal={modal} projects={projects} />}
    </>
  );
}
