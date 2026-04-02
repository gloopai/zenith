<template>
  <div class="flex flex-col gap-10 lg:gap-12">
    <nav class="flex items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" to="/openclaw">OpenClaw 技能</NuxtLink>
      <span class="text-zinc-700" aria-hidden="true">/</span>
      <span class="line-clamp-1 text-zinc-300">{{ skill.name }}</span>
    </nav>

    <header class="glass-card overflow-hidden p-8 sm:p-10 lg:p-12">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div class="min-w-0 max-w-3xl">
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="rounded-lg px-2.5 py-1 text-xs font-semibold"
              :class="skill.official ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'"
            >
              {{ skill.official ? '官方仓库内置' : '自定义命名示例' }}
            </span>
            <span v-if="skill.featured" class="rounded-lg bg-violet-500/15 px-2.5 py-1 text-xs font-semibold text-violet-200">
              精选
            </span>
          </div>
          <h1 class="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{{ skill.name }}</h1>
          <p class="mt-5 text-pretty text-lg leading-relaxed text-zinc-400">
            {{ skill.description }}
          </p>
          <div class="mt-8 flex flex-wrap gap-2">
            <span class="pill">{{ skill.category }}</span>
            <span v-for="tag in skill.tags ?? []" :key="tag" class="pill">{{ tag }}</span>
          </div>
        </div>

        <div class="flex shrink-0 flex-col gap-3 lg:items-end">
          <a
            class="btn-primary inline-flex min-w-[9rem] items-center justify-center rounded-2xl px-6 py-3.5 text-center"
            :href="skill.url"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ skill.official ? '在 GitHub 查看' : '创建技能指南' }}
          </a>
          <span class="text-center text-xs text-zinc-600 lg:text-right">新窗口打开</span>
        </div>
      </div>
    </header>

    <section class="border-l-2 border-violet-500/40 pl-6 sm:pl-8">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">说明</h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
        <template v-if="skill.official">
          技能包位于 OpenClaw 仓库的
          <code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-200">skills/{{ skill.slug }}/</code>
          目录。是否出现在你的代理会话中，取决于环境变量、二进制门控与
          <code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-200">openclaw.json</code>
          配置。
        </template>
        <template v-else>
          本条为教程/社区中常见的<strong>命名与能力拆分示例</strong>，并非仓库内默认文件夹；实现时需自行在
          <code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-200">skills/{{ skill.slug }}/SKILL.md</code>
          编写并遵循 AgentSkills 规范。
        </template>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { OpenClawSkill } from '~~/shared/types/site'

const route = useRoute()
const slug = String(route.params.slug ?? '')

const { data, error } = await useAsyncData(
  `openclaw-skill-${slug}`,
  () => $fetch<{ skill: OpenClawSkill }>(`/api/openclaw/${encodeURIComponent(slug)}`),
)

if (error.value || !data.value?.skill) {
  throw createError({ statusCode: 404, statusMessage: '未找到该技能' })
}

const skill = data.value.skill

const siteOrigin = useSiteOrigin()
const canonical = `${siteOrigin.value}/openclaw/${skill.slug}`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: skill.name,
  description: skill.description.slice(0, 500),
  url: canonical,
  about: {
    '@type': 'SoftwareApplication',
    name: 'OpenClaw',
    applicationCategory: 'DeveloperApplication',
  },
}

useSeoMeta({
  title: skill.name,
  description: skill.description.slice(0, 160),
  ogTitle: `${skill.name} · OpenClaw Skill`,
  ogDescription: skill.description.slice(0, 200),
  ogType: 'article',
  ogUrl: canonical,
  twitterTitle: `${skill.name} · OpenClaw Skill`,
  twitterDescription: skill.description.slice(0, 200),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})
</script>
