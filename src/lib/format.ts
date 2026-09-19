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
