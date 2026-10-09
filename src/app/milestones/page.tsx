import type { Metadata } from 'next';

import { CopyCode } from '@/components/CopyCode';
import { ExternalIcon } from '@/components/icons';
import { formatMoney } from '@/lib/format';
import {
  BAND_HUE,
  MILESTONES,
  MILESTONE_FINAL,
  MILESTONE_STEPS,
  MILESTONE_TOP,
  MILESTONE_TOTAL,
} from '@/lib/milestones';
import { DISCORD_INVITE, PRIMARY_PARTNER } from '@/lib/partners';
import { SITE, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Milestones',
  description: `${formatMoney(MILESTONE_TOTAL)} across ${MILESTONES.length} rank-up rewards, paid once each as your lifetime wagered under code ${PRIMARY_PARTNER.code} climbs.`,
  path: '/milestones',
});

export default function MilestonesPage() {
  return (
    <>
      <header className="ms-head">
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element -- operator brand mark */}
          <img
            className="lb-partner"
            src="/roobet-logo.webp"
            alt={PRIMARY_PARTNER.name}
            width="600"
            height="155"
          />

          <h1 className="lb-headline">
            <span className="lb-amount">{formatMoney(MILESTONE_TOTAL)}</span> in milestones
          </h1>

          <p className="lb-lede">
            {MILESTONES.length} ranks, each paying once the first time you pass it. These run
            alongside the monthly leaderboard — your lifetime wagered keeps climbing whether or not
            you place.
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

          <div className="ms-stats">
            <div className="stat">
              <div className="stat-v">{MILESTONES.length}</div>
              <span className="stat-k">Ranks on the ladder</span>
            </div>
            <div className="stat">
              <div className="stat-v">{formatMoney(MILESTONE_TOP)}</div>
              <span className="stat-k">Biggest single rank-up</span>
            </div>
            <div className="stat">
              <div className="stat-v">{formatMoney(MILESTONE_FINAL)}</div>
              <span className="stat-k">Wagered to clear them all</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section wrap">
        <div className="section-head">
          <h2 className="h-section">The Ladder</h2>
          <p>Lifetime wagered under code {PRIMARY_PARTNER.code}. Every rank pays once.</p>
        </div>

        <div className="ladder">
          {MILESTONES.map((m, i) => {
            // A divider wherever the reward changes, so twenty rows read as
            // five bands without the bands being hardcoded as row numbers.
            const opensBand = i === 0 || MILESTONES[i - 1].band !== m.band;
            // "each" only makes sense where the band holds more than one rank.
            const bandSize = MILESTONES.filter((x) => x.band === m.band).length;

            return (
              <div
                className="ms-row"
                key={m.rank}
                data-band={m.band}
                style={{ ['--hue' as string]: BAND_HUE[m.band] }}
              >
                {opensBand && (
                  <span className="ms-band" aria-hidden>
                    {m.band} · {formatMoney(m.reward)}
                    {bandSize > 1 ? ' each' : ''}
                  </span>
                )}

                <span className="ms-n" aria-hidden>
                  {i + 1}
                </span>

                <span className="ms-emblem">
                  {/* eslint-disable-next-line @next/next/no-img-element -- rank emblem */}
                  <img src={`/ranks/${m.emblem}.webp`} alt="" width="160" height="100" />
                </span>

                <span className="ms-name">{m.rank}</span>

                <span className="ms-req">
                  <span className="ms-req-k">Wagered</span>
                  {formatMoney(m.requirement)}
                </span>

                <span className="ms-reward">{formatMoney(m.reward)}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section wrap" id="claiming">
        <div className="section-head">
          <h2 className="h-section">Claiming</h2>
          <p>Milestones are paid by us, so they have to be asked for.</p>
        </div>

        <div className="steps">
          {MILESTONE_STEPS.map((step) => (
            <div className="step" key={step.n}>
              <span className="step-n" aria-hidden>
                {step.n}
              </span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-body">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="steps-actions">
          <a className="btn btn-primary" href={DISCORD_INVITE} target="_blank" rel="noreferrer">
            Open a ticket
            <ExternalIcon />
          </a>
        </div>

        <p className="notice" style={{ marginTop: 22 }}>
          <span className="notice-mark" aria-hidden>
            !
          </span>
          The rank names and thresholds here are {SITE.name}&rsquo;s own, not{' '}
          {PRIMARY_PARTNER.name}&rsquo;s. They are measured on wagered amount at face value, the
          same figure the leaderboard settles on, and the same fair-play rules apply.
        </p>
      </section>
    </>
  );
}
