import siteMetadata from 'content/siteMetadata';
import { allBlogs } from 'contentlayer/generated';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;
  const blogRoutes = allBlogs.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: post.lastmod || post.date,
  }));

  const routes = ['', 'Api Docs', 'Lyrics', 'Playlist', 'Generate', 'AI'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogRoutes];
}
