import { getTopTracks } from 'app/components/spotify/spotify';
import Track from './track';
import type { AlbumImage, Song, TrackInfo } from './types';

// Spotify lists covers largest first (640, 300, 64); 300 stays sharp at 2x without fetching the full size
const pickAlbumImage = (images: AlbumImage[]) =>
	(images.find((image) => image.width <= 300) ?? images[0])?.url ?? null;

async function fetchTopTracks(): Promise<Song[] | null> {
	try {
		const response = await getTopTracks();

		if (!response.ok) {
			console.error(
				`Spotify top-tracks request failed with status ${response.status}`,
			);
			return null;
		}

		const { items } = await response.json();

		const tracks = items?.slice(0, 5).map((track: TrackInfo) => ({
			album: track.album.name,
			albumImageUrl: pickAlbumImage(track.album.images),
			artist: track.artists.map((_artist) => _artist.name).join(', '),
			songUrl: track.external_urls.spotify,
			title: track.name,
		}));

		return tracks;
	} catch (e) {
		if (e instanceof Error) {
			console.error(e.message);
		}
	}

	return null;
}

export default async function TopTracks() {
	const topTracks = await fetchTopTracks();

	if (!topTracks) {
		return null;
	}

	return (
		<section>
			<h2 className='text-xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100'>
				Top Spotify Songs
			</h2>
			{topTracks.map((track, index) => (
				<Track ranking={index + 1} key={track.songUrl} track={track} />
			))}
		</section>
	);
}
