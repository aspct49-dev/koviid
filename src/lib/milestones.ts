import { PARTNERS } from './partners';

/**
 * Roobet's rank ladder, with what each step pays.
 *
 * The names and the wager requirements are Roobet's own and are reproduced
 * exactly. The `reward` column is ours.
 *
 * Rewards are set through Diamond III and are 0 above it. That is not an
 * oversight: Champion I needs $18,000,000 wagered and Immortal needs ten
 * billion, so those rows are the ladder being shown in full rather than a
 * payout anybody is going to claim. Setting a figure there is a one-number
 * edit if it ever matters.
 */
export interface Milestone {
  rank: string;
  /** Lifetime wagered under the code, in whole dollars. */
  requirement: number;
  /** One-time payout for reaching it. 0 where no reward is set. */
  reward: number;
  emblem: string;
  /** Tier family. Drives the dividers and the accent, so regrouping is data. */
  band: string;
}

export const MILESTONES: Milestone[] = [
  { rank: 'Beginner', requirement: 0, reward: 0, emblem: 'beginner', band: 'Beginner' },

  { rank: 'Silver I', requirement: 1_000, reward: 20, emblem: 'silver1', band: 'Silver' },
  { rank: 'Silver II', requirement: 2_700, reward: 20, emblem: 'silver2', band: 'Silver' },
  { rank: 'Silver III', requirement: 5_500, reward: 20, emblem: 'silver3', band: 'Silver' },
  { rank: 'Silver IV', requirement: 10_000, reward: 20, emblem: 'silver4', band: 'Silver' },

  { rank: 'Gold I', requirement: 18_500, reward: 50, emblem: 'gold1', band: 'Gold' },
  { rank: 'Gold II', requirement: 32_000, reward: 50, emblem: 'gold2', band: 'Gold' },
  { rank: 'Gold III', requirement: 56_000, reward: 50, emblem: 'gold3', band: 'Gold' },
  { rank: 'Gold IV', requirement: 95_000, reward: 50, emblem: 'gold4', band: 'Gold' },

  { rank: 'Emerald I', requirement: 160_000, reward: 100, emblem: 'emerald1', band: 'Emerald' },
  { rank: 'Emerald II', requirement: 275_000, reward: 100, emblem: 'emerald2', band: 'Emerald' },
  { rank: 'Emerald III', requirement: 460_000, reward: 100, emblem: 'emerald3', band: 'Emerald' },

  { rank: 'Ruby I', requirement: 785_000, reward: 200, emblem: 'ruby1', band: 'Ruby' },
  { rank: 'Ruby II', requirement: 1_300_000, reward: 200, emblem: 'ruby2', band: 'Ruby' },
  { rank: 'Ruby III', requirement: 2_250_000, reward: 200, emblem: 'ruby3', band: 'Ruby' },

  { rank: 'Diamond I', requirement: 3_800_000, reward: 250, emblem: 'diamond1', band: 'Diamond' },
  { rank: 'Diamond II', requirement: 6_500_000, reward: 250, emblem: 'diamond2', band: 'Diamond' },
  { rank: 'Diamond III', requirement: 10_000_000, reward: 250, emblem: 'diamond3', band: 'Diamond' },

  { rank: 'Champion I', requirement: 18_000_000, reward: 0, emblem: 'champion1', band: 'Champion' },
  { rank: 'Champion II', requirement: 30_000_000, reward: 0, emblem: 'champion2', band: 'Champion' },
  { rank: 'Champion III', requirement: 50_000_000, reward: 0, emblem: 'champion3', band: 'Champion' },

  { rank: 'Legend I', requirement: 88_000_000, reward: 0, emblem: 'legend1', band: 'Legend' },
  { rank: 'Legend II', requirement: 150_000_000, reward: 0, emblem: 'legend2', band: 'Legend' },
  { rank: 'Legend III', requirement: 250_000_000, reward: 0, emblem: 'legend3', band: 'Legend' },

  { rank: 'Master I', requirement: 425_000_000, reward: 0, emblem: 'master1', band: 'Master' },
  { rank: 'Master II', requirement: 720_000_000, reward: 0, emblem: 'master2', band: 'Master' },
  { rank: 'Master III', requirement: 1_200_000_000, reward: 0, emblem: 'master3', band: 'Master' },

  { rank: 'Grandmaster I', requirement: 2_000_000_000, reward: 0, emblem: 'gm1', band: 'Grandmaster' },
  { rank: 'Grandmaster II', requirement: 3_500_000_000, reward: 0, emblem: 'gm2', band: 'Grandmaster' },
  { rank: 'Grandmaster III', requirement: 6_000_000_000, reward: 0, emblem: 'gm3', band: 'Grandmaster' },

  { rank: 'Immortal', requirement: 10_000_000_000, reward: 0, emblem: 'immortal', band: 'Immortal' },
];

/** Only the ranks that actually pay. */
export const PAYING_MILESTONES = MILESTONES.filter((m) => m.reward > 0);

/** Everything on the ladder, added up. */
export const MILESTONE_TOTAL = MILESTONES.reduce((sum, m) => sum + m.reward, 0);

/** The largest single payout. A maximum, so appending out of order cannot
 *  make the page lie. */
export const MILESTONE_TOP = Math.max(...MILESTONES.map((m) => m.reward));

/** The wager that clears every paying rank. */
export const MILESTONE_FINAL = Math.max(...PAYING_MILESTONES.map((m) => m.requirement));

/** One accent per family, so thirty-one rows read as eleven groups. */
export const BAND_HUE: Record<string, string> = {
  Beginner: '#8da2c0',
  Silver: '#c9d4e4',
  Gold: '#ffc95c',
  Emerald: '#2fe6a7',
  Ruby: '#ff4d6d',
  Diamond: '#7cc4ff',
  Champion: '#ffa23d',
  Legend: '#c77dff',
  Master: '#ffd700',
  Grandmaster: '#53fc18',
  Immortal: '#ff2d55',
};

/**
 * How a milestone gets paid. Three steps, and the middle one is the point:
 * these are funded by us, so nothing about it is automatic — someone has to
 * ask, and a Discord ticket is where that happens.
 */
export const MILESTONE_STEPS = [
  {
    n: 1,
    title: 'Play under the code',
    body: `Everything you wager on ${PARTNERS.roobet.name} under code ${PARTNERS.roobet.code} adds to your lifetime total. It does not reset at the end of the month the way the leaderboard does.`,
  },
  {
    n: 2,
    title: 'Hit a rank',
    body: 'Each rank on the ladder pays once, the first time you pass its wager requirement. Passing several at once pays all of them.',
  },
  {
    n: 3,
    title: 'Open a ticket',
    body: `Milestones are not paid automatically. Open a ticket in the Discord with your ${PARTNERS.roobet.name} username and the rank you have reached, and it is checked against the affiliate stats and sent out.`,
  },
] as const;
