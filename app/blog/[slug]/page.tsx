import { promises as fs } from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';
import PageTitle from '../../../components/PageTitle';
import { components } from '../../components/mdx';
import { formatDate, Metadata } from '../utils';

export default async function Blog(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const source = await fs.readFile(
    path.join(process.cwd(), 'app/blog/posts', `${params.slug}.mdx`),
    'utf-8'
  );

  const { content, frontmatter } = await compileMDX<Metadata>({
    source,
    options: {
      parseFrontmatter: true,
      scope: {},
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [rehypePrettyCode],
      },
    },
    components: components,
  });

  return (
    <section>
      <PageTitle>{frontmatter.title}</PageTitle>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(frontmatter.publishedAt)}
        </p>
      </div>
      <article className="prose md:max-w-5xl">{content}</article>
    </section>
  );
}
