/**
 * 生成 data/openclaw-skills.json
 * 官方技能 id 来自 openclaw/openclaw 仓库 skills/ 目录（与 GitHub 对齐）
 * 文档：https://docs.openclaw.ai/skills/
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const github = (slug) => `https://github.com/openclaw/openclaw/tree/main/skills/${slug}`
const docsCreate = 'https://docs.openclaw.ai/tools/creating-skills'

/** @type {Record<string, { name: string, category: string, tags: string[], blurb: string, featured?: boolean }>} */
const OFFICIAL = {
  '1password': {
    name: '1Password',
    category: '安全 / 密码',
    tags: ['CLI', '密码', 'macOS'],
    blurb:
      '教代理通过 1Password CLI 安全读取与填充凭据，适合在已安装 op CLI 且完成登录的环境里自动化登录与密钥注入。涉及机密时务必配合最小权限与审计策略。',
    featured: false,
  },
  'apple-notes': {
    name: 'Apple Notes',
    category: 'Apple 生态',
    tags: ['备忘录', 'macOS', 'iCloud'],
    blurb:
      '面向苹果备忘录的读写与检索类指令，适合在 macOS 节点上把会议记录与灵感同步进笔记工作流。需本机权限与相应二进制可用。',
    featured: false,
  },
  'apple-reminders': {
    name: 'Apple Reminders',
    category: 'Apple 生态',
    tags: ['提醒事项', '日历', 'GTD'],
    blurb:
      '与「提醒事项」交互，用于创建、完成与列出待办，适合个人 GTD 与轻量任务跟进。多设备同步依赖 iCloud，代理执行前需确认日历权限。',
    featured: false,
  },
  'bear-notes': {
    name: 'Bear Notes',
    category: 'Apple 生态',
    tags: ['Bear', '写作', 'Markdown'],
    blurb:
      '与 Bear 笔记应用联动，适合偏好 Bear 标签与 Markdown 写作的用户做知识沉淀。通常需要 Bear 提供的 URL scheme 或辅助 CLI 环境。',
    featured: false,
  },
  blogwatcher: {
    name: 'BlogWatcher',
    category: '信息 / 订阅',
    tags: ['RSS', '监控', '抓取'],
    blurb:
      '用于跟踪博客或订阅源更新，适合内容运营与研究者做「站点变更」级别的提醒。请遵守目标站 robots 与频率礼貌。',
    featured: false,
  },
  blucli: {
    name: 'blucli',
    category: '智能家居',
    tags: ['蓝牙', 'CLI', '硬件'],
    blurb:
      '与蓝牙周边设备交互的 CLI 场景，适合本地脚本化控制小型硬件。稳定性受系统蓝牙栈与设备固件影响较大。',
    featured: false,
  },
  bluebubbles: {
    name: 'BlueBubbles',
    category: '通讯 / 消息',
    tags: ['iMessage', '桥接', '自托管'],
    blurb:
      '通过 BlueBubbles 服务桥接 iMessage，适合在 macOS 节点上收发苹果生态消息。部署与合规要求高，不建议在不受信网络暴露。',
    featured: false,
  },
  camsnap: {
    name: 'CamSnap',
    category: '媒体 / 采集',
    tags: ['摄像头', '截图', '采集'],
    blurb:
      '从摄像头抓取画面或快照，适合远程协助、监控类自动化与视觉流水线前置步骤。注意隐私告知与镜头权限。',
    featured: false,
  },
  canvas: {
    name: 'Canvas',
    category: '协作 / 画布',
    tags: ['白板', '可视化'],
    blurb:
      '与画布类工具或脚本协同，适合把结构化数据铺到可视化面板上做讨论。具体对接对象以 SKILL.md 为准。',
    featured: false,
  },
  'taskflow-inbox-triage': {
    name: 'Taskflow Inbox Triage',
    category: '自动化 / 工作流',
    tags: ['收件箱', '分拣', 'Taskflow'],
    blurb:
      'Taskflow 系列中与收件箱/待处理队列分拣相关的预置编排，适合把杂讯信息流整理成可执行下一步。需配合 Taskflow 主技能与网关配置。',
    featured: true,
  },
  taskflow: {
    name: 'Taskflow',
    category: '自动化 / 工作流',
    tags: ['编排', '自动化', 'OpenClaw'],
    blurb:
      'OpenClaw 上的任务流编排入口，用于把多个技能按触发条件串联。适合把「重复但多步骤」的日常任务固化成可复用流水线。',
    featured: true,
  },
  clawhub: {
    name: 'ClawHub',
    category: '生态 / 注册表',
    tags: ['ClawHub', '安装', '同步'],
    blurb:
      '教代理使用 ClawHub 相关命令做技能发现、安装与更新，与公共技能注册表 [clawhub.com](https://clawhub.com) 对应。第三方技能请先审 SKILL.md 再启用。',
    featured: true,
  },
  'coding-agent': {
    name: 'Coding Agent',
    category: '开发 / 代码',
    tags: ['编程', '代理', '仓库'],
    blurb:
      '指导代理以「编码代理」模式使用终端、测试与提交规范，适合在受控仓库内做分支化开发与代码变更。高风险操作需结合审查与沙箱策略。',
    featured: true,
  },
  discord: {
    name: 'Discord',
    category: '通讯 / 消息',
    tags: ['Discord', 'Bot', '社区'],
    blurb:
      '与 Discord 频道或机器人交互，适合社区运营与开发团队通知。需配置令牌与权限范围，避免过度授权。',
    featured: false,
  },
  eightctl: {
    name: 'eightctl',
    category: '工具链 / CLI',
    tags: ['CLI', '控制'],
    blurb:
      '封装特定硬件或服务的控制 CLI，适合把设备指令暴露给代理按步骤执行。具体设备类型以仓库内说明为准。',
    featured: false,
  },
  gemini: {
    name: 'Gemini CLI',
    category: '开发 / 代码',
    tags: ['Gemini', 'CLI', '谷歌'],
    blurb:
      '通过本机安装的 `gemini` CLI 做一次性问答、摘要与 JSON 输出，适合与谷歌 AI 生态衔接。需完成登录与避免不安全的「一键放行」参数。',
    featured: true,
  },
  'gh-issues': {
    name: 'GitHub Issues',
    category: '开发 / 代码',
    tags: ['GitHub', 'Issue', '自动化'],
    blurb:
      '配合 `gh` CLI 管理 Issues 与简单工作流，适合让代理拉取待办、评论与打标签。企业环境需遵守分支保护与审计要求。',
    featured: true,
  },
  gifgrep: {
    name: 'gifgrep',
    category: '媒体 / 采集',
    tags: ['GIF', '搜索', '趣味'],
    blurb:
      '在动图资源中检索与引用，适合对话中快速插入表情与示意。注意版权与平台条款。',
    featured: false,
  },
  github: {
    name: 'GitHub',
    category: '开发 / 代码',
    tags: ['GitHub', 'git', '协作'],
    blurb:
      '教代理使用 gh/git 完成仓库浏览、PR 与基础协作操作，是开发类代理的常用底座技能之一。',
    featured: true,
  },
  gog: {
    name: 'gog',
    category: '工具链 / CLI',
    tags: ['Go', 'CLI'],
    blurb:
      '与 Go 工具链或特定 gog 命令相关的工作流，适合在已安装 Go 的环境里执行构建与小型工具脚本。',
    featured: false,
  },
  goplaces: {
    name: 'goplaces',
    category: '生活 / 地点',
    tags: ['地图', '地点', '出行'],
    blurb:
      '与地点检索、路线或 POI 相关的命令封装，适合出行与本地服务场景。结果准确性需与地图数据源交叉验证。',
    featured: false,
  },
  healthcheck: {
    name: 'Healthcheck',
    category: '运维 / 监控',
    tags: ['健康检查', 'HTTP', 'Cron'],
    blurb:
      '对 URL 或服务做存活探测，适合与定时任务结合做「挂了就叫醒我」类运维。注意探测频率与目标站承受力。',
    featured: false,
  },
  himalaya: {
    name: 'Himalaya',
    category: '通讯 / 邮件',
    tags: ['邮件', 'CLI', 'IMAP'],
    blurb:
      '基于 Himalaya 的邮件 CLI 工作流，适合在终端里收发自定义邮箱。凭证与 OAuth 配置需妥善保管。',
    featured: false,
  },
  imsg: {
    name: 'iMessage',
    category: '通讯 / 消息',
    tags: ['iMessage', 'macOS', '短信'],
    blurb:
      '与苹果信息（iMessage）相关的自动化能力，通常依赖 macOS 环境与额外桥接组件。隐私与合规要求极高。',
    featured: false,
  },
  mcporter: {
    name: 'McPorter',
    category: '开发 / 集成',
    tags: ['MCP', '工具', '桥接'],
    blurb:
      '与 MCP（Model Context Protocol）类工具桥接相关，适合把外部工具以统一协议暴露给代理。具体能力随上游实现演变。',
    featured: false,
  },
  'model-usage': {
    name: 'Model Usage',
    category: '运维 / 监控',
    tags: ['用量', '计费', '模型'],
    blurb:
      '帮助观察与记录模型调用用量，适合在多模型切换时做成本意识与配额管理。需对接网关或供应商统计接口。',
    featured: false,
  },
  'nano-pdf': {
    name: 'nano-pdf',
    category: '文档 / PDF',
    tags: ['PDF', '轻量', '解析'],
    blurb:
      '偏轻量的 PDF 处理与文本抽取流程，适合在资源受限环境里做「够用就好」的文档阅读。复杂版式仍以专用库为准。',
    featured: false,
  },
  'node-connect': {
    name: 'node-connect',
    category: '开发 / 集成',
    tags: ['Node', '连接', '调试'],
    blurb:
      '与 Node 运行时或本地端口连接相关的辅助流程，适合调试与小型服务探活。注意不要把调试端口暴露到公网。',
    featured: false,
  },
  notion: {
    name: 'Notion',
    category: '文档 / 知识库',
    tags: ['Notion', 'API', '协作'],
    blurb:
      '通过 Notion API 读写页面与数据库，适合把代理输出沉淀为团队知识库。需集成令牌与权限最小化。',
    featured: true,
  },
  obsidian: {
    name: 'Obsidian',
    category: '文档 / 知识库',
    tags: ['Obsidian', 'Markdown', '本地'],
    blurb:
      '与 Obsidian 库或相关 CLI 协作，适合本地优先笔记用户把代理结果写回 vault。路径与同步冲突需自行治理。',
    featured: false,
  },
  'openai-whisper-api': {
    name: 'OpenAI Whisper（API）',
    category: '语音 / 转写',
    tags: ['Whisper', 'API', '转写'],
    blurb:
      '通过云端 API 使用 Whisper 能力做语音转文字，适合不想本地跑模型的场景。注意音频上传隐私与计费。',
    featured: false,
  },
  'openai-whisper': {
    name: 'OpenAI Whisper（本地）',
    category: '语音 / 转写',
    tags: ['Whisper', '本地', '离线'],
    blurb:
      '在本机或节点上使用 Whisper 相关二进制做转写，适合隐私敏感与离线环境。性能取决于硬件与模型尺寸。',
    featured: false,
  },
  openhue: {
    name: 'OpenHue',
    category: '智能家居',
    tags: ['Hue', '灯光', 'Philips'],
    blurb:
      '与飞利浦 Hue 或兼容桥接交互，适合语音/自动化调节灯光场景。局域网发现与令牌配置需按厂商流程完成。',
    featured: false,
  },
  oracle: {
    name: 'Oracle',
    category: '工具链 / CLI',
    tags: ['数据库', '企业'],
    blurb:
      '与 Oracle 数据库或工具链相关的查询/管理辅助（以 SKILL 为准），适合企业内网场景。强合规环境需 DBA 审批。',
    featured: false,
  },
  ordercli: {
    name: 'ordercli',
    category: '生活 / 服务',
    tags: ['CLI', '下单', '外部服务'],
    blurb:
      '与第三方下单或订单查询 CLI 对接，适合实验性自动化。涉及支付与个人信息时务必人工确认。',
    featured: false,
  },
  peekaboo: {
    name: 'Peekaboo',
    category: '系统 / 桌面',
    tags: ['截屏', '窗口', 'macOS'],
    blurb:
      '文档中常作为示例出现的内置技能之一，用于窗口/界面相关的可见性操作（具体以仓库 SKILL 为准）。适合需要「看一眼屏幕」的代理流程。',
    featured: false,
  },
  sag: {
    name: 'SAG',
    category: '系统 / 自动化',
    tags: ['示例', '配置'],
    blurb:
      '文档中用于演示配置开关的示例技能名之一，可用于练习 `skills.entries` 的启用/禁用。具体行为以仓库实现为准。',
    featured: false,
  },
  'session-logs': {
    name: 'Session Logs',
    category: '运维 / 监控',
    tags: ['日志', '会话', '排错'],
    blurb:
      '帮助检索与总结会话或网关日志片段，适合排错与审计。敏感日志外发前需脱敏。',
    featured: false,
  },
  'sherpa-onnx-tts': {
    name: 'Sherpa ONNX TTS',
    category: '语音 / 合成',
    tags: ['TTS', 'ONNX', '离线'],
    blurb:
      '基于 sherpa-onnx 的本地语音合成路径，适合离线播报与低延迟提示音。音色与模型文件需单独准备。',
    featured: false,
  },
  'skill-creator': {
    name: 'Skill Creator',
    category: '生态 / 开发',
    tags: ['元技能', '模板', '最佳实践'],
    blurb:
      '教代理如何按 AgentSkills 规范编写新的 `SKILL.md`、设计 gating 与最小权限，是扩展 OpenClaw 能力的「元技能」。',
    featured: true,
  },
  slack: {
    name: 'Slack',
    category: '通讯 / 消息',
    tags: ['Slack', '团队', 'Webhook'],
    blurb:
      '与 Slack 工作区交互（消息、频道与简单工作流），适合把代理结果推送给团队。令牌应使用最小权限 bot scope。',
    featured: true,
  },
  songsee: {
    name: 'Songsee',
    category: '媒体 / 音乐',
    tags: ['音乐', '识别', '趣味'],
    blurb:
      '与音乐识别或歌单类 CLI 交互，适合娱乐与曲库整理。识别结果版权仍归权利方。',
    featured: false,
  },
  sonoscli: {
    name: 'sonoscli',
    category: '智能家居',
    tags: ['Sonos', '音响', 'CLI'],
    blurb:
      '控制 Sonos 音响设备的命令行路径，适合家庭场景下的音量与播放队列操作。局域网发现异常时需检查防火墙。',
    featured: false,
  },
  'spotify-player': {
    name: 'Spotify Player',
    category: '媒体 / 音乐',
    tags: ['Spotify', '播放', 'CLI'],
    blurb:
      '通过 CLI 控制 Spotify 播放状态，适合把「下一首/暂停」等指令纳入自动化。需完成账户授权与 CLI 安装。',
    featured: false,
  },
  summarize: {
    name: 'Summarize',
    category: '文档 / 摘要',
    tags: ['摘要', 'CLI', '长文'],
    blurb:
      '依赖 `summarize` 类 CLI 对长文做压缩摘要，文档中亦作为沙箱内需要二进制存在的示例。适合管道化批处理。',
    featured: true,
  },
  'things-mac': {
    name: 'Things（macOS）',
    category: 'Apple 生态',
    tags: ['Things', 'GTD', 'macOS'],
    blurb:
      '与 Cultured Code Things 交互，适合重度 GTD 用户把任务捕获进 Things。通常依赖 URL scheme 或辅助脚本。',
    featured: false,
  },
  tmux: {
    name: 'tmux',
    category: '开发 / 终端',
    tags: ['tmux', '会话', '远程'],
    blurb:
      '教代理在 tmux 会话中运行长任务、分屏与持久会话，适合远程开发与服务器上的交互式流水线。',
    featured: false,
  },
  trello: {
    name: 'Trello',
    category: '协作 / 项目',
    tags: ['Trello', '看板', 'API'],
    blurb:
      '通过 API 管理看板与卡片，适合轻量项目协作。令牌应限制在必要看板范围。',
    featured: false,
  },
  'video-frames': {
    name: 'Video Frames',
    category: '媒体 / 视频',
    tags: ['视频', '抽帧', '分析'],
    blurb:
      '从视频抽取帧序列供后续视觉或摘要处理，适合内容审核与镜头拆解的前置步骤。大文件注意 IO 与临时磁盘。',
    featured: false,
  },
  'voice-call': {
    name: 'Voice Call',
    category: '语音 / 通话',
    tags: ['通话', '语音', '桥接'],
    blurb:
      '与语音通话桥或 SIP/WebRTC 相关能力（以 SKILL 为准），适合实验性语音助手。电信合规与录音告知务必遵守当地法律。',
    featured: false,
  },
  wacli: {
    name: 'wacli',
    category: '通讯 / 消息',
    tags: ['WhatsApp', 'CLI'],
    blurb:
      '与 WhatsApp 相关的 CLI 自动化路径，适合通知类场景。平台政策与封号风险极高，仅建议在合规用途下使用。',
    featured: false,
  },
  weather: {
    name: 'Weather',
    category: '生活 / 天气',
    tags: ['天气', 'API', '出行'],
    blurb:
      '获取天气摘要与预报，适合日程与出行助手。数据源精度与单位换算需在提示词中明确。',
    featured: false,
  },
  xurl: {
    name: 'xurl',
    category: '通讯 / 社交',
    tags: ['X', 'Twitter', 'CLI'],
    blurb:
      '通过 `xurl` CLI 做 X（Twitter）API 调用，适合发帖、检索与线程操作。API 计费与平台规则变更频繁，需以官方文档为准。',
    featured: true,
  },
}

