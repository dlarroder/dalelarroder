import BackNavigation from '../../components/layouts/back-navigation';
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

  const { metadata, content } = await getPostFromSlug(params.slug);

  return (
    <section>
      <BackNavigation />
      <PageTitle>{metadata.title}</PageTitle>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(metadata.publishedAt)}
        </p>
      </div>
      <article className="md:max-w-5xl">{content}</article>
    </section>
  );
}
