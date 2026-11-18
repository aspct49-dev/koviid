import { formatMoney, periodRange } from '@/lib/format';
import type { Leaderboard } from '@/lib/types';
import { TrophyIcon } from './icons';

/**
 * The previous board, settled. The first question about any community
 * leaderboard is whether it pays, and past winners answer it without claiming
 * anything.
 *
 * Renders nothing when that board had no players: an empty "previous winners"
 * block answers that question the wrong way round.
 *
 * Ordered on the measure *that* board paid on, which is not necessarily the
 * one the current board pays on. October paid on raw wager; re-ranking it by
 * weighted would show an order that never happened next to the prizes that
 * actually went out.
 */
export function PastWinners({ board }: { board: Leaderboard }) {
  const winners = board.rankings[board.pays].entries.filter((e) => !e.unclaimed).slice(0, 5);
  if (!winners.length || board.error) return null;

  return (
    <section className="section wrap">
      <div className="section-head">
        <h2 className="h-section">Previous Board</h2>
        <p>{periodRange(board.periodStart, board.periodEnd)}, settled and paid.</p>
      </div>

      <div className="past">
        {winners.map((entry) => (
          <div className="past-row" key={entry.rank} data-rank={entry.rank}>
            <span className="past-rank">
              {entry.rank <= 3 ? <TrophyIcon /> : null}
              {entry.rank}
            </span>
            <span className="past-name">{entry.username}</span>
            <span className="past-wagered">{formatMoney(entry.wagered, { cents: true })}</span>
            <span className="past-prize">{formatMoney(entry.prize)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
