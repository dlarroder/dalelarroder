import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function PageTitle({ children }: Props) {
	return (
		<h1 className='text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl'>
			{children}
		</h1>
	);
}
