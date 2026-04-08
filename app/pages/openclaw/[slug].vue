<template>
  <div v-if="skill" class="flex flex-col gap-10 lg:gap-12">
    <nav class="flex items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/openclaw')">{{
        t('openclawSkillPage.breadcrumb')
      }}</NuxtLink>
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
              {{ skill.official ? t('openclawSkillPage.badgeOfficial') : t('openclawSkillPage.badgeExample') }}
            </span>
            <span v-if="skill.featured" class="rounded-lg bg-violet-500/15 px-2.5 py-1 text-xs font-semibold text-violet-200">
              {{ t('openclawSkillPage.featured') }}
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
            {{ skill.official ? t('openclawSkillPage.viewGithub') : t('openclawSkillPage.createGuide') }}
          </a>
          <span class="text-center text-xs text-zinc-600 lg:text-right">{{ t('openclawSkillPage.opensNewWindow') }}</span>
        </div>
      </div>
    </header>

    <section class="border-l-2 border-violet-500/40 pl-6 sm:pl-8">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('openclawSkillPage.notesTitle') }}</h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
        <template v-if="skill.official">
          {{ t('openclawSkillPage.noteOfficial1') }}
          <code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-200">skills/{{ skill.slug }}/</code>
          {{ t('openclawSkillPage.noteOfficial2') }}
          <code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-200">openclaw.json</code>
          {{ t('openclawSkillPage.noteOfficial3') }}
        </template>
        <template v-else>
          {{ t('openclawSkillPage.noteExampleBefore') }}
          <strong>{{ t('openclawSkillPage.noteExampleStrong') }}</strong>
          {{ t('openclawSkillPage.noteExampleAfter') }}
          <code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-200">skills/{{ skill.slug }}/SKILL.md</code>
          {{ t('openclawSkillPage.noteExampleAfterCode') }}
        </template>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { OpenClawSkill } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, error } = await useAsyncData(
  () => `openclaw-skill-${slug.value}-${locale.value}`,
  () =>
    $fetch<{ skill: OpenClawSkill }>(`/api/openclaw/${encodeURIComponent(slug.value)}`, {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale, slug] },
)

if (error.value || !data.value?.skill) {
  throw createError({ statusCode: 404, statusMessage: t('errors.skillNotFound') })
}

const skill = computed(() => data.value!.skill)

const siteOrigin = useSiteOrigin()
const canonical = computed(() => `${siteOrigin.value}${localePath(`/openclaw/${skill.value.slug}`)}`)

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: skill.value.name,
  description: skill.value.description.slice(0, 500),
  url: canonical.value,
  about: {
    '@type': 'SoftwareApplication',
    name: 'OpenClaw',
    applicationCategory: 'DeveloperApplication',
  },
}))

useSeoMeta(
  computed(() => ({
    title: skill.value.name,
    description: skill.value.description.slice(0, 160),
    ogTitle: `${skill.value.name} — ${t('openclawSkillPage.ogSuffix')}`,
    ogDescription: skill.value.description.slice(0, 200),
    ogType: 'article',
    ogUrl: canonical.value,
    twitterTitle: `${skill.value.name} — ${t('openclawSkillPage.ogSuffix')}`,
    twitterDescription: skill.value.description.slice(0, 200),
  })),
)

useHead(
  computed(() => ({
    link: [{ rel: 'canonical', href: canonical.value }],
    script: [
      {
        key: `ldjson-openclaw-${skill.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd.value),
      },
    ],
  })),
)
</script>
