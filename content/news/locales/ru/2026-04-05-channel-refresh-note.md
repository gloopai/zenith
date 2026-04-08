---
title: "Обновление сайта: инструменты, навыки OpenClaw и оверлеи"
description: "Manus и Lovable в каталоге; имена Taskflow как у upstream; локализованные оверлеи пересобраны."
date: 2026-04-05
slug: 2026-04-05-channel-refresh-note
---

## Инструменты

В избранное добавлены **Manus** и **Lovable**, категории согласованы с текущей таксономией.

## OpenClaw

Генератор навыков следует **openclaw/openclaw**: **Taskflow** и **taskflow-inbox-triage** вместо старых имён Clawflow. После правок запустите `npm run data:openclaw`, чтобы `data/openclaw-skills.json` совпадал с репозиторием.

## Оверлеи

JSON в `data/i18n/*-overlays` пересобирается скриптом; расширенные тексты — в `scripts/lib/content-overlay-locale-data.mjs`.
