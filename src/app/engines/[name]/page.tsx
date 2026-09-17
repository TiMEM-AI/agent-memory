import type { Metadata } from 'next'
import enginesData from '@/data/engines.json'
import EngineDetail from './EngineDetail'

export function generateStaticParams() {
  return enginesData.engines.map((e) => ({ name: e.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const engine = enginesData.engines.find((e) => e.id === name)

  if (!engine) {
    return {}
  }

  const path = `/engines/${name}/`
  const description = `${engine.org}｜${engine.tagline}。含架构特点、性能指标、定价与代码示例的完整评测。`

  return {
    title: `${engine.name} 记忆引擎评测 | Agent Memory`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${engine.name} 记忆引擎评测`,
      description,
      url: path,
      siteName: 'Agent Memory',
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${engine.name} 记忆引擎评测`,
      description,
    },
  }
}

export default async function EnginePage({ params }: { params: Promise<{ name: string }> }) {
  return <EngineDetail params={params} />
}
