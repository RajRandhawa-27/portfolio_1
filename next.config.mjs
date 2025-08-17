/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },
  // Ensure proper static export
  distDir: 'out',
};

export default nextConfig;