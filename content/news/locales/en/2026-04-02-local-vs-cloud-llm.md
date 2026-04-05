---
title: "Local vs cloud models: choose by scenario"
description: "Privacy, cost, latency, and capability—quick rules for when to run weights on-device."
date: 2026-04-02
slug: 2026-04-02-local-vs-cloud-llm
---

In 2026 **local inference** (Ollama, LM Studio, vLLM, …) and **cloud APIs** coexist; each owns different scenarios.

## When local first

- Material that **must not leave the network** (docs, code, clinical notes).  
- **High‑frequency, low unit cost** batch jobs if you’ll maintain GPUs/CPU clusters.  
- **Latency‑sensitive** tasks that accept smaller models without a network round‑trip.

## When cloud fits better

- You need **top multimodal, huge context, or latest closed weights** local hardware can’t carry.  
- **Elastic usage** early in a project—pay‑as‑you‑go is simpler.  
- **No ops headcount** for serving and monitoring.

## Practical mix

Same product can be **hybrid**: sensitive prep on‑prem, synthesis and creativity in cloud. Tier data instead of “all local” or “all cloud.”
