import 'server-only';

import { getPartner } from '../partners';
import { buildEntries } from './shared';
import type { Leaderboard, LeaderboardProvider, Period } from '../types';

/**
 * Roobet affiliate wager stats.
 *
 * The API key is a bearer token issued with the affiliate account, so it lives
 * in the environment and this module is server-only. Nothing under
 * src/components may import it.
 *
 * Two things worth knowing about the endpoint:
 *
 *   1. It is date-ranged, unlike most affiliate feeds — startDate and endDate
 *      are required and are read as UTC. The period we ask for is therefore
 *      the period we display, and the two cannot drift. See `isoDate` and
 *      `exclusiveEnd` for the half-open window this endpoint actually uses.
 *   2. It returns both `wagered` and `weightedWagered`. Roobet weights by RTP
 *      to stop low-edge grinding from farming a board, and the published rules
 *      rank on the weighted figure, so that is the one used here. The raw
 *      figure is deliberately not shown, because showing both invites the
 *      question of which one pays.
 */

/** The fields we use out of a Roobet stats row. */
interface RoobetRow {
  uid: string;
  username: string;
  wagered: number;
  weightedWagered?: number;
  favoriteGameTitle?: string;
}

const ENDPOINT = 'https://roobetconnect.com/affiliate/v2/stats';

function readCredentials(): { token: string; userId: string } {
  const token = process.env.ROOBET_API_KEY;
  const userId = process.env.ROOBET_USER_ID;
  if (!token) throw new Error('ROOBET_API_KEY is not set');
  if (!userId) throw new Error('ROOBET_USER_ID is not set');
  return { token: token.trim(), userId: userId.trim() };
}

/** Roobet takes plain ISO dates, not full timestamps. */
function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * The upper bound to send, which is the day *after* the period ends.
 *
 * Roobet's window is half-open: `startDate` is inclusive but `endDate` means
 * "up to 00:00 on this date" and excludes the day itself. Sending the last day
 * of the month therefore threw away that entire day's wagering — silently, and
 * on the one day of the month when it matters most, because the board settles
 * that night.
 *
 * Verified against a live account: a player with $374.22 for September came
 * back as $15.45 with `endDate=2026-09-30` and as the full $374.22 with
 * `2026-10-01`, the difference being everything they staked on the 30th.
 *
 * `period.end` is 23:59:59 on the last day, so a second past it lands at 00:00
 * the next day and `isoDate` rounds to exactly the bound this endpoint wants.
 */
function exclusiveEnd(d: Date): string {
  return isoDate(new Date(d.getTime() + 1000));
}

/**
 * The figure the board ranks on, displays and totals.
 *
 * Falls back to the raw stake only where a row omits the weight: a row with no
 * weighted figure is better ranked on what it does carry than dropped to zero.
 * Every live row carries one.
 */
function ranked(row: RoobetRow): number {
  return row.weightedWagered ?? row.wagered ?? 0;
}

export const roobetProvider: LeaderboardProvider = {
  partnerId: 'roobet',

  async fetchLeaderboard(period: Period): Promise<Leaderboard> {
    const partner = getPartner('roobet');
    const { token, userId } = readCredentials();

    const url = new URL(ENDPOINT);
    url.searchParams.set('userId', userId);
    url.searchParams.set('startDate', isoDate(period.start));
    url.searchParams.set('endDate', exclusiveEnd(period.end));

    const res = await fetch(url, {
      headers: { accept: 'application/json', authorization: `Bearer ${token}` },
      // One upstream call a minute however much traffic arrives. Standings a
      // minute old are indistinguishable from live to a player, and the
      // affiliate endpoints in this category all rate limit.
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Roobet responded ${res.status}: ${await res.text()}`);
    }

    const payload = (await res.json()) as RoobetRow[];
    if (!Array.isArray(payload)) {
      throw new Error('Roobet returned an unexpected payload');
    }

    const sorted = [...payload].sort((a, b) => ranked(b) - ranked(a));

    return {
      partnerId: 'roobet',
      prizePool: partner.prizePool,
      entries: buildEntries(
        sorted.map((row) => ({
          username: row.username,
          wagered: ranked(row),
          // Carried through but not rendered — on a masked name it would be
          // the only identifying detail left.
          favouriteGame: row.favoriteGameTitle,
        })),
        partner.prizeTable,
      ),
      periodStart: period.start.toISOString(),
      periodEnd: period.end.toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'live',
      stats: {
        players: payload.length,
        totalWagered: payload.reduce((sum, r) => sum + ranked(r), 0),
        topWager: sorted.length ? ranked(sorted[0]) : 0,
      },
    };
  },
};
