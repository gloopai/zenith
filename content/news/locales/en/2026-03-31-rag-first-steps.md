---
title: "RAG 101: skip the vector DB drama until three basics hold"
description: "Chunking, provenance, and evaluation matter more than which embedding you pick first."
date: 2026-03-31
slug: 2026-03-31-rag-first-steps
---

RAG sounds heavy, but **v1 can stay lean**: cleaned docs, simple splits, basic retrieval, LLM summary. Most failures come from these three gaps.

## 1. Chunks should respect document structure

Split on headings, clauses, and tables—not a blind 500‑character razor. Contracts and legal text especially—“half sentences” in results break trust.

## 2. Answers must point back to sources

Surface quotes or page numbers in UI or logs. RAG without provenance leaves you defenseless when the model hallucinates.

## 3. Keep a tiny eval set

A dozen real questions plus expected bullet answers—rerun after every model or chunk change.**Vibes lie; spreadsheets don’t.**

Add vector stores and rerankers later; without the trio above, engineering only amplifies noise.
