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

## Deploying to Vercel

1. In Vercel, **Add New → Project** and import `aspct49-dev/koviid`. The
   framework is detected automatically; the build command and output directory
   need no changes.

2. Add the environment variables below under **Settings → Environment
   Variables**, ticking Production, Preview and Development for each. The
   build will succeed without them, but the board will render every seat as
   unclaimed with a "feed unavailable" notice, because the provider throws when
   the credentials are missing.

   | Variable               | Value                                                |
   | ---------------------- | ---------------------------------------------------- |
   | `ROOBET_API_KEY`       | The affiliate bearer token.                            |
   | `ROOBET_USER_ID`       | The `id` claim inside that token's JWT payload.        |
   | `NEXT_PUBLIC_SITE_URL` | Your final origin, e.g. `https://koviid.me`. Optional. |

   `NEXT_PUBLIC_SITE_URL` only affects canonical URLs, the sitemap and the
   OpenGraph tags. Left unset, the site falls back to Vercel's own production
   hostname, which is correct but not the domain you want indexed — so set it
   once your domain is attached.

3. Deploy. Then attach your domain under **Settings → Domains** and set
   `NEXT_PUBLIC_SITE_URL` to match.

`.env.local` is gitignored and must never be committed. Vercel reads the values
from its own store, not from the repository.

### After the first deploy

- Open `/robots.txt` and `/sitemap.xml` and check the URLs point at your domain
  rather than a `*.vercel.app` hostname. If they do not, `NEXT_PUBLIC_SITE_URL`
  is unset or misspelt.
- The leaderboard page revalidates every 60 seconds, so the first load after a
  deploy is the slow one and everything after it is served from the cache.

## Environment

The three variables are listed under **Deploying to Vercel** above. Locally
they live in `.env.local`, copied from `.env.example`.

`ROOBET_API_KEY` is read only in `src/lib/providers/roobet.ts`, which is marked
`server-only`: the key never reaches the browser, and nothing under
`src/components` is allowed to import that module. `ROOBET_USER_ID` is the `id`
claim inside the key's own JWT payload, so the two always belong to the same
affiliate account.

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
    page.tsx          the leaderboard, which is the main page
    layout.tsx        fonts, metadata, JSON-LD, stylesheet imports
    terms/            terms of service
    privacy/          privacy policy
    robots.ts         robots.txt, generated
    sitemap.ts        sitemap.xml, generated
    globals.css       design tokens, buttons, shared furniture
    nav.css           the top bar
    leaderboard.css   hero, podium, standings, countdown, rules
    rewards.css       the two reward cards
    sections.css      last month, how to enter, FAQ
    socials.css       the rack above the footer
    footer.css        the footer
    legal.css         long-form prose for terms and privacy
  components/         SiteNav, Podium, Board, Rewards, Faq, Socials, SiteFooter,
                      TiltCard, Countdown, CopyCode, FeedState, icons
  lib/                types, formatting, partner config, provider, service
brand/                the untrimmed source logo (not served)
public/               wordmark, favicon, GambleAware and operator marks
```

Every stylesheet is imported once in `layout.tsx`; a new one has to be added
there or it will not load.

## Design

Black page, electric blue light — taken from the logo, which is a neon wordmark
burning on black. The blue is used as light (glows, lit rims, gradients on
type) rather than as fill, and the radii are generous everywhere because the
logo has no corner in it.

The podium is the one exception to the blue: first, second and third are gold,
silver and bronze. It is the single place in the palette where a convention
carries meaning the brand colour cannot — three shades of the same blue would
make the podium a puzzle to read.

## Contact channels

Prize claims, VIP transfer requests and data requests all route to the Discord
ticket system, with X as the shorter alternative. Both the terms and the privacy
policy link there, and the invite is a single constant:

```ts
// src/lib/partners.ts
export const DISCORD_INVITE = 'https://discord.gg/ngY3Ps9mW3';
```

Changing it there changes the reward card, the socials rack, the footer and both
legal pages at once.
