import { Directory } from 'renoun';

export interface BlogPost {
  metadata: Metadata;
  slug: string;
  content: string;
}

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  draft?: boolean;
  image?: string;
};

const posts = new Directory({
  path: 'app/thoughts/posts',
  filter: '*.mdx',
  loader: {
    mdx: (path) => import(`./posts/${path}.mdx`),
  },
});

export async function getPosts(): Promise<BlogPost[]> {
  const allPosts = await posts.getEntries();

  const postsWithMetadata = await Promise.all(
    allPosts.map(async (post) => {
      const metadata = (await post.getExportValue('metadata')) as Metadata;
      const slug = post.getBaseName();

      return {
        metadata,
        slug,
        content: '', // Not needed for list view
      };
    }),
  );

  return postsWithMetadata
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
  const post = await posts.getFile(slug, 'mdx');
  const metadata = (await post.getExportValue('metadata')) as Metadata;
  const Content = await post.getExportValue('default');

  return {
    metadata,
    content: Content,
    post,
  };
}
