/** @type {import('next').NextConfig} */
const repo = 'agent-memory'

const nextConfig = {
  // GitHub Pages 静态导出（https://timem-ai.github.io/agent-memory/）
  output: 'export',
  basePath: `/${repo}`,
  assetPrefix: `https://timem-ai.github.io/${repo}/`,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
