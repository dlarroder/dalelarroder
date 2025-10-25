'server only';

import { cache } from 'react';
import type { Artist, NowPlayingSong } from './types';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || '';
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN || '';

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = cache(async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token,
		}),
		next: {
			revalidate: 3600,
		},
	});

	return response.json();
});

const getNowPlaying = cache(async () => {
	const { access_token } = await getAccessToken();

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		next: {
			revalidate: 30,
		},
	});
});

export const getTopTracks = cache(async () => {
	const { access_token } = await getAccessToken();

	return fetch(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
});

export async function fetchNowPlaying(): Promise<NowPlayingSong | null> {
	try {
		const response = await getNowPlaying();

		if (response.status === 204 || response.status > 400) {
			return null;
		}

		const song = await response.json();
		const isPlaying = song.is_playing;

		if (!song.item) {
			return null;
		}

		const title = song.item.name;
		const artist = song.item.artists
			.map((artist: Artist) => artist.name)
			.join(', ');
		const album = song.item.album.name;
		const albumImageUrl = song.item.album.images[0].url;
		const songUrl = song.item.external_urls.spotify;

		return {
			album,
			albumImageUrl,
			artist,
			isPlaying,
			songUrl,
			title,
		};
	} catch (e) {
		if (e instanceof Error) {
			console.error(e.message);
		}
	}

	return null;
}
