import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { formatMoney } from '@/lib/format';
import { PRIMARY_PARTNER } from '@/lib/partners';
import { SITE } from '@/lib/site';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Terms of Service',
  description: `The terms covering use of ${SITE.name} and entry to the monthly ${PRIMARY_PARTNER.name} wager leaderboard.`,
  path: '/terms',
});

const UPDATED = '2026-09-19';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated={UPDATED}
      lede={`These terms cover your use of ${SITE.name} and your entry to the monthly leaderboard. By using the site or entering the leaderboard, you accept them.`}
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          {SITE.name} is an independent community website that runs a monthly wager leaderboard for
          players who sign up to {PRIMARY_PARTNER.name} using the referral code{' '}
          <b>{PRIMARY_PARTNER.code}</b>.
        </p>
        <p>
          We are not a casino, a bookmaker or a gambling operator. We do not accept deposits, hold
          player funds, or offer any form of gambling. We are not operated by, endorsed by or
          affiliated with {PRIMARY_PARTNER.name} beyond participating in their affiliate programme.
          All gambling takes place on {PRIMARY_PARTNER.name}, under {PRIMARY_PARTNER.name}&rsquo;s
          own terms, which you are responsible for reading.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <ul>
          <li>You must be at least 18 years old.</li>
          <li>
            You must be of legal gambling age and legally permitted to gamble in the country and
            territory you are in.
          </li>
          <li>
            You must hold a {PRIMARY_PARTNER.name} account that is in good standing and that was
            opened under the code <b>{PRIMARY_PARTNER.code}</b>.
          </li>
          <li>
            You must not be prohibited from receiving a prize from us under any applicable law or
            sanctions regime.
          </li>
        </ul>
        <p>
          If you do not meet all of these, you are not eligible for a prize, whatever position you
          appear in on the board.
        </p>
      </section>

      <section>
        <h2>3. How the leaderboard works</h2>
        <p>
          The leaderboard period is one calendar month, beginning at 00:00 UTC on the first day and
          ending at 23:59:59 UTC on the last day.
        </p>
        <p>
          Players are ranked on <b>weighted amount wagered</b>, not on raw amount wagered.{' '}
          {PRIMARY_PARTNER.name} discounts each bet according to the game&rsquo;s RTP, and we use
          the weighted figure their affiliate API reports. The weighting bands are published on the
          leaderboard page. We do not set them, we cannot change them, and we do not apply any
          weighting of our own on top.
        </p>
        <p>
          The prize pool is {formatMoney(PRIMARY_PARTNER.prizePool)}, paid across{' '}
          {PRIMARY_PARTNER.prizeTable.length} places, split as follows:
        </p>
        <ul className="legal-prizes">
          {PRIMARY_PARTNER.prizeTable.map((prize, i) => (
            <li key={i}>
              <span>
                {i + 1}
                {ordinal(i + 1)}
              </span>
              <b>{formatMoney(prize)}</b>
            </li>
          ))}
        </ul>
        <p>
          Usernames are shown partially masked. Standings shown on the site are updated
          periodically and may lag behind {PRIMARY_PARTNER.name} by a short interval; they are
          indicative during the month and are not final until the month has closed and been
          verified.
        </p>
      </section>

      <section>
        <h2>4. Fair play</h2>
        <p>The following will remove you from the leaderboard:</p>
        <ul>
          <li>
            <b>Multi-accounting.</b> One {PRIMARY_PARTNER.name} account per person. Where we
            identify multiple accounts controlled by the same person, every one of those accounts
            is removed, not merely the additional ones.
          </li>
          <li>
            <b>Wager abuse.</b> Wagering designed to inflate a leaderboard figure rather than to
            play: low-edge cycling, matched or hedged betting across games or accounts, and any
            activity {PRIMARY_PARTNER.name} identifies as bonus or promotion abuse.
          </li>
          <li>
            Any breach of {PRIMARY_PARTNER.name}&rsquo;s own terms of service that results in
            restriction or closure of your account.
          </li>
          <li>
            Attempting to interfere with the operation of this site or with the accuracy of the
            standings.
          </li>
        </ul>
        <p>
          Where a player is removed, everyone below them moves up one place and takes the prize
          attached to their new position. Places are settled on the final standings after any
          removals, not on the board as it appeared during the month.
        </p>
      </section>

      <section>
        <h2>5. Prizes</h2>
        <ul>
          <li>
            Prizes are funded by us out of affiliate revenue. They are not paid by, or from the
            balance of, {PRIMARY_PARTNER.name}.
          </li>
          <li>
            Standings are verified against the affiliate statistics after the month has fully
            closed. Prizes are issued after that verification.
          </li>
          <li>
            To claim, contact us through one of the channels listed on the site with your{' '}
            {PRIMARY_PARTNER.name} username. We may ask you to confirm ownership of the account.
          </li>
          <li>
            An unclaimed prize may be forfeited if we cannot reach you or you do not respond within
            a reasonable period after the month closes.
          </li>
          <li>
            Prizes are personal to you and may not be sold, assigned or transferred to another
            person.
          </li>
          <li>
            You are responsible for any tax arising on a prize, and for declaring it where your
            local law requires that.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Accuracy of the standings</h2>
        <p>
          The figures shown come from {PRIMARY_PARTNER.name}&rsquo;s affiliate API. We display what
          that API reports and do not independently calculate wager totals. Where our display and{' '}
          {PRIMARY_PARTNER.name}&rsquo;s own records disagree,{' '}
          {PRIMARY_PARTNER.name}&rsquo;s records govern.
        </p>
        <p>
          We correct obvious errors even after a board has been published. That includes display
          faults, feed outages, and figures produced by activity later found to breach section 4.
        </p>
      </section>

      <section>
        <h2>7. Affiliate disclosure</h2>
        <p>
          We earn commission from {PRIMARY_PARTNER.name} on the activity of players who sign up
          under code <b>{PRIMARY_PARTNER.code}</b>. That commission is what funds the prize pool.
          You pay nothing extra by using the code, and using it does not change the terms, odds or
          promotions available to you on {PRIMARY_PARTNER.name}.
        </p>
      </section>

      <section>
        <h2>8. Changes</h2>
        <p>
          We may change the prize pool, the split, the number of paying places or these terms. Where
          a change affects a leaderboard that is already running, we will apply it from the start of
          the next monthly period rather than mid-month, except where a change is required by law or
          is needed to correct an error.
        </p>
        <p>
          We may suspend or discontinue the leaderboard. If we do so mid-period, we will settle the
          period that is running on the standings as they are at that point.
        </p>
      </section>

      <section>
        <h2>9. Responsible gambling</h2>
        <p>
          Gambling involves risk and you should never wager more than you can afford to lose. A
          leaderboard is not a reason to gamble more than you intended. If gambling is causing you
          harm, support is available at{' '}
          <a href="https://www.begambleaware.org/" target="_blank" rel="noreferrer">
            BeGambleAware
          </a>{' '}
          and{' '}
          <a href="https://www.gamcare.org.uk/" target="_blank" rel="noreferrer">
            GamCare
          </a>
          , and {PRIMARY_PARTNER.name} provides deposit limits, time-outs and self-exclusion tools
          in your account settings.
        </p>
        <p>
          If you self-exclude from {PRIMARY_PARTNER.name}, tell us and we will remove you from the
          leaderboard and stop showing your entry.
        </p>
      </section>

      <section>
        <h2>10. Liability</h2>
        <p>
          The site is provided as it is. We do not guarantee that it will be available without
          interruption, or that the standings shown at any given moment are current or free from
          error.
        </p>
        <p>
          We are not responsible for any losses you incur from gambling, on{' '}
          {PRIMARY_PARTNER.name} or anywhere else, nor for the acts or omissions of{' '}
          {PRIMARY_PARTNER.name}, including
          account restrictions, closures, payment delays or changes to their terms and weighting.
        </p>
        <p>
          Nothing in these terms limits liability that cannot be limited by law, including
          liability for fraud, for fraudulent misrepresentation, or for death or personal injury
          caused by negligence.
        </p>
      </section>

      <section>
        <h2>11. Contact and governing law</h2>
        <p>
          Questions about these terms, or about a prize, can be sent through any of the channels
          listed in the footer of this site.
        </p>
        <p className="legal-todo">
          <b>To be completed:</b> the operating entity or individual behind {SITE.name}, a contact
          email address, and the country whose law governs these terms and whose courts have
          jurisdiction. These depend on where you are based and should be filled in before the site
          goes live.
        </p>
      </section>
    </LegalPage>
  );
}

/** 1st, 2nd, 3rd, 4th — including the 11/12/13 exception. */
function ordinal(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return 'th';
  return ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th';
}
