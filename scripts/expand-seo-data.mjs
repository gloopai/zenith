/**
 * Merges category gscBlocks + fills per-tool SEO extras from category templates.
 * Preserves hand-written fields; only fills empty / missing parts.
 * Run: node scripts/expand-seo-data.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'))
const writeJson = (p, v) => fs.writeFileSync(path.join(root, p), JSON.stringify(v, null, 2) + '\n', 'utf8')

function fillName(str, name) {
  return str.replace(/\{name\}/g, name)
}

function deepFill(obj, name) {
  if (typeof obj === 'string') return fillName(obj, name)
  if (Array.isArray(obj)) return obj.map((x) => deepFill(x, name))
  if (obj && typeof obj === 'object') {
    const o = {}
    for (const [k, v] of Object.entries(obj)) o[k] = deepFill(v, name)
    return o
  }
  return obj
}

function nonempty(s) {
  return typeof s === 'string' && s.trim().length > 0
}

function mergeBlock(existing, generated) {
  const out = { ...generated }
  if (existing && typeof existing === 'object') {
    if (nonempty(existing.suitableFor)) out.suitableFor = existing.suitableFor
    if (nonempty(existing.notIdealFor)) out.notIdealFor = existing.notIdealFor
    if (nonempty(existing.compareHint)) out.compareHint = existing.compareHint
    if (Array.isArray(existing.checklistItems) && existing.checklistItems.length) {
      out.checklistItems = existing.checklistItems
    }
    if (Array.isArray(existing.gscParagraphs) && existing.gscParagraphs.length) {
      out.gscParagraphs = existing.gscParagraphs
    }
  }
  return out
}

/** Per-category editorial stubs (zh-CN + en). Placeholders: {name} = tool display name. */
const TOOL_TEMPLATES = {
  '写作 / 演示': {
    'zh-CN': {
      suitableFor: '长篇小说草稿、营销文案、演讲逐字稿与幻灯片大纲；可将 {name} 与同类写作/演示工具对照。',
      notIdealFor: '强合规禁外发环境、必须离线锁死的合同审阅，或完全不想依赖云端的场景。',
      compareHint: '同页分类下可打开其它写作/演示产品比对导出格式、模板库与团队权限。',
      checklistItems: [
        '对外发布前核对事实与品牌用词',
        '确认商用/团队版的数据留存策略',
        '长文档建议分段保存与版本管理',
      ],
      gscParagraphs: [
        {
          heading: '{name} 适合写什么类型内容？',
          body: '{name} 面向写作与演示类场景，可用于文稿、摘要或 slide 叙事起草。具体模板、字数上限与价格以官网为准；重要稿件建议人工终校。',
        },
        {
          heading: '写作类 AI 工具怎么选？',
          body: '先区分营销短文、长报告与幻灯片三条需求，再看与现有办公套件、品牌模板是否兼容。本站同类工具内链便于横向比较，最终请在各官网核实条款。',
        },
      ],
    },
    en: {
      suitableFor: 'Drafting long copy, marketing lines, speaker notes, and deck outlines—compare {name} with other writing/deck tools on this site.',
      notIdealFor: 'Strict no-cloud policies, offline-only legal review, or workflows that cannot use hosted assistants.',
      compareHint: 'Open sibling tools in this category to compare export formats, templates, and team permissions.',
      checklistItems: [
        'Fact-check and enforce brand voice before shipping',
        'Read retention policies for business tiers',
        'Version long documents in manageable chunks',
      ],
      gscParagraphs: [
        {
          heading: 'What is {name} used for?',
          body: '{name} targets writing and presentation workflows—drafts, summaries, or narrative slides. Limits, templates, and pricing are defined on the official site; keep humans in the loop for critical copy.',
        },
        {
          heading: 'How do I pick a writing AI?',
          body: 'Separate marketing snippets, long reports, and slide storytelling. Check office-suite fit and brand templates. Use in-category links here, then confirm policies on each vendor site.',
        },
      ],
    },
  },
  '协作 / 白板': {
    'zh-CN': {
      suitableFor: '远程工作坊、评审墙、路线草图与共创画布；{name} 适合需要「一起看见」的讨论。',
      notIdealFor: '纯离线协作、或组织禁止使用境外白板服务的场景。',
      compareHint: '关注并发编辑、访客权限、导出与 SSO；可与项目管理工具链组合使用。',
      checklistItems: ['梳理内外部协作边界', '敏感内容打码后再上板', '定期导出归档防丢数据'],
      gscParagraphs: [
        {
          heading: '{name} 能替代线下白板吗？',
          body: '多数在线白板可支撑分布式头脑风暴与评审，但实时性与网络质量有关。{name} 的具体协作人数与功能以官网说明为准。',
        },
        {
          heading: '团队白板选型要看什么？',
          body: '权限粒度、访客策略、导出格式、与企业身份目录集成是关键。可先在本分类页浏览多款产品，再按合规要求缩小范围。',
        },
      ],
    },
    en: {
      suitableFor: 'Remote workshops, review walls, roadmaps—{name} fits whenever the team needs a shared visual surface.',
      notIdealFor: 'Offline-only collaboration or orgs that block hosted whiteboards.',
      compareHint: 'Compare guest access, exports, SSO, and concurrent editor limits.',
      checklistItems: ['Classify internal vs external sharing', 'Redact sensitive assets', 'Export backups regularly'],
      gscParagraphs: [
        {
          heading: 'Can {name} replace a physical whiteboard?',
          body: 'Hosted boards work for distributed sessions; quality depends on latency and features. Check official docs for limits on guests or objects.',
        },
        {
          heading: 'How should teams evaluate whiteboard tools?',
          body: 'Start with permissions, exports, and directory integrations. Browse this category for alternates, then validate compliance with IT.',
        },
      ],
    },
  },
  '图像生成': {
    'zh-CN': {
      suitableFor: '概念图、营销物料主视觉草图、风格探索；{name} 可作为文生图管线的一环。',
      notIdealFor: '要求百分百可复现像素、或禁用外发素材的敏感行业（需自建或本地方案）。',
      compareHint: '对照参考图能力、角色一致性与 API 批量；商用必读许可与水印规则。',
      checklistItems: ['保留提示词与种子（若产品支持）', '商用前读清训练数据声明', '品牌项目走法务抽检'],
      gscParagraphs: [
        {
          heading: '{name} 生成的图可以商用吗？',
          body: '能否商用取决于 {name} 当前套餐与许可协议，可能因地区或账号类型不同。请务必在官网查阅最新条款，重要投放前让法务二次确认。',
        },
        {
          heading: '文生图工具怎么对比？',
          body: '从提示可控性、参考图/风格迁移、分辨率与 API 三方面试用。本页汇总同分类工具，便于打开多个详情页比较。',
        },
      ],
    },
    en: {
      suitableFor: 'Concept art, campaign explorations, and style tests—{name} fits many text-to-image pipelines.',
      notIdealFor: 'Pixels-perfect repeatability without process or industries that cannot upload prompts.',
      compareHint: 'Benchmark reference control, consistency, API throughput, and license terms.',
      checklistItems: ['Archive prompts/seeds when available', 'Read license deltas per tier', 'Legal review brand assets'],
      gscParagraphs: [
        {
          heading: 'Can I use {name} images commercially?',
          body: 'Commercial use depends on the vendor’s current license and plan—it varies by region. Always read the official terms before production launches.',
        },
        {
          heading: 'How do I compare image generators?',
          body: 'Test prompt control, reference images, resolution, and batch/API paths. This category page links to peer tools for quick side-by-side browsing.',
        },
      ],
    },
  },
  '图像编辑': {
    'zh-CN': {
      suitableFor: '抠图、修复、放大、局部重绘等像素编辑；{name} 适合需要「在现有图上改动」的流程。',
      notIdealFor: '纯生成管线且不需要像素编辑时，可优先看图生图类产品。',
      compareHint: '注意批量、输出分辨率与是否破坏元数据；敏感图像谨慎上传。',
      checklistItems: ['大批量任务先小样本试效果', '检查导出是否满足印刷分辨率', '涉密素材按内规处理'],
      gscParagraphs: [
        {
          heading: '{name} 和图像生成工具有什么区别？',
          body: '编辑类强调在既有像素上修补或变换；生成类更侧重从文本出新图。{name} 的侧重请以官网功能列表为准。',
        },
        {
          heading: '抠图/修图类 API 值得上吗？',
          body: '若日处理量大或有自动化流水线，可对比官网 API 限额、单价与 SLA。开发与运营成本需一并估算。',
        },
      ],
    },
    en: {
      suitableFor: 'Cutouts, cleanup, upscale, inpainting—{name} helps when you must change existing pixels.',
      notIdealFor: 'Pure text-to-image workflows that never retouch assets.',
      compareHint: 'Watch batch limits, DPI, metadata loss, and data residency.',
      checklistItems: ['Pilot on a sample batch', 'Validate print DPI if needed', 'Follow infosec for sensitive shots'],
      gscParagraphs: [
        {
          heading: 'Editing vs generation—where does {name} fit?',
          body: 'Editors manipulate existing images; generators create new ones from prompts. Confirm feature focus on the vendor site.',
        },
        {
          heading: 'When is an editing API worth it?',
          body: 'High-volume pipelines should compare rate limits, unit pricing, and uptime. Factor engineering time into TCO.',
        },
      ],
    },
  },
  '学习 / 数据': {
    'zh-CN': {
      suitableFor: '文献调研、数据集检索、实验记录与学习辅助；{name} 可加速信息整理。',
      notIdealFor: '替代正式学分课程或受版权严格限制的原文分发场景。',
      compareHint: '与机构图书馆、预印本库交叉验证；引用格式以目标期刊/学校要求为准。',
      checklistItems: ['核对论文访问权限与引用规范', '实验记录注意可复现性', '勿将未公开数据随意上传'],
      gscParagraphs: [
        {
          heading: '{name} 能否替代谷歌学术？',
          body: '多数产品是辅助检索与摘要，覆盖范围与更新频率因库而异。重要结论请以原始论文与数据库为准。',
        },
        {
          heading: '学生用 AI 查资料要注意什么？',
          body: '明确课程对生成内容的政策，标注引用来源，避免未经许可上传整篇版权论文。可与导师确认可接受的使用边界。',
        },
      ],
    },
    en: {
      suitableFor: 'Literature scans, dataset discovery, lab notes—{name} speeds structured learning work.',
      notIdealFor: 'Replacing accredited coursework or redistributing paywalled full text.',
      compareHint: 'Cross-check with library portals and primary sources; follow citation style guides.',
      checklistItems: ['Respect copyright on full text', 'Log experiments for reproducibility', 'Avoid uploading secrets'],
      gscParagraphs: [
        {
          heading: 'Is {name} a Google Scholar replacement?',
          body: 'Most assistants complement classic indexes; coverage differs. Always open the primary source for claims.',
        },
        {
          heading: 'Responsible AI use for students',
          body: 'Follow institutional policy, cite sources, and do not upload restricted PDFs without permission.',
        },
      ],
    },
  },
  '对话 / 通用': {
    'zh-CN': {
      suitableFor: '日常问答、rewrite、轻量代码与学习计划；{name} 属于通用助手型产品。',
      notIdealFor: '必须离线、必须单一厂商零绑定、或强审计闭环的自动化。',
      compareHint: '用相同 prompt 在少数候选间 A/B；关注上下文长度、联网与地区可用性。',
      checklistItems: ['核对模型档位与价格', '敏感内容阅读隐私政策', '重要输出多方验证'],
      gscParagraphs: [
        {
          heading: '{name} 免费版和付费版差在哪里？',
          body: '通常差异在模型版本、速率、上下文长度与高级功能。具体以 {name} 官网定价页为准，且可能随时间调整。',
        },
        {
          heading: '国内/国外大模型怎么选？',
          body: '结合数据合规、网络可用性、中文效果与生态集成。可在本分类页横向打开多款产品页面比较简介与官网链接。',
        },
      ],
    },
    en: {
      suitableFor: 'General Q&A, rewriting, light coding, and study plans—{name} is a broad assistant.',
      notIdealFor: 'Offline-only mandates or architectures that cannot depend on a hosted model.',
      compareHint: 'Benchmark a few vendors with identical prompts; compare context, browsing, regions.',
      checklistItems: ['Read tier limits and logging', 'Validate mission-critical outputs', 'Check data residency rules'],
      gscParagraphs: [
        {
          heading: '{name} free vs paid—what changes?',
          body: 'Plans usually differ by model tier, rate limits, and context windows. Pricing pages are authoritative and change often.',
        },
        {
          heading: 'How do I choose between chat assistants?',
          body: 'Start with compliance, language quality, integrations, and pricing. Browse peer tools in this category before deciding.',
        },
      ],
    },
  },
  '开源 / 开发者': {
    'zh-CN': {
      suitableFor: '自建服务、模型托管、框架集成与本地试验；{name} 偏工程与开发者。',
      notIdealFor: '只想零配置网页聊天、完全不愿意运维的用户。',
      compareHint: '评估许可证、硬件、观测与服务等级；供应链与权重来源要可查。',
      checklistItems: ['确认许可证与再分发条款', '记录依赖与镜像来源', '生产环境加监控与回滚'],
      gscParagraphs: [
        {
          heading: '{name} 适合自托管吗？',
          body: '是否支持自托管取决于项目形态：有些是云服务，有些提供开源部署包。请查阅官方仓库与文档中的部署章节。',
        },
        {
          heading: '开发者平台选型要点？',
          body: '看 API 稳定性、配额、多云/私有化选项与社区活跃度。本分类内工具可逐项打开比较。',
        },
      ],
    },
    en: {
      suitableFor: 'Self-hosting, model hubs, framework glue—{name} is aimed at builders.',
      notIdealFor: 'Consumers who want zero-configuration chat only.',
      compareHint: 'Inspect licenses, hardware needs, observability, and provenance statements.',
      checklistItems: ['Track licenses and redistribution', 'Pin dependencies', 'Add monitoring for prod'],
      gscParagraphs: [
        {
          heading: 'Can I self-host {name}?',
          body: 'Some offerings are cloud-only; others ship containers or binaries. Read the deployment section in official docs.',
        },
        {
          heading: 'Evaluating developer platforms',
          body: 'Compare SLAs, quotas, private cloud options, and community health using in-category links here.',
        },
      ],
    },
  },
  '搜索 / 研究': {
    'zh-CN': {
      suitableFor: '需要引用或片段溯源的研究型问答；{name} 适合「先摘要再跳原文」。',
      notIdealFor: '离线内网、或对网页抓取有严格合规限制的环境。',
      compareHint: '点进每一条引用核对上下文；财经医药等场景务必二次验证。',
      checklistItems: ['警惕付费墙摘要误差', '记录检索时间与来源URL', '团队共享注意版权'],
      gscParagraphs: [
        {
          heading: '{name} 的答案可靠吗？',
          body: '检索增强类答案应视为起点而非终稿；请阅读原文并交叉比对权威来源。{name} 的抓取范围以官方说明为准。',
        },
        {
          heading: '研究型 AI 与传统搜索如何配合？',
          body: '可用 AI 做速览与关键词扩展，用传统搜索做精确站点与文件类型检索，两者互补。',
        },
      ],
    },
    en: {
      suitableFor: 'Citation-oriented answers—{name} helps skim sources before you open originals.',
      notIdealFor: 'Air-gapped research without approved retrieval channels.',
      compareHint: 'Open citations; watch paywall misreads; verify market/legal/medical facts.',
      checklistItems: ['Archive URLs and timestamps', 'Blend with classic search operators', 'Respect copyright'],
      gscParagraphs: [
        {
          heading: 'How trustworthy is {name}?',
          body: 'Treat AI answers as starting points; verify with primary documents. Crawl coverage is defined by the vendor.',
        },
        {
          heading: 'Pairing research AI with classic search',
          body: 'Use assistants for summaries and query expansion, then use search for precise site: filters and file types.',
        },
      ],
    },
  },
  '文档 / 知识库': {
    'zh-CN': {
      suitableFor: '团队 wiki、个人知识库、项目沉淀；{name} 适合需要可搜索「组织记忆」的场景。',
      notIdealFor: '强离线优先且不接受任何云同步的极致个人笔记流派。',
      compareHint: '试全文/向量混合搜索、权限模型与导出；评估留存与审计要求。',
      checklistItems: ['划分工作区与对外空间', '关键页面设定审核流程', '定期导出备份'],
      gscParagraphs: [
        {
          heading: '{name} 和本地笔记（如 Obsidian）怎么选？',
          body: '云协作/wiki 赢在权限与共享；本地优先赢在文件可控。可按团队规模与合规二选一或混用。',
        },
        {
          heading: '企业知识库失败常见原因？',
          body: '权限混乱、命名不统一、没有过期策略。上线前约定模板与 owner，比盲目堆功能更重要。',
        },
      ],
    },
    en: {
      suitableFor: 'Team wikis and searchable knowledge—{name} helps retain organizational memory.',
      notIdealFor: 'Strict local-first workflows that reject cloud sync entirely.',
      compareHint: 'Test search quality, permissions, exports, retention, and audit trails.',
      checklistItems: ['Separate internal vs external spaces', 'Add review on critical pages', 'Back up exports'],
      gscParagraphs: [
        {
          heading: '{name} vs local-first notes',
          body: 'Hosted wikis excel at permissions; local editors excel at file control. Mixing both is common.',
        },
        {
          heading: 'Why knowledge bases stall',
          body: 'Unclear ownership and naming hurt more than missing features—establish templates before scaling.',
        },
      ],
    },
  },
  '编程 / 开发': {
    'zh-CN': {
      suitableFor: 'IDE 内补全、云开发环境、脚手架与代码解释；{name} 面向开发者日常提效。',
      notIdealFor: '禁止代码出境或未经安全评估的 CI 场景。',
      compareHint: '对照索引范围、隐私开关、价格与对 monorepo 的体验。',
      checklistItems: ['限制上传目录与密钥路径', '大 diff 坚持人工审', '在分支上试验再合并'],
      gscParagraphs: [
        {
          heading: '{name} 会拿走我的代码吗？',
          body: '是否上传训练、保留多久因产品与设置而异。请阅读 {name} 安全/隐私文档并在团队内统一配置。',
        },
        {
          heading: '编程助手如何提高接受率？',
          body: '明确代码风格、测试要求与提交规范；把助手当「草稿生成器」，审查与测试仍由人负责。',
        },
      ],
    },
    en: {
      suitableFor: 'IDE assistance, cloud workspaces, codegen—{name} targets daily developer throughput.',
      notIdealFor: 'Code exfiltration bans without enterprise guarantees.',
      compareHint: 'Compare indexing scopes, privacy toggles, pricing, and monorepo performance.',
      checklistItems: ['Exclude secrets from cloud index', 'Review large diffs', 'Experiment on branches'],
      gscParagraphs: [
        {
          heading: 'Does {name} train on my code?',
          body: 'Policies differ by plan and settings. Read the security page and enforce team-wide configuration.',
        },
        {
          heading: 'Getting real value from coding AI',
          body: 'Define style, tests, and review expectations; treat suggestions as drafts, not merges.',
        },
      ],
    },
  },
  '翻译 / 语言': {
    'zh-CN': {
      suitableFor: '邮件、文档、网页双语浏览；{name} 可打底稿再由人工润色。',
      notIdealFor: '涉密文本禁止外发翻译、或要求术语锁死却无企业术语库的流程。',
      compareHint: '与浏览器翻译、CAT 工具链搭配；对外发布前安排母语审校。',
      checklistItems: ['核对文件大小与格式支持', '维护术语表版本', '法律医学领域加专业审校'],
      gscParagraphs: [
        {
          heading: '{name} 翻译准确吗？',
          body: '机翻适合快速理解与时效稿件，正式对外发布仍建议人工校对，尤其是品牌名与法律条款。',
        },
        {
          heading: '沉浸式翻译和文档翻译怎么配合？',
          body: '浏览场景用浏览器扩展效率高；长文档用专注翻译服务更稳。可按场景组合多种工具。',
        },
      ],
    },
    en: {
      suitableFor: 'Docs, email, bilingual browsing—{name} drafts quickly before human polish.',
      notIdealFor: 'Strict no-upload policies without enterprise contracts.',
      compareHint: 'Pair browser tools with CAT workflows; human-review customer-facing strings.',
      checklistItems: ['Check format/size limits', 'Version glossaries', 'Add domain experts for legal/medical'],
      gscParagraphs: [
        {
          heading: 'Is {name} accurate enough?',
          body: 'Great for speed; still human-review customer, legal, or medical copy before release.',
        },
        {
          heading: 'Mixing browser and document translators',
          body: 'Use extensions for skimming and dedicated tools for long exports—combine by workflow.',
        },
      ],
    },
  },
  '自动化 / 集成': {
    'zh-CN': {
      suitableFor: '跨 SaaS 连接、定时任务、Webhook 编排；{name} 适合 glue 工作流。',
      notIdealFor: '完全零运维且流程极度复杂的关键账务链路（需专门工程化）。',
      compareHint: '评估自托管 vs 云、错误重试、速率限制与供应商锁定。',
      checklistItems: ['分环境管理密钥', '为关键流加重试与告警', '记录变更便于审计'],
      gscParagraphs: [
        {
          heading: '{name} 和 Zapier 有什么区别？',
          body: '差异通常在连接器数量、自托管能力、定价模型与开发者体验。请对照官网连接器目录与计价说明。',
        },
        {
          heading: '自动化上线前必做什么？',
          body: '沙箱演练失败路径，确认幂等与补偿策略；生产再逐步放大流量。',
        },
      ],
    },
    en: {
      suitableFor: 'SaaS glue, schedules, webhooks—{name} helps orchestrate integrations.',
      notIdealFor: 'Mission-critical finance flows without engineering rigor.',
      compareHint: 'Compare hosted vs self-managed, retries, rate limits, and lock-in.',
      checklistItems: ['Isolate secrets per env', 'Add alerts for failures', 'Document changes'],
      gscParagraphs: [
        {
          heading: '{name} vs other automation tools',
          body: 'Differentiators include connector breadth, self-hosting, pricing, and developer UX—verify on official pages.',
        },
        {
          heading: 'Before shipping automations',
          body: 'Rehearse failure modes, idempotency, and compensating transactions before scaling load.',
        },
      ],
    },
  },
  '视频 / 动效': {
    'zh-CN': {
      suitableFor: '短片、口播、模版化视频与动效试验；{name} 适合内容团队快速出片。',
      notIdealFor: '电影工业级调色/混音全流程、或零预算却要求离线渲染集群。',
      compareHint: '对照分辨率挡位、口型/角色一致性、音乐与肖像权条款。',
      checklistItems: ['商用前核对音乐与素材授权', '生成内容存档与版本命名', '公开展示注意披露要求'],
      gscParagraphs: [
        {
          heading: '{name} 适合做抖音/短视频吗？',
          body: '多数产品面向社交短视频与广告小样，具体模板与导出比例见官网。注意平台对 AI 内容的披露规则。',
        },
        {
          heading: '视频类 AI 成本怎么控？',
          body: '按分辨率与分钟数计费的产品居多；可用低分辨率试片通过后再升档渲染。',
        },
      ],
    },
    en: {
      suitableFor: 'Short clips, talking heads, motion tests—{name} accelerates social and ad creative.',
      notIdealFor: 'Full theatrical finishing pipelines without specialist tooling.',
      compareHint: 'Compare resolution tiers, lipsync, music licensing, and likeness rules.',
      checklistItems: ['Clear music SFX rights', 'Version renders', 'Follow disclosure policies'],
      gscParagraphs: [
        {
          heading: 'Is {name} good for short-form social?',
          body: 'Many tools target vertical formats; confirm templates and codecs on the official site plus platform AI rules.',
        },
        {
          heading: 'Controlling generative video cost',
          body: 'Start with low-res previews; upscale after creative approval when billing is per minute or pixel tier.',
        },
      ],
    },
  },
  '设计 / 演示': {
    'zh-CN': {
      suitableFor: '界面视觉、品牌模板与演示成稿；{name} 适合设计与演示交叉场景。',
      notIdealFor: '大型印刷拼版与长篇幅排版仍以专业排版软件为主。',
      compareHint: '对照设计系统同步、组件库与交付给开发的标注链路。',
      checklistItems: ['统一设计令牌与命名', '导出前检查字体授权', '与前端对齐断点与状态'],
      gscParagraphs: [
        {
          heading: '{name} 能做品牌设计系统吗？',
          body: '视产品而定：有的强在画布与组件，有的在演示叙事。请以官网功能清单为准并与设计负责人评估。',
        },
        {
          heading: '设计协作常见坑？',
          body: '组件过期不删、命名混乱、与设计令牌脱节。建立 owner 与过期策略能减少返工。',
        },
      ],
    },
    en: {
      suitableFor: 'Visual design plus polished decks—{name} spans design/presentation workflows.',
      notIdealFor: 'Long-print composing—dedicated layout apps may still win.',
      compareHint: 'Check design-token sync, libraries, and handoff clarity.',
      checklistItems: ['Align tokens with engineering', 'Confirm font licensing', 'Define responsive states'],
      gscParagraphs: [
        {
          heading: 'Can {name} host a design system?',
          body: 'Capabilities vary—some excel at components, others at storytelling decks. Read feature lists and test with designers.',
        },
        {
          heading: 'Design ops pitfalls',
          body: 'Stale components and unclear naming slow teams; assign owners and sunset rules early.',
        },
      ],
    },
  },
  '语音 / 音乐': {
    'zh-CN': {
      suitableFor: '配音、播客粗剪、会议转写与生成式配乐试验；{name} 面向音频内容生产。',
      notIdealFor: '广播级母带或复杂杜比全景声混音仍以专业 DAW 流程为准。',
      compareHint: '对照语种、延迟、音色库克隆政策与商用授权。',
      checklistItems: ['对外发布读授权与水印要求', '存证生成批次与参数', '高价值内容走法务审听'],
      gscParagraphs: [
        {
          heading: '{name} 的语音可以用于商业项目吗？',
          body: '取决于套餐与声库协议；部分声音禁止二次分发或要求署名。以官网最新条款为准。',
        },
        {
          heading: '会议转写要注意隐私吗？',
          body: '涉及客户或员工对话时，先确认合规与留存政策，再做云上传或本地处理选择。',
        },
      ],
    },
    en: {
      suitableFor: 'Voiceovers, transcripts, generative music sketches—{name} helps audio creatives move faster.',
      notIdealFor: 'Broadcast mastering without a traditional DAW pipeline.',
      compareHint: 'Check languages, latency, voice-clone rules, and commercial licenses.',
      checklistItems: ['Read redistribution rules', 'Log generations', 'Legal listen for premium releases'],
      gscParagraphs: [
        {
          heading: 'Can I use {name} audio commercially?',
          body: 'Plans and voice packs set the rules—including attribution or redistribution bans. Verify on the official site.',
        },
        {
          heading: 'Privacy for meeting transcription',
          body: 'Confirm HR/legal policies before uploading customer or employee audio; consider on-device options when required.',
        },
      ],
    },
  },
  __fallback__: {
    'zh-CN': {
      suitableFor: '通用 AI 工作流提效；可将 {name} 与本站同分类工具对照试用。',
      notIdealFor: '不符合贵司数据与外发合规的场景；请先咨询法务与信息安全。',
      compareHint: '打开本工具详情中的官网链接，核对价格、地区与数据政策；并浏览相关推荐内链。',
      checklistItems: ['阅读官方隐私与服务条款', '敏感数据谨慎上传', '关键决策保留多来源核验'],
      gscParagraphs: [
        {
          heading: '{name} 是什么？',
          body: '{name} 为 Plunget 目录收录的 AI 相关产品之一。页面简介仅供快速了解，功能、价格与条款以官网为准。',
        },
        {
          heading: '如何快速对比多款工具？',
          body: '从本分类落地页进入多款产品详情页，结合「更适合/不太适合」与检查清单条目缩小范围，再用同一任务做实测。',
        },
      ],
    },
    en: {
      suitableFor: 'General AI productivity; benchmark {name} against sibling tools in this category.',
      notIdealFor: 'Workflows that violate your data-exfiltration or compliance policies.',
      compareHint: 'Use official links from this page for pricing and policies; browse related internal picks.',
      checklistItems: ['Read privacy & ToS', 'Avoid uploading secrets', 'Cross-check critical claims'],
      gscParagraphs: [
        {
          heading: 'What is {name}?',
          body: '{name} is listed in the Plunget directory as an AI-related product. Summaries are informational—pricing and policies live on the vendor site.',
        },
        {
          heading: 'How do I compare tools quickly?',
          body: 'Open multiple detail pages from the category hub, use suitability notes and checklists, then run the same real task as a bake-off.',
        },
      ],
    },
  },
}

