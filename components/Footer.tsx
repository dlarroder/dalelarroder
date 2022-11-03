import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import { AiFillLinkedin } from 'react-icons/ai'
import { FaGithub, FaSpotify, FaSteam, FaTwitter } from 'react-icons/fa'
import NowPlaying from './Spotify/NowPlaying'

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col space-y-1.5 justify-start py-10 mb-0 space-x-0 text-gray-500 dark:text-gray-400">
        <NowPlaying />
        <div className="flex flex-col space-y-2 items-center text-sm sm:text-base sm:flex-row sm:justify-between">
          <ul className="flex space-x-2">
            <li>{`© ${new Date().getFullYear()}`}</li>
            <li>{` • `}</li>
            <li>
              <Link href="/">{siteMetadata.title}</Link>
            </li>
          </ul>
          <ul className="flex space-x-5 items-center cursor-pointer">
            <li>
              <a
                href={siteMetadata.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
              >
                <AiFillLinkedin className="sm:text-lg" />
              </a>
            </li>
            <li>
              <a href={siteMetadata.github} target="_blank" rel="noreferrer" aria-label="github">
                <FaGithub className="sm:text-lg" />
              </a>
            </li>
            <li>
              <a href={siteMetadata.twitter} target="_blank" rel="noreferrer" aria-label="twitter">
                <FaTwitter className="sm:text-lg" />
              </a>
            </li>
            <li>
              <a href={siteMetadata.spotify} target="_blank" rel="noreferrer" aria-label="spotify">
                <FaSpotify className="sm:text-lg" />
              </a>
            </li>
            <li>
              <a href={siteMetadata.steam} target="_blank" rel="noreferrer" aria-label="steam">
                <FaSteam className="sm:text-lg" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
