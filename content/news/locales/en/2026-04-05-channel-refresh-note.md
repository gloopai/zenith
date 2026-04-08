---
title: "Site refresh: tools, OpenClaw skills, and overlays"
description: "Manus and Lovable join the directory; upstream Taskflow naming is mirrored; localized overlays were regenerated."
date: 2026-04-05
slug: 2026-04-05-channel-refresh-note
---

## Tools

**Manus** and **Lovable** are now in the featured list with categories aligned to the existing taxonomy so “对话 / 通用” and “编程 / 开发” stay consistent across locales.

## OpenClaw

The OpenClaw skills generator follows **openclaw/openclaw** on GitHub: **Taskflow** and **taskflow-inbox-triage** replace the older Clawflow labels. Re-run `npm run data:openclaw` when you bump the script so `data/openclaw-skills.json` matches the repo.

## Overlays

Tool and OpenClaw overlay JSON under `data/i18n/*-overlays` is rebuilt from the overlay script—extended blurbs (including the new tool slugs) pick up from `scripts/lib/content-overlay-locale-data.mjs`.
