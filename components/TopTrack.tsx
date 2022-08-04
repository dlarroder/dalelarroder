import Track from 'components/Track'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import { TopTracks } from 'types/TopTracks'

export default function Tracks() {
  const { data: topTracks } = useSWR<TopTracks>('/api/top-tracks', fetcher)

  if (!topTracks) {
    return null
  }

  return (
    <>
      {topTracks.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} track={track} />
      ))}
    </>
  )
}
