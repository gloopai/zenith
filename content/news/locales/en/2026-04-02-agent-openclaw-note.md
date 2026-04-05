---
title: "Agents and skill packs: from “chatty” to “uses your tools”"
description: "How runtimes like OpenClaw wire CLIs/APIs via Skills—and why you should read SKILL.md carefully."
date: 2026-04-02
slug: 2026-04-02-agent-openclaw-note
---

“Coding chat” and “agents that act consistently in your environment” differ by one layer: **structured tool docs**. Many stacks use a skills folder + `SKILL.md` (or similar) describing when/how to invoke commands; the runtime injects that into the system prompt.

## Four things readers should know

1. **Skills aren’t magic**—they’re **instructions plus guardrails** (binaries, env vars, config).  
2. **Treat third‑party skills as untrusted**—they enter the prompt; malicious text can steer behavior.  
3. **Official repo vs community registry** differ—bundles change with releases; community listings need maintainer checks.  
4. In **hybrid local/cloud**, inject secrets per your security policy—don’t paste keys into chat for convenience.

If you already run an agent stack, spend thirty minutes on the official “skills/tools” docs—it prevents more incidents than chasing every new model drop.
