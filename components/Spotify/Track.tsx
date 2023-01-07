import { Song } from 'types/Spotify'

interface TrackProps {
  ranking: number
  track: Song
}

export default function Track({ track, ranking }: TrackProps) {
  return (
    <div className="mt-8 flex w-full max-w-5xl flex-row items-baseline border-b border-gray-200 dark:border-gray-800">
      <p className="text-sm font-bold text-gray-500 dark:text-gray-600">{ranking}</p>
      <div className="flex flex-col pl-3">
        <a
          className="w-60 truncate font-medium text-gray-900 dark:text-gray-100 sm:w-96 md:w-full"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p className="mb-4 w-60 truncate text-gray-500 dark:text-gray-400 sm:w-96 md:w-full">
          {track.artist}
        </p>
      </div>
    </div>
  )
}
