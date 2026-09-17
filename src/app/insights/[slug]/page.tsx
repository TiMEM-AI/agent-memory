import type { Metadata } from 'next'
import { insightsData } from '@/data/insights'
import InsightDetail from './InsightDetail'

export function generateStaticParams() {
  return Object.keys(insightsData).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const insight = insightsData[slug]

  if (!insight) {
    return {}
  }

  const path = `/insights/${slug}/`

  return {
    title: `${insight.title} | Agent Memory`,
    description: insight.excerpt,
    alternates: { canonical: path },
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      url: path,
      siteName: 'Agent Memory',
      locale: 'zh_CN',
      type: 'article',
      publishedTime: insight.date,
      section: insight.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: insight.title,
      description: insight.excerpt,
    },
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  return <InsightDetail params={params} />
}
