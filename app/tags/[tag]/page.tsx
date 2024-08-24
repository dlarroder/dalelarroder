import ListLayout from '@/layouts/MDX/ListLayout';
import MainLayout from '@/layouts/MainLayout';
import { allCoreContent } from '@/lib/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';

export const metadata = {
  title: 'Blog - 莱',
  description: 'My Tags - 莱',
};

export default function Tag({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag); // 对 URL 进行解码以匹配原始标签
  const posts = allCoreContent(
    allBlogs.filter((post) => post.draft !== true && post.tags?.includes(decodedTag))
  );

  // Capitalize first letter and convert space to dash
  const title = decodedTag[0].toUpperCase() + decodedTag.slice(1).split(' ').join('-');

  return (
    <MainLayout>
      <ListLayout posts={posts} title={title} />
    </MainLayout>
  );
}
