import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import ProjectItem from '../components/Projects/ProjectItem';
import ProjectPreview from '../components/Projects/ProjectPreview';
import { projects } from '../components/Projects/constants';
import { ProjectModal } from '../components/Projects/types';
import NormalLayout from '../layouts/NormalLayout';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export default function Projects() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [modal, setModal] = useState<ProjectModal>({ active: false, index: 0 });

  return (
    <NormalLayout>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="space-y-2 pt-6 pb-8 md:space-y-5 ">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Projects
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Here are some of my selected projects worth sharing.
        </p>
      </div>
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
    </NormalLayout>
  );
}
