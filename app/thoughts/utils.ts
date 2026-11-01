import { allPosts } from 'content-collections';

export type PostSummary = {
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
};

export function getPosts(): PostSummary[] {
	return (
		allPosts
			.filter((post) => !post.draft)
			.sort(
				(a, b) =>
					new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
			)
			// Only what the listing needs, so compiled MDX never reaches the client
			.map(({ slug, title, summary, publishedAt }) => ({
				slug,
				title,
				summary,
				publishedAt,
			}))
	);
}

export function getPost(slug: string) {
	return allPosts.find((post) => post.slug === slug && !post.draft);
}

export function formatDate(date: string, includeRelative = false) {
	const currentDate = new Date();
	if (!date.includes('T')) {
		date = `${date}T00:00:00`;
	}
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = '';

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = 'Today';
	}

	const fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${formattedDate})`;
}
