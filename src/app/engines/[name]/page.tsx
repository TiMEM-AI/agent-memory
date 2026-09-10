import enginesData from '@/data/engines.json'
import EngineDetail from './EngineDetail'

export function generateStaticParams() {
  return enginesData.engines.map((e) => ({ name: e.id }))
}

export default async function EnginePage({ params }: { params: Promise<{ name: string }> }) {
  return <EngineDetail params={params} />
}
