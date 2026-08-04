import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://agent-memory.cn'

export const metadata: Metadata = {
  title: '记忆之境 | Agent Memory - LLM记忆引擎评测平台',
  description: '龙虾用什么记忆引擎最好？Hermes用什么记忆引擎最好？Mem0、MemGPT、Zep、TiMem等九大记忆引擎深度评测与对比，帮助开发者选择最适合的记忆解决方案',
  keywords: [
    'LLM记忆引擎', '记忆引擎对比', 'AI记忆方案', 'agent memory',
    'Mem0', 'MemGPT', 'MemOS', 'TiMem', 'Zep', 'Supermemory', 'OmniMemory',
    '龙虾记忆引擎', 'Hermes记忆引擎', 'AI agent记忆', '记忆层选型',
    'memory engine', 'LLM memory', 'agent memory evaluation',
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '记忆之境 | Agent Memory - LLM记忆引擎评测平台',
    description: '龙虾用什么记忆引擎最好？Hermes用什么记忆引擎最好？Mem0、MemGPT、Zep、TiMem等九大记忆引擎深度评测与对比',
    url: SITE_URL,
    siteName: '记忆之境',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '记忆之境 | Agent Memory - LLM记忆引擎评测平台',
    description: '龙虾用什么记忆引擎最好？Hermes用什么记忆引擎最好？Mem0、MemGPT、Zep、TiMem等九大记忆引擎深度评测与对比',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="texture-paper min-h-screen">
        {children}
      </body>
    </html>
  )
}
