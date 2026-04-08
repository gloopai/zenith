---
title: "站上更新：工具、OpenClaw 技能與多語覆寫"
description: "導航列入 Manus、Lovable；技能名與上游 Taskflow 對齊；覆寫層已重新產生。"
date: 2026-04-05
slug: 2026-04-05-channel-refresh-note
---

## 工具

**Manus**、**Lovable** 已列入精選，分類沿用現有詞表（如「對話／通用」「編程／開發」），避免各語系分類漂移。

## OpenClaw

技能產生腳本已對齊 **openclaw/openclaw**：以 **Taskflow**、**taskflow-inbox-triage** 取代舊的 Clawflow 命名。更新腳本後請執行 `npm run data:openclaw`，讓 `data/openclaw-skills.json` 與倉庫一致。

## 覆寫（overlays）

`data/i18n/*-overlays` 由腳本重建；工具與技能的加長說明（含新 slug）來自 `scripts/lib/content-overlay-locale-data.mjs`。
