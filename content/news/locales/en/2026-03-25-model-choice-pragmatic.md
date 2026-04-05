---
title: "Don’t stop at leaderboards: three practical questions"
description: "Task shape, context window, and failure cost matter more than “strongest model” bragging."
date: 2026-03-25
slug: 2026-03-25-model-choice-pragmatic
---

Communities love “model X crushed benchmarks,” but product teams should answer three practical questions first.

## 1. Mostly reasoning or mostly retrieval?

**Heavy reasoning** (math proofs, gnarly refactors) favors specialized reasoning stacks; **retrieval‑heavy** support bots may hinge more on embeddings and RAG—the base model gap shrinks once infra is solid.

## 2. How much raw text fits per turn?

Massive contracts or repos need both **window size and $/token** to be tolerable. Sometimes “summarize then QA” beats jamming full text.

## 3. What’s the price of being wrong?

In health, finance, or public safety **add a human gate**—document automation boundaries. Strongest models don’t erase product liability.

Leaderboards inform; **scenario and risk** decide.
