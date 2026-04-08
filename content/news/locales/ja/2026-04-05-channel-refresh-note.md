---
title: "サイト更新：ツール、OpenClaw スキル、オーバーレイ"
description: "Manus / Lovable を掲載。上流の Taskflow 命名に追従。多言語オーバーレイを再生成。"
date: 2026-04-05
slug: 2026-04-05-channel-refresh-note
---

## ツール

**Manus** と **Lovable** をフィーチャーに追加。既存タクソノミーに合わせ、分類の一貫性を保っています。

## OpenClaw

スキル生成は **openclaw/openclaw** に合わせ、**Taskflow** / **taskflow-inbox-triage** へ名称を更新。スクリプト変更後は `npm run data:openclaw` で `data/openclaw-skills.json` を同期してください。

## オーバーレイ

`data/i18n/*-overlays` はビルドスクリプトで再生成。長文説明は `scripts/lib/content-overlay-locale-data.mjs` を参照します。
