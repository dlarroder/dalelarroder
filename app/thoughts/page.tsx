import { format } from 'date-fns';
import Link from 'next/link';
import { getBlogPosts } from '../blog/utils';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';

export default function Thoughts() {
  const posts = getBlogPosts();

  return (
    <PageContainer>
      <Header title="Thoughts" />
      <section>
        {posts.map((post) => {
          return (
            <Link href={`/thoughts/${post.slug}`} key={post.slug}>
              <article className="space-y-2 py-5 border-b border-gray-300/20">
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-md w-full max-w-2xl truncate whitespace-nowrap pr-2 font-medium text-white/80 group-hover:underline md:w-auto md:flex-none md:text-xl">
                    {post.metadata.title}
                  </h2>
                  <div className="mx-1 flex flex-1 border-b border-primary-500" />
                  <time className="w-max whitespace-nowrap text-sm pl-2 text-gray-400">
                    {format(new Date(post.metadata.publishedAt), 'MMMM dd, yyyy')}
                  </time>
                </div>
                <p className="text-gray-400">{post.metadata.summary}</p>
              </article>
            </Link>
          );
        })}
      </section>
    </PageContainer>
  );
}
