import Skeleton from '../skeleton';

export default function SpotifySkeleton() {
	return (
		<section>
			<div className='flex h-8 items-center'>
				<Skeleton className='h-5 w-[180px]' />
			</div>
			{[1, 2, 3, 4, 5].map((rank) => (
				<TrackSkeleton key={rank} rank={rank} />
			))}
		</section>
	);
}

// Same 42px row as a loaded track: title and artist lines, 8px apart
function TrackSkeleton({ rank }: { rank: number }) {
	return (
		<div className='mt-2 flex h-10.5 w-full flex-row items-start'>
			<p className='text-sm font-bold text-gray-500 dark:text-gray-600'>
				{rank}
			</p>
			<div className='flex h-full flex-col justify-center gap-2.5 pl-3'>
				<Skeleton className='h-4 w-56 max-w-full' />
				<Skeleton className='h-4 w-36 max-w-full' />
			</div>
		</div>
	);
}
