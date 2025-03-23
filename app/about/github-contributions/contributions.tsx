'use client';

import { Fragment, useEffect, useState, useTransition } from 'react';
import Calendar from './calendar';
import { ContributionCalendar, getContributions } from './github';
import GithubCalendarSkeleton from './github-calendar-skeleton';
import GithubStats from './github-stats';
import GithubStatsSkeleton from './github-stats-skeleton';
import YearSelect from './year-select';

export default function Contributions() {
  const [isPending, startTransition] = useTransition();
  const [year, setYear] = useState(new Date().getFullYear());
  const [contributions, setContributions] = useState<ContributionCalendar | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const data = await getContributions('dlarroder', year);
      setContributions(data);
    });
  }, [year]);

  if (!contributions) {
    return (
      <div className="flex flex-col space-y-4">
        <GithubCalendarSkeleton />
        <GithubStatsSkeleton />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="flex space-x-4">
        {isPending ? <GithubCalendarSkeleton /> : <Calendar contributions={contributions} />}
        <YearSelect selectedYear={year} onYearChange={setYear} />
      </div>
      <GithubStats contributions={contributions} />
    </Fragment>
  );
}
