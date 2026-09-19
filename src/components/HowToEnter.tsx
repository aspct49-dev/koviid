import { CopyCode } from './CopyCode';
import { ExternalIcon } from './icons';
import { JOIN_STEPS, PRIMARY_PARTNER } from '@/lib/partners';

/**
 * Three steps, then the two controls that do them.
 *
 * The code chip and signup button are repeated from the hero on purpose:
 * someone who has just read the prize table and the rules is at the point of
 * deciding, and should not have to scroll back up to act on it.
 */
export function HowToEnter() {
  return (
    <section className="section wrap" id="how-to-enter">
      <div className="section-head">
        <h2 className="h-section">How to Enter</h2>
        <p>About a minute, and it only has to be done once.</p>
      </div>

      <div className="steps">
        {JOIN_STEPS.map((step) => (
          <div className="step" key={step.n}>
            <span className="step-n" aria-hidden>
              {step.n}
            </span>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-body">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="steps-actions">
        <CopyCode code={PRIMARY_PARTNER.code} />
        <a
          className="btn btn-primary"
          href={PRIMARY_PARTNER.signupUrl}
          target="_blank"
          rel="noreferrer"
        >
          Sign up on {PRIMARY_PARTNER.name}
          <ExternalIcon />
        </a>
      </div>
    </section>
  );
}
