import { MDXLayoutRenderer } from '@/components/MDXComponents';
import PageTitle from '@/components/PageTitle';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import PostLayout from '@/layouts/MDX/PostLayout';
import MainLayout from '@/layouts/MainLayout';
import { coreContent, formatBlogLink, sortedBlogPost } from '@/lib/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    // category: post.category,
    // authors: [{ name: 'hello', url: 'https://hello.com' }],
    openGraph: {
      // title: post.title,
      type: 'article',
      description: post.summary,
      // publishedTime: '2023-01-01T00:00:00.000Z', //Dynamic
      siteName: 'Expert Laravel',
      url: 'https://expertlaravel.com',
      locale: 'en_US',
      images: post.images,
    },
    twitter: {
      // title: post.title,
      site: '@jbcodeapp',
      creator: '@jbcodeapp',
      card: 'summary_large_image',
      images: post.images,
    },
    verification: {
      // google: 'google',
      // yandex: 'yandex',
      // yahoo: 'yahoo',
      // other: {
      //   me: ['my-email', 'my-link'],
      // },
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // viewport: {
    //   width: 'device-width',
    //   initialScale: 1,
    //   maximumScale: 1,
    // },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const sortedPosts = sortedBlogPost(allBlogs);

  const post = sortedPosts.find((p) => p.slug === slug);
  const author = post?.author || ['default'];

  const postIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const prevContent = sortedPosts[postIndex + 1] || null;
  const prev = prevContent ? coreContent(prevContent) : null;
  const nextContent = sortedPosts[postIndex - 1] || null;
  const next = nextContent ? coreContent(nextContent) : null;

  // const canonicalUrl = post.canonicalUrl;

  return (
    <>
      {/* <link rel="canonical" href={canonicalUrl} /> */}
      <ScrollProgressBar />
      <MainLayout>
        {post && 'draft' in post && post.draft !== true ? (
          <PostLayout content={post} prev={formatBlogLink(prev)} next={formatBlogLink(next)}>
            <MDXLayoutRenderer toc={post.toc} content={post} authorDetails={author} />
          </PostLayout>
        ) : (
          <div className="mt-24 text-center">
            <PageTitle>
              Under Construction{' '}
              <span role="img" aria-label="roadwork sign">
                🚧
              </span>
            </PageTitle>
          </div>
        )}
      </MainLayout>
    </>
  );
}
