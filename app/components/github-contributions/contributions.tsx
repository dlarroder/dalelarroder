'use client';

import { Fragment, useState } from 'react';
import useSWR from 'swr';
import Calendar from './calendar';
import type { ContributionCalendar } from './github';
import GithubCalendarSkeleton from './github-calendar-skeleton';
import GithubStats from './github-stats';
import GithubStatsSkeleton from './github-stats-skeleton';
import YearSelect from './year-select';

const fetcher = async (url: string): Promise<ContributionCalendar> => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Failed to load contributions (${res.status})`);
	}

	return res.json();
};

export default function Contributions() {
	const [year, setYear] = useState(new Date().getFullYear());

	const { data: contributions, isLoading } = useSWR(
		`/api/github-contributions?year=${year}`,
		fetcher,
	);

	if (!contributions || isLoading) {
		return (
			<div className='flex flex-col space-y-2'>
				<YearSelect selectedYear={year} onYearChange={setYear} />
				<GithubCalendarSkeleton />
				<GithubStatsSkeleton />
			</div>
		);
	}

	return (
		<Fragment>
			<YearSelect selectedYear={year} onYearChange={setYear} />
			<Calendar contributions={contributions} />
			<GithubStats contributions={contributions} />
		</Fragment>
	);
}
