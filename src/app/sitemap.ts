import type { MetadataRoute } from 'next';

import { SITE } from '@/lib/site';

/**
 * Three pages. The leaderboard changes through the month, the legal pages
 * change when they are edited, and `lastModified` says so honestly instead of
 * claiming everything changed today.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const legalUpdated = new Date('2026-09-19');

  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    {
      url: `${SITE.url}/terms`,
      lastModified: legalUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: legalUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