/** 文档与教程中常见的自定义技能命名示例（非仓库目录名，链接到创建指南） */
const CUSTOM_EXAMPLES = [
  ['openai-image-gen', 'openai-image-gen（示例）', '图像批处理', 'OpenAI Images API 批量出图类自定义技能示例，需在 SKILL 中声明 OPENAI_API_KEY 等门控。'],
  ['my-weather-skill', 'my-weather-skill（示例）', '入门模板', '官方文档中的最小天气技能示例，演示用 curl 拉取 wttr.in。适合第一次手写 SKILL.md。'],
  ['rss-ingest', 'rss-ingest（示例）', '信息 / 订阅', '自定义 RSS 抓取与清洗的常见命名，可配合定时触发做每日摘要。'],
  ['calendar-sync', 'calendar-sync（示例）', '日历 / 效率', '与日历提供方双向同步的示例方向，实际需对接 Google/Microsoft/CalDAV。'],
  ['email-triage', 'email-triage（示例）', '邮件 / 效率', '收件箱分拣、打标签与草稿回复流水线，常见于自动化教程。'],
  ['slack-digest', 'slack-digest（示例）', '通讯 / 消息', '定时把频道消息汇总成日报推送，适合团队站会前预习。'],
  ['github-pr-review', 'github-pr-review（示例）', '开发 / 代码', '拉取 PR diff 并生成审查意见的自定义编排，需严格限制写权限。'],
  ['jira-bridge', 'jira-bridge（示例）', '协作 / 项目', '在 Jira 与聊天工具间同步状态，适合研发流程自动化。'],
  ['notion-publish', 'notion-publish（示例）', '文档 / 知识库', '把代理输出格式化为 Notion 页面并发布到数据库视图。'],
  ['pdf-table-extract', 'pdf-table-extract（示例）', '文档 / PDF', '偏重表格抽取的 PDF 技能命名，常与 python 工具链共存。'],
  ['voice-memo-transcribe', 'voice-memo-transcribe（示例）', '语音 / 转写', '把语音备忘录批量转写并归档的示例名。'],
  ['smart-home-scenes', 'smart-home-scenes（示例）', '智能家居', '一次触发多设备场景，需与具体厂商 CLI/桥接对齐。'],
  ['stripe-webhook-helper', 'stripe-webhook-helper（示例）', '支付 / 集成', '校验 Stripe 签名并路由事件的示例技能，涉及资金需审计。'],
  ['sentry-triage', 'sentry-triage（示例）', '运维 / 监控', '拉取 Sentry issue 并生成初因分析的示例方向。'],
  ['docker-health', 'docker-health（示例）', '运维 / 监控', '批量检查容器健康状态与资源占用的命名习惯。'],
  ['k8s-logs-tail', 'k8s-logs-tail（示例）', '运维 / 监控', '受限环境下 tail Pod 日志的技能示例，需 kubectl 与权限。'],
  ['terraform-plan-summary', 'terraform-plan-summary（示例）', '运维 / IaC', '对 terraform plan 做人类可读摘要，适合变更评审。'],
  ['db-readonly-query', 'db-readonly-query（示例）', '数据 / SQL', '只读 SQL 探查与慢查询解释，必须强制只读账号。'],
  ['gdrive-export', 'gdrive-export（示例）', '云存储', '从 Google Drive 导出文件到工作区的示例名。'],
  ['s3-presign-upload', 's3-presign-upload（示例）', '云存储', '生成预签名 URL 做安全上传的编排示例。'],
  ['figma-to-code', 'figma-to-code（示例）', '设计 / 前端', '从设计稿拉 token 与结构生成前端草稿的常见教程名。'],
  ['linear-roadmap-digest', 'linear-roadmap-digest（示例）', '协作 / 项目', '汇总 Linear 路线图变更的自定义技能方向。'],
  ['discord-announce', 'discord-announce（示例）', '通讯 / 消息', '向指定频道发送格式化公告的示例名。'],
  ['telegram-notify', 'telegram-notify（示例）', '通讯 / 消息', 'Telegram Bot 推送告警与日报的常见命名。'],
  ['meetings-recap', 'meetings-recap（示例）', '会议 / 效率', '把会议录音+转写+摘要串成一页纪要的流水线名称。'],
  ['research-brief', 'research-brief（示例）', '搜索 / 研究', '多源检索后输出一页「调研简报」的自定义技能。'],
  ['citation-check', 'citation-check（示例）', '搜索 / 研究', '核对生成内容中的引用是否能在来源中找到对应句。'],
  ['prompt-library-sync', 'prompt-library-sync（示例）', '开发 / 提示词', '在仓库与团队间同步提示词版本与变更记录。'],
  ['eval-harness', 'eval-harness（示例）', '开发 / 质量', '对代理输出跑固定评测集与回归对比的示例名。'],
  ['redteam-safety', 'redteam-safety（示例）', '安全 / 合规', '对提示与工具调用做红队与安全检查的自定义方向。'],
  ['pii-redact', 'pii-redact（示例）', '安全 / 合规', '在日志与外发内容中脱敏个人信息的技能示例。'],
  ['i18n-copy-review', 'i18n-copy-review（示例）', '翻译 / 语言', '多语言文案一致性与术语表校验的命名习惯。'],
  ['cron-newsletter', 'cron-newsletter（示例）', '自动化', '定时生成并发送新闻通讯的编排示例。'],
  ['webhook-ingest', 'webhook-ingest（示例）', '自动化 / 集成', '接收并校验第三方 webhook 再触发下游技能的网关示例。'],
  ['queue-worker-skill', 'queue-worker-skill（示例）', '自动化 / 集成', '从队列拉任务并幂等执行的长期运行型技能命名。'],
  ['browser-bookmark-digest', 'browser-bookmark-digest（示例）', '信息 / 订阅', '周期性总结浏览器书签新增与未读列表。'],
  ['image-alt-text', 'image-alt-text（示例）', '无障碍 / 媒体', '批量为图片生成替代文本以提升可访问性。'],
  ['codeowners-suggest', 'codeowners-suggest（示例）', '开发 / 代码', '根据历史变更建议 CODEOWNERS 调整的实验技能。'],
  ['license-audit', 'license-audit（示例）', '开发 / 合规', '扫描依赖许可证冲突的自定义方向。'],
  ['release-notes-gen', 'release-notes-gen（示例）', '开发 / 发布', '从合并提交与 issue 生成发行说明草稿。'],
  ['oncall-summary', 'oncall-summary（示例）', '运维 / 值班', '汇总值班周期内告警与事件的交接班简报。'],
  ['customer-ticket-draft', 'customer-ticket-draft（示例）', '支持 / CRM', '根据对话草稿生成工单首响与分类建议。'],
  ['invoice-parse', 'invoice-parse（示例）', '财务 / 文档', '从发票 PDF 抽取字段进入表格（高敏感，需人工复核）。'],
  ['hr-screening-helper', 'hr-screening-helper（示例）', '招聘 / 合规', '辅助整理简历要点（涉及公平性与隐私，需谨慎）。'],
  ['edu-quiz-gen', 'edu-quiz-gen（示例）', '教育 / 学习', '由讲义自动生成测验题与解析的示例名。'],
  ['med-terminology-check', 'med-terminology-check（示例）', '医疗 / 合规', '术语校对示例（非医疗建议，不能替代专业人士）。'],
  ['legal-clause-compare', 'legal-clause-compare（示例）', '法律 / 合规', '合同条款差异高亮（示例向，不构成法律意见）。'],
  ['kids-story-night', 'kids-story-night（示例）', '家庭 / 趣味', '按偏好生成睡前故事并朗读的自定义场景名。'],
  ['fitness-plan-log', 'fitness-plan-log（示例）', '健康 / 生活', '记录训练计划与身体指标的示例（非医疗指导）。'],
  ['travel-packing-list', 'travel-packing-list（示例）', '出行 / 生活', '根据目的地天气与行程生成行李清单。'],
  ['recipe-from-fridge', 'recipe-from-fridge（示例）', '生活 / 饮食', '根据现有食材建议菜谱（注意食品安全）。'],
  ['photo-organize', 'photo-organize（示例）', '媒体 / 整理', '按时间/人脸/事件聚类整理相册的示例方向。'],
  ['subtitle-translate', 'subtitle-translate（示例）', '翻译 / 媒体', '批量翻译字幕文件并保持时间轴对齐。'],
  ['podcast-chapter-markers', 'podcast-chapter-markers（示例）', '播客 / 媒体', '为音频生成章节点与 shownotes 草稿。'],
  ['game-mod-docs', 'game-mod-docs（示例）', '游戏 / 文档', '为模组项目生成安装说明与兼容矩阵。'],
  ['latex-build-fix', 'latex-build-fix（示例）', '学术 / 排版', '解析 LaTeX 编译错误并给出修复建议的示例名。'],
  ['bibtex-normalize', 'bibtex-normalize（示例）', '学术 / 文献', '整理 BibTeX 条目格式与去重。'],
  ['openapi-mock', 'openapi-mock（示例）', '开发 / API', '由 OpenAPI 生成 mock 服务与示例请求。'],
  ['graphql-introspect-docs', 'graphql-introspect-docs（示例）', '开发 / API', '自省 GraphQL schema 并生成可读文档页面。'],
  ['wasm-bundle-analyze', 'wasm-bundle-analyze（示例）', '开发 / 性能', '分析 wasm 体积分块与加载策略的示例。'],
  ['edge-config-sync', 'edge-config-sync（示例）', '边缘 / 部署', '在 CDN/边缘 KV 间同步配置与特性开关的命名习惯。'],
]

