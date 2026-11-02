export type Artist = {
	id: string;
	name: string;
	type: string;
	href: string;
};

export type AlbumImage = {
	url: string;
	width: number;
	height: number;
};

export type TrackInfo = {
	album: { name: string; images: AlbumImage[] };
	artists: Artist[];
	external_urls: { spotify: string };
	name: string;
};

export type Song = {
	album: string;
	albumImageUrl: string | null;
	songUrl: string;
	artist: string;
	title: string;
};

export type NowPlayingSong = {
	album: string;
	albumImageUrl: string;
	artist: string;
	isPlaying: boolean;
	songUrl: string;
	title: string;
};
