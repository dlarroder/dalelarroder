import { MDXLayoutRenderer } from '@/components/MDXComponents';
import MainLayout from '@/layouts/MainLayout';
import { allAuthors } from 'contentlayer/generated';
import AuthorLayout from '../../layouts/MDX/AuthorLayout';

export const metadata = {
  title: 'About - Dale Larroder',
  description: 'About me - Dale Larroder',
};

export default function About() {
  const author = allAuthors.find((p) => p.slug === 'about');

  if (!author) {
    return null;
  }

  return (
    <MainLayout>
      <AuthorLayout content={author}>
        <MDXLayoutRenderer content={author} />
      </AuthorLayout>
    </MainLayout>
  );
}
