import { getPosts } from './thoughts/utils';

export const baseUrl = 'https://dalelarroder.com';

export default async function sitemap() {
	const blogs = getPosts().map((post) => ({
		url: `${baseUrl}/thoughts/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const routes = ['', 'thoughts', 'projects', 'stats', 'uses'].map((route) => ({
		url: route === '' ? `${baseUrl}/` : `${baseUrl}/${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes, ...blogs];
}
