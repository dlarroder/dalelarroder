import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import { TopTracks } from 'types/Spotify'
import Track from './Track'

export default function Tracks() {
  const { data: topTracks } = useSWR<TopTracks>('/api/top-tracks', fetcher)

  if (!topTracks) {
    return null
  }

  return (
    <div className="py-7">
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        My <span className="text-green-700 dark:text-green-500">Spotify</span> Top Songs
      </h1>
      {topTracks.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} track={track} />
      ))}
    </div>
  )
}
