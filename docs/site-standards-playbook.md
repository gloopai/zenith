# 站点规范手册（SEO · 性能 · 结构化数据 · 运维）

面向：**内容型 / 目录型 / 多语言官网**，需兼顾搜索引擎、社交分享与 Core Web Vitals。下一条新项目可按章节逐条落地。

---

## 1. SEO 信息与内容策略

### 1.1 页面层级

| 类型 | 目的 | 要点 |
|------|------|------|
| **分类 / 主题实体页** | 承接长尾词、聚合内链 | 每类独立 URL；标题/描述/导语可编辑；列表链到详情页 |
| **详情页（工具 / 产品 /文章）** | 转化与深度词 | 中立简介 + 官网外链；**不依赖少量外链**完成价值 |
| **列表 / 索引页** | 发现与爬取路径 | 分类 chip 链到实体页；支持搜索；卡片上分类可链到实体页（避免嵌套 `<a>`） |

### 1.2 内链（低成本高收益）

- **面包屑**：可见导航 + 每层可点（首页 → 频道 → 分类 → 详情）。
- **相关推荐**：同分类 / 同意图条目，固定 4–8 条，**稳定内链**。
- **首页**：露出分类入口（chip 或列表），并输出结构化数据中的分类列表（见 §3）。

### 1.3 GSC / 检索意图段落（可运营维护）

- 在数据层预留 **`gscBlocks`（分类页）**、**`gscParagraphs`（详情页）**：结构为 `{ heading, body }`，标题尽量接近真实搜索问句。
- 用 Search Console 导出 **高展现、低满足** 的 query，按 URL **定向补段落**，而非全站堆砌关键词。
- 可与「更适合 / 不太适合 / 对比提示 / 自检清单」等模块并列，统一中性表述。

### 1.4 标题与描述（CTR）

- **列表页**：title / description 交代「分类落地 + 搜索 + 官网直达」等具体利益点。
- **详情页**：`document title` 用「名称 + 站点后缀」；`og:title` 可与 title 略有区分以测 CTR。
- **全站**：布局层提供 **兜底 `meta description`**（`siteDescription`）；各路由 **必须** 再写更贴合的 description，并覆盖布局（子级 `useSeoMeta` 后执行）。

### 1.5 索引与 robots

- **`robots.txt`**：`Sitemap:` **必须是绝对 URL**（含 `https://`），否则易被判无效。
- 动态生成时从环境变量读取站点根 URL（如 `NUXT_PUBLIC_SITE_URL`），与 sitemap 域名一致。
- 默认 **`meta robots: index, follow`**；仅特殊页（预览、后台）再 `noindex`。

---

## 2. 开放图谱与社交

- **默认 OG 图**：**1200×630**，统一路径（如 `/og-default.png`），并在全局 `useSeoMeta` 里写 `og:image` 宽高与类型。
- **详情页**：按需沿用默认图或单独图；保持 `og:url`、`twitter:card`（如 `summary_large_image`）一致。
- **Organization / WebSite**：`logo` 的 ImageObject 可与 OG 主图一致，避免过小的 favicon 当唯一社交图。

---

## 3. 结构化数据（JSON-LD）

按页面类型组合使用（**不保证**富结果，但利于理解页面关系）：

| 页面 | 建议 |
|------|------|
| **详情** | `SoftwareApplication` 或 `Product` / `Article` 等与内容一致的类型 + **BreadcrumbList** |
| **分类 / 主题** | **BreadcrumbList** + **ItemList**（子项带 `url`） |
| **有可运营 Q&A 段落时** | 由 `gscBlocks` / `gscParagraphs` 生成 **FAQPage**（`Question` + `acceptedAnswer`） |
| **首页** | **WebSite**（含 `SearchAction` 若站内搜索可形成 URL 模板）+ **Organization**；可增加 **ItemList** 指向各分类落地页 |

注意：脚本用 `application/ld+json`，避免与可见内容矛盾（不做虚假信息）。

---

## 4. 性能与 Core Web Vitals（不伤害 SEO）

### 4.1 原则

- **首屏不得被第三方 CSS 阻塞**：避免 `<link rel="stylesheet">` 指向 Google Fonts 等；改为 **自托管字体**（如 Fontsource 变量字体）打进构建，`font-display: swap`。
- **字体栈**：定制字体 + `ui-sans-serif` / `system-ui` + 中英系统字体（如 `PingFang SC`、`Microsoft YahHei`），中文场景不依赖拉丁网页字体覆盖中文。

### 4.2 LCP / FCP

