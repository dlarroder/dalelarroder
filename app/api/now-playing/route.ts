import { fetchNowPlaying } from 'app/components/spotify/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
	const nowPlaying = await fetchNowPlaying();

	return NextResponse.json(nowPlaying, {
		headers: {
			// Clients poll every 15s; let the CDN share one response across visitors
			'Cache-Control': 's-maxage=15, stale-while-revalidate=30',
		},
	});
}