const CATEGORY_GSC = {
  '写作 / 演示': {
    'zh-CN': [
      { heading: 'AI 写作工具能代替专业文案吗？', body: '更适合打底稿、扩写与多语言初翻；品牌调性、事实核对与合规用词仍需人工。可把本分类下多款产品横向打开对比模板与协作能力。' },
      { heading: '写周报/PPT 用哪个 AI 更顺手？', body: '先确定输出形态：长文档、短文还是 slide。再看与现有 Office/在线文档是否集成。本站条目链向各工具独立介绍页与官网。' },
      { heading: '企业用 AI 写作要考虑什么？', body: '数据是否用于模型训练、日志留存周期、地区部署与 SSO 往往是采购焦点；请在各产品官网下载白皮书或安全说明。' },
    ],
    en: [
      { heading: 'Can AI writing replace copywriters?', body: 'Great for drafts and variants; brand voice, fact checking, and compliance still need humans. Browse this category to compare templates and collaboration.' },
      { heading: 'Which AI helps with decks or memos?', body: 'Decide whether you need long docs, snippets, or slide narrative, then test integrations with your office stack. Each listing links to deep pages and vendors.' },
      { heading: 'Enterprise AI writing checklist', body: 'Training data use, logging, residency, and SSO matter—download security sheets from each official site before rollout.' },
    ],
  },
  '协作 / 白板': {
    'zh-CN': [
      { heading: '远程团队白板工具有哪些选型维度？', body: '并发人数、访客权限、模板库、导出与合规认证常决定成败。可先在本页挑选数家，再安排 pilot。' },
      { heading: '白板内容可以长期归档吗？', body: '不同产品对历史版本、导出格式与存储期限不同；涉及客户草图时建议定期导出备份。' },
    ],
    en: [
      { heading: 'How to pick a remote whiteboard', body: 'Evaluate guests, exports, SSO, and concurrent editors. Shortlist from this hub, then pilot with a real workshop.' },
      { heading: 'Archiving whiteboard work', body: 'Retention and export formats differ—schedule backups when boards include client-sensitive sketches.' },
    ],
  },
  '图像生成': {
    'zh-CN': [
      { heading: '文生图提示词怎么写更容易出效果？', body: '尽量写主体、风格、光线、镜头与负面提示；迭代时一次改一个变量。可多试用同分类不同模型寻找审美契合。' },
      { heading: 'AI 画画有没有版权风险？', body: '训练数据与许可条款因厂商而异，商用前务必阅读最新协议；复杂项目请咨询法务。' },
      { heading: '需要固定角色形象该用哪些能力？', body: '关注参考图、角色/风格锁、LoRA 或品牌微调等企业功能是否提供，具体以各工具说明为准。' },
    ],
    en: [
      { heading: 'Writing better text-to-image prompts', body: 'Describe subject, style, lighting, lens, and negatives; change one variable per iteration. Sample multiple models from this list.' },
      { heading: 'Copyright considerations', body: 'Training and usage rules vary—read each vendor’s license before commercial release and involve legal for complex cases.' },
      { heading: 'Consistent characters', body: 'Look for reference inputs, style locks, or enterprise fine-tuning—confirm on official feature matrices.' },
    ],
  },
  '图像编辑': {
    'zh-CN': [
      { heading: '抠图 API 和图片空间 API 有什么不同？', body: '抠图偏遮罩与通道；增强/超分偏分辨率与降噪。按业务调用形态选择 REST、批处理或 SDK。' },
      { heading: '批量修图适合走云端还是本地？', body: '数据敏感走本地或私有云；吞吐大且可外发可评估托管 API 的单价与配额。' },
    ],
    en: [
      { heading: 'Cutout vs upscale APIs', body: 'Cutouts focus on masks; enhancement focuses on resolution/noise. Pick REST, batch, or SDK paths to match your pipeline.' },
      { heading: 'Cloud vs on-prem batch edits', body: 'Sensitive imagery may require local runs; high throughput with approved data can use hosted APIs—compare quotas and $/image.' },
    ],
  },
  '学习 / 数据': {
    'zh-CN': [
      { heading: '文献综述可以用 AI 更快吗？', body: '可以辅助归类、提问与摘要草稿，但引用与结论仍需你核对原文。结合 Semantic Scholar、arXiv 等权威入口更稳。' },
      { heading: '做 ML 实验必须上 Weights & Biases 吗？', body: '不是必须；取决于团队规模与可观测性需求。可在本分类浏览多款实验跟踪与数据产品再决定。' },
    ],
    en: [
      { heading: 'Speeding up literature reviews', body: 'AI can cluster and draft notes, but citations must trace to originals—pair with trusted indexes like arXiv or Semantic Scholar.' },
      { heading: 'Do I need experiment tracking?', body: 'Depends on team scale and reproducibility needs; compare tracking and dataset tools linked from this category page.' },
    ],
  },
  '对话 / 通用': {
    'zh-CN': [
      { heading: 'ChatGPT、Claude、Gemini 怎么简单区分？', body: '可从上下文长度、是否便于联网、中文体验、定价与生态集成入手；本站为每款工具提供独立页面与同类推荐。' },
      { heading: '大模型回答有幻觉怎么办？', body: '对数字、日期与专有名词要求证；复杂任务分解步骤并保留引用。不要把单次输出当作事实来源。' },
      { heading: '企业采购大模型看哪几条？', body: '数据使用条款、地区部署、审计日志、角色权限与 SLA；建议让安全与法务同事并行评审官网材料。' },
    ],
    en: [
      { heading: 'ChatGPT vs Claude vs Gemini—quickly', body: 'Compare context, browsing, language quality, pricing, and integrations. Each tool here has its own page plus related picks.' },
      { heading: 'Handling hallucinations', body: 'Verify numbers, dates, and names; break tasks into steps and keep citations. Never treat a single answer as ground truth.' },
      { heading: 'Enterprise LLM procurement', body: 'Review data use, residency, audit logs, RBAC, and SLAs with security/legal alongside vendor documentation.' },
    ],
  },
  '开源 / 开发者': {
    'zh-CN': [
      { heading: '本地跑大模型最低配置大概多少？', body: '视模型参数与量化而定；7B/8B 量化常见消费级显卡可试，更大模型需多卡或云主机。以各推理框架文档为准。' },
      { heading: 'LangChain 还值得学吗？', body: '生态仍活跃但竞争多；可按项目需求评估编排框架、托管 API 与云函数方案的组合。' },
    ],
    en: [
      { heading: 'Hardware for local LLMs', body: 'Depends on parameter count and quantization—consumer GPUs may run 7B/8B quantized models; larger stacks need multi-GPU or cloud. Read framework guides.' },
      { heading: 'Orchestration frameworks', body: 'LangChain is one option among several—match frameworks to your hosting, latency, and observability requirements.' },
    ],
  },
  '搜索 / 研究': {
    'zh-CN': [
      { heading: 'Perplexity 类产品适合论文吗？', body: '适合找线索与摘要起点，但引用链路要认真点开核对；学位论文请遵守院校对生成内容的政策。' },
      { heading: '怎么做可验证的调研摘要？', body: '要求模型列出可点击来源、记录检索日期，并与数据库原始条目对照。' },
    ],
    en: [
      { heading: 'Research assistants for papers', body: 'Use them to discover leads, but verify every citation; follow institutional policies on generated text.' },
      { heading: 'Verifiable research briefs', body: 'Ask for clickable sources, log retrieval dates, and compare against database records manually.' },
    ],
  },
  '文档 / 知识库': {
    'zh-CN': [
      { heading: 'Notion 类 wiki 和飞书文档怎么选？', body: '看团队已有生态、权限模型、自动化与审计；跨国团队还要考虑数据区域与移动端体验。' },
      { heading: '个人知识库用双链笔记更好吗？', body: '若你重视本地文件与插件生态，Obsidian/Logseq 等更灵活；若重度协作优先在线工作区。' },
    ],
    en: [
      { heading: 'Notion-like vs suite docs', body: 'Weigh existing ecosystem, permissions, automation, auditing, and data regions—especially for distributed teams.' },
      { heading: 'Personal PKM vs team wiki', body: 'Graph notes excel at local control; hosted wikis excel at permissions—many teams use both.' },
    ],
  },
  '编程 / 开发': {
    'zh-CN': [
      { heading: 'GitHub Copilot 和 Cursor 怎么选？', body: 'Copilot 深度集成 GitHub；Cursor 强调整仓索引与对话式编辑。可按仓库规模与隐私要求试用二者。' },
      { heading: 'AI 写的代码要审查什么？', body: '安全漏洞、许可证头、错误处理与测试覆盖；不要把未审代码直接进主干。' },
    ],
    en: [
      { heading: 'Copilot vs Cursor', body: 'Copilot leans on GitHub integration; Cursor emphasizes repo-wide indexing and chat editing—pilot both with real repositories.' },
      { heading: 'Reviewing AI-written code', body: 'Watch for security, licensing headers, error handling, and tests—never merge unreviewed suggestions to main.' },
    ],
  },
  '翻译 / 语言': {
    'zh-CN': [
      { heading: 'DeepL 和沉浸式翻译冲突吗？', body: '不冲突：前者偏文档级质量，后者偏浏览外语网页效率，可按场景组合。' },
      { heading: '机翻合同有效吗？', body: '法律效力因地而异；重要合同应使用持证译员或双语律师审核，勿仅依赖机翻。' },
    ],
    en: [
      { heading: 'DeepL plus browser translators', body: 'DeepL targets documents; immersive tools target browsing—combine by workflow rather than choosing one forever.' },
      { heading: 'Machine translating contracts', body: 'Legal validity varies by jurisdiction—use certified translators or counsel for binding agreements.' },
    ],
  },
  '自动化 / 集成': {
    'zh-CN': [
      { heading: 'n8n 自托管和 Zapier 云服务怎么取舍？', body: '要可控与数据不出境选自托管；要少运维与快速连通选云服务。还要估算连接数与执行次数成本。' },
      { heading: '自动化失败后怎么止血？', body: '设计幂等、死信队列与告警；关键财务流要有人工复核点。' },
    ],
    en: [
      { heading: 'Self-hosted vs cloud automation', body: 'Self-host for control/residency; hosted for speed and maintenance—model connector counts and task pricing.' },
      { heading: 'Failure handling', body: 'Plan idempotency, dead-letter queues, alerts, and human checkpoints for money-moving workflows.' },
    ],
  },
  '视频 / 动效': {
    'zh-CN': [
      { heading: 'Runway、Pika 这类工具适合什么人？', body: '适合短视频、广告小样与动效探索；电影长片仍以传统流程为主。可按分辨率与口型能力筛选。' },
      { heading: 'AI 生成视频会不会侵权？', body: '训练数据与输出权利因平台政策不同；商用前阅读用户协议并避免未授权肖像。' },
    ],
    en: [
      { heading: 'Who benefits from tools like Runway or Pika?', body: 'Great for social clips and ad tests; long-form cinema still relies on classic pipelines—compare resolution and lipsync features.' },
      { heading: 'IP risks in generative video', body: 'Policies on training data and likeness differ—read terms and avoid unapproved likenesses in commercial work.' },
    ],
  },
  '设计 / 演示': {
    'zh-CN': [
      { heading: 'Canva 和 Figma 是竞争关系吗？', body: '有重叠也有差异：Canva 偏模板化创意物料，Figma 偏界面系统与工程协作。可按交付物类型选择。' },
      { heading: 'AI 能直接生成可上线 UI 吗？', body: '多为起点稿，仍需设计评审与前端实现；注意无障碍与多端适配。' },
    ],
    en: [
      { heading: 'Canva vs Figma', body: 'Overlap exists but Canva skews templated marketing while Figma skews UI systems—match the deliverable.' },
      { heading: 'AI-generated UI readiness', body: 'Treat as starting concepts; accessibility and responsive QA remain human-led.' },
    ],
  },
  '语音 / 音乐': {
    'zh-CN': [
      { heading: 'Suno、Udio 生成音乐能上传 Spotify 吗？', body: '视各平台分发规则与版权状态而定；请阅读服务商条款与流媒体政策。' },
      { heading: '会议录音转文字准确吗？', body: '安静环境、清晰麦克风与领域词典可显著提升准确率；涉密会议禁用未批准云服务。' },
    ],
    en: [
      { heading: 'Publishing AI music to streaming', body: 'Depends on distributor rules and rights from the generator—read ToS for both the AI vendor and the streaming platform.' },
      { heading: 'Transcription accuracy', body: 'Quiet rooms, good mics, and domain vocab help; block unapproved clouds for confidential meetings.' },
    ],
  },
}

