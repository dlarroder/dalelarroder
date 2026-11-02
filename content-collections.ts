import {
	defineCollection,
	defineConfig,
	defineSingleton,
} from '@content-collections/core';
import { compileMDX, type Options } from '@content-collections/mdx';
import { format, parseISO } from 'date-fns';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';
import { codeThemeDark, codeThemeLight } from './app/thoughts/code-theme';
import { extractHeadings } from './app/thoughts/extract-headings';

const mdxOptions: Options = {
	remarkPlugins: [remarkGfm],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypePrettyCode,
			{ theme: { light: codeThemeLight, dark: codeThemeDark } },
		],
	],
};

const posts = defineCollection({
	name: 'posts',
	directory: 'app/thoughts/posts',
	include: '*.mdx',
	schema: z.object({
		title: z.string(),
		publishedAt: z.iso.date(),
		summary: z.string().default(''),
		draft: z.boolean().default(false),
		// Still reachable by URL, but left out of the listing, sitemap and search
		archived: z.boolean().default(false),
		image: z.string().optional(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const { content, ...post } = document;
		const mdx = await compileMDX(context, document, mdxOptions);
		return {
			...post,
			slug: document._meta.path,
			// Formatted at build time so server and client never disagree on the day
			date: format(parseISO(post.publishedAt), 'MMMM d, yyyy'),
			headings: extractHeadings(content),
			mdx,
		};
	},
});

const usesPage = defineSingleton({
	name: 'usesPage',
	filePath: 'app/uses/content.mdx',
	schema: z.object({
		content: z.string(),
	}),
	transform: async (document, context) => ({
		mdx: await compileMDX(context, document, mdxOptions),
	}),
});

export default defineConfig({
	content: [posts, usesPage],
});
