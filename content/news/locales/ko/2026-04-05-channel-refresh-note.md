---
title: "사이트 갱신: 도구, OpenClaw 스킬, 오버레이"
description: "Manus·Lovable 추가. 상위 저장소 Taskflow 명명 반영. 로컬라이즈 오버레이 재생성."
date: 2026-04-05
slug: 2026-04-05-channel-refresh-note
---

## 도구

**Manus**, **Lovable** 를 추천 목록에 추가했습니다. 기존 분류 체계와 맞춰 로케일 간 일관성을 유지합니다.

## OpenClaw

스킬 생성기는 **openclaw/openclaw** 를 따릅니다. **Taskflow**, **taskflow-inbox-triage** 로 이전 Clawflow 라벨을 대체합니다. 스크립트 수정 후 `npm run data:openclaw` 로 `data/openclaw-skills.json` 을 맞추세요.

## 오버레이

`data/i18n/*-overlays` 는 스크립트로 재빌드됩니다. 확장 설명은 `scripts/lib/content-overlay-locale-data.mjs` 에서 관리합니다.
