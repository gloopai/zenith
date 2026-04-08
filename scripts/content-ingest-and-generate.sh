#!/usr/bin/env sh
# 收件箱拉取 + 调用大模型写成 zh-CN 资讯稿（需配置 NEWS_GEN_API_KEY 或 OPENAI_API_KEY）。
set -e
cd "$(dirname "$0")/.."
npm run content:pull
npm run content:generate-news