- 首屏候选图（如头部 Logo）：`width`/`height` 固定，可适当 **`fetchpriority="high"`**；`decoding="async"` 按场景微调。
- 装饰性背景：`aria-hidden="true"`，减少无意义 DOM 与读屏噪音。

### 4.3 CLS

- 图文预留尺寸；批量用 `font-display: swap` 时接受极小 CLS 或通过系统字体优先控制。

### 4.4 构建与运行时

- **生产环境**关闭前端 DevTools 模块，减轻包体与主线程。
- **未使用的 JS**：进一步拆包需单独评估路由级懒加载，勿为分数大幅改动信息架构。

### 4.5 与 SEO 的一致性

- 性能优化 **不改** 爬虫可见正文、链接与主要 meta；布局级 meta 仅为默认值，**页面级覆盖** title/description/og。

---

## 5. 无障碍与「最佳做法」

- 自动化 Lighthouse 无障碍通过后，仍建议关键流程 **手动**走一遍。
- **CSP、HSTS、COOP、XFO、Trusted Types** 多在 **CDN / 网关 / 服务器** 配置，与框架层分离规划。

---

## 6. 数据与代码结构（可照搬思路）

### 6.1 数据文件（示例）

- **`category-entities.json`**：`canonicalKey`（与主数据分类字段一致）、`slug`、`updatedAt`、多语言 `title` / `description` / `intro` / `gscBlocks`。
- **`tool-seo-extras.json`**（或等价）：key 为条目 slug，`zh-CN` / `en` 等下放 `suitableFor`、`notIdealFor`、`compareHint`、`checklistItems`、`gscParagraphs`。
- **分类 key** 与 **taxonomy** 对齐；详情 API 需能解析 **原始 category key**（不能仅靠本地化后的显示名过滤）。

### 6.2 API 约定（示例）

- 列表 + 分类映射：`GET /api/.../categories` → `{ slug, label, count }`。
- 分类实体：`GET /api/.../category/:slug` → 实体文案 + 该分类下条目列表。
- 详情：`GET /api/.../:slug` → 详情 + `categorySlug`（用于面包屑）+ **related** + **seoExtra**。

### 6.3 Sitemap

- 分类落地页按 locale 输出；`lastmod` 取实体 `updatedAt` 与条目日期的合理 **max**。
- 与 `robots.txt` 中 Sitemap 域名一致。

### 6.4 批量维护脚本

- 用脚本按 **category 模板** 合并 SEO 块：**已手写字段不覆盖**；仅补空字段，便于 GSC 迭代。

---

## 7. 新项目启动检查清单（简版）

- [ ] 环境变量：`SITE_URL` / `NUXT_PUBLIC_SITE_URL` 与生产域名一致  
- [ ] `robots.txt`：绝对 Sitemap；`Allow` 范围正确  
- [ ] 全站兜底 `description` + 逐页专属 `description` / `ogDescription`  
- [ ] 分类实体页 + 详情加厚 + 相关推荐 + 可见面包屑  
- [ ] JSON-LD：面包屑 +（可选）ItemList + FAQ  
- [ ] OG 默认 1200×630；重要模板页单设 og  
- [ ] 字体自托管或无阻塞加载；首屏无 Google Fonts 阻塞 CSS  
- [ ] 生产关 DevTools；监控 LCP/CLS 回归  
- [ ] 多语言：`hreflang`、各 locale 的 title/description 独立维护  

---

## 8. 本仓库中的参考实现（Plunget / zenith）

| 能力 | 路径提示 |
|------|-----------|
| 分类数据 | `data/category-entities.json` |
| 详情 SEO 块 | `data/tool-seo-extras.json`、`scripts/expand-seo-data.mjs` |
| 分类 API / 详情 API | `server/api/nav/*`、`server/api/tools/[slug].get.ts` |
| 分类页 / 详情页 | `app/pages/nav/category/[slug].vue`、`app/pages/nav/[slug].vue` |
| 全局 SEO、兜底 description | `app/app.vue` |
| 字体与 Tailwind | `app/assets/css/main.css`、`@fontsource-variable/plus-jakarta-sans` |
| robots 动态 | `server/routes/robots.txt.get.ts` |
| Sitemap | `server/routes/sitemap.xml.get.ts` |
| 站点根 URL | `shared/site-origin.ts`、`nuxt.config.ts` 中 `siteUrl` |

---

*文档版本：与当前仓库实践对齐；另一站点可复制本手册结构，再按技术栈（Nuxt / Next / 静态站）替换实现路径。*
