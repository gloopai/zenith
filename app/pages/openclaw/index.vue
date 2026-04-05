<template>
  <div class="flex flex-col gap-12">
    <header class="max-w-3xl">
      <p class="page-eyebrow">{{ t('openclawPage.eyebrow') }}</p>
      <h1 class="page-title mt-4">{{ t('openclawPage.title') }}</h1>
      <p class="mt-4 text-lg leading-relaxed text-zinc-500">
        {{ t('openclawPage.introBeforeSkillsLink') }}
        <a class="link-accent" href="https://agentskills.io/" rel="noopener noreferrer" target="_blank">AgentSkills</a>
        {{ t('openclawPage.introAfterSkillsLinkBeforeCode') }}
        <code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-violet-200">SKILL.md</code>
        {{ t('openclawPage.introAfterCode') }}
        <a
          class="link-accent"
          href="https://github.com/openclaw/openclaw/tree/main/skills"
          rel="noopener noreferrer"
          target="_blank"
          >skills/</a
        >
        {{ t('openclawPage.introAfterSkillsDirLink') }}
        <strong>{{ t('openclawPage.introStrong') }}</strong>
        {{ t('openclawPage.introAfterStrong') }}
        <a class="link-accent" href="https://clawhub.com/" rel="noopener noreferrer" target="_blank">ClawHub</a>
        {{ t('openclawPage.introAfterClawhub') }}
        <a class="link-accent" href="https://docs.openclaw.ai/skills/" rel="noopener noreferrer" target="_blank">{{
          t('openclawPage.docsLink')
        }}</a
        >{{ t('openclawPage.introEnd') }}
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
          {{ t('openclawPage.filterAll') }}
        </button>
        <button
          type="button"
          class="btn-pill"
          :class="sourceFilter === 'official' ? 'btn-pill-active' : ''"
          @click="sourceFilter = 'official'"
        >
          {{ t('openclawPage.filterOfficial') }}
        </button>
        <button
          type="button"
          class="btn-pill"
          :class="sourceFilter === 'example' ? 'btn-pill-active' : ''"
          @click="sourceFilter = 'example'"
        >
          {{ t('openclawPage.filterExample') }}
        </button>
      </div>

      <label class="flex w-full flex-col gap-2 lg:max-w-sm">
        <span class="text-xs font-medium text-zinc-500">{{ t('openclawPage.searchLabel') }}</span>
        <input
          v-model="query"
          type="search"
          class="input"
          :placeholder="t('openclawPage.searchPlaceholder')"
          autocomplete="off"
        />
      </label>
    </div>

    <div class="flex flex-wrap gap-2 text-xs text-zinc-600">
      <span class="rounded-lg bg-white/[0.04] px-2 py-1">{{ t('openclawPage.count', { count: filtered.length }) }}</span>
      <span v-if="sourceFilter !== 'all'" class="rounded-lg bg-white/[0.04] px-2 py-1">{{
        t('openclawPage.filterApplied')
      }}</span>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <NuxtLink
        v-for="skill in filtered"
        :key="skill.slug"
        :to="localePath(`/openclaw/${skill.slug}`)"
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
            {{ skill.official ? t('home.official') : t('home.example') }}
          </span>
          <span class="pill max-w-full truncate text-[11px]">{{ skill.category }}</span>
        </div>
      </NuxtLink>
    </div>

    <p v-if="filtered.length === 0" class="text-center text-sm text-zinc-500">{{ t('openclawPage.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
import type { OpenClawSkill } from '~~/shared/types/site'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta(
  computed(() => ({
    title: t('seo.openclawTitle'),
    description: t('seo.openclawDescription'),
    ogTitle: `${t('seo.openclawTitle')} · Plunget`,
    ogDescription: t('seo.openclawDescription'),
    ogType: 'website',
  })),
)

const { data } = await useAsyncData(
  () => `openclaw-skills-${locale.value}`,
  () => $fetch<{ skills: OpenClawSkill[] }>('/api/openclaw', { query: { locale: locale.value } }),
  { watch: [locale] },
)

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
