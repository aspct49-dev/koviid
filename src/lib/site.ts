import type { Metadata } from 'next';

/** Everything the metadata needs, in one place. */
export const SITE = {
  name: 'Koviid',
  handle: '@koviid',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://koviid.com').replace(/\/$/, ''),
  locale: 'en_US',
  tagline: 'The monthly Roobet wager leaderboard for the Koviid community.',
  description:
    'Ten paying places on the monthly Roobet wager leaderboard, ranked on weighted wager and settled at the end of every month. Play under code koviid to enter.',
};

export const SOCIAL_PROFILES = ['https://x.com/koviid', 'https://kick.com/koviid'];

/** Per-page metadata that inherits the defaults set in the root layout. */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} — ${SITE.name}`, description, url: path },
    twitter: { title: `${title} — ${SITE.name}`, description },
  };
}
