import { insightsData } from '@/data/insights'
import InsightDetail from './InsightDetail'

export function generateStaticParams() {
  return Object.keys(insightsData).map((slug) => ({ slug }))
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  return <InsightDetail params={params} />
}
