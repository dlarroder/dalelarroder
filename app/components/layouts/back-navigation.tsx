'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { mukta } from '../../fonts';
import { ReturnIcon } from './icons/return-icon';

const linkClassName =
	'flex shrink-0 items-center gap-1 text-sm text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100 motion-safe:transition-colors';

export default function BackNavigation({
	compact = false,
	className,
}: {
	// Just the link, for the side rail, instead of the full-width bar
	compact?: boolean;
	className?: string;
}) {
	const router = useRouter();

	return (
		<button
			type='button'
			onClick={() => router.back()}
			className={classNames(
				'group flex cursor-pointer items-center',
				!compact && 'w-full gap-2',
				mukta.className,
				className,
			)}
		>
			<span className={linkClassName}>
				<ReturnIcon />
				Back
			</span>
			{!compact && (
				<div className='mx-1 w-full border-b border-gray-200 dark:border-gray-800' />
			)}
		</button>
	);
}
