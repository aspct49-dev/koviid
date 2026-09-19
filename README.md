# Koviid — monthly Roobet leaderboard

A single page: the $500 monthly wager leaderboard for the Koviid community,
ranked on Roobet's weighted wager figure and settled at the end of each
calendar month.

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the two Roobet values
npm run dev                  # http://localhost:3000
```

For a production build:

```bash
npm run build && npm start
```

## Environment

| Variable               | What it is                                                                   |
| ---------------------- | ---------------------------------------------------------------------------- |
| `ROOBET_API_KEY`       | Bearer token issued with the affiliate account.                                |
| `ROOBET_USER_ID`       | The `id` claim inside that key's JWT payload. The two must match.              |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, e.g. `https://koviid.com`. Used for metadata and the schema. |

`ROOBET_API_KEY` is read only in `src/lib/providers/roobet.ts`, which is
`server-only` — the key never reaches the browser, and nothing under
`src/components` may import it.

## Changing the prizes

The prize table is the single source of truth for both the split and the
headline figure:

```ts
// src/lib/partners.ts
const ROOBET_PRIZES = [200, 100, 60, 40, 30, 20, 15, 15, 10, 10];
```

`prizePool` is summed from it, so the `$500` in the headline and the amounts in
the rows cannot disagree. The array's **length** is also what decides how many
paying seats the board renders — add an eleventh number and an eleventh row
appears, already handled as an open seat until someone takes it.

The referral code shown to players comes off the signup URL's own `ref`
parameter for the same reason.

## How the data flows

```
page.tsx
  └─ getLeaderboard('roobet')          src/lib/services/leaderboard.ts
       └─ roobetProvider.fetchLeaderboard()   src/lib/providers/roobet.ts
            └─ buildEntries()                 src/lib/providers/shared.ts
```

Three things worth knowing:

- **The ranked figure is `weightedWagered`, not `wagered`.** Roobet weights by
  house edge so low-edge grinding cannot farm a board, and the published rules
  on the page rank on the weighted figure. The raw figure is deliberately never
  shown — showing both invites the question of which one pays.
- **Usernames are masked in `buildEntries`**, not in the provider, so a second
  integration cannot forget to do it.
- **A failed fetch serves an empty board, never sample rows.** A hardcoded row
  renders as a real player with a real-looking figure, so an outage or a missing
  key on a fresh deploy would show invented standings as though they were
  current. Instead every seat comes back unclaimed and the UI carries a
  "temporarily unavailable" notice above the table.

Both the page and the upstream call revalidate on a 60-second window, so one
request a minute reaches Roobet however much traffic arrives.

## Layout

```
src/
  app/
    page.tsx          the leaderboard, which is the whole site
    layout.tsx        fonts, metadata, JSON-LD
    globals.css       design tokens, buttons, shared furniture
    leaderboard.css   podium, standings, countdown, rules
    socials.css       the rack at the foot of the page
  components/         Podium, Board, Countdown, CopyCode, FeedState, Socials
  lib/                types, formatting, partner config, provider, service
brand/                the untrimmed source logo (not served)
public/               trimmed wordmark, favicon, operator marks
```

## Design

Black page, electric blue light — taken from the logo, which is a neon wordmark
burning on black. The blue is used as light (glows, lit rims, gradients on
type) rather than as fill, and the radii are generous everywhere because the
logo has no corner in it.

The podium is the one exception to the blue: first, second and third are gold,
silver and bronze. It is the single place in the palette where a convention
carries meaning the brand colour cannot — three shades of the same blue would
make the podium a puzzle to read.
