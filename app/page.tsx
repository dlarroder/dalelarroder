import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import dynamic from 'next/dynamic';
import { ScrollProvider } from '@/components/Providers/ScrollProvider';
import RecentPosts from '@/components/RecentPosts';
import SectionContainer from '@/components/SectionContainer';
import TopTracks from '@/components/Spotify/TopTracks';
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { Suspense } from 'react';

// 动态引入 3D 场景组件
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false, // 确保在客户端渲染
});

export default function Page() {
  const sortedPosts = sortedBlogPost(allBlogs);
  const posts = allCoreContent(sortedPosts);

  return (
    <ScrollProvider>
      <Hero />
      <Intro />
      <Scene /> {/* 使用新的 3D 场景组件 */}
      <SectionContainer>
        <RecentPosts posts={posts} />
        <Suspense fallback="loading..">
          <TopTracks />
        </Suspense>
      </SectionContainer>
    </ScrollProvider>
  );
}
