import siteMetadata from 'content/siteMetadata';
import Link from 'next/link';
import { Suspense } from 'react';
//import { AiFillLinkedin } from 'react-icons/ai';
import { FaTiktok, FaSpotify, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import SectionContainer from './SectionContainer';
import NowPlaying from './Spotify/NowPlaying';

export default function Footer() {
  return (
    <SectionContainer>
      <footer>
        <div className="mb-0 flex flex-col justify-start space-y-1.5 space-x-0 py-10 text-gray-500 dark:text-gray-400">
          <Suspense fallback="loading...">
            <NowPlaying />
          </Suspense>
          <div className="flex flex-col items-center space-y-2 text-sm sm:flex-row sm:justify-between sm:text-base">
            <ul className="flex space-x-2">
              <li>{`© ${new Date().getFullYear()}`}</li>
              <li>{` • `}</li>
              <li>
                <Link href="/">{siteMetadata.title}</Link>
              </li>
            </ul>
            <ul className="flex cursor-pointer items-center space-x-5">
              <li>
                <a href={siteMetadata.tiktok} target="_blank" rel="noreferrer" aria-label="tiktok">
                  <FaTiktok className="sm:text-lg" />
                </a>
              </li>
              <li>
                <a
                  href={siteMetadata.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github"
                >
                  <FaInstagram className="sm:text-lg" />
                </a>
              </li>
              <li>
                <a
                  href={siteMetadata.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="twitter"
                >
                  <FaTwitter className="sm:text-lg" />
                </a>
              </li>
              <li>
                <a
                  href={siteMetadata.spotify}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="spotify"
                >
                  <FaSpotify className="sm:text-lg" />
                </a>
              </li>
              <li>
                <a href={siteMetadata.whats} target="_blank" rel="noreferrer" aria-label="steam">
                  <FaWhatsapp className="sm:text-lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </SectionContainer>
  );
}
