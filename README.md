# Agent Memory

> LLM 记忆引擎评测平台 — agent-memory.cn

深度评测与对比 LLM 记忆引擎，帮助开发者为 AI 应用选择最适合的记忆解决方案。

## 评测的引擎 (14)

| 引擎 | 类型 | 一句话 |
|------|------|--------|
| Mem0 | 公司 | 图记忆 + 知识图谱，为生产环境而生 |
| MemGPT | 学术 | 类操作系统内存管理，突破上下文限制 |
| MemOS | 学术 | 多层记忆系统，短中长记忆自动分层 |
| TiMem | 公司 | TiMEM MCP 原子工具，编码/通用/写作分场景 |
| MemoryBear | 公司 | 企业级记忆中间件 |
| MemoryLake | 公司 | 高性能向量记忆湖 |
| OmniMemory | 公司 | 全模态记忆引擎 |
| Zep | 公司 | 时序知识图谱，Graphiti 引擎 |
| Supermemory | 公司 | 超级记忆层，多模型聚合 |
| 硅基记忆 | 公司 | 面向机器人的长期记忆引擎，iMemory 模型 |
| MindMemOS | 公司 | 华为记忆操作系统，记忆可迁移、自演进 |
| Tencent Agent Memory | 公司 | 腾讯四层渐进式记忆，支持团队记忆 |
| OpenViking | 公司 | 字节上下文数据库，文件系统范式统一管理记忆 |
| ReMe | 学术 | 阿里通义记忆工具包，文件即记忆、可审计可演化 |

## 评测维度

| 维度 | 权重 | 说明 |
|------|------|------|
| 架构设计 | 25% | 记忆组织方式、上下文窗口利用 |
| 性能指标 | 30% | 延迟、吞吐量、记忆效率 |
| 成本效益 | 20% | 免费套餐、规模化成本 |
| 开发体验 | 15% | 文档、SDK、集成难度 |
| 场景适配 | 10% | 短对话、长对话、多模态 |

## 技术栈

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (自定义水墨主题)
- **Framer Motion** (动画)

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 构建

```bash
npm run build
npm start
```

## 项目结构

```
src/
  app/
    page.tsx              # 首页
    evaluate/page.tsx     # 评测对比
    engines/page.tsx      # 引擎列表
    engines/[name]/       # 引擎详情
    insights/page.tsx     # 洞察文章
    insights/[slug]/      # 文章详情
    layout.tsx            # 全局布局 + SEO
  components/
    engine/               # 引擎卡片、雷达图
    layout/               # 导航栏
  data/
    engines.json          # 引擎数据 + 资源
```

## 域名

[agent-memory.cn](https://agent-memory.cn)

## License

MIT
