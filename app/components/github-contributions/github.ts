export const GITHUB_USERNAME = 'dlarroder';

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

type GithubUser = GithubResponse['user'];

export type ContributionCalendar =
	GithubUser['contributionsCollection']['contributionCalendar'];

type ContributionWeeks = ContributionCalendar['weeks'];

type ContributionDay = ContributionWeeks[0]['contributionDays'][0];

type ContributionStreak = {
	longestStreak: number;
	currentStreak: number;
	longestStreakStart: string | null;
	longestStreakEnd: string | null;
	currentStreakStart: string | null;
};

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
