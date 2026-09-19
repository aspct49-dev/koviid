'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SITE } from '@/lib/site';

/**
 * The top bar. Transparent over the hero and opaque once the page has moved,
 * so the wordmark below it is not competing with a solid slab from the first
 * pixel. That is the only thing the client boundary here buys.
 *
 * The links are real hrefs rather than scroll handlers, so they work with the
 * middle mouse button, with the keyboard, and before hydration.
 */

const LINKS = [
  { label: 'Leaderboard', href: '/#standings' },
  { label: 'Rewards', href: '/#rewards' },
  { label: 'How to enter', href: '/#how-to-enter' },
  { label: 'Questions', href: '/#faq' },
];

export function SiteNav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav" data-stuck={stuck || undefined}>
      <div className="wrap nav-inner">
        <Link href="/" className="nav-brand" aria-label={`${SITE.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- the wordmark is the logo */}
          <img src="/koviid-wordmark.png" alt={SITE.name} width="1495" height="588" />
        </Link>

        <nav className="nav-links" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
