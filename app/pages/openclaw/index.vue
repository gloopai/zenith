<template>
  <div class="flex flex-col gap-12">
    <header class="max-w-3xl">
      <p class="page-eyebrow">OpenClaw</p>
      <h1 class="page-title mt-4">技能目录</h1>
      <p class="mt-4 text-lg leading-relaxed text-zinc-500">
        OpenClaw 使用与
        <a class="link-accent" href="https://agentskills.io/" rel="noopener noreferrer" target="_blank">AgentSkills</a>
        兼容的 <code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-violet-200">SKILL.md</code>
        技能包，教代理如何调用 CLI、API 与工具链。下列为官方仓库
        <a class="link-accent" href="https://github.com/openclaw/openclaw/tree/main/skills" rel="noopener noreferrer" target="_blank">skills/</a>
        已打包条目，以及文档与教程中常见的<strong>自定义命名示例</strong>（已标注为示例）。更多可浏览
        <a class="link-accent" href="https://clawhub.com/" rel="noopener noreferrer" target="_blank">ClawHub</a>
        与
        <a class="link-accent" href="https://docs.openclaw.ai/skills/" rel="noopener noreferrer" target="_blank">官方文档</a>。
      </p>
    </header>

    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="btn-pill"
          :class="sourceFilter === 'all' ? 'btn-pill-active' : ''"
          @click="sourceFilter = 'all'"
        >
          全部
        </button>
        <button
          type="button"
          class="btn-pill"
          :class="sourceFilter === 'official' ? 'btn-pill-active' : ''"
          @click="sourceFilter = 'official'"
        >
          官方内置
        </button>
        <button
          type="button"
          class="btn-pill"
          :class="sourceFilter === 'example' ? 'btn-pill-active' : ''"
          @click="sourceFilter = 'example'"
        >
          自定义示例
        </button>
      </div>

      <label class="flex w-full flex-col gap-2 lg:max-w-sm">
        <span class="text-xs font-medium text-zinc-500">搜索</span>
        <input v-model="query" type="search" class="input" placeholder="名称、描述或标签" autocomplete="off" />
      </label>
    </div>

    <div class="flex flex-wrap gap-2 text-xs text-zinc-600">
      <span class="rounded-lg bg-white/[0.04] px-2 py-1">共 {{ filtered.length }} 条</span>
      <span v-if="sourceFilter !== 'all'" class="rounded-lg bg-white/[0.04] px-2 py-1">筛选已应用</span>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <NuxtLink
        v-for="skill in filtered"
        :key="skill.slug"
        :to="`/openclaw/${skill.slug}`"
        class="glass-card group flex flex-col p-6 transition hover:border-violet-500/15 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.12)]"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <div class="text-base font-semibold text-white group-hover:text-violet-100">{{ skill.name }}</div>
            <div class="mt-2 line-clamp-4 text-sm leading-relaxed text-zinc-500">{{ skill.description }}</div>
          </div>
        </div>
        <div class="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.05] pt-5">
          <span
            class="rounded-lg px-2 py-0.5 text-[11px] font-medium"
            :class="skill.official ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'"
          >
            {{ skill.official ? '官方' : '示例' }}
          </span>
          <span class="pill max-w-full truncate text-[11px]">{{ skill.category }}</span>
        </div>
      </NuxtLink>
    </div>

    <p v-if="filtered.length === 0" class="text-center text-sm text-zinc-500">没有符合筛选的结果。</p>
  </div>
</template>

<script setup lang="ts">
import type { OpenClawSkill } from '~~/shared/types/site'

const description =
  'OpenClaw AgentSkills 技能目录：官方仓库内置技能与自定义命名示例，附说明与链接。'

useSeoMeta({
  title: 'OpenClaw 技能',
  description,
  ogTitle: 'OpenClaw 技能 · Plunget',
  ogDescription: description,
  ogType: 'website',
})

const { data } = await useAsyncData('openclaw-skills', () => $fetch<{ skills: OpenClawSkill[] }>('/api/openclaw'))

const skills = computed(() => data.value?.skills ?? [])

const sourceFilter = ref<'all' | 'official' | 'example'>('all')
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return skills.value.filter((s) => {
    if (sourceFilter.value === 'official' && !s.official) return false
    if (sourceFilter.value === 'example' && s.official) return false
    if (!q) return true
    const blob = `${s.name} ${s.description} ${(s.tags ?? []).join(' ')} ${s.category}`.toLowerCase()
    return blob.includes(q)
  })
})
</script>
