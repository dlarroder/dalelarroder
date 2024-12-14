import PageTitle from '../../../components/PageTitle';
import { formatDate, getPostFromSlug } from '../utils';

export default async function Blog(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const { metadata, content } = await getPostFromSlug(params.slug);

  return (
    <section>
      <PageTitle>{metadata.title}</PageTitle>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(metadata.publishedAt)}
        </p>
      </div>
      <article className="prose md:max-w-5xl">{content}</article>
    </section>
  );
}
