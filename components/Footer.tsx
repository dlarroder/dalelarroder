import siteMetadata from '@/data/siteMetadata'
import { AiFillLinkedin } from 'react-icons/ai'
import { FaGithub, FaSpotify, FaSteam, FaTwitter } from 'react-icons/fa'
import Link from './Link'
import NowPlaying from './NowPlaying'

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col space-y-6 justify-start py-10 mb-0 space-x-0 text-md text-gray-500 dark:text-gray-400">
        <NowPlaying />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <ul className="flex space-x-2">
            <li>{`© ${new Date().getFullYear()}`}</li>
            <li>{` • `}</li>
            <li>
              <Link href="/">{siteMetadata.title}</Link>
            </li>
            <li>{` • `}</li>
            <li>
              <Link href="/activity">Activity</Link>
            </li>
          </ul>
          <ul className="flex space-x-5 items-center cursor-pointer">
            <li>
              <Link href={siteMetadata.linkedin}>
                <AiFillLinkedin size={20} />
              </Link>
            </li>
            <li>
              <Link href={siteMetadata.github}>
                <FaGithub size={20} />
              </Link>
            </li>
            <li>
              <Link href={siteMetadata.twitter}>
                <FaTwitter size={20} />
              </Link>
            </li>
            <li>
              <Link href={siteMetadata.spotify}>
                <FaSpotify size={20} />
              </Link>
            </li>
            <li>
              <Link href={siteMetadata.steam}>
                <FaSteam size={20} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
