import fs from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { components } from '../components/mdx';

export interface BlogPost {
	metadata: Metadata;
	slug: string;
	content: string;
}

export type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	draft: boolean;
	image?: string;
};

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	const frontMatterBlock = match?.[1];
	const content = fileContent.replace(frontmatterRegex, '').trim();
	const frontMatterLines = frontMatterBlock?.trim().split('\n');
	const metadata: Partial<Metadata> = {};

	frontMatterLines?.forEach((line) => {
		const [key, ...valueArr] = line.split(': ');
		let value = valueArr.join(': ').trim();
		value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
		const trimmedKey = key.trim() as keyof Metadata;
		if (trimmedKey === 'draft') {
			metadata[trimmedKey] = value === 'true';
		} else {
			metadata[trimmedKey] = value;
		}
	});

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

export function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(rawContent);
}

export function getMDXData(dir: string): BlogPost[] {
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

export async function getPostFromSlug(slug: string) {
	const source = await fs.promises.readFile(
		path.join(process.cwd(), 'app/thoughts/posts', `${slug}.mdx`),
		'utf-8',
	);

	const { content, frontmatter } = await compileMDX<Metadata>({
		source,
		options: {
			parseFrontmatter: true,
			scope: {},
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
		metadata: frontmatter,
		content,
	};
}
