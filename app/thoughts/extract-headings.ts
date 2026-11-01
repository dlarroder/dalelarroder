import GithubSlugger from 'github-slugger';

export type TocHeading = {
	id: string;
	text: string;
	// 0 for the shallowest heading level in the post, 1 for the one below it
	level: number;
};

const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const FENCE = /^\s*(```|~~~)/;

// Plain text as rehype-slug sees it, so ids match the rendered headings
function toPlainText(markdown: string) {
	return markdown
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/`([^`]*)`/g, '$1')
		.replace(/(\*\*|__)(.+?)\1/g, '$2')
		.replace(/(\*|_)(.+?)\1/g, '$2')
		.trim();
}

export function extractHeadings(content: string): TocHeading[] {
	const slugger = new GithubSlugger();
	const headings: { id: string; text: string; depth: number }[] = [];
	let fence: string | null = null;

	for (const line of content.split('\n')) {
		const fenceMatch = line.match(FENCE);
		if (fenceMatch) {
			if (!fence) fence = fenceMatch[1];
			else if (fenceMatch[1] === fence) fence = null;
			continue;
		}
		if (fence) continue;

		const match = line.match(HEADING);
		if (!match) continue;

		const text = toPlainText(match[2]);
		// Slug every level so duplicate suffixes line up with rehype-slug
		const id = slugger.slug(text);
		// `#` renders as h2 in posts, so it shares a level with `##`
		headings.push({ id, text, depth: Math.max(match[1].length, 2) });
	}

	const listed = headings.filter((heading) => heading.depth <= 3);
	const minDepth = Math.min(...listed.map((heading) => heading.depth));

	return listed.map(({ id, text, depth }) => ({
		id,
		text,
		level: depth - minDepth,
	}));
}
