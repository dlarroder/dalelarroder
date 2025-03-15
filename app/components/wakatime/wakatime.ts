'server only';

import { cache } from 'react';
import { UserStats, WakaTimeAllTimeStats } from './types';

const WAKATIME_ENDPOINT = 'https://wakatime.com/api/v1';

const getWakatimeToken = cache(() => {
  const secret_key = process.env.WAKATIME_SECRET_KEY;

  if (!secret_key) {
    throw new Error('WAKATIME_SECRET_KEY is required');
  }

  const encodedKey = Buffer.from(`${secret_key} :`).toString('base64');

  return encodedKey;
});

const token = getWakatimeToken();

// https://wakatime.com/developers#all_time_since_today
export const getAllTimeStats = cache(async (): Promise<WakaTimeAllTimeStats> => {
  const response = await fetch(`${WAKATIME_ENDPOINT}/users/current/all_time_since_today`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) {
    console.error('Error:', response.status, await response.text());
  }

  const result = await response.json();

  return result.data;
});

// https://wakatime.com/developers#stats
export const getStatsThisWeek = cache(async (): Promise<UserStats> => {
  const response = await fetch(`${WAKATIME_ENDPOINT}/users/current/stats/last_7_days`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) {
    console.error('Error:', response.status, await response.text());
  }

  const result = await response.json();

  return result.data;
});
