# 每日内容抓取与 AI 整改流程

## 目的

从配置的 **RSS 2.0** 源拉取新条目，写入 `content/inbox/runs/<时间戳>/`，生成结构化 JSON 与 **`CURSOR-HANDOFF.md`**。你在 Cursor 里打开该交接文件，把任务交给 AI，按本站语气把内容改写成可发布的资讯稿。

**运行方式**：设计为你在需要时**手动**执行 `npm run content:ingest`（例如每天一次），无需也不能「系统自动定时」代跑；若日后在机器上使用 cron，由你自行配置即可。

## 配置

编辑 `data/content-ingest.config.json`：

- **`feeds`**：每项至少含 `url`；可选 `label`（显示名）、`maxItems`（该源本轮最多取几条**未见过的**条目）。
- **`defaults.maxItems`**：单源默认上限。
- **`defaults.userAgent`**：请求头里的 User-Agent，建议保留可联系信息。

未配置任何 feed 时，`npm run content:ingest` 会打印示例 JSON 并退出（成功）。

## 运行

**一键（推荐）**：抓取结束后若在本地生成了新批次，会自动打开（macOS）或用系统默认方式打开最新的 `CURSOR-HANDOFF.md`；不想弹窗时用环境变量关掉。

```bash
npm run content:pull
# 或 shell（等价）：
./scripts/content-pull.sh
# 仅打印路径、不打开文件：
CONTENT_PULL_OPEN=0 npm run content:pull
```

`data/content-ingest.config.json` 已预填一批与 **模型 / 编程工具 / 平台方 / 行业媒体** 相关的 RSS（含 OpenAI、Google AI、DeepMind、Hugging Face、Cursor、GitHub、LangChain、TechCrunch、HN 等）。**首次运行**可能出现较多待改写条目（各源 `maxItems` 之和）；之后主要靠 `.ingest-state.json` 去重，增量会少很多。可按需要删源或把单源 `maxItems` 调小。

只跑抓取、不打开交接稿：

```bash
npm run content:ingest
```

需要联网拉取 RSS。

## 输出说明（历史会不断累积）

| 路径 | 说明 |
|------|------|
| `content/inbox/runs/<stamp>/` | 每次手动运行生成一批；**建议长期保留**，作为「某天抓了哪些原文、交了什么给 AI」的审计轨迹。 |
| `content/inbox/runs/<stamp>/manifest.json` | 本批统计、条目列表、拉取错误 |
| `content/inbox/runs/<stamp>/items/*.json` | 单条：标题、链接、日期、摘要片段、建议文件名等 |
| `content/inbox/runs/<stamp>/CURSOR-HANDOFF.md` | 给 Cursor / AI 的交接说明与可复制提示词 |
| `content/inbox/.last-run.json` | 本地标记最近一次成功批次与交接稿路径，供 `npm run content:pull` 判断是否打开文件（已 `.gitignore`，不提交） |
| `content/inbox/.ingest-state.json` | 按 `guid` / `link` 去重，避免**同一链接反复进箱**；文件会随新条目变大，属正常现象 |

已发布的百科式资讯在 `content/news/locales/**` 中**持续累积**；资讯列表页已对条目做**分页**（默认每页 12 条，URL 使用 `?page=`），避免因文章变多而单页过长。

仅在磁盘压力大时，可**自行归档或压缩**很旧的 `runs/` 子目录；不要删除 `.ingest-state.json`，除非你明确想重新允许历史链接再次进入收件箱（或手工编辑 `seen`）。

## 自动生成中文成稿（可选，需 API Key）

仓库提供 `scripts/generate-news-from-inbox.mjs`：用 **OpenAI 兼容** Chat Completions 接口，把**当前或指定批次**的 `items/*.json` 写成 `content/news/locales/zh-CN/*.md`（带 frontmatter）。仍会**强制**使用条目里的 `date` / `slug`，避免路径与元数据不一致。

1. 在 `.env` 配置其一即可：  
   - **通义千问**：**`DASHSCOPE_API_KEY`**（阿里云百炼 / DashScope；兼容模式，无需改脚本）。默认 **`https://dashscope.aliyuncs.com/compatible-mode/v1`**，模型默认 **`qwen-plus`**（可用 **`NEWS_GEN_MODEL`** 改为 `qwen-turbo`、`qwen-max` 等）。国际区见 **`DASHSCOPE_COMPAT_BASE`**（示例见 `.env.example`）。  
   - **OpenAI / OpenRouter**：**`NEWS_GEN_API_KEY`** 或 **`OPENAI_API_KEY`**，并配 **`NEWS_GEN_BASE_URL`**、**`NEWS_GEN_MODEL`**。若同时写了 **`DASHSCOPE_API_KEY`**，脚本**优先走千问**；要强开 OpenAI 可设 **`NEWS_GEN_PROVIDER=openai`**。
2. 抓取：`npm run content:pull`
3. 生成：`npm run content:generate-news`  
   - 默认处理 **`.last-run.json` 对应批次**；或 `--run=content/inbox/runs/某目录`  
   - `--limit=5` 先试跑条数；`--dry-run` 不调用 API；**`--force`** 覆盖已存在的 md  

一键串联（拉取 → 生成）：

```bash
./scripts/content-ingest-and-generate.sh
```

**说明**：会产生模型费用；事实、语气与版权仍建议你 **通读后再 `git push`**。英文站若需列表展示，仍要补 `locales/en` 或走 `content:news-locales` 既有流程。

## 成稿落库（与现站一致）

- 中文：`content/news/locales/zh-CN/YYYY-MM-DD-slug.md`，frontmatter 含 `title`、`description`、`date`、`slug`（与现有资讯一致）。
- **英文列表**：`news-store` 对 `en` / `zh-CN` 不做跨语言回退。若要在英文站展示，需 **`content/news/locales/en/` 下同 basename 的 `.md`**，或沿用仓库里 **`scripts/lib/news-articles-*.mjs`** + `npm run content:news-locales` 的流程。

## 合规与编辑准则

- 抓取内容仅作**参考与事实核对**，正文须**改写**，勿整段复制许可不明的原文。
- 尊重来源站的 robots / ToS；不适合聚合的来源不要写入配置。
- 不确定时采用「短评 + 外链」而非长摘要。
