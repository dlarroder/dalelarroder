import Link from 'next/link';
import { ReturnIcon } from './layouts/icons/return-icon';

export default function Header({ title }: { title: string }) {
	return (
		<Link href='/' className='group flex items-center gap-2 outline-0'>
			<span className='flex shrink-0 items-center gap-1 text-sm text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100 motion-safe:transition-colors'>
				<ReturnIcon />
				Home
			</span>
			<div className='mx-1 w-full border-b border-gray-200 dark:border-gray-800' />
			<span className='shrink-0 text-xl font-semibold tracking-tight text-black md:text-2xl dark:text-white'>
				{title}
			</span>
		</Link>
	);
}
