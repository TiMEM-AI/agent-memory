export const insightsData: Record<string, {
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
  'memory-engine-overview': {
    title: '14 大记忆引擎全景纵览：从图谱到类脑，2026 选型一张图',
    excerpt: 'Mem0、Zep、Letta、TiMem、MemoryBear、MemoryLake……14 款主流记忆引擎按出身、架构、定位逐个过一遍，附架构流派归类与选型建议，作为后续逐篇深度点评的开篇总览。',
    category: '选型指南',
    readTime: '14分钟',
    date: '2026-08-17',
    content: `
# 14 大记忆引擎全景纵览：从图谱到类脑，2026 选型一张图

大模型本身是无状态的——每次对话都是一次全新的开始。当用户第二次打开你的 AI 助手，它却忘了昨天聊过什么，这种"失忆"直接把体验打回原型。记忆引擎要解决的就是这件事：把跨会话的关键信息沉淀下来，按需召回，让 AI 越用越懂用户。

2026 年这个赛道已经从"有没有"进入"好不好"的阶段。我们收录了 14 款有代表性的记忆引擎，本文作为开篇总览，按出身和架构逐个过一遍，帮你建立一张整体地图，后续会逐篇做深度点评。

## 一、为什么需要专门的记忆引擎

直接把历史对话全塞进 prompt 是最朴素的做法，但三个问题很快会撞墙：成本随轮次线性爆炸、长上下文里注意力衰减导致"记了也找不到"、跨会话时上下文窗口根本装不下。记忆引擎的核心价值是把"对话历史"加工成"可检索的结构化记忆"，用一次写入 + 多次精准召回替代每次重放全量。

一个好的记忆引擎要在四件事上做对：**记得准**（召回与当前问题相关）、**记得久**（跨会话甚至跨月不丢）、**记得省**（token 和延迟可控）、**记得对**（事实变了能更新而不是新旧并存）。下面 14 款引擎在这四点上各有取舍。

## 二、14 款引擎逐个看

### 公司出品：面向生产环境的主流方案

**Mem0**（Mem0 Team，YC Alumni）——图记忆 + 知识图谱的生产级记忆层。把对话自动提取为实体-关系三元组，持续演化知识图谱。2026 年 4 月新算法在 LoCoMo 拿到 92.5、LongMemEval 94.4，多信号检索（语义+BM25+实体）+ 时间推理。63K+ GitHub Stars，开源 Apache-2.0，是当前生态最成熟、开发者上手最快的方案。

**MemGPT / Letta**（Letta，源自 UC Berkeley）——把 LLM 当成虚拟内存系统里的处理器，主内存放当前上下文，外部内存放召回和归档，靠函数调用自动换页。项目已商业化更名为 Letta，定位"具状态智能体平台"，记忆可随时间学习并自我改进。24K+ Stars，适合从零构建长期运行的 Agent，但集成复杂度偏高。

**Zep**（Zep Inc.）——企业级 Agent 记忆基础设施，核心是时序上下文图（Temporal Context Graph），自动构建知识图谱并支持矛盾检测。拿过 SOC 2 Type II 和 HIPAA BAA 认证，支持 Cloud/VPC/BYOC 多种部署，S&P Global 认可。付费门槛较高（$125/月起），面向企业级合规场景。

**Supermemory**（Supermemory Inc.）——把记忆、RAG、用户画像、连接器统一进一张知识图谱，定位"Agent 的上下文云"。检索延迟 <300ms，官方称比 Zep 快 10×、比 Mem0 快 25×。支持 Slack/Notion/Drive/GitHub 等连接器，文件系统挂载让 grep 变成语义搜索，token 去重计费。

**MemoryBear**（红熊 AI）——类脑记忆系统，按"感知→提炼→关联→遗忘"构建动态图重构记忆，支持多模态增量记忆。回忆准确率 96.88%（官方对比 OpenAI 52.90%、Mem0 66.88%），token 消耗减少 90%，情感计算识别 8 种核心情绪。2026-07 发布会登顶 LoCoMo 与 LongMemEval 双榜，商业化产品。

**MemoryLake**（质变科技 Relyt）——多模态记忆基础设施，支持对话、文档、表格、音频、视频统一管理，划分背景/事实/事件/对话/反思/技能 6 种记忆类型。LoCoMo 基准 94.03% 全球第一，三方加密架构平台方无法读取用户记忆，内置 4000 万+论文等开放数据集，面向企业和团队。

**OmniMemory**（OmniMemory AI）——三层架构（物理层→感知层→认知层）的多模态记忆，支持视频/文本/音频/动作。LoCoMo 93.50%，token 节省最高 50%，检索延迟 ≤500ms，强调深度用户画像动态进化与防篡改记忆保存。

**MindMemOS**（华为诺亚方舟实验室）——把记忆从单一 Agent 剥离成可插拔的"随身硬脑"，通过 Memory Context Bank 统一存储，配合 Dreaming 巩固机制压缩活跃记忆、把记忆转化为可复用技能，记忆可随 Agent 迁移。LoCoMo 94.03 分，MIT 开源。

**Tencent Agent Memory**（腾讯云）——基于腾讯云向量数据库的四层渐进式记忆（Profile/Resource/Event/Action）+ 双路召回（关键词+语义），2.0 版本新增 Team Memory 支持团队级长期记忆按角色装配。复用腾讯云向量数据库生态，已集成 CodeBuddy/OpenClaw/Claude Code。

**OpenViking**（字节跳动火山引擎）——用文件系统范式（viking:// 协议）统一管理记忆、资源与技能，L0/L1/L2 三层按需加载，实测降低 80-91% token 消耗。337K 行代码、Python+Rust+Go+C++ 四语言架构，AGPL-3.0/Apache-2.0 开源，适合超长上下文管理。

**硅基记忆**（硅基记忆深圳科技）——面向机器人与智能硬件的长期记忆引擎，自研 iMemory 记忆模型，支持多模态记忆与长期召回，提供云端 SaaS 与本地私有化双形态部署，热插拔式记忆，主攻智能硬件/数字人/陪伴场景。

### 学术出品：架构创新的前沿探索

**MemoryOS**（北京邮电大学 BaiJia AI）——借鉴操作系统内存管理（段页式、FIFO 置换、热度淘汰），存储-更新-检索-生成四模块架构，短/中/长三级记忆自动分层与晋升。EMNLP 2025 Oral，LoCoMo 长时记忆 F1 +49.11%，存储/更新/检索策略均可插拔。

**TiMem**（中科院自动化所）——时间层级记忆，5 层架构（L1 碎片→L2 会话摘要→L3 日模式→L4 周趋势→L5 稳定画像），常用信息逐层上浮，稳定特征长期保存。LoCoMo 75.30%、LongMemEval-S 76.88%，token 消耗降低 52.2%，适合超长对话与用户画像构建。

**ReMe**（上海交通大学 & 阿里通义 AgentScope）——核心理念"文件即记忆"，记忆以可读文本文件沉淀，用户可改可迁移可审计。通过多维度蒸馏、上下文自适应重用和基于效用的遗忘实现可演化长期记忆，8B 小模型借 ReMe 可挑战大模型表现，已作为 AgentScope 1.0 默认记忆实现。

## 三、架构流派归类

抛开具体产品，14 款引擎的底层架构可以归为四类，选型时先定流派再挑产品往往更高效。

**图谱派（Graph）**——把记忆表示为实体-关系三元组，构建持续演化的知识图谱，擅长多跳推理和关系查询。代表：Mem0、Zep、Supermemory、MemoryBear。优势是推理能力强、事实可结构化；代价是构建和维护图谱需要额外 LLM 调用，延迟和成本偏高。

**层级派（Hierarchical）**——把记忆分成若干层级，模拟操作系统或人脑的分层抽象，靠层级压缩控制 token。代表：MemGPT/Letta、TiMem、OpenViking。优势是 token 经济、适合超长对话；代价是层级划分和调度策略需要精心设计。

**混合派（Hybrid）**——不拘泥于单一结构，组合向量、图谱、层级等多种手段，按场景灵活切换。代表：MemoryOS、MemoryLake、OmniMemory、MindMemOS、ReMe、硅基记忆。优势是适应面广、能同时兼顾多种记忆类型；代价是架构复杂、可解释性相对弱。

**向量派（Vector）**——以向量检索为核心，工程成熟、接入简单。代表：Tencent Agent Memory。优势是延迟低、生态成熟；代价是难以捕捉实体关系，复杂推理偏弱。

## 四、选型建议

没有最好的记忆引擎，只有最匹配你场景的方案。几个实用判断维度：

**按团队和阶段**：个人开发者或小团队快速加记忆，首选 Mem0——生态最广、免费额度够用、文档完善。企业级合规场景（金融、医疗）看 Zep 或 MemoryLake，前者有 SOC 2/HIPAA 认证，后者有三方加密。从零构建长期 Agent 而非给现有项目外挂记忆，选 Letta。

**按对话长度**：短对话或中等轮次，向量派和图谱派都够用。超长对话（100 轮+）优先层级派——TiMem、OpenViking、MemGPT 都是为长时域设计的，token 消耗优势明显。

**按是否需要多模态**：只处理文本，选择面最宽。要记图像/音频/视频，看 MemoryLake、OmniMemory、MemoryBear、硅基记忆——它们从架构层就支持多模态，而非后期拼接。

**按开源 vs 商业**：坚持自托管和开源，Mem0、Letta、MindMemOS、OpenViking、ReMe、MemoryOS、TiMem 都开放源码。可接受商业方案，Supermemory、Zep、MemoryLake、MemoryBear、OmniMemory 在企业级特性和托管体验上更省心。

**按部署形态**：云托管省运维但数据出域，Mem0/Zep/Supermemory 都有托管层。数据不能出域，看支持 VPC/自托管的 Zep、Supermemory、Letta，或完全本地的 TiMem/ReMe/MindMemOS。

一个值得注意的趋势：上下文窗口扩展到百万 token 并没有让记忆引擎过时，反而把它的定位从"突破窗口限制"推向"提供结构化、可推理、个性化的智能记忆"。未来比拼的不再是"能记多少"，而是"记得多准、多省、多对"。

本文是 14 款引擎的总览，后续我们会按产品逐篇做深度点评，拆解各自的架构细节、基准实测和真实集成体验。
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
  'skills-mcp-marketplace-survey': {
    title: 'Skills & MCP 市场收录调研：14 大记忆引擎在哪些 Agent 平台上架？',
    excerpt: '逐一核实 14 款记忆引擎在 Claude Code、Codex、Cursor、OpenClaw ClawHub、mcp.so、glama.ai 六大平台的 Skills/MCP 收录情况，附上架矩阵与明细表。',
    category: '行业动态',
    readTime: '12分钟',
    date: '2026-08-17',
    content: `
# Skills & MCP 市场收录调研：14 大记忆引擎在哪些 Agent 平台上架？

> 调研日期：2026-08-17 ｜ 调研范围：Claude Code/Claude.ai、OpenAI Codex、Cursor、OpenClaw ClawHub、mcp.so、glama.ai

## 引言：Agent 平台的 Skills 与 MCP 双轨生态

2026 年，AI Agent 助理平台的扩展生态已清晰分化为两条轨道：Skills（教 Agent 怎么做的流程/提示词资产）与 MCP（给 Agent 接入外部工具/数据的协议通道）。前者是"说明书"，后者是"数据线"，两者互补。记忆引擎作为 Agent 的核心基础设施，自然成为各平台争相收录的重点品类。本文调研 14 款主流记忆引擎在 6 大平台的收录情况，为开发者选型与上架提供参考。

## 各平台 Skills/MCP 市场现状

### Claude Code / Claude.ai

Claude Code 的 Skills 机制随 Agent SDK 推出，Skill 是一个含 SKILL.md 的目录，匹配触发条件时自动加载。分发渠道有三：项目本地 .claude/skills/、用户级 ~/.claude/skills/、以及插件包内嵌 skills。Claude Code 另有插件市场机制（claude plugin marketplace add），通过仓库内 marketplace.json 分发。官方 MCP Registry（registry.modelcontextprotocol.io）已收录 6,359 个 MCP server，参考实现含 Memory server。Claude.ai 桌面/网页端目前没有独立的 Skills Marketplace。

### OpenAI Codex

Codex CLI（106K+ GitHub Stars）支持在 config.toml 中配置 mcp_servers 接入 MCP，扩展性走 MCP + hooks 两条路，没有 Claude Code 那样的 Skills 概念，也无中央 marketplace。ChatGPT 自 2025-03 起支持远程 MCP server。OpenAI 未运营独立的 MCP 目录站，用户依赖 mcp.so / Glama / 官方 Registry 发现 server。

### Cursor

Cursor 在 2025 年率先把 MCP 配置搬进 GUI（Settings → MCP），配置写入 ~/.cursor/mcp.json。Cursor 没有自建的 MCP 市场，cursor.com/marketplace 仅展示少量 Featured 插件，无公开搜索 API，引导用户从第三方目录站发现 server。

### OpenClaw ClawHub

OpenClaw 是 2026 年崛起的开源个人 AI 助理项目，以 Claude Code 为对标，把 Skills 作为一等公民。ClawHub（clawhub.ai，9,319 Stars）是其公开 Skill + Plugin Registry，支持 clawhub login/search/install/publish 全流程 CLI。另有 npm 插件渠道（openclaw plugins install）。ClawHub 的 skill 格式与 Claude Code 同源，可视为 Claude Code Skills 生态在非 Anthropic 官方侧的延伸。

### mcp.so

mcp.so 是 2026 年规模最大的 MCP 目录站之一，由 trys.ai 团队运营，已从单纯 server 目录扩展为多品类市场（servers/clients/skills/agents/loops），形态接近"AI 工具 App Store"，收录规模约 18,000+ server。

### glama.ai/mcp/servers

glama.ai 是迄今最大的 MCP 目录站，页面实抓显示收录 73,156 个开源 MCP server，约为官方 Registry 的 11.5 倍。设有 Knowledge & Memory 分类标签，提供 MCP Inspector 在线调试，对记忆引擎类工具友好度最高。

## 14 引擎上架情况汇总

图例：✅ 官方上架 ｜ 🟡 社区收录 ｜ ⚪ 存在但未上架 ｜ ❌ 未找到

| 引擎 | Claude Code | Codex | Cursor | OpenClaw | mcp.so | glama |
|------|------------|-------|--------|----------|--------|-------|
| Mem0 | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| MemGPT/Letta | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| MemoryOS | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| TiMem | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| MemoryBear | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| MemoryLake | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| OmniMemory | ❌ | ❌ | ❌ | 🟡 | ❌ | ❌ |
| Zep | ✅ | ✅ | ✅ | 🟡 | 🟡 | ✅ |
| Supermemory | ✅ | ⚪ | ⚪ | ✅ | ❌ | ✅ |
| MindMemOS | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Tencent Agent Memory | ⚪ | ⚪ | ❌ | ✅ | ❌ | ❌ |
| OpenViking | ✅ | ✅ | ✅ | 🟡 | ❌ | 🟡 |
| ReMe | ✅ | ✅ | ❌ | 🟡 | ❌ | ❌ |
| 硅基记忆 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### 已上架条目明细

下表列出所有 ✅ 官方上架、🟡 社区收录、⚪ 存在但未上架 的条目（❌ 未找到 省略）：

| 引擎 | 平台 | 形式 | 链接 | 状态 |
|------|------|------|------|------|
| Mem0 | Claude Code | Skill+MCP+Plugin | github.com/mem0ai/mem0 | ✅ 官方 |
| Mem0 | Codex | Skill+Plugin | github.com/mem0ai/mem0 | ✅ 官方 |
| Mem0 | Cursor | Skill+MCP | github.com/mem0ai/mem0 | ✅ 官方 |
| Mem0 | OpenClaw | Skill | github.com/mem0ai/mem0 | ✅ 官方 |
| MemGPT/Letta | Claude Code | Skill+MCP | docs.letta.com | ✅ 官方 |
| MemGPT/Letta | OpenClaw | Skill（ClawHub 来源） | clawhub.ai | ✅ 官方 |
| MemoryOS | Claude Code | MCP（MemoryOS-MCP） | github.com/BAI-LAB/MemoryOS | ✅ 官方 |
| MemoryOS | Cursor | MCP（MemoryOS-MCP） | github.com/BAI-LAB/MemoryOS | ✅ 官方 |
| MemoryBear | mcp.so | MCP Listing | mcp.so/servers/memorybear | ✅ 官方 |
| OmniMemory | OpenClaw | Skill | clawhub.ai/pt-vu/omnimemory-full-onboarding | 🟡 社区 |
| Zep | Claude Code | Plugin+Skill+MCP | github.com/getzep/building-with-zep-plugin | ✅ 官方 |
| Zep | Codex | Plugin+Skill+MCP | github.com/getzep/building-with-zep-plugin | ✅ 官方 |
| Zep | Cursor | Plugin+Skill+MCP | github.com/getzep/building-with-zep-plugin | ✅ 官方 |
| Zep | OpenClaw | Skill | clawhub.ai/emasoudy/graphiti | 🟡 社区 |
| Zep | mcp.so | MCP Listing | mcp.so/servers/graphiti-mcp-server | 🟡 社区 |
| Zep | glama | MCP Listing | glama.ai/mcp/servers/getzep/graphiti | ✅ 官方 |
| Supermemory | Claude Code | Plugin | github.com/supermemoryai/claude-supermemory | ✅ 官方 |
| Supermemory | Codex | hooks 集成 | github.com/supermemoryai/codex-supermemory | ⚪ 未上架 |
| Supermemory | Cursor | npm 包+MCP | github.com/supermemoryai/cursor-supermemory | ⚪ 未上架 |
| Supermemory | OpenClaw | npm 插件 | npmjs.com/package/@supermemory/openclaw-supermemory | ✅ 官方 |
| Supermemory | glama | MCP Listing | glama.ai/mcp/servers/supermemoryai/supermemory | ✅ 官方 |
| MindMemOS | OpenClaw | npm 插件 | npmjs.com/package/@mindmemos/openclaw-plugin | ✅ 官方 |
| Tencent Agent Memory | Claude Code | Proxy 集成 | github.com/TencentCloud/tencentdb-agent-memory | ⚪ 未上架 |
| Tencent Agent Memory | Codex | Proxy 集成 | github.com/TencentCloud/tencentdb-agent-memory | ⚪ 未上架 |
| Tencent Agent Memory | OpenClaw | npm 插件 | npmjs.com/package/@tencentdb-agent-memory/memory-tencentdb | ✅ 官方 |
| OpenViking | Claude Code | Plugin+MCP | github.com/volcengine/OpenViking | ✅ 官方 |
| OpenViking | Codex | Plugin+MCP | github.com/volcengine/OpenViking | ✅ 官方 |
| OpenViking | Cursor | Hooks+MCP+Skill | github.com/volcengine/OpenViking | ✅ 官方 |
| OpenViking | OpenClaw | Skill（10+ 条） | clawhub.ai | 🟡 社区 |
| OpenViking | glama | MCP（5 个 server） | glama.ai/mcp/servers/fencith/openviking-mcp | 🟡 社区 |
| ReMe | Claude Code | Plugin+MCP+Skill | github.com/modelscope/agentscope | ✅ 官方 |
| ReMe | Codex | Skill（CLI 式） | github.com/agentscope-ai/ReMe | ✅ 官方 |
| ReMe | OpenClaw | Skill | clawhub.ai/minybear/skills/memory-reme | 🟡 社区 |

## 分析与展望

### 谁上架最广？

Zep 是唯一 6/6 平台全覆盖的引擎——在 Claude Code、Codex、Cursor 三大编码助手均官方上架，glama 官方收录，mcp.so 与 ClawHub 社区收录，通过 getzep/building-with-zep-plugin 单仓库多市场清单分发。Mem0 紧随其后（4/6 官方上架），同时维护 marketplace.json 与多平台插件配置目录，并有 68 个社区 MCP 实现。OpenViking 在三大编码助手均有官方插件，且被 ClawHub 和 glama 社区收录（5/6 命中）。

### 谁完全缺席？

TiMem 和硅基记忆在全部 6 个平台均未找到任何上架或收录记录。TiMem 仓库无任何 MCP/Skill/Plugin 适配目录，仅作为 Python SDK / 云服务存在；硅基记忆官网无 MCP / 插件 / SDK 对外集成文档。MemoryLake 虽官网宣称"Memory for OpenClaw"且列出多个兼容平台，但所有平台均无实际条目，无公开 GitHub 仓库。

### OpenClaw 成国产引擎首选分发渠道

OpenClaw 的 npm 插件渠道（openclaw plugins install）成为 MindMemOS、Tencent Agent Memory、Supermemory 等引擎的官方分发首选。其中 Tencent Agent Memory 架构特殊——通过 Memory Proxy 改客户端 base_url 实现零代码集成，明确声明"No plugin, hook, or MCP server is required"，因此无 MCP server 上架任何 MCP 目录，但仍提供 OpenClaw npm 插件。

### 目录站收录偏好

glama.ai（73K+ server）对记忆引擎友好度最高，设有 Knowledge & Memory 分类，收录了 Zep（官方）和 Supermemory（官方），但 OpenViking 仅有 5 个社区 server。mcp.so（18K+ server）收录 MemoryBear（官方）和 Zep（社区），但多数引擎未进入。两个目录站均未收录 Mem0，这与 Mem0 已自带全平台插件分发形成对比——当引擎自带 marketplace.json 时，对第三方目录站的依赖降低。

### 展望

记忆引擎在 Agent 平台的上架仍处于早期阶段：14 款引擎中仅 3 款（Zep、Mem0、OpenViking）在三大编码助手平台有官方插件，4 款完全缺席。随着 MCP 协议成为事实标准、官方 Registry 收录规模持续增长（已 6,359 个），预计未上架的学术与新锐引擎（TiMem、MemoryLake、硅基记忆）将逐步补齐 MCP server 适配。OpenClaw ClawHub 作为非 Anthropic 官方的 Skills 市场正在快速崛起（9,319 Stars），为不愿绑定单一厂商的引擎提供了中立分发渠道。

> 本文调研数据截至 2026-08-17，各平台收录情况可能随时间变化。所有"未找到"均经平台搜索 API 或 sitemap 全量扫描核实，非推测。
    `,
  },
}
