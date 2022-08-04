import { Song } from 'types/TopTracks'

interface TrackProps {
  ranking: number
  track: Song
}

export default function Track({ track, ranking }: TrackProps) {
  return (
    <div className="flex flex-row items-baseline border-b border-gray-200 dark:border-gray-800 max-w-5xl w-full mt-8">
      <p className="text-sm font-bold text-gray-500 dark:text-gray-600">{ranking}</p>
      <div className="flex flex-col pl-3">
        <a
          className="font-medium text-gray-900 dark:text-gray-100 truncate w-60 sm:w-96 md:w-full"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p className="text-gray-500 mb-4 truncate w-60 sm:w-96 md:w-full dark:text-gray-400">
          {track.artist}
        </p>
      </div>
    </div>
  )
}
