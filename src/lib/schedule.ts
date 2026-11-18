import { BOARDS } from './partners';
import type { Period } from './types';

/**
 * Which board is running, and which one ran before it.
 *
 * Boards are listed in `BOARDS` with their own dates, prize table and paying
 * measure. Outside that list a board is one calendar month on the terms of the
 * nearest listed board, so the site never runs out of boards: once the last
 * listed one closes, the next starts the following day and runs to the end of
 * that month, then month by month after that.
 */

const DAY = 86_400_000;

function startOf(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

/** 23:59:59 on the given day — the last second a board is open. */
function endOf(iso: string): Date {
  return new Date(startOf(iso).getTime() + DAY - 1000);
}

/** 23:59:59 on the last day of the month `d` falls in. */
function endOfMonth(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1) - 1000);
}

const LISTED: Period[] = BOARDS.map((b) => ({
  start: startOf(b.start),
  end: endOf(b.end),
  prizeTable: b.prizeTable,
  pays: b.pays,
}));

/** The board open at `now`. */
export function boardAt(now: Date = new Date()): Period {
  const t = now.getTime();

  const listed = LISTED.find((p) => t >= p.start.getTime() && t <= p.end.getTime());
  if (listed) return listed;

  const first = LISTED[0];
  const last = LISTED[LISTED.length - 1];

  // Before the first listed board: the calendar month, on the first board's terms.
  if (t < first.start.getTime()) {
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    return { start, end: endOfMonth(start), prizeTable: first.prizeTable, pays: first.pays };
  }

  // After the last: from the day after it, to month end, then month by month.
  let start = new Date(last.end.getTime() + 1000);
  let end = endOfMonth(start);
  while (t > end.getTime()) {
    start = new Date(end.getTime() + 1000);
    end = endOfMonth(start);
  }
  return { start, end, prizeTable: last.prizeTable, pays: last.pays };
}

/** The board currently running. */
export function currentBoard(now: Date = new Date()): Period {
  return boardAt(now);
}

/** The board that closed immediately before the current one opened. */
export function previousBoard(now: Date = new Date()): Period {
  return boardAt(new Date(currentBoard(now).start.getTime() - 1000));
}
