import Skeleton from '../../components/skeleton';

export default function GithubCalendarSkeleton() {
  return (
    <div className="h-[152px] flex flex-col justify-between w-[calc(100%-53px)] md:w-[640px] lg:w-[800px]">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-[102px] w-full" />
      <Skeleton className="h-4 w-36" />
    </div>
  );
}
