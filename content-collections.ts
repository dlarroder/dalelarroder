import {
	defineCollection,
	defineConfig,
	defineSingleton,
} from '@content-collections/core';
import { compileMDX, type Options } from '@content-collections/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import { z } from 'zod';

const mdxOptions: Options = {
	rehypePlugins: [[rehypePrettyCode, { theme: 'dracula' }]],
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
		return { ...post, slug: document._meta.path, mdx };
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
