---
title: "RAG para empezar: tres bases antes del vector DB"
description: "Fragmentación, fuentes y evaluación pesan más que el primer embedding."
date: 2026-03-31
slug: 2026-03-31-rag-first-steps
---

RAG suena pesado, pero **la v1 puede ser ligera**: docs limpios, trozos simples, recuperación básica, resumen del LLM. Lo que suele fallar son tres cosas.

## 1. Trozos según estructura

Por secciones, cláusulas y tablas—no un corte ciego de N caracteres.

## 2. Respuestas con procedencia

Citas o página en UI/logs. Sin eso no defiendes alucinaciones.

## 3. Mini eval

Preguntas reales + puntos esperados tras cada cambio de modelo o troceo.**Las corazonadas mienten; la tabla no.**

Vector DB y rerank después; sin bases solo amplificas ruido.
