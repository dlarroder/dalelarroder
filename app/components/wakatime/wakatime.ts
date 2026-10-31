import { cache } from 'react';
import type { UserStats, WakaTimeAllTimeStats } from './types';

const WAKATIME_ENDPOINT = 'https://wakatime.com/api/v1';
const REQUEST_TIMEOUT_MS = 10_000;

const getWakatimeToken = cache(() => {
	const secret_key = process.env.WAKATIME_SECRET_KEY;

	if (!secret_key) {
		throw new Error('WAKATIME_SECRET_KEY is required');
	}

	const encodedKey = Buffer.from(`${secret_key} :`).toString('base64');

	return encodedKey;
});

const token = getWakatimeToken();

// Returns null on network or API failure so an unreachable WakaTime
// doesn't fail the build while prerendering /stats.
async function fetchWakatime<T>(path: string): Promise<T | null> {
	try {
		const response = await fetch(`${WAKATIME_ENDPOINT}${path}`, {
			headers: {
				Authorization: `Basic ${token}`,
			},
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		});

		if (!response.ok) {
			console.error(
				`WakaTime ${path} request failed with status ${response.status}`,
			);
			return null;
		}

		const result = await response.json();

		return result.data;
	} catch (e) {
		if (e instanceof Error) {
			console.error(`WakaTime ${path} request failed: ${e.message}`);
		}
	}

	return null;
}

// https://wakatime.com/developers#all_time_since_today
export const getAllTimeStats = cache(() =>
	fetchWakatime<WakaTimeAllTimeStats>('/users/current/all_time_since_today'),
);

// https://wakatime.com/developers#stats
export const getStatsThisWeek = cache(() =>
	fetchWakatime<UserStats>('/users/current/stats/last_7_days'),
);
