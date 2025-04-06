import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://dalelarroder.com/sitemap.xml`,
    host: `https://dalelarroder.com`,
  };
}
