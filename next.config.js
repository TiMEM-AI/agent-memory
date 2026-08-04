/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // 部署域名: agent-memory.cn
  assetPrefix: undefined,
  trailingSlash: false,
}

module.exports = nextConfig
