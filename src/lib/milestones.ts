import { PARTNERS } from './partners';

/**
 * The rank ladder and what each step pays.
 *
 * Twenty ranks in five reward bands. The `reward` figures are what actually
 * gets paid, so the totals on the page are summed from this array rather than
 * written out anywhere — the headline and the table cannot disagree.
 *
 * `emblem` names a file in /public/ranks. The art is Roobet's own rank
 * iconography, which is why the ladder reads as theirs: pale hexes through
 * gold, then gems, then the trophy, crown and skull at the top.
 *
 * `band` groups consecutive ranks that pay the same. It drives the dividers on
 * the page, so a band is defined once here instead of being hardcoded as a
 * row index in the markup.
 */
export interface Milestone {
  rank: string;
  /** Lifetime wagered under the code, in whole dollars. */
  requirement: number;
  /** One-time payout for reaching it. */
  reward: number;
  emblem: string;
  band: string;
}

export const MILESTONES: Milestone[] = [
  { rank: 'Rookie', requirement: 10_000, reward: 20, emblem: 'beginner', band: 'Rookie' },
  { rank: 'Advanced Rookie', requirement: 20_000, reward: 20, emblem: 'silver1', band: 'Rookie' },
  { rank: 'Big Dick Rookie', requirement: 30_000, reward: 20, emblem: 'silver2', band: 'Rookie' },
  { rank: 'Veteran Rookie', requirement: 40_000, reward: 20, emblem: 'silver3', band: 'Rookie' },
  { rank: 'Rookie Elite', requirement: 50_000, reward: 20, emblem: 'silver4', band: 'Rookie' },

  { rank: 'Platinum Recruit', requirement: 75_000, reward: 50, emblem: 'gold1', band: 'Platinum' },
  { rank: 'Platinum Soldier', requirement: 100_000, reward: 50, emblem: 'gold2', band: 'Platinum' },
  { rank: 'Platinum Veteran', requirement: 125_000, reward: 50, emblem: 'gold3', band: 'Platinum' },
  { rank: 'Platinum Elite', requirement: 150_000, reward: 50, emblem: 'gold4', band: 'Platinum' },
  { rank: 'Platinum Commander', requirement: 175_000, reward: 50, emblem: 'emerald1', band: 'Platinum' },

  { rank: 'Elite Soldier', requirement: 250_000, reward: 100, emblem: 'emerald2', band: 'Elite' },
  { rank: 'Elite Veteran', requirement: 325_000, reward: 100, emblem: 'emerald3', band: 'Elite' },
  { rank: 'Elite Commander', requirement: 400_000, reward: 100, emblem: 'diamond1', band: 'Elite' },
  { rank: 'Elite General', requirement: 475_000, reward: 100, emblem: 'diamond2', band: 'Elite' },
  { rank: 'Elite Master', requirement: 550_000, reward: 100, emblem: 'diamond3', band: 'Elite' },

  { rank: 'Elite Legend', requirement: 700_000, reward: 200, emblem: 'ruby3', band: 'Legend' },
  { rank: 'The General', requirement: 800_000, reward: 200, emblem: 'champion3', band: 'Legend' },
  { rank: 'The Warlord', requirement: 900_000, reward: 200, emblem: 'master3', band: 'Legend' },
  { rank: 'The Overlord', requirement: 1_000_000, reward: 200, emblem: 'gm3', band: 'Legend' },

  { rank: 'The Immortal', requirement: 1_250_000, reward: 250, emblem: 'immortal', band: 'Immortal' },
];

/** Everything on the ladder, added up. */
export const MILESTONE_TOTAL = MILESTONES.reduce((sum, m) => sum + m.reward, 0);

/** The largest single payout. Taken as a maximum so appending out of order
 *  cannot make the page lie. */
export const MILESTONE_TOP = Math.max(...MILESTONES.map((m) => m.reward));

/** The wager that clears the whole ladder. */
export const MILESTONE_FINAL = Math.max(...MILESTONES.map((m) => m.requirement));

/** One accent per band, so twenty rows read as five groups. */
export const BAND_HUE: Record<string, string> = {
  Rookie: '#9fb2d9',
  Platinum: '#ffc95c',
  Elite: '#2fe6a7',
  Legend: '#ff6b9d',
  Immortal: '#ff4d6d',
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
