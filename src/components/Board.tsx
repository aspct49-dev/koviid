import { FeedState } from '@/components/FeedState';
import { formatMoney } from '@/lib/format';
import { RANK_MODE_LABEL, otherMode } from '@/lib/partners';
import type { Leaderboard } from '@/lib/types';

/**
 * The full standings: every paying seat, in order.
 *
 * The prize table decides how many rows there are, not how many players turned
 * up — so an unclaimed place renders with its prize attached and says the seat
 * is open. At this community size that is the honest picture and also the more
 * persuasive one.
 *
 * Each row shows the figure the board pays on, large, and the other measure
 * under it in small type with its own label, so both are on screen at once and
 * there is no question which one decides the order.
 */
export function Board({ board }: { board: Leaderboard }) {
  const { entries } = board.rankings[board.pays];
  const alt = otherMode(board.pays);

  return (
    <div className="board">
      {board.error && (
        <p className="notice" style={{ marginBottom: 16 }}>
          <span className="notice-mark" aria-hidden>
            !
          </span>
          Standings are temporarily unavailable. The prize table below is correct; the placings will
          fill back in once the feed returns.
        </p>
      )}

      {/* Above the head rather than beside the title: it qualifies the numbers
          in the rows, and an empty board is exactly when someone wants it. */}
      <FeedState at={board.updatedAt} live={board.source === 'live' && !board.error} />

      <div className="board-head" role="presentation">
        <span>Rank</span>
        <span>Player</span>
        <span>{RANK_MODE_LABEL[board.pays]}</span>
        <span>Prize</span>
      </div>

      {entries.map((entry) => (
        <div
          className="board-row"
          key={entry.rank}
          data-rank={entry.rank}
          data-open={entry.unclaimed}
        >
          <span className="board-rank">{entry.rank}</span>

          <span className="board-player">
            {/* Same mark as the podium; see the note there. */}
            <span className="board-avatar">
              <span className="board-avatar-mark" aria-hidden />
            </span>
            {/* The name alone. On a masked name, a most-played game would be
                the only identifying detail left. */}
            <span className="board-name">{entry.unclaimed ? 'Open seat' : entry.username}</span>
          </span>

          <span className="board-wagered">
            {entry.unclaimed ? (
              '—'
            ) : (
              <>
                <span className="board-main">{formatMoney(entry.wagered, { cents: true })}</span>
                <span className="board-alt">
                  <span className="alt-tag">{RANK_MODE_LABEL[alt]}</span>
                  {formatMoney(entry[alt])}
                </span>
              </>
            )}
          </span>

          <span className="board-prize">
            <span className="sym">$</span>
            {entry.prize.toLocaleString('en-US')}
          </span>
        </div>
      ))}
    </div>
  );
}

export function BoardStats({ board }: { board: Leaderboard }) {
  const { stats } = board.rankings[board.pays];
  const alt = otherMode(board.pays);
  const altTotal = board.rankings[alt].stats.totalWagered;

  return (
    <div className="board-stats">
      <div className="stat">
        <div className="stat-v">{stats.players.toLocaleString('en-US')}</div>
        <span className="stat-k">Players on the board</span>
      </div>
      <div className="stat">
        <div className="stat-v">{formatMoney(stats.totalWagered)}</div>
        <span className="stat-k">
          {RANK_MODE_LABEL[board.pays]} wagered so far · {formatMoney(altTotal)}{' '}
          {RANK_MODE_LABEL[alt].toLowerCase()}
        </span>
      </div>
      <div className="stat">
        <div className="stat-v">{formatMoney(stats.topWager)}</div>
        <span className="stat-k">Leading figure</span>
      </div>
    </div>
  );
}
