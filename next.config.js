/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_API_URL:
      `https://portfoliobackend-production-6cd2.up.railway.app/api` ||
      "http://localhost:8080/api",
  },
};

module.exports = nextConfig;
