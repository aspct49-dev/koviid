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
 *      the period we display, and the two cannot drift.
 *   2. It returns both `wagered` and `weightedWagered`. This board ranks on
 *      `wagered`, the raw figure, so a dollar counts the same whatever it was
 *      staked on. `weightedWagered` is Roobet's own RTP-discounted number and
 *      is deliberately neither used nor shown: publishing both would invite
 *      the question of which one pays.
 */

/** The fields we use out of a Roobet stats row. */
interface RoobetRow {
  uid: string;
  username: string;
  wagered: number;
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

/** The figure the board ranks on: total staked, at face value. */
function ranked(row: RoobetRow): number {
  return row.wagered ?? 0;
}

export const roobetProvider: LeaderboardProvider = {
  partnerId: 'roobet',

  async fetchLeaderboard(period: Period): Promise<Leaderboard> {
    const partner = getPartner('roobet');
    const { token, userId } = readCredentials();

    const url = new URL(ENDPOINT);
    url.searchParams.set('userId', userId);
    url.searchParams.set('startDate', isoDate(period.start));
    url.searchParams.set('endDate', isoDate(period.end));

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
