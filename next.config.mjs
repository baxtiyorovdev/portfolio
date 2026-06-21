/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All portfolio imagery lives in /public, so no remote patterns are required.
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    // Type-checking still runs during builds; ESLint is run separately via
    // `npm run lint` (eslint-config-next + flat config plugin resolution is
    // finicky and shouldn't gate production builds).
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // The old SPA exposed /about; fold it into the home page with a real 308.
    return [{ source: "/about", destination: "/", permanent: true }];
  },
};

export default nextConfig;
