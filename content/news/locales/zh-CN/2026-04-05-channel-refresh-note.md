---
title: "站点更新：工具、OpenClaw 技能与多语言覆写"
description: "导航新增 Manus、Lovable；技能名与上游 Taskflow 对齐；覆写数据已重新生成。"
date: 2026-04-05
slug: 2026-04-05-channel-refresh-note
---

## 工具

**Manus**、**Lovable** 已加入精选列表，分类沿用现有词表（如「对话 / 通用」「编程 / 开发」），减少各语言分类不一致。

## OpenClaw

技能生成脚本已与 **openclaw/openclaw** 仓库对齐：**Taskflow**、**taskflow-inbox-triage** 取代旧的 Clawflow 命名。修改脚本后请运行 `npm run data:openclaw`，使 `data/openclaw-skills.json` 与上游一致。

## 覆写（overlays）

`data/i18n/*-overlays` 由构建脚本重新生成；工具与技能的加长说明（含新 slug）维护在 `scripts/lib/content-overlay-locale-data.mjs`。
