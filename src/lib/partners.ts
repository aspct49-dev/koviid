import type { NavLink, Partner, PartnerId, RankMode, SocialCard } from './types';

/**
 * Payout per rank, index 0 = 1st. A pool is always summed from its table,
 * never typed out separately, so the headline figure and the table cannot
 * disagree.
 */

/** Up to and including October 2026: ten places out of $500. */
const PRIZES_500 = [200, 100, 60, 40, 30, 20, 15, 15, 10, 10];

/** From November 2026: ten places out of $1,000. */
const PRIZES_1000 = [500, 140, 90, 70, 55, 45, 35, 25, 20, 20];

/** The table the running board pays on. */
const ROOBET_PRIZES = PRIZES_1000;

/**
 * Every board that has run or is running, oldest first, each with its own
 * prize table and the measure it pays on.
 *
 * Both live on the board rather than globally because they have changed
 * between boards: October paid $500 on raw wager, and a settled board has to
 * keep showing the order and the prizes that actually went out.
 *
 * Dates are UTC and inclusive: a board opens at 00:00:00 on `start` and closes
 * at 23:59:59 on `end`. Boards must be contiguous. Once the last one here has
 * closed, boards carry on by calendar month on the last entry's terms (see
 * `src/lib/schedule.ts`), so add an entry here whenever the next one differs.
 */
export const BOARDS: { start: string; end: string; prizeTable: number[]; pays: RankMode }[] = [
  { start: '2026-10-01', end: '2026-10-31', prizeTable: PRIZES_500, pays: 'raw' },
  // Extended past a calendar month, and every wager since 1 November counts.
  { start: '2026-11-01', end: '2026-12-17', prizeTable: PRIZES_1000, pays: 'weighted' },
];

/**
 * The partner registry. Prize pools, splits and codes live here and nowhere
 * else — a changed prize table is an edit to this file.
 *
 * The referral code shown to players is taken from the signup link's own
 * parameter, so the two cannot drift apart.
 */
export const PARTNERS: Record<PartnerId, Partner> = {
  roobet: {
    id: 'roobet',
    name: 'Roobet',
    code: 'koviid',
    logo: '/roobet-logo.webp',
    signupUrl: 'https://roobet.com/?ref=koviid',
    prizePool: ROOBET_PRIZES.reduce((sum, n) => sum + n, 0),
    prizeTable: ROOBET_PRIZES,
  },
};

/**
 * The Discord. Where anything needing a human starts: prize claims, VIP
 * transfer requests, and disputes over a placing.
 */
export const DISCORD_INVITE = 'https://discord.gg/GDrPqTeCyQ';

/**
 * Whether the current month's board is running. While paused the page drops
 * the live podium, countdown and standings and says so, and the settled
 * previous month moves to the top. Flip back to false to resume.
 */
export const LEADERBOARD_PAUSED = false;

export const PARTNER_ORDER: PartnerId[] = ['roobet'];

export function getPartner(id: PartnerId): Partner {
  return PARTNERS[id];
}

/** The headline partner. Single-partner today; the registry keeps it swappable. */
export const PRIMARY_PARTNER = PARTNERS.roobet;

/**
 * How much of a wager counts toward the board.
 *
 * Roobet's own bands, reproduced here verbatim in meaning — the site must not
 * paraphrase a rule it does not set. Banded on **RTP**, not house edge: the two
 * are inverses, and quoting the wrong one is exactly the kind of small error
 * that reads as the board being rigged.
 *
 * Every game counts for something under these bands, dice included. If Roobet
 * changes them, this array is the only place to edit.
 */
export const WAGER_WEIGHTS = [
  { band: 'RTP of 97% or lower', weight: '100%', note: 'Most slots and the bulk of the lobby' },
  { band: 'RTP between 97.01% and 98.99%', weight: '50%', note: 'Higher-RTP slots and table games' },
  { band: 'RTP of 99% and over', weight: '10%', note: 'Dice and the lowest-edge originals' },
];

