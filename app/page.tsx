'use client';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import { ScrollProvider } from '@/components/Providers/ScrollProvider';
import RecentPosts from '@/components/RecentPosts';
import SectionContainer from '@/components/SectionContainer';
import TopTracks from '@/components/Spotify/TopTracks';
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from '@/components/FrozenwhaleL';

export default function Page() {
  const sortedPosts = sortedBlogPost(allBlogs);
  const posts = allCoreContent(sortedPosts);

  return (
    <ScrollProvider>
      <Hero />
      <Intro />
      {/* 加入3D模型 */}
      <div style={{ height: '80vh' }}>
        <Canvas>
          <Model />
        </Canvas>
      </div>
      <SectionContainer>
        <RecentPosts posts={posts} />
        <Suspense fallback="loading..">
          <TopTracks />
        </Suspense>
      </SectionContainer>
    </ScrollProvider>
  );
}
