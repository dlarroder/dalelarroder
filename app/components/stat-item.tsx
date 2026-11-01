import type { ReactNode } from 'react';

interface Props {
	title: string;
	children: ReactNode;
}

export default function StatItem({ title, children }: Props) {
	return (
		<div>
			<p className='font-bold'>{title}</p>
			<span className='text-gray-500 dark:text-gray-400'>{children}</span>
		</div>
	);
}
