import { getTopTracks } from 'lib/spotify'
import type { NextApiRequest, NextApiResponse } from 'next'

export type Artist = {
  id: string
  name: string
  type: string
  href: string
}

type Track = { artists: Artist[]; external_urls: { spotify: string }; name: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getTopTracks()
  const { items } = await response.json()

  const tracks = items.slice(0, 5).map((track: Track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }))

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

  return res.status(200).json({ tracks })
}
