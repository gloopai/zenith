---
title: "Five habits for coding with AI: faster and safer"
description: "Branching, tests, sensitive files, dependency bumps, and human review—practical for solo devs and small teams."
date: 2026-03-30
slug: 2026-03-30-ai-coding-habits
---

Assistants are powerful, but **you’re still accountable**. These cut rework and risk.

## 1. Small commits / PRs

Scope changes to something one PR can digest; split big refactors into runnable, revertible steps.

## 2. Auto‑generated code needs a verification path

Spell out manual checks or tests—inputs, expected outputs, edge cases. Don’t merge “trust me” diffs.

## 3. Sensitive files off‑limits by default

Keys, cert paths, prod configs—templates or placeholders locally, real secrets never committed.

## 4. Dependency upgrades on their own PR

Don’t mix feature work with major bumps—bisecting breaks becomes impossible.

## 5. Humans still review for architecture

Models excel at boilerplate; naming and structure still deserve a teammate skim.

Habits beat picking “the best editor.”
