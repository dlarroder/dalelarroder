import { NextApiResponse, type NextApiRequest } from 'next/types'
import { nowPlayingEmptyState, NowPlayingSong } from 'types/Spotify'
import { getNowPlaying } from '../../lib/spotify'
import { Artist } from './top-tracks'

const nowPlaying = async (req: NextApiRequest, res: NextApiResponse<NowPlayingSong>) => {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json(nowPlayingEmptyState)
  }

  const song = await response.json()
  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map((artist: Artist) => artist.name).join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  })
}

export default nowPlaying
