import Projects from 'app/projects/projects';
import SectionContainer from '../components/layouts/section-container';

export const metadata = {
  title: 'Projects',
  description: 'My Projects - Dale Larroder',
};

export default function Page() {
  return (
    <SectionContainer>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5 ">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Projects
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Here are some of my selected projects worth sharing.
        </p>
      </div>
      <Projects />
    </SectionContainer>
  );
}
