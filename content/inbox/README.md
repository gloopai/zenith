# 内容收件箱（`content/inbox`）

- **运行**：本地一键 `npm run content:pull` 或 `./scripts/content-pull.sh`（抓取完成后会尝试打开最新 `CURSOR-HANDOFF.md`）；或只抓取 `npm run content:ingest`。**RSS 源**在 `data/content-ingest.config.json`。
- **抓取结果**：每次运行生成 `runs/YYYY-MM-DD--HHMMSS/`；**建议保留**，便于对照历史批次与 AI 改写。
- **去重状态**：`.ingest-state.json`（按条目 `link` / `guid` 记录已抓取，避免同一链接反复进箱；会随时间变长，正常）。
- **正式资讯**：审核改写后放到 `content/news/locales/zh-CN/`，命名 `YYYY-MM-DD-slug.md`；英文站需同名的 `content/news/locales/en/*.md` 或走你们既有的 `scripts/lib/news-articles-*.mjs` 流水线。

自动生成中文 `.md`（需 API Key）：`npm run content:generate-news`，或 `./scripts/content-ingest-and-generate.sh`（先 pull 再生成）。详见 `docs/content-daily-ingest.md`。
