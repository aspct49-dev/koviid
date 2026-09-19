import Link from 'next/link';

import {
  EXPLORE_LINKS,
  LEGAL_LINKS,
  PRIMARY_PARTNER,
  SOCIAL_PLATFORMS,
} from '@/lib/partners';
import { SITE } from '@/lib/site';
import { KickIcon, XIcon } from './icons';

/**
 * The foot of the site.
 *
 * The responsible-gambling disclaimer sits in the widest column at readable
 * size rather than in the bottom bar with the copyright. On a gambling site it
 * is the part of the footer someone has a reason to read.
 */

const MARKS: Record<string, React.ComponentType<{ className?: string }>> = {
  kick: KickIcon,
  x: XIcon,
};

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Link href="/" className="foot-logo" aria-label={`${SITE.name} home`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- the wordmark is the logo */}
              <img src="/koviid-wordmark.png" alt={SITE.name} width="1495" height="588" />
            </Link>

            {/* The supplied wordmark is dark grey ink on transparent and would
                be near-invisible here, so it is used as an alpha mask filled
                with the footer's text colour: the white-on-dark treatment. */}
            <a
              className="foot-aware"
              href="https://www.begambleaware.org/"
              target="_blank"
              rel="noreferrer"
              aria-label="BeGambleAware, opens in a new tab"
            >
              <span className="foot-aware-mark" aria-hidden />
            </a>

            <p className="foot-disclaimer">
              We do not take responsibility for any losses from gambling in casinos and betting
              sites which are linked to or promoted on this website. As a player, you are
              responsible for your own bets. 18+ only. Gamble responsibly, and never wager more than
              you can afford to lose.
            </p>

            <ul className="foot-icons">
              {SOCIAL_PLATFORMS.map((s) => {
                const Mark = MARKS[s.id];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${s.name}, ${s.handle}`}
                    >
                      <Mark />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav className="foot-nav" aria-label="Footer">
            <div className="foot-col">
              <h2 className="foot-col-head">Explore</h2>
              <ul>
                {EXPLORE_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="foot-col">
              <h2 className="foot-col-head">Social Media</h2>
              <ul>
                {SOCIAL_PLATFORMS.map((s) => {
                  const Mark = MARKS[s.id];
                  return (
                    <li key={s.id}>
                      <a href={s.href} target="_blank" rel="noreferrer">
                        <Mark />
                        {s.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="foot-col">
              <h2 className="foot-col-head">Play</h2>
              <ul>
                <li>
                  <a href={PRIMARY_PARTNER.signupUrl} target="_blank" rel="noreferrer">
                    {PRIMARY_PARTNER.name}
                  </a>
                </li>
                <li>
                  <span className="foot-code">Code {PRIMARY_PARTNER.code}</span>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* The relationship, stated rather than left to be inferred from the
            disclaimer above. */}
        <p className="foot-independent">
          {SITE.name} is an independent community leaderboard. It is not operated by, endorsed by
          or affiliated with {PRIMARY_PARTNER.name} beyond the affiliate programme that supplies
          the wager statistics shown here.
        </p>

        <div className="foot-bar">
          <p className="foot-copy">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <ul className="foot-legal">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
