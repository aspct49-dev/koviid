import { REWARDS, PRIMARY_PARTNER } from '@/lib/partners';
import { TiltCard } from './TiltCard';
import { ArrowIcon, ExternalIcon } from './icons';

/**
 * What you get for playing under the code. Two cards, each led by the figure
 * that is the reason to read it.
 *
 * Same tilt and specular as the socials rack.
 */
export function Rewards() {
  return (
    <section className="section wrap" id="rewards">
      <div className="section-head">
        <h2 className="h-section">Rewards</h2>
        <p>
          Sign up on {PRIMARY_PARTNER.name} under code <b>{PRIMARY_PARTNER.code}</b> and it is
          automatic. There is nothing to claim or activate.
        </p>
      </div>

      <div className="rewards">
        {REWARDS.map((r) => (
          <div className="reward-stage" key={r.id}>
            <TiltCard
              as="a"
              className="reward"
              href={r.href}
              {...(r.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="reward-gloss" aria-hidden />

              <span className="reward-figure">{r.figure}</span>
              <span className="reward-title">{r.title}</span>
              <span className="reward-body">{r.body}</span>

              <span className="reward-cta">
                {r.cta}
                {r.external ? <ExternalIcon /> : <ArrowIcon />}
              </span>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}
