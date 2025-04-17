import { getBlogPosts } from '../blog/utils';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { Thoughts } from '../components/thoughts';

export default function ThoughtsPage() {
  const posts = getBlogPosts();

  return (
    <PageContainer>
      <Header title="Thoughts" />
      <Thoughts posts={posts} />
    </PageContainer>
  );
}