// --- Apply category gsc blocks ---
const cePath = 'data/category-entities.json'
const ce = readJson(cePath)
for (const ent of ce.entities) {
  const blocks = CATEGORY_GSC[ent.canonicalKey]
  if (!blocks) continue
  for (const loc of ['zh-CN', 'en']) {
    if (!ent.locales[loc]) continue
    if (!Array.isArray(ent.locales[loc].gscBlocks) || ent.locales[loc].gscBlocks.length === 0) {
      ent.locales[loc].gscBlocks = blocks[loc] ?? []
    }
  }
  ent.updatedAt = '2026-04-06'
}
writeJson(cePath, ce)

// --- Merge tool SEO extras ---
const toolsFile = readJson('data/tools.json').tools
const extrasPath = 'data/tool-seo-extras.json'
const extras = readJson(extrasPath)

for (const t of toolsFile) {
  const tpl = TOOL_TEMPLATES[t.category] || TOOL_TEMPLATES.__fallback__
  const genZh = deepFill(tpl['zh-CN'], t.name)
  const genEn = deepFill(tpl.en, t.name)
  const prev = extras[t.slug]
  if (!prev) {
    extras[t.slug] = { 'zh-CN': genZh, en: genEn }
    continue
  }
  extras[t.slug] = {
    'zh-CN': mergeBlock(prev['zh-CN'], genZh),
    en: mergeBlock(prev.en, genEn),
  }
}

writeJson(extrasPath, extras)
console.log('Updated', cePath, 'and', extrasPath, '— tools:', toolsFile.length, 'extras keys:', Object.keys(extras).length)
