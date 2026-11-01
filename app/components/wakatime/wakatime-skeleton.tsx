import Skeleton from '../skeleton';

export default function WakatimeSkeleton() {
	return (
		<section className='space-y-2'>
			{/* Matches the 32px title and 16px subtitle lines */}
			<div>
				<div className='flex h-8 items-center'>
					<Skeleton className='h-5 w-[102px]' />
				</div>
				<div className='flex h-4 items-center'>
					<Skeleton className='h-3 w-20' />
				</div>
			</div>
			<div className='grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2'>
				<Skeleton className='h-10.5 w-full' />
				<Skeleton className='h-10.5 w-full' />
				<Skeleton className='h-10.5 w-full' />
				<Skeleton className='h-10.5 w-full' />
			</div>
		</section>
	);
}
