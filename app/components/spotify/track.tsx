import Image from 'next/image';
import type { Song } from './types';

interface TrackProps {
	ranking: number;
	track: Song;
}

export default function Track({ track, ranking }: TrackProps) {
	return (
		<div className='mt-2 flex w-full flex-row items-center'>
			<p className='w-3 shrink-0 text-sm font-bold text-gray-500 dark:text-gray-600'>
				{ranking}
			</p>
			{track.albumImageUrl ? (
				<Image
					src={track.albumImageUrl}
					alt={track.album}
					width={42}
					height={42}
					className='ml-3 size-10.5 shrink-0 rounded-md object-cover'
				/>
			) : (
				<div className='ml-3 size-10.5 shrink-0 rounded-md bg-gray-200 dark:bg-neutral-800' />
			)}
			<div className='flex min-w-0 flex-col pl-3'>
				<a
					className='truncate font-medium text-gray-900 dark:text-gray-100'
					href={track.songUrl}
					target='_blank'
					rel='noopener noreferrer'
				>
					{track.title}
				</a>
				<p className='truncate text-gray-500 dark:text-gray-400'>
					{track.artist}
				</p>
			</div>
		</div>
	);
}
