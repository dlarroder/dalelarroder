export const nowPlayingEmptyState: NowPlayingSong = {
  album: '',
  albumImageUrl: '',
  artist: '',
  isPlaying: false,
  songUrl: '',
  title: '',
}

export type NowPlayingSong = {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}
