import { SOCIALS } from '@/lib/partners';
import { TiltCard } from './TiltCard';
import { ArrowIcon, DiscordIcon, KickIcon, RoobetIcon, XIcon } from './icons';

/**
 * Where to find Koviid.
 *
 * Roobet is in the same rack as the social accounts rather than in a band of
 * its own: by this point the visitor has read the prizes and the rules, and
 * the signup should not be the one link they have to go looking for.
 */

const MARKS: Record<string, React.ComponentType<{ className?: string }>> = {
  kick: KickIcon,
  x: XIcon,
  discord: DiscordIcon,
  roobet: RoobetIcon,
};

export function Socials() {
  return (
    <section className="section wrap" id="socials">
      <div className="section-head">
        <h2 className="h-section">Find Koviid</h2>
        <p>Streams, standings, and the code that puts you on the board.</p>
      </div>

      <div className="rack">
        {SOCIALS.map((card) => {
          const Mark = MARKS[card.id];
          return (
            <div className="soc-stage" key={card.id}>
              <TiltCard
                as="a"
                className="soc"
                href={card.href}
                target="_blank"
                rel="noreferrer"
                style={{ ['--hue' as string]: card.hue }}
              >
                {/* The specular, tracking the cursor. Its own layer rather
                    than a background on the card, because it has to sit above
                    the card's resting wash and below the type. */}
                <span className="soc-gloss" aria-hidden />

                <span className="soc-mark" aria-hidden>
                  <Mark />
                </span>

                <span className="soc-body">
                  <span className="soc-name">{card.name}</span>
                  <span className="soc-handle">{card.handle}</span>
                  <span className="soc-blurb">{card.blurb}</span>
                </span>

                <span className="soc-cta">
                  {card.cta}
                  <ArrowIcon />
                </span>
              </TiltCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
