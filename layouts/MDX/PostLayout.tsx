import Image from '@/components/Image'
import PageTitle from '@/components/PageTitle'
import PostComments from '@/components/PostComments'
import PostNavigation from '@/components/PostNavigation'
import SectionContainer from '@/components/SectionContainer'
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
  const { slug, date, title, images, author, readingTime } = content

  return (
    <>
      <SectionContainer>
        <BlogSEO
          url={`${siteMetadata.siteUrl}/blog/${slug}`}
          authorDetails={authorDetails}
          {...content}
        />
        <article>
          <header className="relative">
            {images ? (
              <Image
                alt={title}
                src={images[0]}
                className="object-cover w-full h-full rounded-lg"
                width={900}
                height={500}
              />
            ) : (
              <div className="bg-primary-500 w-full h-60 rounded-lg" />
            )}
            <div className="space-y-1 text-left absolute bottom-0 left-0 p-6 w-full rounded-b-lg">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <dl className="space-y-10">
                <div className="relative">
                  <dt className="sr-only">Published on</dt>
                  <dd className="flex justify-between text-base font-medium leading-6 text-white">
                    <time dateTime={date}>
                      {`${author} / ${new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}`}
                    </time>
                    <span>{readingTime.text}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 font-medium"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-4 xl:row-span-2">
              <div className="pt-8 pb-8 prose dark:prose-dark max-w-none">
                {children}
                <PostNavigation prev={prev} next={next} />
                <PostComments />
              </div>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
