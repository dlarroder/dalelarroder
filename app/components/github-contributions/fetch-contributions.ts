import 'server-only';
import type { ContributionCalendar, GithubResponse } from './github';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

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

export async function getContributions(
	username: string,
	year: number,
): Promise<ContributionCalendar> {
	const github_token = process.env.GITHUB_TOKEN;

	if (!github_token) {
		throw new Error('GITHUB_TOKEN is required');
	}

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

	const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `bearer ${github_token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query, variables: { username, from, to } }),
	});

	const result = await response.json();

	if (!response.ok || result.errors) {
		throw new Error(
			`GitHub contributions request failed (${response.status}): ${result.errors?.[0]?.message ?? result.message ?? 'unknown error'}`,
		);
	}

	return (result.data as GithubResponse).user.contributionsCollection
		.contributionCalendar;
}
