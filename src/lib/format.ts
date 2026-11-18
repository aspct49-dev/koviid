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

/** "17 December", in UTC — the day a board closes. */
export function dayLabel(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
}

/**
 * What a board's dates are called.
 *
 * A board that is exactly one calendar month reads as the month ("October
 * 2026"); anything else reads as its dates ("1 November – 17 December 2026").
 */
export function periodRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const lastOfMonth = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() + 1, 0)).getUTCDate();
  const wholeMonth =
    start.getUTCDate() === 1 &&
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCFullYear() === end.getUTCFullYear() &&
    end.getUTCDate() === lastOfMonth;

  if (wholeMonth) {
    return start.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  }
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const from = start.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    ...(sameYear ? {} : { year: 'numeric' }),
    timeZone: 'UTC',
  });
  const to = end.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  return `${from} – ${to}`;
}