/** What settles the board, and what the smaller figure beside it is. */
export const WAGER_NOTE = `Prizes settle on weighted wager, ${PARTNERS.roobet.name}'s own measure: each bet counts at a rate set by the RTP of the game it was placed on. The smaller "raw" figure shown with every player is their total at face value, the same number ${PARTNERS.roobet.name} shows you. It is there for reference and does not decide placings.`;

/**
 * What each measure is called on screen. The one a board pays on is shown
 * large; the other sits under it, labelled, so nobody has to switch views to
 * compare them and nobody can mistake which one pays.
 */
export const RANK_MODE_LABEL: Record<RankMode, string> = {
  raw: 'Raw',
  weighted: 'Weighted',
};

/** The measure that is not `mode`, i.e. the one shown in small type. */
export function otherMode(mode: RankMode): RankMode {
  return mode === 'weighted' ? 'raw' : 'weighted';
}

/**
 * The two ways a player gets removed from the board, stated as rules rather
 * than as a threat. Both are checked against the affiliate feed before a
 * month is paid out.
 */
export const FAIR_PLAY = [
  {
    id: 'multiaccount',
    title: 'No multi-accounting',
    body: `One Roobet account per person. Where someone opens alternate accounts to take more than one paying place, all of those accounts come off the board, not only the extras, and the places below move up.`,
  },
  {
    id: 'abuse',
    title: 'No wager abuse',
    body: `Playing a low-edge game is fine; it simply counts at the weighted rate its RTP band sets. What does not count is wagering that is not really play: matched or hedged betting that covers both sides of an outcome, stakes cycled between accounts, and anything Roobet flags as bonus or promotion abuse.`,
  },
];

/** Three steps, and the page states them in this order. */
export const JOIN_STEPS = [
  {
    n: 1,
    title: `Sign up on ${PARTNERS.roobet.name}`,
    body: `Head to ${PARTNERS.roobet.name} through the link below and create your account. It takes about a minute.`,
  },
  {
    n: 2,
    title: `Use code ${PARTNERS.roobet.code}`,
    body: `Drop ${PARTNERS.roobet.code} into the referral code field when you register, so the account is tied to the community.`,
  },
  {
    n: 3,
    title: 'Start wagering',
    body: 'Every weighted dollar from that point counts. The board updates as you play and settles when the countdown runs out.',
  },
] as const;

/**
 * The questions that actually get asked, in the order they get asked in.
 *
 * The first two are the ones worth having on the page at all: a player whose
 * Roobet statistics disagree with the board assumes the board is wrong, and a
 * player who has won assumes nothing until they are told how they get paid.
 * The rest are here because answering them once in public is cheaper than
 * answering them individually forever.
 */
export const FAQ = [
  {
    q: 'Why is my wagered figure here lower than on Roobet?',
    a: `Because the board ranks on weighted wager rather than raw wager. Roobet discounts every bet by the game's RTP: the higher the RTP, the less of that bet counts. Money put through dice therefore contributes far less than the same money put through slots. The bands are in the wager rules above, and your raw total is shown in small type under your weighted figure. The standings also refresh about once a minute, so a bet you have just placed can take a moment to appear.`
  },
  {
    q: 'When does the board settle, and when do I get paid?',
    a: `The board closes at 23:59:59 UTC on its end date, which is shown with the standings and counted down at the top of the page. Once it has fully closed, the standings are checked against the affiliate stats and prizes go out after that. To claim, open a ticket in the Discord with your Roobet username.`,
  },
  {
    q: 'Do I have to sign up again if I already have a Roobet account?',
    a: `The code has to be on the account for its wagers to reach the affiliate stats, and it is applied at signup. An existing account that was not opened under the code will not appear here. Roobet does not attach a referral retroactively.`,
  },
  {
    q: 'Does every game count?',
    a: `Yes. Slots, originals, crash, table games and sports all count, at the rate their RTP band sets and not at face value. Nothing is excluded outright.`,
  },
  {
    q: 'What happens if someone above me is disqualified?',
    a: `Everyone below moves up a place and takes the prize attached to their new position. Places are settled on the final standings, after any removals, not on the board as it looked part-way through.`,
  },
  {
    q: 'Is the leaderboard run by Roobet?',
    a: `No. This is a community board funded out of affiliate revenue from code ${PARTNERS.roobet.code}. Roobet supplies the wager statistics through its affiliate API; the prize pool, the split and the payouts are ours.`,
  },
];

