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

const mdxOptions: Options = {
	remarkPlugins: [remarkGfm],
	rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'dracula' }]],
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
