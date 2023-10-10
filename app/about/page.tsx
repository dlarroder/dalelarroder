import { MDXLayoutRenderer } from '@/components/MDXComponents';
import AuthorLayout from '@/layouts/MDX/AuthorLayout';
import MainLayout from '@/layouts/MainLayout';
import { allAuthors } from 'contentlayer/generated';

export const metadata = {
  title: 'About - Expert laravel',
  description: 'About me - Expert laravel',
  keywords: 'Laravel, Expert, Livewire',
  canonical: 'https://expertlaravel.com/about',
  images: ['https://picsum.photos/200/300'],
  // authors: 'Jigar Patel',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: 'https://www.expertlaravel.com/about',
    title: 'Expert Laravel',
    description: 'Expert Laravel Portfolio Website',
    siteName: 'Expert Laravel',

    images: [
      {
        url: 'https://example.com/og.png',
        width: '800',
        height: '600',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Laravel',
    site: '@jbcodeapp',
    description: 'Expert Laravel Portfolio Website',
    image: 'https://example.com/twitter-card.png',
  },
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
