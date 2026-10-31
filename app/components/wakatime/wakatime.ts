import { cache } from 'react';
import type { UserStats, WakaTimeAllTimeStats } from './types';

const WAKATIME_ENDPOINT = 'https://wakatime.com/api/v1';
const REQUEST_TIMEOUT_MS = 10_000;

const getWakatimeToken = cache((): string | null => {
	const secret_key = process.env.WAKATIME_SECRET_KEY;

	if (!secret_key) {
		console.error('WAKATIME_SECRET_KEY is not set; skipping WakaTime stats');
		return null;
	}

	return Buffer.from(`${secret_key} :`).toString('base64');
});

// Returns null on a missing key, network or API failure so WakaTime
// can't fail the build while prerendering /stats.
async function fetchWakatime<T>(path: string): Promise<T | null> {
	const token = getWakatimeToken();

	if (!token) {
		return null;
	}

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
