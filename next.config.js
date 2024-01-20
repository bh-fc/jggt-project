/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'gtbjowyqijdkucabgugs.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  env: {
    USE_MOCK_DATA: process.env.USE_MOCK_DATA === 'true' ? 'true' : 'false',
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
