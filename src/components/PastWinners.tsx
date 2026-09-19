import { formatMoney, periodLabel } from '@/lib/format';
import type { Leaderboard } from '@/lib/types';
import { TrophyIcon } from './icons';

/**
 * Last month's board, settled. The first question about any community
 * leaderboard is whether it pays, and past winners answer it without claiming
 * anything.
 *
 * Renders nothing when last month had no players: an empty "previous winners"
 * block answers that question the wrong way round.
 */
export function PastWinners({ board }: { board: Leaderboard }) {
  const winners = board.entries.filter((e) => !e.unclaimed).slice(0, 5);
  if (!winners.length || board.error) return null;

  return (
    <section className="section wrap">
      <div className="section-head">
        <h2 className="h-section">Last Month</h2>
        <p>{periodLabel(board.periodStart)}, settled and paid.</p>
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
