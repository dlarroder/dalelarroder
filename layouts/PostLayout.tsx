import Comments from '@/components/comments'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { ReactNode } from 'react'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { PostFrontMatter } from 'types/PostFrontMatter'
import Image from '../components/Image'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  frontMatter: PostFrontMatter
  authorDetails: AuthorFrontMatter[]
  children: ReactNode
}

export default function PostLayout({ frontMatter, authorDetails, children }: Props) {
  const { slug, date, title, images, author } = frontMatter
  return (
    <>
      <SectionContainer>
        <BlogSEO
          url={`${siteMetadata.siteUrl}/blog/${slug}`}
          authorDetails={authorDetails}
          {...frontMatter}
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
              <div className="bg-primary-500 w-full h-96 rounded-lg" />
            )}
            <div className="space-y-1 text-left absolute bottom-0 left-0 p-6 w-full rounded-b-lg">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <dl className="space-y-10">
                <div className="relative">
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-white">
                    <time dateTime={date}>
                      <span role="img" aria-label="wave" className="pr-2">
                        🗓
                      </span>
                      {`Written on ${new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )} by ${author}`}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-4 xl:row-span-2">
              <div className="pt-8 pb-8 prose prose-lime dark:prose-dark max-w-none">
                {children}
                <Comments />
              </div>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
