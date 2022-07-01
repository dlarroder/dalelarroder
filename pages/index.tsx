import { Header } from '@/components/Header'
import Hero from '@/components/Hero'
import HomeWrapper from '@/components/HomeWrapper'
import PostCard from '@/components/PostCard'
import SectionContainer from '@/components/SectionContainer'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import TopTracks from 'components/TopTrack'
import { allBlogs } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import useLogRocket from './useLogRocket'

const MAX_DISPLAY = 2

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const slicedPost = posts.slice(0, MAX_DISPLAY)
  useLogRocket()

  return (
    <>
      <PageSEO title={siteMetadata.author} description={siteMetadata.description} />
      <SectionContainer>
        <Header />
      </SectionContainer>
      <Hero />
      <HomeWrapper>
        <div className="divide-gray-200 dark:divide-gray-700">
          <h3 className="text-2xl font-merriweather font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Recent Posts
          </h3>
          <PostCard posts={slicedPost} showTags={false} />
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link href="/blog">
              <span
                className="text-primary-600 font-bold hover:text-primary-400 dark:hover:text-primary-500 duration-300 cursor-pointer"
                aria-label="all posts"
              >
                Read All Post &rarr;
              </span>
            </Link>
          </div>
        )}
        <div className="py-7">
          <h1 className="text-2xl font-mmerriweather font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            My <span className="text-green-500">Spotify</span> Top Songs
          </h1>
          <TopTracks />
        </div>
      </HomeWrapper>
    </>
  )
}
