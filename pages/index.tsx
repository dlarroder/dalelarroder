import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro/Intro'
import RecentPosts from '@/components/RecentPosts'
import SectionContainer from '@/components/SectionContainer'
import { PageSEO } from '@/components/SEO'
// import TopTracks from '@/components/Spotify/TopTrack'
import Works from '@/components/Work/Works'
import siteMetadata from '@/data/siteMetadata'
import HomeLayout from '@/layouts/HomeLayout'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.author} description={siteMetadata.description} />
      <SectionContainer>
        <Header />
      </SectionContainer>
      <Hero />
      <Intro />
      <Works />
      <HomeLayout>
        <RecentPosts posts={posts} />
        {/* <TopTracks /> */}
      </HomeLayout>
    </>
  )
}
