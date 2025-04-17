import classNames from 'classnames';
import Link from 'next/link';
import SecondsSinceBirth from './seconds-since-birth';

export default function Home() {
  return (
    <div className="min-h-svh w-screen overflow-hidden">
      <main className="flex min-h-svh max-w-5xl flex-col justify-center gap-4 px-8 md:px-24">
        <h1 className="max-w-6xl font-serif text-2xl font-medium md:mr-4 md:text-4xl">
          Welcome to my personal portfolio, or as I like to call it, my playground on the web.
        </h1>
        <section>
          <p className={classNames('text-[15px] md:text-lg text-justify')}>
            <span className="mr-2 text-xs opacity-50">{'<p>'}</span>
            I&apos;m Dale Larroder, a Software Developer who&apos;s been around for{' '}
            <SecondsSinceBirth /> seconds — and forever a student of the craft. I love building
            things for the web and am always on the lookout for new challenges and opportunities to
            learn. I&apos;m passionate about creating beautiful, functional user experiences and
            enjoy working with a variety of technologies. I believe the best way to learn is by
            doing, so I&apos;m always exploring new projects. Currently, I&apos;m working as a
            Software Developer at a Aphex.
            <span className="ml-2 text-xs opacity-50">{'<p>'}</span>
          </p>
        </section>
        <section className="flex space-x-5">
          <div>
            <p>More about me: </p>
            <div className="flex space-x-3">
              <Link href="/projects">Projects</Link>
              <Link href="/thoughts">Thoughts</Link>
              <Link href="/uses">Uses</Link>
            </div>
          </div>
          <div className="h-12 border-l border-primary-500" />
        </section>
      </main>
    </div>
  );
}
