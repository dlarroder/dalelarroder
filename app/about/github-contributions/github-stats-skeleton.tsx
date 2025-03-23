import Skeleton from '../../components/skeleton';

export default function GithubStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Skeleton className="h-[65px] w-full" />
      <Skeleton className="h-[65px] w-full" />
      <Skeleton className="h-[65px] w-full" />
      <Skeleton className="h-[65px] w-full" />
    </div>
  );
}
