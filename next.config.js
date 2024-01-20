/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    USE_MOCK_DATA: process.env.USE_MOCK_DATA === 'true' ? 'true' : 'false',
  },
}

module.exports = nextConfig
