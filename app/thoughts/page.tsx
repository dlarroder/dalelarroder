import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { Thoughts } from '../components/thoughts';
import { getPosts } from './utils';

export const metadata = {
  title: 'Thoughts',
  description: 'My Thoughts - Dale Larroder',
};

export default async function ThoughtsPage() {
  const posts = await getPosts();

  return (
    <PageContainer>
      <Header title="Thoughts" />
      <Thoughts posts={posts} />
    </PageContainer>
  );
}
