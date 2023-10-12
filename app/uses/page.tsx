import { MDXLayoutRenderer } from '@/components/MDXComponents';
import UsesLayout from '@/layouts/MDX/UsesLayout';
import MainLayout from '@/layouts/MainLayout';
import { allAuthors } from 'contentlayer/generated';

const baseSiteURL = process.env.NEXT_PUBLIC_SITE_URL;
const siteURLWithBlog = `${baseSiteURL}uses`;

export const metadata = {
  title: 'Uses - Expert laravel',
  description: 'What I Use - Expert laravel',
  metadataBase: new URL(siteURLWithBlog),
  alternates: {
    canonical: siteURLWithBlog,
  },
};

export default function Uses() {
  const author = allAuthors.find((p) => p.slug === 'uses');

  if (!author) {
    return null;
  }

  return (
    <MainLayout>
      <UsesLayout>
        <MDXLayoutRenderer content={author} />
      </UsesLayout>
    </MainLayout>
  );
}
