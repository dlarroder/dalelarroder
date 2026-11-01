import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNavigation from '../../components/layouts/back-navigation';
import { MDX } from '../../components/mdx';
import { getPost, getPosts } from '../utils';
import PageTitle from './page-title';

// Drafts and unknown slugs 404 instead of rendering on demand
export const dynamicParams = false;

export function generateStaticParams() {
	return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const metadata = getPost(params.slug);
	if (!metadata) {
		notFound();
	}

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

	const post = getPost(params.slug);
	if (!post) {
		notFound();
	}

	return (
		<>
			<section>
				<BackNavigation />
				<PageTitle>{post.title}</PageTitle>
				<div className='flex justify-between items-center mt-2 text-sm'>
					<time
						dateTime={post.publishedAt}
						className='text-sm text-neutral-600 dark:text-neutral-400'
					>
						{post.date}
					</time>
				</div>
			</section>
			<article className='md:max-w-5xl'>
				<MDX code={post.mdx} />
			</article>
		</>
	);
}
