import Hero from '@/components/Hero'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import TopTracks from 'components/TopTrack'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import useLogRocket from './useLogRocket'

const MAX_DISPLAY = 2

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  env: string
  logrocketId: string
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  const logrocketId = process.env.NEXT_PUBLIC_LOGROCKET_ID
  const env = process.env.NODE_ENV

  return { props: { posts, env, logrocketId } }
}

export default function Home({
  posts,
  env,
  logrocketId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useLogRocket(env, logrocketId)

  return (
    <>
      <PageSEO title={siteMetadata.author} description={siteMetadata.description} />
      <Hero />
      <div className="divide-gray-200 dark:divide-gray-700">
        <h3 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Recent Posts
        </h3>
        <ul className="divide-gray-200">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, title, summary } = frontMatter
            return (
              <li key={slug} className="py-2">
                <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`}>
                  <article className="space-y-2 gap-3 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline bg-opacity-20 py-5">
                    <div className="space-y-1 xl:col-span-4">
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-400 duration-300"
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-600 font-bold hover:text-primary-400 dark:hover:text-primary-500 duration-300"
            aria-label="all posts"
          >
            Read All Post &rarr;
          </Link>
        </div>
      )}
      {/* <div className="py-5 space-y-5">
        <WhatIdo />
      </div> */}
      <div className="py-7">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          My <span className="text-green-500">Spotify</span> Top Songs
        </h1>
        <TopTracks />
      </div>
    </>
  )
}
