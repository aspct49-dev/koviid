import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { PRIMARY_PARTNER } from '@/lib/partners';
import { SITE, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description: `What data ${SITE.name} collects, what it does not, and where the leaderboard figures come from.`,
  path: '/privacy',
});

const UPDATED = '2026-09-19';

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      lede={`${SITE.name} is a site you read, not one you sign into. This policy explains the small amount of data that is involved anyway, and where the names on the leaderboard come from.`}
    >
      <section>
        <h2>1. The short version</h2>
        <p>
          There are no accounts on this site, no login, no contact form and no newsletter. We do not
          ask you for your name, your email address or your {PRIMARY_PARTNER.name} username, and
          there is nowhere on the site to give them to us. We do not sell data to anyone, because we
          do not collect any to sell.
        </p>
      </section>

      <section>
        <h2>2. What is collected when you visit</h2>
        <p>
          Like any website, this one is served by a hosting provider, and that provider records
          standard technical information in order to deliver pages and to protect the service from
          abuse. That typically includes your IP address, the page requested, the time of the
          request, and your browser and device type.
        </p>
        <p>
          We use these records only to operate and secure the site. We do not use them to build a
          profile of you, and we do not combine them with any other source.
        </p>
      </section>

      <section>
        <h2>3. Cookies</h2>
        <p>
          The site sets no cookies of its own. It does not use advertising cookies, tracking pixels
          or cross-site trackers, and there is no consent banner because there is nothing to consent
          to.
        </p>
        <p>
          Web fonts are served from this site&rsquo;s own domain, not from a third-party font
          service, so loading a page does not tell anyone else that you visited.
        </p>
        <p>
          If we add analytics in future, this section will say so, name the provider, and state
          whether it sets cookies. That will go up before the change does, not after.
        </p>
      </section>

      <section>
        <h2>4. The leaderboard data</h2>
        <p>
          The standings do not come from you. They come from {PRIMARY_PARTNER.name}&rsquo;s
          affiliate API, which reports aggregate wager statistics for players who signed up under
          the code <b>{PRIMARY_PARTNER.code}</b>. For each player that feed gives us a username, an
          account identifier, a wagered total and a weighted wagered total.
        </p>
        <p>
          We publish only a <b>partially masked username</b> and the weighted wagered figure.
          Usernames are masked to their last four characters before they reach the page, and the
          account identifier is never displayed. We do not receive, and cannot see, your real name,
          your email address, your location, your balance, your deposits, your withdrawals or your
          payment details.
        </p>
        <p>
          The lawful basis for publishing this is our legitimate interest in running a transparent
          leaderboard, which is only possible if positions can be attributed to someone. If you
          would rather not appear, see section 7.
        </p>
      </section>

      <section>
        <h2>5. If you contact us</h2>
        <p>
          If you message us to claim a prize or ask a question, through the social accounts listed in
          the footer, we will hold that conversation and whatever you tell us in it, such as
          your {PRIMARY_PARTNER.name} username, for as long as is needed to deal with it and to keep
          a record of prizes paid. Those conversations take place on the relevant platform and are
          also subject to that platform&rsquo;s own privacy policy.
        </p>
      </section>

      <section>
        <h2>6. Third parties</h2>
        <ul>
          <li>
            <b>{PRIMARY_PARTNER.name}</b> supplies the wager statistics. Your relationship with
            them, and the personal data they hold about you, is governed by their privacy policy,
            not by this one.
          </li>
          <li>
            <b>Our hosting provider</b> serves the site and keeps the technical logs described in
            section 2.
          </li>
          <li>
            <b>Kick and X</b> are linked from the footer. Following a link takes you to them and puts
            you under their policies. We receive nothing from those links beyond the fact that a
            page on this site was loaded.
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to ask what personal data we hold
          about you, to have it corrected, to have it deleted, or to object to our use of it. You
          can exercise any of these by contacting us.
        </p>
        <p>
          In particular, <b>you can ask to be removed from the public leaderboard</b>. We will stop
          displaying your entry. Note that we cannot delete the underlying data at{' '}
          {PRIMARY_PARTNER.name}. That is theirs, and a request to erase it has to go to them.
          Removing yourself from the display also removes you from prize consideration, since we
          would no longer be showing a position to pay.
        </p>
        <p>
          If you are in the UK or the EU and you think we have handled your data badly, you may also
          complain to your national data protection authority.
        </p>
      </section>

      <section>
        <h2>8. Retention</h2>
        <p>
          Leaderboard figures are refreshed from {PRIMARY_PARTNER.name} continuously and are not
          stored by us as a separate database; the site requests them and displays them. Past
          months&rsquo; results are kept so that settled boards can continue to be shown. Records of
          prizes paid are kept for as long as we may need them to answer a query or meet a legal
          obligation.
        </p>
      </section>

      <section>
        <h2>9. Children</h2>
        <p>
          This site is for adults. It is not directed at anyone under 18, and nobody under 18 may
          enter the leaderboard or receive a prize. If you believe someone under 18 appears on the
          board, tell us and we will remove them.
        </p>
      </section>

      <section>
        <h2>10. Changes and contact</h2>
        <p>
          If this policy changes, the date at the top of this page changes with it. Material changes
          will be noted on the site.
        </p>
        <p className="legal-todo">
          <b>To be completed:</b> the data controller&rsquo;s name and address, a contact email
          address for privacy requests, and the hosting provider you deploy to. If you later add
          analytics, update section 3 at the same time. These should be filled in before the site
          goes live.
        </p>
      </section>
    </LegalPage>
  );
}
