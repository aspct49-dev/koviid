import 'server-only';

import { roobetProvider } from '../providers/roobet';
import { currentBoard } from '../schedule';
import { buildEntries } from '../providers/shared';
import type { Leaderboard, LeaderboardProvider, PartnerId, Period } from '../types';

/**
 * The only leaderboard entry point the app uses. Components ask this for a
 * board and never touch a provider, so which casino is behind it stays an
 * implementation detail.
 */

const PROVIDERS: Record<PartnerId, LeaderboardProvider> = {
  roobet: roobetProvider,
};

/**
 * What the board looks like when the live call failed.
 *
 * Deliberately empty rather than seeded with sample rows. A hardcoded row
 * renders as a real player with a real-looking figure, so a transient outage —
 * or a missing API key on a fresh deploy — would show invented standings as
 * though they were current. Every place comes back unclaimed instead, and the
 * UI carries the "temporarily unavailable" notice above it.
 */
function fallbackFor(partnerId: PartnerId, period: Period, error: string): Leaderboard {
  const empty = {
    entries: buildEntries([], period.prizeTable),
    stats: { players: 0, totalWagered: 0, topWager: 0 },
  };
  return {
    partnerId,
    prizePool: period.prizeTable.reduce((sum, n) => sum + n, 0),
    rankings: { raw: empty, weighted: empty },
    pays: period.pays,
    periodStart: period.start.toISOString(),
    periodEnd: period.end.toISOString(),
    updatedAt: new Date().toISOString(),
    source: 'mock',
    error,
  };
}

export async function getLeaderboard(
  partnerId: PartnerId,
  period: Period = currentBoard(),
): Promise<Leaderboard> {
  try {
    return await PROVIDERS[partnerId].fetchLeaderboard(period);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[leaderboard] ${partnerId} provider failed:`, message);
    return fallbackFor(partnerId, period, message);
  }
}
