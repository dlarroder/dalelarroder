import siteMetadata from 'content/siteMetadata';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaGithub, FaTwitter, FaInstagram, FaSpotify } from 'react-icons/fa'; // Import Instagram and Spotify icons
import SectionContainer from './SectionContainer';
import NowPlaying from './Spotify/NowPlaying';
import Image from 'next/image';

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
            {/* 统计内容放置在此 */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {/* 使用Image组件加载UilEye.svg */}
                <Image src="/UilEye.svg" alt="Total Visits" width={20} height={20} />
                <span id="busuanzi_value_site_pv" className="ml-1">
                  Loading
                </span>
                次
              </div>

              {/* 分隔符 */}
              <span className="text-[#9CA3AF]">|</span>

              <div className="flex items-center">
                {/* 使用Image组件加载PepiconsPopPerson.svg */}
                <Image src="/CharmPerson.svg" alt="Total Visitors" width={20} height={20} />
                <span id="busuanzi_value_site_uv" className="ml-1">
                  Loading
                </span>
                人
              </div>
            </div>
            <ul className="flex cursor-pointer items-center space-x-5">
              <li>
                <a href={siteMetadata.github} target="_blank" rel="noreferrer" aria-label="github">
                  <FaGithub className="sm:text-lg" />
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
                  href={siteMetadata.instagram} // Add Instagram link
                  target="_blank"
                  rel="noreferrer"
                  aria-label="instagram"
                >
                  <FaInstagram className="sm:text-lg" />
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
            </ul>
          </div>
        </div>
      </footer>
      {/* 统计脚本 */}
      <script defer src="https://cn.vercount.one/js"></script>
    </SectionContainer>
  );
}
