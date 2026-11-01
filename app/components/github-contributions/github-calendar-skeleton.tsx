import Skeleton from '../skeleton';

export default function GithubCalendarSkeleton() {
	return (
		<div className='h-[150px] flex flex-col justify-between min-w-0 flex-1'>
			<Skeleton className='h-4 w-full' />
			<Skeleton className='h-[102px] w-full' />
			<Skeleton className='h-4 w-36' />
		</div>
	);
}
