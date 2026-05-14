/** @type {import('next').NextConfig} */
const nextConfig = {
  // Abaikan error ESLint saat build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Abaikan error TypeScript saat build
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
