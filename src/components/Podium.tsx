import { formatMoney } from '@/lib/format';
import type { Leaderboard, LeaderboardEntry } from '@/lib/types';
import { TrophyIcon } from './icons';

/**
 * The top three, drawn in CSS rather than composited as an image, so the names
 * and figures stay live text.
 *
 * Sizes inside a card are in `cqi`, a percentage of that card's own width, so
 * the component scales to whatever column it lands in without a breakpoint.
 */

const PLACES = [
  { place: 2, rank: 'var(--rank-2)', label: '2nd' },
  { place: 1, rank: 'var(--rank-1)', label: '1st' },
  { place: 3, rank: 'var(--rank-3)', label: '3rd' },
] as const;

export function Podium({ board }: { board: Leaderboard }) {
  return (
    <div className="podium">
      {PLACES.map(({ place, rank, label }) => (
        <PodiumCard
          key={place}
          entry={board.entries[place - 1]}
          place={place}
          rank={rank}
          label={label}
        />
      ))}
    </div>
  );
}

function PodiumCard({
  entry,
  place,
  rank,
  label,
}: {
  entry: LeaderboardEntry | undefined;
  place: number;
  rank: string;
  label: string;
}) {
  // A paying seat nobody has taken is the ordinary case at this community
  // size, so the card renders with the prize still on it and says so plainly.
  const open = !entry || entry.unclaimed;

  return (
    <article
      className="pod"
      data-place={place}
      data-open={open}
      style={{ ['--rank' as string]: rank }}
    >
      <div className="pod-badge">
        <TrophyIcon />
        {label}
      </div>

      <div className="pod-card">
        <div className="pod-face">
          <div className="pod-avatar">
            {/* The operator mark, not Roobet's per-player tier badge: three
                cards each showing a different emblem read as a second ranking
                competing with this one. */}
            <span className="pod-avatar-mark" aria-hidden />
          </div>

          <p className="pod-name">{open ? 'Open seat' : entry.username}</p>

          <p className="pod-metric">Wagered</p>
          <p className="pod-wagered">
            <span className="sym">$</span>
            {(open ? 0 : entry.wagered).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <div className="pod-rule" />

          <p className="pod-metric">Prize</p>
          <p className="pod-prize">{formatMoney(entry?.prize ?? 0)}</p>
        </div>
      </div>
    </article>
  );
}
