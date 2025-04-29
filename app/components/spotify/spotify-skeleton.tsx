import Skeleton from '../skeleton';

export default function SpotifySkeleton() {
  return (
    <section className="py-7">
      <Skeleton className="h-9 w-[180px]" />
      {[1, 2, 3, 4, 5].map((rank) => (
        <TrackSkeleton key={rank} rank={rank} />
      ))}
    </section>
  );
}

function TrackSkeleton({ rank }: { rank: number }) {
  return (
    <div className="mt-4 flex w-full max-w-5xl flex-row items-baseline border-b border-gray-200 dark:border-gray-800">
      <p className="text-sm font-bold text-gray-500 dark:text-gray-600">
        {rank}
      </p>
      <div className="flex flex-col pl-3 space-y-2 pb-2">
        <Skeleton className="h-4 w-[350px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
    </div>
  );
}
