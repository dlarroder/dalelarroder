import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { Thoughts } from '../components/thoughts';
import { getPosts } from './utils';

export default function ThoughtsPage() {
  const posts = getPosts();

  return (
    <PageContainer>
      <Header title="Thoughts" />
      <Thoughts posts={posts} />
    </PageContainer>
  );
}
