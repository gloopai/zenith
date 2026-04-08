---
title: "Actualización del sitio: herramientas, skills OpenClaw y overlays"
description: "Manus y Lovable en el directorio; nombres Taskflow como el upstream; overlays localizados regenerados."
date: 2026-04-05
slug: 2026-04-05-channel-refresh-note
---

## Herramientas

**Manus** y **Lovable** entran en destacados con categorías alineadas a la taxonomía actual.

## OpenClaw

El generador de skills sigue **openclaw/openclaw**: **Taskflow** y **taskflow-inbox-triage** sustituyen etiquetas Clawflow antiguas. Tras cambiar el script, ejecuta `npm run data:openclaw` para sincronizar `data/openclaw-skills.json`.

## Overlays

Los JSON en `data/i18n/*-overlays` se reconstruyen; textos largos salen de `scripts/lib/content-overlay-locale-data.mjs`.
