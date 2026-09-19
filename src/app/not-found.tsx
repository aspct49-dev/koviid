import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section wrap" style={{ textAlign: 'center', paddingBlock: 80 }}>
      <h1 className="h-page">Page not found</h1>
      <p className="lede" style={{ margin: '14px auto 24px' }}>
        There is nothing at this address.
      </p>
      <Link className="btn btn-primary" href="/">
        Back to the leaderboard
      </Link>
    </section>
  );
}
