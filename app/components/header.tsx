import classNames from 'classnames';
import Link from 'next/link';
import { merryWeather, mukta } from '../fonts';
import { SquareArrowLeftIcon } from './layouts/icons/square-arrow-left';

export default function Header({ title }: { title: string }) {
	return (
		<Link
			href='/'
			className={classNames(
				'flex gap-2 items-center text-primary-500 mb-12 outline-0',
				mukta.className,
			)}
		>
			<div className='flex items-center'>
				<SquareArrowLeftIcon size={20} className='h-9 w-9' />
				<span className='font-bold'>Home</span>
			</div>
			<div className='mx-1 w-full border-b border-primary-500' />
			<span
				className={classNames(
					'text-black dark:text-white text-lg md:text-4xl',
					merryWeather.className,
				)}
			>
				{title}
			</span>
		</Link>
	);
}
