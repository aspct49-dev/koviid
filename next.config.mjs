/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /*
   * Security headers.
   *
   * No CSP here on purpose. The page carries inline styles (the per-card
   * `--hue` and `--rank` custom properties are set as `style` attributes) and
   * Next injects its own inline bootstrap script, so a useful policy needs
   * nonces and a middleware to mint them. A CSP that has to allow
   * `unsafe-inline` for both scripts and styles protects against nothing while
   * looking like it does; these four headers are the ones that actually hold.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
