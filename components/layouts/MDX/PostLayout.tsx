import PageTitle from '@/components/PageTitle';
import PostNavigation from '@/components/PostNavigation';
import siteMetadata from '@/data/siteMetadata';
import { CoreContent } from '@/lib/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { ReactNode } from 'react';

import headerImage from '@/../../public/static/banner-3.webp';
import Image from 'next/image';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface Props {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
}

export default function PostLayout({ content, children, next, prev }: Props) {
  const { date, title, author, readingTime } = content;

  return (
    <article>
      <header
        className="mt-5 mr-5 ml-5 space-y-1 rounded-lg  py-4 px-2 text-center shadow-lg sm:py-6 md:py-8"
        style={{ position: 'relative', borderRadius: '10px' }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <PageTitle>{title}</PageTitle>
          <dl className="bt-0 mt-9">
            <dt className="sr-only">Published on</dt>
            <dd className="flex flex-col justify-center  text-base font-medium leading-6 text-white sm:flex-row sm:space-x-2">
              <div className="flex items-center justify-center space-x-2">
                <span>{author}</span>
                <span>-</span>
                <time dateTime={date}>
                  {`${new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}`}
                </time>
              </div>
              <span className="hidden sm:block">-</span>
              <span>{readingTime.text}</span>
            </dd>
          </dl>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: 0,
            borderRadius: '10px', // Apply the same border radius
          }}
        >
          <Image
            src={headerImage}
            alt="Header_Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg shadow-gray-500"
          />
        </div>
      </header>

      <div
        className="divide-y divide-gray-200 font-medium dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-4 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark">
            {children}
            <PostNavigation prev={prev} next={next} />
            {/* <PostComments /> */}
          </div>
        </div>
      </div>
    </article>
  );
}
