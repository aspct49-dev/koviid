/**
 * Domain types. No React, no fetch, no UI concerns — these are the shapes the
 * provider normalises down to, so the leaderboard components never learn which
 * casino a row came from.
 */

export type PartnerId = 'roobet';

/** Whether the numbers on screen came from the real API or from a fallback. */
export type DataSource = 'live' | 'mock';

export interface Partner {
  id: PartnerId;
  name: string;
  /** Referral code the player types at signup. */
  code: string;
  /** Operator's own brand mark, served from /public. */
  logo: string;
  signupUrl: string;
  /** Total pot for the current period, in whole dollars. */
  prizePool: number;
  /** Payout per rank, index 0 = 1st. Length defines how many seats pay. */
  prizeTable: number[];
  /** What the ranking is measured on, stated verbatim in the rules copy. */
  metricLabel: string;
}

export interface LeaderboardEntry {
  rank: number;
  /** Masked for display — the provider never hands a full username to the UI. */
  username: string;
  /** The figure the board is ranked on. Roobet weights this by game. */
  wagered: number;
  prize: number;
  favouriteGame?: string;
  /** A paying seat nobody has taken yet. */
  unclaimed: boolean;
}

/** Whole-board aggregates, computed from every player, not just the paid places. */
export interface BoardStats {
  players: number;
  totalWagered: number;
  topWager: number;
}

export interface Leaderboard {
  partnerId: PartnerId;
  prizePool: number;
  /** Always prizeTable.length long — unfilled seats come back unclaimed. */
  entries: LeaderboardEntry[];
  periodStart: string;
  periodEnd: string;
  updatedAt: string;
  source: DataSource;
  stats: BoardStats;
  /** Set when the live provider failed and an empty board was served instead. */
  error?: string;
}

/** What a partner integration implements. Adding a casino = adding one of these. */
export interface LeaderboardProvider {
  readonly partnerId: PartnerId;
  fetchLeaderboard(period: Period): Promise<Leaderboard>;
}

export interface Period {
  start: Date;
  end: Date;
}

/** One card in the socials panel at the foot of the page. */
export interface SocialCard {
  id: string;
  /** Platform name, set large on the card. */
  name: string;
  /** The account, as it is written on that platform. */
  handle: string;
  /** One line on what is actually there. */
  blurb: string;
  href: string;
  /** CSS colour — the card's own light. */
  hue: string;
  /** Wording on the card's action row. */
  cta: string;
  /**
   * Whether this is somewhere Koviid posts, as opposed to somewhere a player
   * goes. The rack shows both because at that point they are the same kind of
   * choice; the footer's "Social media" column shows only the first kind,
   * because a casino signup listed under that heading would be misleading.
   */
  social: boolean;
}

/** One entry in a footer link column. */
export interface NavLink {
  label: string;
  href: string;
}
