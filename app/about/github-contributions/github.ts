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

export const getBestDay = (weeks: ContributionWeeks) => {
  let bestDay: {
    day: string;
    count: number;
  } = {
    day: '',
    count: 0,
  };

  weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      if (day.contributionCount > bestDay.count) {
        bestDay = {
          day: day.date,
          count: day.contributionCount,
        };
      }
    });
  });

  return bestDay;
};

export const getThisWeeksContributions = (weeks: ContributionWeeks) => {
  return (
    weeks[weeks.length - 1]?.contributionDays
      ?.map((item) => item.contributionCount)
      ?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) || 0
  );
};

export const getDaysFromContribution = (weeks: ContributionWeeks) => {
  return weeks.flatMap((week) => week.contributionDays).length;
};
