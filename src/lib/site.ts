import type { Metadata } from 'next';

/**
 * The canonical origin, in the order it should be trusted.
 *
 *   1. `NEXT_PUBLIC_SITE_URL`, once a real domain is pointed at the site. This
 *      is the only one that produces correct canonical tags, so set it in
 *      production.
 *   2. `VERCEL_PROJECT_PRODUCTION_URL`, the project's stable production
 *      hostname. Vercel sets it on every deployment, including previews, which
 *      is what makes it the right fallback: a preview then advertises the
 *      production URL as canonical instead of advertising itself.
 *   3. `VERCEL_URL`, the per-deployment hostname. Different on every build, so
 *      it is a last resort.
 *
 * None of these carry a scheme, hence the prefix. Read at module scope, so a
 * value that only exists at build time is baked into the output.
 */
function resolveUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL ?? 'koviid.com';
  return `https://${host.replace(/\/$/, '')}`;
}

/** Everything the metadata needs, in one place. */
export const SITE = {
  name: 'Koviid',
  handle: '@koviid',
  url: resolveUrl(),
  locale: 'en_US',
  tagline: 'The monthly Roobet wager leaderboard for the Koviid community.',
  description:
    'Ten paying places on the monthly Roobet wager leaderboard, ranked on weighted wager and settled at the end of every month. Play under code koviid to enter.',
};

export const SOCIAL_PROFILES = [
  'https://x.com/koviid',
  'https://kick.com/koviid',
  'https://discord.gg/ngY3Ps9mW3',
];

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
