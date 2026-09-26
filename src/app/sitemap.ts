import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const SITE_URL = 'https://agent-memory.cn'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/evaluate/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/engines/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/leaderboard/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/insights/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
