/** Formatting and masking. Shared by the provider and the components. */

/**
 * Usernames are masked to their last four characters — the convention across
 * casino affiliate leaderboards, and the reason the provider never hands a
 * full name to the UI.
 */
export function maskUsername(name: string | null | undefined): string {
  if (!name) return '****';
  if (name.length <= 4) return '*'.repeat(4) + name;
  return '*'.repeat(Math.min(name.length - 4, 8)) + name.slice(-4);
}

/** Wagers run to five figures; outside the standings the cents are noise. */
export function formatMoney(n: number, opts: { cents?: boolean } = {}): string {
  /*
   * Something under a cent, but not nothing. "$0.0072" in a column beside
   * "$6,448.82" reads as a rendering fault, and "$0.00" would be worse — it
   * says they wagered nothing while a prize sits next to it.
   */
  if (opts.cents && n > 0 && n < 0.01) return '<$0.01';
  return (
    '$' +
    n.toLocaleString('en-US', {
      minimumFractionDigits: opts.cents ? 2 : 0,
      maximumFractionDigits: opts.cents ? 2 : 0,
    })
  );
}

/** The current calendar month, which is the leaderboard period. */
export function currentPeriod(now: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0) - 1000);
  return { start, end };
}

/**
 * The month before this one — the board that has already been settled.
 *
 * Derived by stepping the month index back rather than by subtracting days:
 * `getUTCMonth() - 1` is defined for January (it rolls the year), where
 * subtracting 30 days would land in a different month depending on which one
 * you started in.
 */
export function previousPeriod(now: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1, 0, 0, 0));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0) - 1000);
  return { start, end };
}

export function periodLabel(start: string): string {
  return new Date(start).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Short form for the big end of the rank ladder.
 *
 * "$10,000,000,000" is eleven glyphs of noise in a table column, and the
 * reader only needs the magnitude. Thresholds below $1m stay written out in
 * full, because at that end the exact figure is the thing someone is actually
 * measuring themselves against.
 */
export function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return trimZero(n / 1_000_000_000) + 'B';
  if (n >= 1_000_000) return trimZero(n / 1_000_000) + 'M';
  return formatMoney(n);
}

/**
 * Up to two decimals, with trailing zeros dropped: 10, 1.3, 2.25.
 *
 * Two rather than one because these are thresholds people measure themselves
 * against, and one decimal rounds $2,250,000 up to "$2.3M" — which tells
 * somebody sitting on $2.26M that they have not reached a rank they have.
 */
function trimZero(v: number): string {
  return '$' + Number(v.toFixed(2)).toString();
}
