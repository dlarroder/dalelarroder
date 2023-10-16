import { MDXLayoutRenderer } from '@/components/MDXComponents';
import AuthorLayout from '@/layouts/MDX/AuthorLayout';
import MainLayout from '@/layouts/MainLayout';
import { allAuthors } from 'contentlayer/generated';

const baseSiteURL = process.env.NEXT_PUBLIC_SITE_URL;
const siteURLWithBlog = `${baseSiteURL}about`;

export const metadata = {
  title: 'Expert Laravel',
  description: 'Expert Laravel Portfolio Website',
  metadataBase: new URL(siteURLWithBlog),
  alternates: {
    canonical: siteURLWithBlog,
  },
  keywords: 'About Expert Laravel, Laravel Team, Mission, Expert Laravel',
  images: [
    {
      url: `${baseSiteURL}/static/about.webp`,
      width: '1903',
      height: '955',
    },
  ],
  authors: 'Jigar Patel',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: siteURLWithBlog,
    title: 'About Expert Laravel - Meet Our Team and Mission',
    description:
      'Learn about Expert Laravel and our mission to provide you with expert Laravel development advice and resources. Meet our team of professionals.',
    siteName: 'Expert Laravel',
    images: [
      {
        url: '/static/about.webp',
        width: '1903',
        height: '955',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Laravel',
    site: '@jbcodeapp',
    description: 'Expert Laravel Portfolio Website',
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
