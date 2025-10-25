import path from 'node:path';
import type { Metadata } from 'next';
import BackNavigation from '../../components/layouts/back-navigation';
import { formatDate, getPostFromSlug, readMDXFile } from '../utils';
import { extractHeadings } from './extract-headings';
import PageTitle from './page-title';
import TableOfContents from './table-of-contents';

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const { metadata } = await getPostFromSlug(params.slug);

	const url = `https://dalelarroder.com/thoughts/${params.slug}`;
	const ogImage = metadata.image || '/static/og-image.png';

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
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: metadata.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: metadata.title,
			description: metadata.summary,
			images: [ogImage],
		},
		alternates: {
			canonical: url,
		},
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
				<div className='flex justify-between items-center mt-2 text-sm'>
					<p className='text-sm text-neutral-600 dark:text-neutral-400'>
						{formatDate(metadata.publishedAt)}
					</p>
				</div>
			</section>
			<div className='relative lg:grid lg:grid-cols-[1fr_250px] lg:gap-12'>
				<article className='md:max-w-5xl'>{content}</article>
				<TableOfContents headings={headings} />
			</div>
		</>
	);
}
