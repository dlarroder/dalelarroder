import classNames from 'classnames';
import Link from 'next/link';
import GooeyBackground from '../components/gooey-background';
import { GithubIcon } from '../components/layouts/icons/github-icon';
import { LinkedinIcon } from '../components/layouts/icons/linkedin-icon';
import { XIcon } from '../components/layouts/icons/x-icon';
import { merryWeather, mukta } from '../fonts';
import SecondsSinceBirth from './seconds-since-birth';
export default function Home() {
  return (
    <div className="min-h-svh w-screen overflow-hidden">
      <GooeyBackground />
      <main className="relative z-10 flex min-h-svh max-w-5xl flex-col justify-center gap-4 px-8 md:px-24 text-shadow-lg">
        <h1
          className={classNames(
            'max-w-6xl font-serif text-2xl font-medium md:mr-4 md:text-4xl',
            merryWeather.className
          )}
        >
          Welcome to my <span className="font-bold">personal portfolio</span>, or as I like to call
          it, my <span className="italic border-b">playground</span> on the web.
        </h1>
        <section>
          <p
            className={classNames('text-base md:text-lg text-justify font-light', mukta.className)}
          >
            <span className="mr-2 text-xs opacity-50">{'<p>'}</span>
            I&apos;m Dale Larroder, a <SecondsSinceBirth date={new Date('July 22, 1997')} /> second
            old Software Engineer — and forever a student of the craft. I love building things for
            the web and am always on the lookout for new challenges and opportunities to learn.
            I&apos;m passionate about creating beautiful and functional user experiences. I believe
            the best way to learn is by doing, so I&apos;m always exploring new projects. Currently,
            I&apos;m working as a Software Engineer at a{' '}
            <a
              href="https://www.aphex.co/"
              className="underline-magical"
              target="_blank"
              rel="noreferrer"
            >
              Aphex
            </a>
            .<span className="ml-2 text-xs opacity-50">{'<p>'}</span>
          </p>
        </section>
        <section className="flex space-x-4 items-center text-sm md:text-base">
          <div>
            <p>More about me: </p>
            <div className="flex">
              <Link
                href="https://www.linkedin.com/in/dale-larroder/"
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
              >
                <LinkedinIcon className="h-9 w-9" />
              </Link>
              <Link
                href="https://github.com/dlarroder"
                target="_blank"
                rel="noreferrer"
                aria-label="github"
              >
                <GithubIcon className="h-9 w-9" />
              </Link>
              <Link
                href="https://x.com/dalelarroder"
                target="_blank"
                rel="noreferrer"
                aria-label="twitter"
              >
                <XIcon className="h-9 w-9" />
              </Link>
            </div>
          </div>
          <div className="h-14 border-l border-gray-500" />
          <div className={classNames('flex space-x-3', merryWeather.className)}>
            <Link href="/projects">/projects</Link>
            <Link href="/thoughts">/thoughts</Link>
            <Link href="/uses">/uses</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
