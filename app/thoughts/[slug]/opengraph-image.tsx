import { notFound } from 'next/navigation';
import {
	renderShareImage,
	shareImageSize,
} from '../../components/og/share-image';
import { getPost, getPostSlugs } from '../utils';

export const alt = 'Blog post by Dale Larroder';
export const size = shareImageSize;
export const contentType = 'image/png';

export function generateStaticParams() {
	return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image(props: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await props.params;
	const post = getPost(slug);
	if (!post) {
		notFound();
	}

	return renderShareImage({
		kicker: ['thoughts', post.date],
		title: post.title,
	});
}
