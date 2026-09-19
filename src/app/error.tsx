'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section wrap" style={{ textAlign: 'center', paddingBlock: 80 }}>
      <h1 className="h-page">Something went wrong</h1>
      <p className="lede" style={{ margin: '14px auto 24px' }}>
        The page failed to render. The standings themselves are unaffected.
      </p>
      <button className="btn btn-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
