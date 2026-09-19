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
