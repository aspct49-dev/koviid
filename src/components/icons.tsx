type Props = { className?: string };

/* Stroked at 1.75 on a 24 grid, so they sit at the same weight as the type
   they stand beside rather than reading as a heavier second voice. */
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function TrophyIcon({ className }: Props) {
  return (
    <svg {...base} className={className} width="16" height="16" aria-hidden>
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" fill="currentColor" stroke="none" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" />
      <path d="M12 14v3m-3 3h6" />
    </svg>
  );
}

export function CopyIcon({ className }: Props) {
  return (
    <svg {...base} className={className} width="15" height="15" aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
    </svg>
  );
}

export function ExternalIcon({ className }: Props) {
  return (
    <svg {...base} className={className} width="15" height="15" aria-hidden>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </svg>
  );
}

export function ArrowIcon({ className }: Props) {
  return (
    <svg {...base} className={className} width="15" height="15" aria-hidden>
      <path d="M5 12h13M12.5 6l6 6-6 6" />
    </svg>
  );
}

export function ShieldIcon({ className }: Props) {
  return (
    <svg {...base} className={className} width="18" height="18" aria-hidden>
      <path d="M12 3l7.5 2.8v5.4c0 4.4-3 8.3-7.5 9.8-4.5-1.5-7.5-5.4-7.5-9.8V5.8z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </svg>
  );
}

/* --------------------------------------------------- platform marks

   Solid glyphs, because these are the brands' own marks and they are drawn
   that way everywhere else they appear. */

export function KickIcon({ className }: Props) {
  /* Kick's own geometry, on its own 300 grid rather than redrawn onto a 24 —
     the mark is all right angles and rescaling the coordinates by hand is how
     a stepped logo ends up a pixel out at every corner. */
  return (
    <svg viewBox="0 0 300 300" fill="currentColor" className={className} width="20" height="20" aria-hidden>
      <path d="M0 0h116.5v100H150V66.5h33.5V0H300v100h-33.5v33.5H233v33h33.5V200H300v100H183.5v-66.5H150V200h-33.5v100H0V0Z" />
    </svg>
  );
}

export function DiscordIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="20" height="20" aria-hidden>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function XIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="20" height="20" aria-hidden>
      <path d="M17.7 3h3.3l-7.2 8.2L22.3 21h-6.6l-5.2-6.7L4.6 21H1.3l7.7-8.8L1.7 3h6.8l4.7 6.2zm-1.2 16h1.8L7.6 4.8H5.7z" />
    </svg>
  );
}

/**
 * The operator's own mark, for the socials rack.
 *
 * The real asset used as an alpha mask rather than a redrawn path, so it takes
 * `currentColor` like the two glyphs beside it and still is the mark Roobet
 * actually publishes. An approximation next to two exact logos reads as the
 * one card that got the brand wrong — and it is the card the signup is on.
 */
export function RoobetIcon({ className }: Props) {
  return (
    <span
      className={className}
      aria-hidden
      style={{
        display: 'block',
        // Larger than the 20px glyphs beside it, because the mark is a
        // circular emblem with its own margin baked in — matched on the ink
        // rather than on the box, which is what makes the three read as one
        // size in the row.
        width: 26,
        height: 26,
        background: 'currentColor',
        WebkitMask: 'url("/roo-mark.webp") center / contain no-repeat',
        mask: 'url("/roo-mark.webp") center / contain no-repeat',
      }}
    />
  );
}
