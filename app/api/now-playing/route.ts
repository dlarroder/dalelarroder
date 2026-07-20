import { fetchNowPlaying } from 'app/components/spotify/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
	const nowPlaying = await fetchNowPlaying();

	return NextResponse.json(nowPlaying);
}
