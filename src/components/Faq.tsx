import { FAQ } from '@/lib/partners';

/**
 * The questions that get asked, answered once in public.
 *
 * Native `<details>` rather than a scripted accordion: it opens without
 * JavaScript, it is keyboard-operable and screen-reader-announced for free,
 * and — the part that matters for a page meant to be found — the answers are
 * in the document whether or not the panel is open, so they are indexable and
 * they are findable with the browser's own page search.
 */
export function Faq() {
  return (
    <section className="section wrap" id="faq">
      <div className="section-head">
        <h2 className="h-section">Questions</h2>
        <p>The ones that come up most.</p>
      </div>

      <div className="faq">
        {FAQ.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary className="faq-q">
              {item.q}
              <span className="faq-chevron" aria-hidden />
            </summary>
            <p className="faq-a">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
