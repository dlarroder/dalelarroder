import Skeleton from '../skeleton';

export default function GithubStatsSkeleton() {
	return (
		<div className='grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2'>
			<Skeleton className='h-10.5 w-full' />
			<Skeleton className='h-10.5 w-full' />
			<Skeleton className='h-10.5 w-full' />
			<Skeleton className='h-10.5 w-full' />
		</div>
	);
}
