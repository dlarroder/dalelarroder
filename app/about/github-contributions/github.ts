import { graphql } from '@octokit/graphql';
import { cache } from 'react';

export const GITHUB_USERNAME = 'dlarroder';

const getGraphqlWithAuth = cache(() => {
	const github_token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';

	if (!github_token) {
		throw new Error('GITHUB_TOKEN is required');
	}

	const graphqlWithAuth = graphql.defaults({
		headers: { authorization: `bearer ${github_token}` },
	});

	return graphqlWithAuth;
});

const query = `
  query ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          colors
          totalContributions
          weeks {
            contributionDays {
              color
              date
              contributionCount
            }
            firstDay
          }
          months {
            firstDay
            name
            totalWeeks
          }
        }
      }
    }
  }
`;

export type GithubResponse = {
	user: {
		contributionsCollection: {
			contributionCalendar: {
				colors: string[];
				totalContributions: number;
				weeks: {
					contributionDays: {
						color: string;
						date: string;
						contributionCount: number;
					}[];
					firstDay: string;
				}[];
				months: { firstDay: string; name: string; totalWeeks: number }[];
			};
		};
	};
};

export type GithubUser = GithubResponse['user'];

export type ContributionCalendar =
	GithubUser['contributionsCollection']['contributionCalendar'];

export type ContributionMonths = ContributionCalendar['months'];

export type ContributionWeeks = ContributionCalendar['weeks'];

export type ContributionDay = ContributionWeeks[0]['contributionDays'][0];

export type ContributionStreak = {
	longestStreak: number;
	currentStreak: number;
	longestStreakStart: string | null;
	longestStreakEnd: string | null;
	currentStreakStart: string | null;
};

export const getContributions = cache(
	async (username: string, year: number): Promise<ContributionCalendar> => {
		const today = new Date();
		const currentYear = today.getFullYear();

		let from: string;
		let to: string = today.toISOString(); // Always set `to` as today

		if (year === currentYear) {
			// If the year is the current year, set `from` to today minus 1 year
			const pastYear = new Date();
			pastYear.setFullYear(today.getFullYear() - 1);
			from = pastYear.toISOString();
		} else {
			// Otherwise, use the standard Jan 1 - Dec 31 range
			from = new Date(year, 0, 1).toISOString();
			to = new Date(year, 11, 31, 23, 59, 59).toISOString();
		}

		const graphqlWithAuth = getGraphqlWithAuth();
		const response = await graphqlWithAuth<GithubResponse>({
			query,
			username,
			from,
			to,
		});

		return response.user.contributionsCollection.contributionCalendar;
	},
);

export const getBestDay = (weeks: ContributionWeeks) => {
	let bestDay: { day: string; count: number } = { day: '', count: 0 };

	weeks.forEach((week) => {
		week.contributionDays.forEach((day) => {
			if (day.contributionCount > bestDay.count) {
				bestDay = { day: day.date, count: day.contributionCount };
			}
		});
	});

	return bestDay;
};

export const getThisWeeksContributions = (weeks: ContributionWeeks) => {
	return (
		weeks[weeks.length - 1]?.contributionDays
			?.map((item) => item.contributionCount)
			?.reduce(
				(previousValue, currentValue) => previousValue + currentValue,
				0,
			) || 0
	);
};

export const getDaysFromContribution = (weeks: ContributionWeeks) => {
	return weeks.flatMap((week) => week.contributionDays).length;
};

export function getContributionStreak(
	contributionDays: ContributionDay[],
): ContributionStreak {
	let longestStreak = 0;
	let currentStreak = 0;
	let tempStreak = 0;
	let longestStreakStart: string | null = null;
	let longestStreakEnd: string | null = null;
	let currentStreakStart: string | null = null;

	let previousDate: Date | null = null;

	for (const { date, contributionCount } of contributionDays) {
		const currentDate = new Date(date);

		if (contributionCount > 0) {
			if (
				previousDate &&
				currentDate.getTime() - previousDate.getTime() === 86400000
			) {
				tempStreak++;
			} else {
				tempStreak = 1;
				currentStreakStart = date;
			}

			if (tempStreak > longestStreak) {
				longestStreak = tempStreak;
				longestStreakStart = currentStreakStart;
				longestStreakEnd = date;
			}

			currentStreak = tempStreak;
		} else {
			tempStreak = 0;
			currentStreak = 0;
			currentStreakStart = null;
		}

		previousDate = currentDate;
	}

	return {
		longestStreak,
		currentStreak,
		longestStreakStart,
		longestStreakEnd,
		currentStreakStart,
	};
}
