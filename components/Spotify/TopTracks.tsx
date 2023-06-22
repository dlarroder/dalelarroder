import { getTopTracks } from '@/lib/spotify';
import Track from './Track';
import { Song, TrackInfo } from './types';

async function fetchTopTracks(): Promise<Song[] | null> {
  try {
    const response = await getTopTracks();
    const { items } = await response.json();

    const tracks = items.slice(0, 5).map((track: TrackInfo) => ({
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
    <div className="py-7">
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        My <span className="text-green-700 dark:text-green-500">Spotify</span> Top Songs
      </h1>
      {topTracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} track={track} />
      ))}
    </div>
  );
}
