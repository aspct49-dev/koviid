'use client';

import { useCallback, useRef } from 'react';

/**
 * A card that leans toward the cursor and catches a highlight under it.
 *
 * The tilt is capped at 8 degrees. Past about ten the card reads as falling
 * over rather than leaning, and type rendered at that angle goes soft. The
 * specular tracks the cursor so the bright spot lands on the corner being
 * pulled forward, which is where a real highlight would be.
 *
 * Values are written as custom properties and consumed by the stylesheet.
 * Writes are batched into an animation frame, so a rack of these does not
 * thrash the compositor.
 */
export function TiltCard({
  as: Tag = 'div',
  className,
  style,
  children,
  ...rest
}: {
  as?: 'div' | 'a';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const set = useCallback((el: HTMLElement, vars: Record<string, string>) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
    });
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      // Coarse pointers have no hover state to speak of: a touch would fire
      // this once, tilt the card, and leave it tilted with nothing to undo it.
      if (e.pointerType !== 'mouse') return;
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      // -0.5 to 0.5 across the card in both axes.
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;

      set(el, {
        // Y rotation follows the horizontal axis and X rotation is inverted —
        // pushing the cursor down has to tip the *top* toward the viewer, and
        // getting this sign wrong is what makes a tilt feel inside-out.
        '--ry': `${px * 8}deg`,
        '--rx': `${-py * 8}deg`,
        '--mx': `${(px + 0.5) * 100}%`,
        '--my': `${(py + 0.5) * 100}%`,
        '--lift': '1',
      });
    },
    [set],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // The highlight returns to the top-left corner rather than to the middle:
    // that is where the card's own resting light comes from, so it fades back
    // into the static state instead of leaving a glow parked in the centre.
    set(el, { '--ry': '0deg', '--rx': '0deg', '--mx': '14%', '--my': '0%', '--lift': '0' });
  }, [set]);

  return (
    <Tag
      // The union of the two element types is wider than either accepts, and
      // the ref is the one place that shows. The element is whichever tag was
      // asked for and the handlers are the same for both.
      ref={ref as React.Ref<never>}
      className={className}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
