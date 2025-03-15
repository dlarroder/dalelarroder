'server only';

import { graphql } from '@octokit/graphql';
import { cache } from 'react';

const getGraphqlWithAuth = cache(() => {
  const github_token = process.env.GITHUB_TOKEN || '';

  if (!github_token) {
    throw new Error('GITHUB_TOKEN is required');
  }

  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `bearer ${github_token}`,
    },
  });

  return graphqlWithAuth;
});

const query = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          colors
          totalContributions
          weeks {
            contributionDays {
              color
              date
              contributionCount
            }
            firstDay,
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
          contributionDays: { color: string; date: string; contributionCount: number }[];
          firstDay: string;
        }[];
        months: { firstDay: string; name: string; totalWeeks: number }[];
      };
    };
  };
};

export type GithubUser = GithubResponse['user'];

export type ContributionCalendar = GithubUser['contributionsCollection']['contributionCalendar'];

export type ContributionMonths = ContributionCalendar['months'];

export type ContributionWeeks = ContributionCalendar['weeks'];

export const getContributions = cache(async (username: string): Promise<ContributionCalendar> => {
  const graphqlWithAuth = getGraphqlWithAuth();
  const response = await graphqlWithAuth<GithubResponse>({
    query,
    username,
  });

  const contributions = response.user.contributionsCollection.contributionCalendar;

  return contributions;
});

export const getMonthContributionCount = (months: ContributionMonths, weeks: ContributionWeeks) => {
  return months.map((month) => {
    const filterContributionDay = weeks
      .filter((week) => week.firstDay.slice(0, 7) === month.firstDay.slice(0, 7))
      .map((item) => item.contributionDays)
      .flat(1);
    const getContributionsByMonth = filterContributionDay.reduce(
      (previousValue, currentValue) => previousValue + currentValue.contributionCount,
      0
    );

    return {
      ...month,
      contributionsCount: getContributionsByMonth,
    };
  });
};
