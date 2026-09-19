import Link from 'next/link';

import { SITE } from '@/lib/site';

/** The shell both legal pages sit in. */
export function LegalPage({
  title,
  updated,
  lede,
  children,
}: {
  title: string;
  /** ISO date. Rendered in UTC so it does not shift by reader. */
  updated: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <article className="legal">
      <div className="wrap">
        <Link href="/" className="legal-back">
          {/* eslint-disable-next-line @next/next/no-img-element -- the wordmark is the logo */}
          <img src="/koviid-wordmark.png" alt={SITE.name} width="1495" height="588" />
        </Link>

        <header className="legal-head">
          <h1 className="h-page">{title}</h1>
          <p className="legal-updated">
            Last updated{' '}
            <time dateTime={updated}>
              {new Date(updated).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </time>
          </p>
          <p className="legal-lede">{lede}</p>
        </header>

        <div className="legal-body">{children}</div>

        <Link href="/" className="btn btn-secondary legal-return">
          Back to the leaderboard
        </Link>
      </div>
    </article>
  );
}
