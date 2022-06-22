import { Header } from '@/components/Header'
import Hero from '@/components/Hero'
import HomeWrapper from '@/components/HomeWrapper'
import Link from '@/components/Link'
import PostCard from '@/components/PostCard'
import SectionContainer from '@/components/SectionContainer'
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
  logrocketId: string
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const logrocketId = process.env.NEXT_PUBLIC_LOGROCKET_ID || ''

  return { props: { posts, logrocketId } }
}

export default function Home({
  posts,
  logrocketId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const slicedPost = posts.slice(0, MAX_DISPLAY)
  useLogRocket(logrocketId)

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
            <Link
              href="/blog"
              className="text-primary-600 font-bold hover:text-primary-400 dark:hover:text-primary-500 duration-300"
              aria-label="all posts"
            >
              Read All Post &rarr;
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
