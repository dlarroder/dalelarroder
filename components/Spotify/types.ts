export type Artist = {
  id: string;
  name: string;
  type: string;
  href: string;
};

export type TrackInfo = { artists: Artist[]; external_urls: { spotify: string }; name: string };

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export const nowPlayingEmptyState: NowPlayingSong = {
  album: '',
  albumImageUrl: '',
  artist: '',
  isPlaying: false,
  songUrl: '',
  title: '',
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};
