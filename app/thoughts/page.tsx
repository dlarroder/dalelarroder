import classNames from 'classnames';
import { format } from 'date-fns';
import Link from 'next/link';
import { Fragment } from 'react';
import { getBlogPosts } from '../blog/utils';
import { SquareArrowLeftIcon } from '../components/layouts/icons/square-arrow-left';
import { merryWeather, mukta } from '../fonts';

export default function Thoughts() {
  const posts = getBlogPosts();

  return (
    <Fragment>
      <Link
        href="/new-home"
        className={classNames('flex gap-2 items-center text-primary-500 mb-12', mukta.className)}
      >
        <div className="flex items-center">
          <SquareArrowLeftIcon size={20} className="h-9 w-9" />
          <span className="font-bold">Home</span>
        </div>
        <div className="mx-1 w-full border-b border-primary-500" />
        <span className={classNames('text-white text-lg md:text-4xl', merryWeather.className)}>
          Thoughts
        </span>
      </Link>

      <section>
        {posts.map((post) => {
          return (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <article className="space-y-2 py-5 border-b border-gray-300/20">
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-md w-full max-w-2xl truncate whitespace-nowrap pr-2 font-medium text-white/80 group-hover:underline md:w-auto md:flex-none md:text-xl">
                    {post.metadata.title}
                  </h2>
                  <div className="mx-1 flex flex-1 border-b border-primary-500" />
                  <time className="w-max whitespace-nowrap text-sm pl-2 text-gray-400">
                    {format(new Date(post.metadata.publishedAt), 'MMMM dd, yyyy')}
                  </time>
                </div>
                <p className="text-gray-400">{post.metadata.summary}</p>
              </article>
            </Link>
          );
        })}
      </section>
    </Fragment>
  );
}
