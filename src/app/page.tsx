import type { Metadata } from 'next';

import { Board, BoardStats } from '@/components/Board';
import { Countdown } from '@/components/Countdown';
import { CopyCode } from '@/components/CopyCode';
import { Faq } from '@/components/Faq';
import { HowToEnter } from '@/components/HowToEnter';
import { PastWinners } from '@/components/PastWinners';
import { Rewards } from '@/components/Rewards';
import { Podium } from '@/components/Podium';
import { Socials } from '@/components/Socials';
import { ExternalIcon, ShieldIcon } from '@/components/icons';
import { currentPeriod, formatMoney, periodLabel, previousPeriod } from '@/lib/format';
import { FAIR_PLAY, PRIMARY_PARTNER, WAGER_NOTE, WAGER_WEIGHTS } from '@/lib/partners';
import { pageMeta } from '@/lib/site';
import { getLeaderboard } from '@/lib/services/leaderboard';

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: 'Leaderboard',
  description: `The ${formatMoney(PRIMARY_PARTNER.prizePool)} monthly ${PRIMARY_PARTNER.name} wager leaderboard. Ten paying places, settled at the end of every month.`,
  path: '/',
});

export default async function LeaderboardPage() {
  // Both boards in one round trip rather than one after the other — they are
  // independent calls and awaiting them in sequence would put last month's
  // latency on top of this month's for no reason.
  const [board, previous] = await Promise.all([
    getLeaderboard('roobet', currentPeriod()),
    getLeaderboard('roobet', previousPeriod()),
  ]);

  return (
    <>
      {/*
       * The wordmark, whose board it is, the offer as one headline, the terms
       * in a line, and the two things to do — then the top three. The order is
       * the order someone reads it in: whose site, whose board, how much, on
       * what condition, how to enter.
       */}
      <header className="lb-head">
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element -- the wordmark is the logo */}
          <img
            className="lb-wordmark"
            src="/koviid-wordmark.png"
            alt="Koviid"
            width="1495"
            height="588"
          />

          {/* The operator's own mark, at the size it is legible and no larger.
              It replaced a text chip: the board's credibility rests on whose
              numbers these are, and a brand states that faster than its name
              set in caps ever will. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- operator brand mark */}
          <img
            className="lb-partner"
            src="/roobet-logo.webp"
            alt={PRIMARY_PARTNER.name}
            width="600"
            height="155"
          />

          <h1 className="lb-headline">
            <span className="lb-amount">{formatMoney(board.prizePool)}</span> monthly leaderboard
          </h1>

          <p className="lb-lede">
            Compete against everyone else playing under code <b>{PRIMARY_PARTNER.code}</b>. Ten
            places pay, and the board settles at the end of the month.
          </p>

          <div className="lb-actions">
            <CopyCode code={PRIMARY_PARTNER.code} />
            <a
              className="btn btn-primary"
              href={PRIMARY_PARTNER.signupUrl}
              target="_blank"
              rel="noreferrer"
            >
              Play on {PRIMARY_PARTNER.name}
              <ExternalIcon />
            </a>
          </div>

          <div className="lb-podium">
            <Podium board={board} />
          </div>

          <Countdown endsAt={board.periodEnd} />
        </div>
      </header>

      <section className="section wrap" id="standings">
        {/* The month the board is for. It used to sit in the hero as part of a
            chip; it belongs on the standings, which are the thing that is
            specific to a month. */}
        <div className="section-head">
          <h2 className="h-section">Standings</h2>
          <p>
            {periodLabel(board.periodStart)} · ten paying places · ranked on{' '}
            {PRIMARY_PARTNER.metricLabel.toLowerCase()}
          </p>
        </div>

        <Board board={board} />
        <BoardStats board={board} />

        {/* On the page the board is on, not one click away. Someone querying
            their position is standing right here when they do it. */}
        <div className="rules card" id="wager-rules">
          <h2 className="h-section">Wager Rules</h2>
          <p className="lede" style={{ marginTop: 12 }}>
            {WAGER_NOTE} Every game counts toward the board, dice included, but not every game counts
            the same:
          </p>

          <div style={{ marginTop: 16 }}>
            {WAGER_WEIGHTS.map((w) => (
              <div className="kv" key={w.band}>
                <span>{w.band}</span>
                <b>{w.weight} of wager counted</b>
              </div>
            ))}
          </div>

          {/* The two disqualifying rules, stated as rules rather than as a
              threat — and stated here, where someone can read them before they
              have anything at stake, rather than in a line of small print
              after they have lost a place. */}
          <div className="fair">
            {FAIR_PLAY.map((rule) => (
              <div className="fair-item" key={rule.id}>
                <span className="fair-mark" aria-hidden>
                  <ShieldIcon />
                </span>
                <div>
                  <h3 className="fair-title">{rule.title}</h3>
                  <p className="fair-body">{rule.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="notice" style={{ marginTop: 18 }}>
            <span className="notice-mark" aria-hidden>
              !
            </span>
            Any abuse found by {PRIMARY_PARTNER.code} or {PRIMARY_PARTNER.name} may result in your
            prize being forfeit.
          </p>
        </div>
      </section>

      {/* After the board, not before it. The prizes are the reason someone is
          here and the standings are what they came to check; the rest of what
          the code gets you reads better once they have seen it. */}
      <Rewards />

      {/* Renders nothing in a first month, when there is no previous board. */}
      <PastWinners board={previous} />

      <HowToEnter />
      <Faq />
      <Socials />
    </>
  );
}
