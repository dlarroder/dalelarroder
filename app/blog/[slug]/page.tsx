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

  return (
    <>
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
