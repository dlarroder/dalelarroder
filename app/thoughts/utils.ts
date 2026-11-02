import { allPosts } from 'content-collections';

export type PostSummary = {
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
	date: string;
};

export function getPosts(): PostSummary[] {
	return (
		allPosts
			.filter((post) => !post.draft && !post.archived)
			.sort(
				(a, b) =>
					new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
			)
			// Only what the listing needs, so compiled MDX never reaches the client
			.map(({ slug, title, summary, publishedAt, date }) => ({
				slug,
				title,
				summary,
				publishedAt,
				date,
			}))
	);
}

// Every page that gets built, archived posts included so old links keep working
export function getPostSlugs() {
	return allPosts.filter((post) => !post.draft).map((post) => post.slug);
}

export function getPost(slug: string) {
	return allPosts.find((post) => post.slug === slug && !post.draft);
}