/**
 * The socials panel at the foot of the page.
 *
 * Roobet is in the same rack rather than in a band of its own: at this point
 * someone has read the prizes and the rules, and the next thing they need is
 * the way in — putting it a section away from the two places they can follow
 * along makes it the one link they have to go looking for.
 */
export const SOCIALS: SocialCard[] = [
  {
    id: 'kick',
    name: 'Kick',
    handle: '@koviid',
    blurb: 'Live streams, and where the board actually gets played out.',
    href: 'https://kick.com/koviid',
    hue: 'var(--hue-green)',
    cta: 'Watch live',
    social: true,
  },
  {
    id: 'x',
    name: 'X',
    handle: '@koviid',
    blurb: 'Standings, giveaways and everything announced first.',
    href: 'https://x.com/koviid',
    hue: 'var(--hue-ice)',
    cta: 'Follow',
    social: true,
  },
  {
    id: 'discord',
    name: 'Discord',
    handle: 'Community server',
    blurb: 'Prize claims, VIP transfers and everyone else playing the board.',
    href: DISCORD_INVITE,
    hue: 'var(--hue-blurple)',
    cta: 'Join',
    social: true,
  },
  {
    id: 'roobet',
    name: 'Roobet',
    handle: `Code ${PARTNERS.roobet.code}`,
    blurb: 'Sign up under the code to put yourself on the leaderboard.',
    href: PARTNERS.roobet.signupUrl,
    hue: 'var(--hue-gold)',
    cta: 'Sign up',
    social: false,
  },
];

/** Just the platforms Koviid posts on — see the note on `SocialCard.social`. */
export const SOCIAL_PLATFORMS = SOCIALS.filter((s) => s.social);

/**
 * The footer's "Explore" column.
 *
 * Every one of these is somewhere that exists. A footer listing sections the
 * site does not have is the fastest way to make a new site look abandoned, so
 * this grows when the page does and not before.
 */
export const EXPLORE_LINKS: NavLink[] = [
  { label: 'Leaderboard', href: '/' },
  { label: 'Milestones', href: '/milestones' },
  { label: 'Wager rules', href: '/#wager-rules' },
  { label: 'How to enter', href: '/#how-to-enter' },
  { label: 'Questions', href: '/#faq' },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

/**
 * What is on offer under the code, in the order the rewards section lists it.
 *
 * Two entries, and both are things that actually exist: the leaderboard on this
 * page, and Roobet's own VIP transfer. Nothing here describes a rakeback or
 * commission-back scheme, because there is not one to describe.
 */
export const REWARDS = [
  {
    id: 'leaderboard',
    figure: `$${ROOBET_PRIZES.reduce((s, n) => s + n, 0)}`,
    title: 'Leaderboard',
    body: `Ten paying places, ranked on weighted wager. Play under code ${PARTNERS.roobet.code} and you are on the board. There is nothing to opt into.`,
    href: '#standings',
    cta: 'See the board',
    external: false,
  },
  {
    id: 'vip',
    figure: 'VIP',
    title: 'VIP transfer',
    body: `Already a VIP somewhere else? Open a ticket in the Discord with your current level and we will get your play reviewed for a matched invitation on ${PARTNERS.roobet.name}.`,
    href: DISCORD_INVITE,
    cta: 'Open a ticket',
    external: true,
  },
] as const;
