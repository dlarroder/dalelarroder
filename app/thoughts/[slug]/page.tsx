import { TableOfContents } from 'renoun';
import BackNavigation from '../../components/layouts/back-navigation';
import { components } from '../../components/mdx';
import { formatDate, getPostFromSlug } from '../utils';
import PageTitle from './page-title';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { metadata } = await getPostFromSlug(params.slug);

  return {
    title: metadata.title,
    description: metadata.summary,
  };
}

export default async function Blog(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const {
    metadata,
    content: Content,
    post,
  } = await getPostFromSlug(params.slug);
  const headings = await post.getHeadings();

  return (
    <div className="flex gap-8">
      <section className="flex-1">
        <BackNavigation />
        <PageTitle>{metadata.title}</PageTitle>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(metadata.publishedAt)}
          </p>
        </div>
        <article className="md:max-w-5xl">
          <Content components={{ ...components }} />
        </article>
      </section>
      <aside className="hidden lg:block w-64 sticky top-8 self-start">
        <TableOfContents
          headings={headings}
          components={{
            Root: ({ children }) => (
              <nav className="space-y-2 text-sm">{children}</nav>
            ),
            Title: ({ children }) => (
              <h2 className="text-base font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {children}
              </h2>
            ),
            List: ({ children }) => (
              <ul className="space-y-2 border-l border-gray-200 dark:border-gray-800">
                {children}
              </ul>
            ),
            Item: ({ children }) => (
              <li className="transition-colors">{children}</li>
            ),
          }}
        />
      </aside>
    </div>
  );
}
