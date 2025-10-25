import Skeleton from '../skeleton';

export default function WakatimeSkeleton() {
	return (
		<section className='space-y-4 mt-7'>
			<div className='flex justify-between items-center'>
				<Skeleton className='h-9 w-[102px]' />
				<Skeleton className='h-6 w-20' />
			</div>
			<div>
				<Skeleton className='h-4 w-20' />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<Skeleton className='h-[66px] w-full' />
				<Skeleton className='h-[66px] w-full' />
				<Skeleton className='h-[66px] w-full' />
				<Skeleton className='h-[66px] w-full' />
			</div>
		</section>
	);
}
