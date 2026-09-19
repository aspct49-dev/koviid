import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteNav } from '@/components/SiteNav';
import { SITE, SOCIAL_PROFILES } from '@/lib/site';
import './globals.css';
import './nav.css';
import './leaderboard.css';
import './sections.css';
import './rewards.css';
import './socials.css';
import './footer.css';
import './legal.css';

/* Two families, and each has a reason. Plus Jakarta Sans is a geometric sans
   with circular bowls and soft terminals — the same construction as the neon
   wordmark, so the headings and the logo read as one voice — and it ships
   tabular figures, which is why there is no third family for the numbers.
   Inter is quiet and handles everything a person actually reads. */
const display = Plus_Jakarta_Sans({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display-face',
  display: 'swap',
});
const sans = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans-face',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Monthly Roobet leaderboard`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  creator: SITE.handle,
  publisher: SITE.handle,
  alternates: { canonical: '/' },
  icons: { icon: '/icon.png', apple: '/icon.png' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: '/',
    title: `${SITE.name} — Monthly Roobet leaderboard`,
    description: SITE.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Monthly Roobet leaderboard`,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  // Gambling-adjacent content: state the audience rather than leave it implied.
  other: { rating: 'adult' },
};

/**
 * Organization and WebSite in one graph, each referencing the other by @id.
 * That is what lets a search engine attach the social profiles to the site
 * rather than treating them as two unrelated entities.
 */
function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/icon.png`,
        description: SITE.description,
        sameAs: SOCIAL_PROFILES,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        publisher: { '@id': `${SITE.url}/#organization` },
        inLanguage: 'en',
      },
    ],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Serialised from a literal we control, so there is no untrusted
          // input to escape here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <div className="shell">
          <SiteNav />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
