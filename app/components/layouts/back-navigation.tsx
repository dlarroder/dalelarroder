'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { mukta } from '../../fonts';
import { SquareArrowLeftIcon } from './icons/square-arrow-left';

export default function BackNavigation() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className={classNames(
				'flex w-full cursor-pointer text-primary-500 mb-12',
				mukta.className,
			)}
		>
			<div className='flex w-full items-center'>
				<SquareArrowLeftIcon size={20} className='h-9 w-9' />
				<span className='font-bold'>Back</span>
				<div className='mx-1 w-full border-b border-primary-500' />
			</div>
		</button>
	);
}
