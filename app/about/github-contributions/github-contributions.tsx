'use client';

import { useEffect, useState, useTransition } from 'react';
import Calendar from './calendar';
import { ContributionCalendar, getContributions } from './github';
import GithubCalendarSkeleton from './github-calendar-skeleton';
import GithubStats from './github-stats';
import YearSelect from './year-select';

export default function GithubContributions() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [contributions, setContributions] = useState<ContributionCalendar | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getContributions('dlarroder', year);
      setContributions(data);
    });
  }, [year]);

  if (!contributions) {
    return <p>Loading...</p>;
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Github
        </p>
        <p className="text-gray-500 dark:text-gray-400 leading-4">Contributions Stats</p>
      </div>
      <div className="flex space-x-4">
        {isPending ? <GithubCalendarSkeleton /> : <Calendar contributions={contributions} />}
        <YearSelect selectedYear={year} onYearChange={setYear} />
      </div>
      <GithubStats contributions={contributions} />
    </section>
  );
}
