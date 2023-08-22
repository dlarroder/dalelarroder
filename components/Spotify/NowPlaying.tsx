// // import { getNowPlaying } from '@/lib/spotify';
// import AnimatedBars from './AnimatedBars';
// import { Artist, NowPlayingSong } from './types';

// async function fetchNowPlaying(): Promise<NowPlayingSong | null> {
//   try {
//     const response = await getNowPlaying();

//     if (response.status === 204 || response.status > 400) {
//       return null;
//     }

//     const song = await response.json();
//     const isPlaying = song.is_playing;
//     const title = song.item.name;
//     const artist = song.item.artists.map((artist: Artist) => artist.name).join(', ');
//     const album = song.item.album.name;
//     const albumImageUrl = song.item.album.images[0].url;
//     const songUrl = song.item.external_urls.spotify;

//     return {
//       album,
//       albumImageUrl,
//       artist,
//       isPlaying,
//       songUrl,
//       title,
//     };
//   } catch (e) {
//     if (e instanceof Error) {
//       console.error(e.message);
//     }
//   }

//   return null;
// }

// export default async function NowPlaying() {
//   const nowPlaying = await fetchNowPlaying();

//   if (!nowPlaying?.songUrl || !nowPlaying.title || !nowPlaying.artist) {
//     return (
//       <div className="flex items-center justify-center space-x-2 text-sm sm:justify-start sm:text-base">
//         <svg className="mt-[-2px] h-4 w-4" viewBox="0 0 168 168">
//           <path
//             fill="#1ED760"
//             d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
//           />
//         </svg>
//         <div className="inline-flex space-x-1">
//           <p className="font-medium text-gray-800 dark:text-gray-200">Not Playing</p>
//           <span className="text-gray-500 dark:text-gray-300">{' – '}</span>
//           <p className="text-gray-500 dark:text-gray-300">Spotify</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-4 flex items-center justify-center space-x-2 sm:flex-row sm:justify-start sm:space-x-2">
//       <AnimatedBars />
//       <div className="inline-flex max-w-[70%] items-center space-x-2 text-sm sm:max-w-[90%] sm:text-base">
//         <a
//           className="inline-block truncate font-medium text-gray-800 dark:text-gray-200"
//           href={nowPlaying.songUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           {nowPlaying.title}
//         </a>
//         <span className="mx-2 text-gray-500 dark:text-gray-300">{' – '}</span>
//         <p className="inline-block truncate text-gray-500 dark:text-gray-300">
//           {nowPlaying.artist}
//         </p>
//       </div>
//     </div>
//   );
// }
