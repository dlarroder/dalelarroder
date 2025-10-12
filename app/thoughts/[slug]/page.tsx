import path from 'path';
import BackNavigation from '../../components/layouts/back-navigation';
import { formatDate, getPostFromSlug, readMDXFile } from '../utils';
import { extractHeadings } from './extract-headings';
import PageTitle from './page-title';
import TableOfContents from './table-of-contents';

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

  const { metadata, content } = await getPostFromSlug(params.slug);

  // Extract headings from the raw MDX content for TOC
  const rawContent = readMDXFile(
    path.join(process.cwd(), 'app/thoughts/posts', `${params.slug}.mdx`),
  );
  const headings = extractHeadings(rawContent.content);

  return (
    <>
      <section>
        <BackNavigation />
        <PageTitle>{metadata.title}</PageTitle>
        <div className="flex justify-between items-center mt-2 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(metadata.publishedAt)}
          </p>
        </div>
      </section>
      <div className="relative lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
        <article className="md:max-w-5xl">{content}</article>
        <TableOfContents headings={headings} />
      </div>
    </>
  );
}
