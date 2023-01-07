import PageTitle from '@/components/PageTitle'
import PostComments from '@/components/PostComments'
import PostNavigation from '@/components/PostNavigation'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Authors, Blog } from 'contentlayer/generated'
import { ReactNode } from 'react'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

export default function PostLayout({ content, authorDetails, children, next, prev }: Props) {
  const { slug, date, title, author, readingTime } = content

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...content}
      />
      <article>
        <header className="space-y-1 rounded-lg bg-primary-500 py-4 px-2 text-center sm:py-6 md:py-10">
          <PageTitle>{title}</PageTitle>
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="flex flex-col justify-center text-base font-medium leading-6 text-white sm:flex-row sm:space-x-2">
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
        </header>
        <div
          className="divide-y divide-gray-200 font-medium dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-4 xl:row-span-2 xl:pb-0">
            <div className="prose max-w-none pt-8 pb-8 dark:prose-dark">
              {children}
              <PostNavigation prev={prev} next={next} />
              <PostComments />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
