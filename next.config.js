/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_VAST_API: 'https://vast.ai/api/v0',
    NEXT_PUBLIC_RUNPOD_API: 'https://api.runpod.io/graphql',
    NEXT_PUBLIC_UPDATE_INTERVAL: '300000', // 5 minutes
  },
}

module.exports = nextConfig
