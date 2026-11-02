import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNavigation from '../../components/layouts/back-navigation';
import { MDX } from '../../components/mdx';
import { getPost, getPostSlugs } from '../utils';
import PageTitle from './page-title';
import TableOfContents from './table-of-contents';
import TableOfContentsMobile from './table-of-contents-mobile';

// Drafts and unknown slugs 404 instead of rendering on demand
export const dynamicParams = false;

export function generateStaticParams() {
	return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const metadata = getPost(params.slug);
	if (!metadata) {
		notFound();
	}

	// The share image comes from opengraph-image.tsx next to this page
	const url = `https://dalelarroder.com/thoughts/${params.slug}`;

	return {
		title: metadata.title,
		description: metadata.summary,
		openGraph: {
			title: metadata.title,
			description: metadata.summary,
			type: 'article',
			url: url,
			publishedTime: metadata.publishedAt,
			authors: ['Dale Larroder'],
		},
		twitter: {
			card: 'summary_large_image',
			title: metadata.title,
			description: metadata.summary,
		},
		alternates: {
			canonical: url,
		},
		...(metadata.archived && { robots: { index: false } }),
	};
}

export default async function Blog(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;

	const post = getPost(params.slug);
	if (!post) {
		notFound();
	}

	// A single heading is not worth navigating
	const showToc = post.headings.length >= 2;

	return (
		<>
			<section>
				{/* From xl up, Back moves into the left rail */}
				<BackNavigation className='xl:hidden' />
				<div className='mt-8 xl:mt-0'>
					<PageTitle>{post.title}</PageTitle>
				</div>
				<div className='flex justify-between items-center mt-2 text-sm'>
					<time
						dateTime={post.publishedAt}
						className='text-sm text-neutral-600 dark:text-neutral-400'
					>
						{post.date}
					</time>
					{post.archived && (
						<span className='text-sm text-neutral-500'>archived</span>
					)}
				</div>
			</section>
			{/* Long prose needs more air above headings than the shared MDX styles,
			    which /uses also uses for its tighter list sections */}
			<article className='[&>h2]:pt-6 [&>h3]:pt-4 [&>h4]:pt-4'>
				<MDX code={post.mdx} />
			</article>
			{/* Fills the left gutter, which only fits from xl up */}
			<aside className='fixed top-18 left-8 hidden max-h-[calc(100svh-6rem)] w-52 flex-col gap-16 overflow-y-auto xl:flex 2xl:left-16'>
				<BackNavigation compact />
				{showToc && <TableOfContents headings={post.headings} />}
			</aside>
			{showToc && (
				<TableOfContentsMobile title={post.title} headings={post.headings} />
			)}
		</>
	);
}
