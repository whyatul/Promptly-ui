/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    largePageDataBytes: 128 * 1000,
    timeoutBuffer: 30000,
  },
}

module.exports = nextConfig
