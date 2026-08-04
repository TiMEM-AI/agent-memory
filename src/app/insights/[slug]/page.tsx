'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const insightsData: Record<string, {
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  date: string
}> = {
  'memory-architecture-battle': {
    title: '记忆的架构之战：图谱 vs 层级 vs 向量',
    excerpt: '深入解析四种记忆范式的核心差异，从向量检索到知识图谱，从操作系统启发到人脑模拟，找到最适合你的架构方案。',
    category: '架构分析',
    readTime: '12分钟',
    date: '2026-06-15',
    content: `
# 记忆的架构之战：图谱 vs 层级 vs 向量

在 LLM 应用开发中，记忆系统正成为不可或缺的基础设施。但面对众多种架构方案，开发者该如何选择？本文将深入解析四种主流记忆架构的核心差异。

## 向量检索：最基础的记忆方案

向量检索是大多数 RAG 系统采用的方式。它将文本转换为向量嵌入，通过余弦相似度或欧氏距离来检索相关内容。

**优点**：
- 实现简单，易于上手
- 成熟生态丰富
- 检索速度快

**缺点**：
- 无法捕捉实体关系
- 缺乏上下文理解
- 难以处理复杂查询

## 知识图谱：关系型记忆

Mem0 采用的图谱架构将记忆表示为实体-关系三元组，构建持续演化的知识图谱。

\`\`\`python
# Mem0 示例：添加关系记忆
memory.add(
    messages=[{"role": "user", "content": "我正在学习Python"}],
    user_id="user_123"
)
# 自动提取：用户 -> 正在学习 -> Python
\`\`\`

这种方法能够捕捉实体间的复杂关系，支持多跳推理。

## 层级架构：分而治之

MemGPT 和 TiMem 采用的层级架构，将记忆分为不同层次，模拟操作系统或人脑的记忆管理方式。

| 层级 | 类比 | 特点 |
|------|------|------|
| 短时记忆 | CPU缓存 | 快速但容量有限 |
| 中时记忆 | 内存 | 适中容量 |
| 长时记忆 | 磁盘 | 慢速但容量大 |

## 如何选择？

选择架构时，需要考虑：
1. **应用场景**：短对话 vs 长对话
2. **精度要求**：是否需要复杂推理
3. **开发成本**：集成难度和运维复杂度
4. **成本预算**：API 调用费用 vs 自托管成本

没有最好的架构，只有最适合的方案。
    `,
  },
  'mem0-deep-dive': {
    title: 'Mem0 评测：最接近量产的解决方案',
    excerpt: '从集成体验到性能表现，从成本效益到实际应用场景，全面解析这款最受开发者欢迎的记忆引擎。',
    category: '深度评测',
    readTime: '10分钟',
    date: '2026-06-10',
    content: `
# Mem0 评测：最接近量产的解决方案

作为当前最受关注的记忆引擎之一，Mem0 凭借其 Graph Memory 技术和出色的开发者体验，正在成为 AI 应用的首选记忆层。

## 快速上手

\`\`\`python
from mem0 import MemoryClient

client = MemoryClient(api_key="your-key")

# 4行代码即完成集成
memory = client.add(
    messages=[{"role": "user", "content": "我来自北京"}],
    user_id="user_123"
)

# 检索记忆
results = client.search(
    query="用户来自哪里？",
    user_id="user_123"
)
\`\`\`

## 核心优势

### 1. Graph Memory 专利技术
将对话信息自动提取为实体-关系三元组，支持复杂的知识推理。

### 2. AWS 官方集成
作为 AWS Bedrock 的默认记忆提供商，享有企业级支持。

### 3. 出色的文档和社区
超过 41K GitHub Stars，活跃的开发者社区。

## 适用场景

**推荐**：
- 客户支持机器人
- 个人 AI 助手
- 教育辅导应用

**不推荐**：
- 超长对话（100+轮）
- 纯学术研究（成本考虑）
    `,
  },
  'why-ai-needs-memory': {
    title: '为什么你的 AI 应用需要记忆系统',
    excerpt: '从上下文窗口限制到多会话一致性，从用户画像到个性化体验，探讨记忆层如何让 AI 真正理解用户。',
    category: '选型指南',
    readTime: '8分钟',
    date: '2026-06-05',
    content: `
# 为什么你的 AI 应用需要记忆系统

大模型是 stateless 的——每次对话都是全新的开始。这就是记忆系统存在的意义。

## 上下文窗口的局限

即使是最强大的模型，也有上下文窗口限制。GPT-4o 支持 128K tokens，但这远远不够：

- 1000 条中等长度对话 ≈ 500K tokens
- 用户一生的交互数据 ≈ 数十亿 tokens

## 记忆系统的价值

1. **个性化体验**：记住用户偏好，提供定制化服务
2. **连续对话**：跨会话保持上下文连贯性
3. **知识积累**：从交互中学习，不断优化服务
4. **降低成本**：精确检索 vs 加载全部历史

## 何时需要记忆系统？

- 用户需要长期使用的应用
- 需要个性化响应的场景
- 多轮对话应用
- 需要跨会话上下文的应用
    `,
  },
  'memgpt-analysis': {
    title: 'MemGPT 技术解析：类操作系统内存管理',
    excerpt: 'Berkeley 研究的核心理念如何突破上下文限制，MemGPT 的分页机制与自主记忆调度详解。',
    category: '技术解析',
    readTime: '15分钟',
    date: '2026-05-28',
    content: `
# MemGPT 技术解析：类操作系统内存管理

MemGPT 来自 UC Berkeley 的研究，其核心理念是将操作系统的虚拟内存管理概念引入 LLM 上下文管理。

## 核心思想：LLM 即处理器

传统操作系统中，CPU 的寄存器和缓存容量有限，通过页面调度机制在内存和磁盘之间移动数据。MemGPT 将这一机制应用于 LLM：

- **主内存**：当前上下文窗口，LLM 可以直接访问
- **外部记忆**：召回存储和归档存储，需要通过函数调用访问

## 分页机制

当对话超出上下文窗口时，MemGPT 不会简单地截断历史，而是：

1. 将旧消息从主内存"换出"到外部存储
2. 生成摘要信息保留在主内存中
3. 当需要旧信息时，通过函数调用"换入"回来

这种机制让 LLM 能够在有限的上下文窗口内管理远超窗口容量的对话历史。

## 自主记忆调度

MemGPT 最独特的设计是让 LLM 自己决定何时调度记忆：

- LLM 可以主动调用记忆管理函数
- 可以自主决定将哪些信息存入长期记忆
- 可以根据需要检索历史信息

这赋予了 LLM 类似人类的记忆管理能力——不是被动地接收所有上下文，而是主动管理自己的记忆。

## 架构层级

| 层级 | 容量 | 访问速度 | 用途 |
|------|------|----------|------|
| 工作上下文 | 受限于窗口 | 最快 | 当前对话 |
| 召回存储 | 中等 | 中等 | 近期历史 |
| 归档存储 | 无限 | 较慢 | 远期历史 |

## 实际应用

MemGPT 特别适合需要超长对话的场景：

- 多轮深度文档分析
- 跨会话的复杂推理
- 需要完整对话历史的客服系统

## 局限性

- 集成复杂度较高，需要理解内存调度机制
- 函数调用增加额外 LLM 调用开销
- 商业化支持（Letta）仍在早期阶段
    `,
  },
  'timem-temporal-hierarchy': {
    title: 'TiMem 时间层级记忆：像人脑一样思考',
    excerpt: '从碎片记忆到稳定画像，5层时间维度如何实现高效且智能的记忆管理。',
    category: '技术解析',
    readTime: '11分钟',
    date: '2026-05-20',
    content: `
# TiMem 时间层级记忆：像人脑一样思考

TiMem 来自中科院自动化所的研究，其核心创新是将记忆按时间维度分层，模拟人脑从短期记忆到长期记忆的抽象过程。

## 五层时间架构

TiMem 将记忆分为五个时间层级，每一层处理不同时间跨度的信息：

| 层级 | 名称 | 时间跨度 | 功能 |
|------|------|----------|------|
| L1 | 碎片记忆 | 单次交互 | 原始对话片段 |
| L2 | 会话摘要 | 单次会话 | 会话级总结 |
| L3 | 日模式 | 数小时-数天 | 行为模式识别 |
| L4 | 周趋势 | 数周 | 长期趋势分析 |
| L5 | 稳定画像 | 长期 | 用户画像固化 |

## 逐层抽象机制

信息从 L1 向 L5 流动时，会经历逐层抽象：

1. **L1→L2**：将碎片对话压缩为会话摘要
2. **L2→L3**：从多次会话中提取行为模式
3. **L3→L4**：从日常模式中发现长期趋势
4. **L4→L5**：将稳定趋势固化为用户画像

这种设计使得频繁出现的信息会逐层上浮，而偶发信息则停留在较低层级。

## 检索策略

检索时，TiMem 采用多层级协同策略：

- 优先从 L5 获取用户画像（稳定信息）
- 从 L3/L4 获取近期模式和趋势
- 从 L1/L2 获取具体对话细节
- 动态加权合并各层结果

## 性能优势

在 LoCoMo Benchmark 上，TiMem 取得了 75.30% 的最高分，LongMemEval-S 上达到 76.88%。同时，通过层级压缩，Token 消耗降低了 52.2%。

## 适用场景

TiMem 的时间层级架构在以下场景表现优异：

- 超长对话（100轮+）
- 需要用户画像的个性化推荐
- 跨会话的长期记忆保持
- 需要高效 Token 利用的场景

## 局限性

- 作为新发布的系统，生态仍在完善中
- 主要面向学术场景，商业支持有限
- 配置和调优需要理解各层参数
    `,
  },
  'mem0-paper-architecture': {
    title: 'Mem0 论文精读：可扩展长期记忆的架构设计',
    excerpt: '深入解读 Mem0 arXiv 论文，从记忆提取到图记忆增强，理解生产级记忆引擎的核心设计。',
    category: '技术解析',
    readTime: '14分钟',
    date: '2025-04-28',
    content: `
# Mem0 论文精读：可扩展长期记忆的架构设计

> 原文链接：https://arxiv.org/abs/2504.19413
> 发表日期：2025-04-28

Mem0 提出了一种可扩展的以记忆为中心的架构，通过动态提取、整合和检索对话中的关键信息来解决 LLM 固定上下文窗口的局限性。

## 核心架构

Mem0 的架构包含三个核心模块：

1. **提取模块**：从对话中识别值得记忆的信息
2. **整合模块**：将新记忆与已有记忆进行去重和合并
3. **检索模块**：根据查询召回相关记忆

## 图记忆增强变体

论文进一步提出了基于图的记忆表示增强变体，以捕获对话元素间的复杂关系结构。图记忆将信息表示为实体-关系三元组，构建持续演化的知识图谱。

## 实验结果

在 LoCoMo 基准上与六类基线系统对比，Mem0 在单跳、时间、多跳和开放域四类问题上均优于现有记忆系统。

关键数据：
- LLM-as-a-Judge 指标比 OpenAI 相对提升 26%
- 图记忆变体再提升约 2%
- p95 延迟降低 91%
- token 成本节省 90% 以上

## 生产部署启示

Mem0 在生产部署的推理能力与效率之间取得了令人信服的平衡，是目前最接近量产的记忆引擎方案。

> 本文基于 arXiv 论文整理，原文链接：https://arxiv.org/abs/2504.19413
    `,
  },
  'mem0-2026-algorithm-update': {
    title: 'Mem0 2026 算法大更新：LoCoMo 92.5、LongMemEval 94.4',
    excerpt: '单次 ADD-only 提取、多信号融合检索、实体链接增强——Mem0 新算法在各大基准上取得突破性进展。',
    category: '深度评测',
    readTime: '10分钟',
    date: '2026-04-15',
    content: `
# Mem0 2026 算法大更新：LoCoMo 92.5、LongMemEval 94.4

> 原文链接：https://github.com/mem0ai/mem0
> 更新日期：2026-04

Mem0 于 2026 年 4 月发布了全新记忆算法，在各大基准上取得显著突破。

## 基准表现

| 基准 | 旧分数 | 新分数 | 提升 |
|------|--------|--------|------|
| LoCoMo | 71.4 | 92.5 | +21.1 |
| LongMemEval | 67.8 | 94.4 | +26.6 |
| BEAM (百万token) | - | 64.1 | 新增 |
| BEAM (千万token) | - | 48.6 | 新增 |

## 核心变化

### 1. 单次 ADD-only 提取
仅一次 LLM 调用，无 UPDATE/DELETE 操作，大幅降低延迟和成本。

### 2. Agent 生成事实作为一等公民存储
不再只提取用户信息，Agent 生成的有价值信息也直接存储。

### 3. 实体链接跨记忆检索增强
通过实体链接实现跨记忆的关联检索，提升多跳推理能力。

### 4. 多信号融合检索
语义检索 + BM25 + 实体匹配并行打分，综合排序返回最优结果。

### 5. 时间感知检索
检索时考虑记忆的时间属性，优先返回时间相关的记忆。

## 效率指标

所有基准仅需约 7K token，p50 延迟约 1 秒，实现了极高的效率与精度平衡。评测框架已开源。

> 本文基于 Mem0 GitHub README 整理，原文链接：https://github.com/mem0ai/mem0
    `,
  },
  'letta-stateful-agent-framework': {
    title: 'Letta（原 MemGPT）：从学术原型到有状态 Agent 平台',
    excerpt: 'MemGPT 如何演进为 Letta Agent 平台，支持 TypeScript SDK、多后端部署和自我改进能力。',
    category: '架构分析',
    readTime: '12分钟',
    date: '2026-04-17',
    content: `
# Letta（原 MemGPT）：从学术原型到有状态 Agent 平台

> 原文链接：https://xuqi2024.github.io/2026/04/16/2026-04-17-letta-memory-agent-deep-dive/
> GitHub：https://github.com/letta-ai/letta
> 日期：2026-04-17

Letta（原 MemGPT）已从学术原型演进为完整的 Agent 平台，让大模型拥有"操作系统级"记忆能力。

## 核心理念

Letta 将 LLM 放入类似操作系统的框架中，让 Agent 自主判断：
- 哪些信息留在工作上下文
- 哪些归档到外部存储
- 哪些稍后取回

与 Mem0 作为"外置记忆条"不同，Letta 更像一个带记忆管理能力的 Agent 运行时。

## 平台能力

- CLI 工具：npm install -g @letta-ai/letta-code
- TypeScript Agent SDK：构建有状态 Agent
- 多后端部署：Constellation 云端、本地机器或自托管
- 技能和子 Agent：内置高级记忆和持续学习技能
- 模型无关：支持 Anthropic、OpenAI、zAI 等最新模型

## Mem0 vs Letta

| 维度 | Mem0 | Letta |
|------|------|-------|
| 定位 | 外置记忆条 | Agent 运行时 |
| 集成方式 | 外挂到现有应用 | 项目放入 Letta 框架 |
| 架构重量 | 轻量 | 较重 |
| 适合场景 | 给现有项目加记忆 | 从零构建长期 Agent |

## 适用场景

- 长期运行的个人 Agent
- 研究助手（越用越懂用户）
- 需要自我改进能力的 AI 系统

> 本文基于博客文章整理，原文链接：https://xuqi2024.github.io/2026/04/16/2026-04-17-letta-memory-agent-deep-dive/
    `,
  },
  'memos-memory-operating-system': {
    title: 'MemOS：面向 AI 系统的记忆操作系统',
    excerpt: '清华大学/MemTensor 提出 MemOS，将记忆视为系统资源，统一管理纯文本、激活级和参数级记忆。',
    category: '架构分析',
    readTime: '13分钟',
    date: '2025-07-04',
    content: `
# MemOS：面向 AI 系统的记忆操作系统

> 原文链接：https://arxiv.org/abs/2507.03724
> 发表日期：2025-07-04

MemOS 将记忆视为可管理的系统资源，提出了统一的记忆操作系统框架。

## 核心设计

MemOS 统一了三种记忆类型的表示、调度和演化：
- 纯文本记忆：传统对话历史
- 基于激活的记忆：注意力权重相关的记忆
- 参数级记忆：模型参数中编码的知识

## MemCube

基本单元 MemCube 封装记忆内容和元数据（如来源和版本），支持：
- 组合：多个 MemCube 可合并
- 迁移：记忆类型间可转换
- 融合：弥合检索与参数学习的差距

## 评测表现

| 基准 | 分数 |
|------|------|
| LoCoMo | 88.83 |
| LongMemEval | 89.20 |
| OmniMemEval | 领先14款商业产品 |

MemOS 的 OpenClaw 插件使 Agent 任务完成率从 36.63% 提升至 50.87%。

## 企业级特性

- 统一记忆 API（图结构化、可检查可编辑）
- 多模态记忆（文本、图像、工具轨迹、人设）
- 多立方体知识库管理
- MemScheduler 毫秒级异步摄取
- 自然语言反馈驱动的记忆修正
- 35.24% 的 token 节省效果

> 本文基于 arXiv 论文整理，原文链接：https://arxiv.org/abs/2507.03724
    `,
  },
  'amem-zettelkasten-memory': {
    title: 'A-MEM：基于 Zettelkasten 的自主体记忆演化',
    excerpt: '将卡片盒笔记法引入 AI 记忆管理，通过动态索引和链接创建实现记忆的自主演化。',
    category: '技术解析',
    readTime: '10分钟',
    date: '2025-02-17',
    content: `
# A-MEM：基于 Zettelkasten 的自主体记忆演化

> 原文链接：https://arxiv.org/abs/2502.12110
> 发表日期：2025-02-17

A-MEM 提出了一种新颖的自主体记忆系统，能够以自主方式动态组织记忆。

## Zettelkasten 方法

Zettelkasten（卡片盒笔记法）的核心思想是通过原子化笔记和双向链接构建知识网络。A-MEM 将这一方法引入 AI 记忆管理：

1. 结构化笔记：每条记忆生成包含上下文描述、关键词和标签的综合笔记
2. 动态链接：分析历史记忆识别相关连接，建立有意义的链接
3. 记忆演化：新记忆整合时触发对历史记忆的更新

## 工作流程

当新记忆加入时：
- 生成结构化属性（上下文、关键词、标签）
- 分析与历史记忆的相似性
- 建立有意义的链接
- 更新相关历史记忆的上下文表示

## 实验结果

在六个基础模型上的实验显示，A-MEM 优于现有 SOTA 基线。记忆网络持续精化理解，实现了 Zettelkasten 的结构化组织原则与 Agent 驱动决策的灵活性的结合。

> 本文基于 arXiv 论文整理，原文链接：https://arxiv.org/abs/2502.12110
    `,
  },
  'zep-temporal-knowledge-graph': {
    title: 'Zep：用时序知识图谱破解大模型"记忆断片"',
    excerpt: '双时间模型自动处理事实冲突，Graphiti 引擎驱动的动态知识图谱替代传统向量检索。',
    category: '架构分析',
    readTime: '11分钟',
    date: '2025-02-26',
    content: `
# Zep：用时序知识图谱破解大模型"记忆断片"

> 原文链接：https://cloud.tencent.com/developer/article/2500259
> 官网：https://www.getzep.com/
> 论文：https://arxiv.org/pdf/2501.13956
> 日期：2025-02-26

Zep 是由 YC 孵化的初创公司推出的 AI Agent 长期记忆系统，核心创新在于使用时序知识图谱替代传统向量检索。

## 三层子图架构

Zep 的知识图谱包含三层子图：
- 情节子图：保留原始输入
- 语义子图：提取实体关系
- 社区子图：聚类关联实体

## 双时间模型

Graphiti 的关键差异在于"双时间模型"：
- valid_at：事实成立的时间
- invalid_at：事实失效的时间

当用户更新信息时，旧事实边被标记失效而非删除，确保知识一致性。这使 Zep 特别适合处理会变化的关系和事实。

## 性能表现

- LoCoMo 基准准确率：78.94%
- 相比 MemGPT，在准确性、延迟和可扩展性上更适合工业生产场景

## 集成生态

- Graphiti 底层框架已开源
- 支持 LangGraph、CrewAI、AutoGen 等主流 Agent 框架
- Zep Cloud 提供企业级托管服务

> 本文基于腾讯云开发者社区文章整理，原文链接：https://cloud.tencent.com/developer/article/2500259
    `,
  },
  'memory-framework-comparison-2026': {
    title: '2026 记忆框架横评：Mem0 / Zep / LangMem / TiMem 实测对比',
    excerpt: '从接入难度、记忆质量、检索精度到延迟表现，四大主流记忆框架的全面实测与选型建议。',
    category: '选型指南',
    readTime: '15分钟',
    date: '2026-03-21',
    content: `
# 2026 记忆框架横评：Mem0 / Zep / LangMem / TiMem 实测对比

> 原文链接：https://juejin.cn/post/7619440096250019894
> 日期：2026-03-21

直接将历史对话塞入 prompt 会面临三大问题：成本爆炸、注意力衰减、跨会话失效。本文实测对比四大主流记忆框架。

## 横评总览

| 框架 | 架构类型 | LoCoMo | 特点 | 适合场景 |
|------|---------|--------|------|---------|
| Mem0 | 语义向量检索 | ~64% | 轻量、生态广 | 快速加记忆 |
| Zep | 情节记忆图谱 | 78.94% | 时序感知好 | 会变化的事实 |
| LangMem | 工作记忆+长期存储 | 78.05% | LangChain 原生 | LangChain 项目 |
| TiMem | 五层时序记忆树 | 75.30% | token 最省 | 长时域人设一致性 |

## 选型建议

### Mem0
低门槛、广生态，适合快速给现有项目加记忆。但时序推理能力较弱。

### Zep / Graphiti
时间感知和知识图谱见长，适合处理会变化的关系和事实。跨月支持有限。

### LangMem
与 LangGraph 生态深度集成，适合已在 LangChain 技术栈中的项目。

### TiMem
时间层级组织见长，适合需要长时域人设一致性的场景。Token 消耗最低。

> 本文基于掘金文章整理，原文链接：https://juejin.cn/post/7619440096250019894
    `,
  },
  'locomo-benchmark-explained': {
    title: 'LoCoMo Benchmark：长期对话记忆评测的黄金标准',
    excerpt: '300轮对话、35个会话、9K token——深入理解记忆引擎最常用的评测基准。',
    category: '评测基准',
    readTime: '9分钟',
    date: '2024-02-27',
    content: `
# LoCoMo Benchmark：长期对话记忆评测的黄金标准

> 原文链接：https://arxiv.org/abs/2402.17753
> 发表日期：2024-02-27

LoCoMo 是一个专门评估 LLM Agent 在超长期对话中记忆能力的基准数据集，已成为记忆引擎评测的事实标准。

## 数据集特征

- 每段对话平均 300 轮
- 平均 9K token
- 跨越多达 35 个会话
- 基于角色设定和时间事件图生成

## 评测任务

LoCoMo 涵盖三类任务：
1. 问答：单跳、时间、多跳、开放域四类问题
2. 事件总结：跨会话事件梳理
3. 多模态对话生成：多模态场景下的记忆

## 关键发现

即使是最先进的 LLM 在长期记忆方面也表现不佳，存在显著的性能差距。这证明了记忆系统的必要性。

## 行业影响

LoCoMo 已成为后续多个记忆引擎的标准评测基准：
- Mem0：92.5（2026新算法）
- MemOS：88.83
- Zep：78.94
- TiMem：75.30

> 本文基于 arXiv 论文整理，原文链接：https://arxiv.org/abs/2402.17753
    `,
  },
  'longmemeval-benchmark': {
    title: 'LongMemEval：五维评估聊天助手的长期记忆能力',
    excerpt: '500个精心设计的问题，覆盖信息提取、多会话推理、时间推理、知识更新和拒答五大能力。',
    category: '评测基准',
    readTime: '8分钟',
    date: '2024-10-14',
    content: `
# LongMemEval：五维评估聊天助手的长期记忆能力

> 原文链接：https://arxiv.org/abs/2410.10813
> 发表日期：2024-10-14

LongMemEval 是一个全面评估聊天助手长期记忆能力的基准，包含 500 个精心策划的问题。

## 五大核心能力

1. 信息提取：从历史对话中提取特定信息
2. 多会话推理：跨会话综合推理
3. 时间推理：理解时间顺序和变化
4. 知识更新：处理信息变更和冲突
5. 拒答能力：对无法回答的问题正确拒答

## 关键发现

商业聊天助手和长上下文 LLM 在跨会话记忆信息方面准确率下降约 30%。

## 三阶段框架

论文提出将长期记忆设计分解为三个阶段：
- 索引：如何组织记忆
- 检索：如何找到相关记忆
- 读取：如何利用检索到的记忆

## 优化策略

- 会话分解
- 事实增强键扩展
- 时间感知查询扩展

> 本文基于 arXiv 论文整理，原文链接：https://arxiv.org/abs/2410.10813
    `,
  },
  'memory-vs-rag-paradigm': {
    title: '记忆系统 vs RAG：不只是检索的区别',
    excerpt: 'RAG 面向静态文档，记忆系统面向动态交互——从架构哲学到工程实践的深度对比。',
    category: '选型指南',
    readTime: '12分钟',
    date: '2026-06-16',
    content: `
# 记忆系统 vs RAG：不只是检索的区别

> 原文链接：https://zhuanlan.zhihu.com/p/2050287092194973690
> 日期：2026-06-16

记忆系统与 RAG 经常被混为一谈，但两者在架构哲学和工程实践上有根本区别。

## 核心区别

| 维度 | RAG | 记忆系统 |
|------|-----|---------|
| 数据来源 | 静态文档 | 动态交互数据 |
| 时序性 | 无 | 有（时间感知） |
| 个性化 | 无 | 有（用户画像） |
| 更新方式 | 重建索引 | 增量更新 |
| 冲突处理 | 无 | 有（事实失效） |

## 上下文窗口扩展的影响

随着大模型上下文窗口扩展到百万 token 级别，记忆系统的角色正在从"突破上下文限制"转向"提供结构化、可推理、个性化的智能记忆"。上下文窗口扩展不会使记忆系统过时，而是改变其定位。

## 何时用 RAG，何时用记忆系统？

- RAG：知识库问答、文档搜索、代码检索
- 记忆系统：个人助手、客服机器人、长期对话
- 两者结合：既有知识库又有用户记忆的复杂应用

> 本文基于知乎文章整理，原文链接：https://zhuanlan.zhihu.com/p/2050287092194973690
    `,
  },
  'agent-memory-four-layer-architecture': {
    title: 'AI Agent 记忆四层架构：从工程实践到生产选型',
    excerpt: '工作记忆、短期记忆、长期记忆、元认知——2026年记忆系统已从可选插件升级为核心基础设施。',
    category: '架构分析',
    readTime: '14分钟',
    date: '2026-06-16',
    content: `
# AI Agent 记忆四层架构：从工程实践到生产选型

> 原文链接：https://zhuanlan.zhihu.com/p/2050287092194973690
> 日期：2026-06-16

2026 年 AI Agent 记忆系统已从「可选插件」升级为「核心基础设施」。

## 四层架构设计

| 层级 | 名称 | 功能 | 类比 |
|------|------|------|------|
| L1 | 工作记忆 | 当前会话上下文 | CPU 缓存 |
| L2 | 短期记忆 | 近期交互摘要 | 内存 |
| L3 | 长期记忆 | 结构化知识存储 | 磁盘 |
| L4 | 元认知 | 记忆的记忆，管理策略 | 元数据 |

## 框架选型

### Mem0：语义向量检索 + 图记忆，适合快速给现有项目加记忆
### Zep：时序知识图谱，适合处理会变化的关系和事实
### Letta（原 MemGPT）：类 OS 内存管理，适合从零构建长期 Agent
### LangMem：工作记忆 + 长期存储，适合 LangChain 生态项目

## 趋势洞察

随着上下文窗口扩展，记忆系统从"突破窗口限制"转向"结构化智能记忆"。元认知层的引入标志着记忆系统从"存储"走向"理解"。

> 本文基于知乎文章整理，原文链接：https://zhuanlan.zhihu.com/p/2050287092194973690
    `,
  },
  'memory-evaluation-methodology': {
    title: 'Agent Memory 评测体系：现有 Benchmark 的局限与未来',
    excerpt: '从单一检索准确率到多维度综合评估，记忆系统评测正经历从"能记住"到"记得好"的范式转变。',
    category: '评测基准',
    readTime: '10分钟',
    date: '2025-12-19',
    content: `
# Agent Memory 评测体系：现有 Benchmark 的局限与未来

> 原文链接：https://zhuanlan.zhihu.com/p/1985435669187825983
> 日期：2025-12-19

现有 Agent Memory 评测基准大多局限于检索准确率这一单一指标，社区亟需更全面的评估体系。

## 现有基准

### LoCoMo
- 81 个跨会话 QA 对
- 覆盖单跳、时序、多跳等问题
- 最主流的长对话记忆评测

### LongMemEval
- 500 个问题，五维评估
- 信息提取、多会话推理、时间推理、知识更新、拒答

## 现有局限

- 过度关注检索准确率
- 缺乏时序推理能力评估
- 缺乏跨会话一致性评估
- 缺乏记忆更新与遗忘机制评估
- 缺乏多跳推理深度评估

## 未来方向

评测体系应纳入：
1. 记忆质量：存储的信息是否准确和完整
2. 推理增强：记忆是否能提升推理能力
3. 个性化效果：记忆是否带来个性化提升
4. 延迟和效率：记忆操作的性能开销
5. 上下文腐化抵抗力：错误记忆的影响

## 范式转变

记忆系统评测正从"能记住"到"记得好"转变，从单一指标到多维度综合评估。

> 本文基于知乎文章整理，原文链接：https://zhuanlan.zhihu.com/p/1985435669187825983
    `,
  },
  'multimodal-memory-frontier': {
    title: '多模态记忆：AI 记忆系统的下一个前沿',
    excerpt: '原生多模态模型推动跨模态记忆需求，图像、音频、视频的编码与检索带来全新挑战。',
    category: '行业动态',
    readTime: '9分钟',
    date: '2025-12-31',
    content: `
# 多模态记忆：AI 记忆系统的下一个前沿

> 原文链接：https://zhuanlan.zhihu.com/p/1989728299547639935
> 日期：2025-12-31

2024-2025 年多模态大模型从"拼接融合"走向"原生多模态"，对记忆系统提出了全新挑战。

## 从文本到多模态

| 模型类型 | 处理能力 | 记忆需求 |
|---------|---------|---------|
| LLM | 纯文本 | 文本记忆 |
| VLM | 视觉+语言 | 图文混合记忆 |
| MLLM | 多种模态 | 多模态记忆 |
| LMM | 全面多模态 | 跨模态记忆 |

## 原生多模态的影响

原生多模态模型（如 GPT-4o、Gemini）从设计之初就构建统一神经网络，所有模态共享同一表征空间。这使得：
- 记忆不再仅是文本的存储与检索
- 需要支持图像、音频、视频的编码和索引
- 需要跨模态检索能力

## 新挑战

1. 跨模态对齐：不同模态的语义对齐
2. 多模态知识图谱：包含多模态实体和关系
3. 时序多模态事实管理：多模态信息的变更追踪
4. 检索效率：多模态索引的性能优化

## 未来展望

多模态记忆系统是下一个前沿方向，将使 AI 能够像人类一样记住和回忆多感官体验。

> 本文基于知乎文章整理，原文链接：https://zhuanlan.zhihu.com/p/1989728299547639935
    `,
  },
  'acm-lifecycle-memory-management': {
    title: 'Agentic Context Management：记忆即生命周期',
    excerpt: '将 Agent 记忆视为生命周期而非简单存储，五个原语定义记忆管理的新范式。',
    category: '技术解析',
    readTime: '11分钟',
    date: '2026-07-23',
    content: `
# Agentic Context Management：记忆即生命周期

> 原文链接：https://arxiv.org/abs/2607.21503
> 发表日期：2026-07-23

该论文提出将 Agent 记忆视为生命周期而非简单存储，定义了"Agentic Context Management (ACM)"学科。

## 五个原语

1. 架构设计：记忆系统的整体架构选择
2. 摄取：新信息的获取和初始处理
3. 范围界定：确定记忆的相关性和重要性
4. 预测：预判未来可能需要的记忆
5. 压缩整合：记忆的压缩和合并

## 经济学分析

| 策略 | token 成本 | 精度 |
|------|-----------|------|
| 朴素上下文累积 | 二次增长 | 高 |
| 粗略摘要 | 线性 | 精度悬崖 |
| 经过验证的压缩 | 线性 | 保持保真度 |

## 参考实现

Maximem Synap 实现：
- LongMemEval：92%
- LoCoMo：93.2%

## 现有基准的不足

论文指出当前基准尚未覆盖的维度：
- 延迟
- token 效率
- 上下文腐化抵抗力

## 意义

ACM 将记忆管理从工程问题提升为学科问题，为记忆系统的设计和评估提供了理论框架。

> 本文基于 arXiv 论文整理，原文链接：https://arxiv.org/abs/2607.21503
    `,
  },
}

