#!/usr/bin/env sh
# 一键：RSS 抓取并在 macOS 上打开最新 CURSOR-HANDOFF.md（与其它平台逻辑见 npm 脚本）。
# 用法：在项目根目录执行 ./scripts/content-pull.sh
set -e
cd "$(dirname "$0")/.."
exec npm run content:pull