const officialSkills = Object.entries(OFFICIAL).map(([slug, v]) => ({
  slug,
  name: v.name,
  description: `${v.blurb} 官方仓库路径：\`skills/${slug}/\`，遵循 AgentSkills 的 \`SKILL.md\` 结构。详见 [OpenClaw 技能文档](https://docs.openclaw.ai/skills/) 与 [ClawHub](https://clawhub.com)。`,
  url: github(slug),
  category: v.category,
  tags: v.tags,
  featured: Boolean(v.featured),
  official: true,
}))

const customSkills = CUSTOM_EXAMPLES.map(([slug, title, category, blurb]) => ({
  slug,
  name: title,
  description: `${blurb} 此为社区/教程中常见的命名与能力拆分示例，**默认不在 OpenClaw 仓库内置**；请在本机 \`skills/${slug}/SKILL.md\` 自行实现，并阅读 [创建技能](${docsCreate}) 与 [AgentSkills](https://agentskills.io/) 规范。`,
  url: docsCreate,
  category: `自定义示例 · ${category}`,
  tags: ['自定义', '教程', '示例'],
  featured: false,
  official: false,
}))

const skills = [...officialSkills, ...customSkills].sort((a, b) => {
  if (a.official !== b.official) return a.official ? -1 : 1
  return a.slug.localeCompare(b.slug)
})

const payload = { _meta: { updatedAt: new Date().toISOString().slice(0, 10) }, skills }

writeFileSync(join(root, 'data/openclaw-skills.json'), JSON.stringify(payload, null, 2) + '\n', 'utf-8')
console.log('Wrote', skills.length, 'skills (official:', officialSkills.length, ', examples:', customSkills.length, ')')
