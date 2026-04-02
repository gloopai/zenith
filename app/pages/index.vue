<template>
  <div class="flex flex-col gap-16 lg:gap-20">
    <section class="relative">
      <div class="max-w-3xl">
        <p class="page-eyebrow">Plunget</p>
        <h1 class="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
          发现好用的 AI 工具，<br class="hidden sm:inline" />读懂正在发生的变化
        </h1>
        <p class="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
          这里汇集常用产品与站点链接，资讯整理行业动态与观点。版面简洁，手机与电脑都能舒适阅读。
        </p>

        <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <NuxtLink
            class="btn-primary inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-center"
            to="/nav"
          >
            进入导航
          </NuxtLink>
          <NuxtLink
            class="btn-secondary inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-center"
            to="/openclaw"
          >
            OpenClaw 技能
          </NuxtLink>
          <NuxtLink
            class="btn-secondary inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-center"
            to="/news"
          >
            阅读资讯
          </NuxtLink>
        </div>
      </div>
    </section>

    <div class="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <section class="glass-card p-7 sm:p-8">
        <div class="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <h2 class="text-lg font-semibold text-white">精选工具</h2>
            <p class="mt-1.5 text-sm text-zinc-500">编辑挑选，点击查看介绍与官网。</p>
          </div>
          <NuxtLink class="link-accent text-sm" to="/nav">全部</NuxtLink>
        </div>

        <ul class="mt-6 grid gap-2">
          <li v-for="tool in featured" :key="tool.slug">
            <NuxtLink
              :to="`/nav/${tool.slug}`"
              class="glass-panel group block rounded-xl p-4 transition hover:border-violet-500/20 hover:bg-white/[0.03]"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <div class="font-medium text-white group-hover:text-violet-100">{{ tool.name }}</div>
                  <div class="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500">{{ tool.description }}</div>
                </div>
                <span class="shrink-0 rounded-lg bg-white/[0.04] px-2 py-1 text-[11px] font-medium text-zinc-500">
                  {{ tool.category }}
                </span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section class="glass-card p-7 sm:p-8">
        <div class="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <h2 class="text-lg font-semibold text-white">最新资讯</h2>
            <p class="mt-1.5 text-sm text-zinc-500">按日期更新，点标题阅读全文。</p>
          </div>
          <NuxtLink class="link-accent text-sm" to="/news">全部</NuxtLink>
        </div>

        <ul class="mt-6 grid gap-2">
          <li v-for="item in latestNews" :key="item.slug">
            <NuxtLink
              :to="`/news/${item.slug}`"
              class="glass-panel group block rounded-xl p-4 transition hover:border-violet-500/20 hover:bg-white/[0.03]"
            >
              <div class="text-xs font-medium text-zinc-600">{{ item.date }}</div>
              <div class="mt-2 font-medium text-white group-hover:text-violet-100">{{ item.title }}</div>
              <div class="mt-1 line-clamp-2 text-sm text-zinc-500">{{ item.description }}</div>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>

    <section class="glass-card p-7 sm:p-8">
      <div class="flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-white">OpenClaw 技能</h2>
          <p class="mt-1.5 text-sm text-zinc-500">
            AgentSkills 兼容技能包：官方仓库内置与自定义示例，附 GitHub 与文档链接。
          </p>
        </div>
        <NuxtLink class="link-accent shrink-0 text-sm" to="/openclaw">全部技能</NuxtLink>
      </div>
      <ul class="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in openClawPreview" :key="s.slug">
          <NuxtLink
            :to="`/openclaw/${s.slug}`"
            class="glass-panel group block rounded-xl p-4 transition hover:border-violet-500/20 hover:bg-white/[0.03]"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-medium text-white group-hover:text-violet-100">{{ s.name }}</span>
              <span
                class="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                :class="s.official ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-200'"
              >
                {{ s.official ? '官方' : '示例' }}
              </span>
            </div>
            <div class="mt-1 line-clamp-2 text-xs text-zinc-500">{{ s.description }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { NewsListItem, OpenClawSkill, Tool } from '~~/shared/types/site'

const description = 'Plunget：AI 工具导航与资讯。发现产品、阅读动态，桌面与移动端均可使用。'

useSeoMeta({
  title: '首页',
  description,
  ogTitle: 'Plunget',
  ogDescription: description,
  ogType: 'website',
  twitterTitle: 'Plunget',
  twitterDescription: description,
})

const { data: toolsRes } = await useAsyncData('home-tools', () => $fetch<{ tools: Tool[] }>('/api/tools'))
const { data: newsRes } = await useAsyncData('home-news', () => $fetch<{ items: NewsListItem[] }>('/api/news'))
const { data: openclawRes } = await useAsyncData('home-openclaw', () => $fetch<{ skills: OpenClawSkill[] }>('/api/openclaw'))

const featured = computed(() => {
  const list = toolsRes.value?.tools ?? []
  const picks = list.filter((t) => t.featured)
  return picks.length ? picks.slice(0, 4) : list.slice(0, 4)
})

const latestNews = computed(() => (newsRes.value?.items ?? []).slice(0, 4))

const openClawPreview = computed(() => {
  const list = openclawRes.value?.skills ?? []
  const featured = list.filter((s) => s.featured)
  const base = featured.length ? featured : list.filter((s) => s.official)
  return base.slice(0, 6)
})
</script>
