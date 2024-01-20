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
  },
}

module.exports = nextConfig
