import type { ProjectModal } from './types';

interface ProjectProps {
	index: number;
	title: string;
	url: string;
	role: string;
	setModal: (modal: ProjectModal) => void;
}

export default function ProjectItem({
	index,
	title,
	url,
	role,
	setModal,
}: ProjectProps) {
	return (
		<a
			href={url}
			target='_blank'
			onMouseEnter={() => {
				setModal({ active: true, index });
			}}
			onMouseLeave={() => {
				setModal({ active: false, index });
			}}
			className='group flex w-full items-center justify-between py-2 sm:py-3'
			rel='noreferrer'
		>
			<h2 className='origin-left text-2xl transition-transform group-hover:scale-110 sm:text-4xl'>
				{title}
			</h2>
			<p className='origin-right text-sm text-gray-500 transition-transform group-hover:scale-110 dark:text-gray-400'>
				{role}
			</p>
		</a>
	);
}
