import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import { NowPlayingSong } from '../types/NowPlaying'
import AnimatedBars from './AnimatedBars'

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher)

  return (
    <div className="flex flex-row-reverse items-center sm:flex-row space-x-0 sm:space-x-2 w-full">
      {data?.songUrl ? (
        <AnimatedBars />
      ) : (
        <svg className="h-4 w-4 ml-auto mt-[-2px]" viewBox="0 0 168 168">
          <path
            fill="#1ED760"
            d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
          />
        </svg>
      )}
      <div className="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
        {data?.songUrl ? (
          <a
            className="capsize text-gray-800 dark:text-gray-200 font-medium  max-w-max truncate"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        ) : (
          <p className="capsize text-gray-800 dark:text-gray-200 font-medium">Not Playing</p>
        )}
        <span className="capsize mx-2 text-gray-500 dark:text-gray-300 hidden sm:block">
          {' – '}
        </span>
        <p className="capsize text-gray-500 dark:text-gray-300 max-w-max truncate">
          {data?.artist ?? 'Spotify'}
        </p>
      </div>
    </div>
  )
}
