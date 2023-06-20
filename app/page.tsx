import Hero from '@/components/Hero';
import Intro from '@/components/Intro/Intro';
import TopTracks from '@/components/Spotify/TopTracks';
import Works from '@/components/Work/Works';
import { allBlogs } from 'contentlayer/generated';
import { Suspense } from 'react';
import RecentPosts from '../components/RecentPosts';
import SectionContainer from '../components/SectionContainer';
import { allCoreContent, sortedBlogPost } from '../lib/utils/contentlayer';
import LenisProvider from './components/LenisProvider';
import { ScrollProvider } from './components/ScrollProvider';

export default function Page() {
  const sortedPosts = sortedBlogPost(allBlogs);
  const posts = allCoreContent(sortedPosts);

  return (
    <LenisProvider>
      <ScrollProvider>
        <Hero />
        <Intro />
        <Works />
        <SectionContainer>
          <RecentPosts posts={posts} />
          <Suspense fallback="loading..">
            <TopTracks />
          </Suspense>
        </SectionContainer>
      </ScrollProvider>
    </LenisProvider>
  );
}
