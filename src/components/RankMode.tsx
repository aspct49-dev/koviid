'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { DEFAULT_RANK_MODE, PAYING_RANK_MODE, RANK_MODES } from '@/lib/partners';
import type { RankMode } from '@/lib/types';

/**
 * Which measure the board is showing.
 *
 * Context rather than props because the two things it governs sit in different
 * sections of the page: the podium is up in the hero and the table is further
 * down, and threading state between them would mean making the whole page a
 * client component. The provider wraps server-rendered children, so only the
 * pieces that actually read the mode cross the client boundary.
 */

const Ctx = createContext<{ mode: RankMode; setMode: (m: RankMode) => void }>({
  mode: DEFAULT_RANK_MODE,
  setMode: () => {},
});

const STORAGE_KEY = 'koviid:rank-mode';

export function RankModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<RankMode>(DEFAULT_RANK_MODE);

  /*
   * Read in an effect, not during render. The server has no localStorage, so
   * seeding state from it directly would make the first client render disagree
   * with the HTML that arrived and React would throw out the markup. Reading
   * after mount costs one extra paint on a non-default choice and keeps the
   * default correct for everyone else.
   */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'raw' || saved === 'weighted') setMode(saved);
    } catch {
      // Private windows and blocked site data throw on access. The default is
      // already correct, so there is nothing to recover.
    }
  }, []);

  const choose = useCallback((next: RankMode) => {
    setMode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Same as above: the toggle still works for this page view.
    }
  }, []);

  return <Ctx.Provider value={{ mode, setMode: choose }}>{children}</Ctx.Provider>;
}

export function useRankMode() {
  return useContext(Ctx);
}

/**
 * The switch itself.
 *
 * A segmented control rather than a checkbox: both options are named, so
 * nobody has to work out what the unchecked state means. The thumb is a single
 * absolutely-positioned element that slides, which is what makes the movement
 * read as one control changing rather than two buttons swapping colour.
 */
export function RankSwitch() {
  const { mode, setMode } = useRankMode();
  const active = RANK_MODES[mode];

  return (
    <div className="rankswitch">
      <div className="rankswitch-control" role="group" aria-label="Rank the board by">
        <span className="rankswitch-thumb" data-mode={mode} aria-hidden />
        {(['raw', 'weighted'] as const).map((m) => (
          <button
            key={m}
            type="button"
            className="rankswitch-opt"
            data-on={mode === m || undefined}
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
          >
            {RANK_MODES[m].label}
          </button>
        ))}
      </div>

      <p className="rankswitch-note">
        {active.note}{' '}
        {active.pays ? (
          <b className="rankswitch-pays">Prizes settle on this board.</b>
        ) : (
          <b className="rankswitch-info">
            A comparison view — prizes settle on the {RANK_MODES[PAYING_RANK_MODE].label.toLowerCase()}{' '}
            board.
          </b>
        )}
      </p>
    </div>
  );
}
