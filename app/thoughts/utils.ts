import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import { components } from '../components/mdx';

export interface BlogPost {
	metadata: Metadata;
	slug: string;
	content: string;
}

type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	draft: boolean;
	image?: string;
};

function normalizeDraft(value: unknown): boolean {
	if (typeof value === 'boolean') {
		return value;
	}
	if (typeof value === 'string') {
		return value.toLowerCase() === 'true';
	}
	return false;
}

function matterDataToMetadata(data: Record<string, unknown>): Metadata {
	const image = data.image;
	return {
		title: String(data.title ?? ''),
		publishedAt: String(data.publishedAt ?? ''),
		summary: String(data.summary ?? ''),
		draft: normalizeDraft(data.draft),
		...(typeof image === 'string' && image.length > 0 ? { image } : {}),
	};
}

/** Single source of truth for frontmatter: same parser for listings and full posts. */
function parseMdxSource(raw: string) {
	const { data, content } = matter(raw);
	return {
		metadata: matterDataToMetadata(data as Record<string, unknown>),
		content: content.trim(),
	};
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

export function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseMdxSource(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
	const mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

export function getPosts(): BlogPost[] {
	const posts = getMDXData(path.join(process.cwd(), 'app/thoughts/posts'));

	return posts
		.filter((post) => !post.metadata.draft)
		.sort((a, b) => {
			return (
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
			);
		});
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

export const getPostFromSlug = cache(async (slug: string) => {
	const raw = await fs.promises.readFile(
		path.join(process.cwd(), 'app/thoughts/posts', `${slug}.mdx`),
		'utf-8',
	);

	const { metadata, content: mdxBody } = parseMdxSource(raw);

	const { content } = await compileMDX({
		source: mdxBody,
		options: {
			parseFrontmatter: false,
			mdxOptions: {
				remarkPlugins: [],
				rehypePlugins: [
					[
						rehypePrettyCode,
						{
							theme: 'dracula',
						},
					],
				],
				format: 'mdx',
			},
		},
		components: components,
	});

	return {
		metadata,
		content,
	};
});