export default function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const insight = insightsData[resolvedParams.slug]

  if (!insight) {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-serif text-2xl text-ink-deep mb-4">文章未找到</h1>
          <Link href="/insights" className="text-gold hover:underline">
            返回文章列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper texture-paper">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-ink-light hover:text-ink-deep transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              返回文章列表
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-card mb-8"
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
              {insight.category}
            </span>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink-deep mb-4 leading-tight">
              {insight.title}
            </h1>

            <p className="text-xl text-ink-light mb-6 leading-relaxed">
              {insight.excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-ink-light pb-6 border-b border-ink-deep/5">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {insight.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {insight.readTime}
              </span>
            </div>
          </motion.article>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-card prose prose-lg max-w-none"
          >
            <div className="text-ink leading-relaxed">
              {insight.content.split('\n').map((paragraph, i) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={i} className="font-serif text-3xl font-bold text-ink-deep mt-8 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  )
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-serif text-2xl font-bold text-ink-deep mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={i} className="font-serif text-xl font-bold text-ink-deep mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                if (paragraph.startsWith('```')) {
                  return null
                }
                if (paragraph.trim() === '') {
                  return <div key={i} className="h-4" />
                }
                // Handle inline code
                if (paragraph.includes('`') && !paragraph.startsWith('-') && !paragraph.startsWith('*')) {
                  return (
                    <p key={i} className="mb-4">
                      {paragraph.split(/(`[^`]+`)/).map((part, j) => {
                        if (part.startsWith('`') && part.endsWith('`')) {
                          return <code key={j} className="px-1.5 py-0.5 bg-ink-deep/5 rounded text-sm font-mono text-gold">{part.slice(1, -1)}</code>
                        }
                        return part
                      })}
                    </p>
                  )
                }
                return <p key={i} className="mb-4">{paragraph}</p>
              })}
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="font-serif text-xl font-bold text-ink-deep mb-6">相关阅读</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(insightsData)
                .filter(([slug]) => slug !== resolvedParams.slug)
                .slice(0, 2)
                .map(([slug, related]) => (
                  <Link
                    key={slug}
                    href={`/insights/${slug}`}
                    className="group bg-white rounded-xl p-4 shadow-card hover:shadow-hover transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ink-deep/5 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-ink-light" />
                      </div>
                      <div>
                        <h4 className="font-medium text-ink group-hover:text-gold transition-colors line-clamp-1">
                          {related.title}
                        </h4>
                        <p className="text-sm text-ink-light mt-1 line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-ink-deep text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">记忆之境 · 独立第三方评测平台</p>
        </div>
      </footer>
    </div>
  )
}
