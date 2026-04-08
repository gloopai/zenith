<template>
  <div class="flex flex-col gap-16 lg:gap-20">
    <section class="relative">
      <div class="max-w-3xl">
        <p class="page-eyebrow">{{ t('home.eyebrow') }}</p>
        <h1 class="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
          {{ t('home.titleLine1') }}<br class="hidden sm:inline" />{{ t('home.titleLine2') }}
        </h1>
        <p class="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
          {{ t('home.subtitle') }}
        </p>

        <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <NuxtLink
            class="btn-primary inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-center"
            :to="localePath('/nav')"
          >
            {{ t('home.enterNav') }}
          </NuxtLink>
          <NuxtLink
            class="btn-secondary inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-center"
            :to="localePath('/openclaw')"
          >
            {{ t('home.openclawSkills') }}
          </NuxtLink>
          <NuxtLink
            class="btn-secondary inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-center"
            :to="localePath('/news')"
          >
            {{ t('home.readNews') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <div class="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <section class="glass-card p-7 sm:p-8">
        <div class="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <h2 class="text-lg font-semibold text-white">{{ t('home.featuredTools') }}</h2>
            <p class="mt-1.5 text-sm text-zinc-500">{{ t('home.featuredToolsHint') }}</p>
          </div>
          <NuxtLink class="link-accent text-sm" :to="localePath('/nav')">{{ t('home.all') }}</NuxtLink>
        </div>

        <ul class="mt-6 grid gap-2">
          <li v-for="tool in featured" :key="tool.slug">
            <NuxtLink
              :to="localePath(`/nav/${tool.slug}`)"
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
            <h2 class="text-lg font-semibold text-white">{{ t('home.latestNews') }}</h2>
            <p class="mt-1.5 text-sm text-zinc-500">{{ t('home.latestNewsHint') }}</p>
          </div>
          <NuxtLink class="link-accent text-sm" :to="localePath('/news')">{{ t('home.all') }}</NuxtLink>
        </div>

        <ul class="mt-6 grid gap-2">
          <li v-for="item in latestNews" :key="item.slug">
            <NuxtLink
              :to="localePath(`/news/${item.slug}`)"
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
          <h2 class="text-lg font-semibold text-white">{{ t('home.scenarioClusters') }}</h2>
          <p class="mt-1.5 text-sm text-zinc-500">{{ t('home.scenarioClustersHint') }}</p>
        </div>
        <NuxtLink class="link-accent shrink-0 text-sm" :to="localePath('/cluster')">{{ t('home.allClusters') }}</NuxtLink>
      </div>
      <ul class="mt-6 grid gap-3 sm:grid-cols-2">
        <li v-for="c in clusterPreview" :key="c.slug">
          <NuxtLink
            :to="localePath(`/cluster/${c.slug}`)"
            class="glass-panel group block rounded-xl p-4 transition hover:border-violet-500/20 hover:bg-white/[0.03]"
          >
            <div class="font-medium text-white group-hover:text-violet-100">{{ c.title }}</div>
            <div class="mt-1 line-clamp-2 text-sm text-zinc-500">{{ c.description }}</div>
            <div class="mt-2 text-[11px] text-zinc-600">{{ t('clusterPage.toolCount', { count: c.toolCount }) }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="glass-card p-7 sm:p-8">
      <div class="flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-white">{{ t('home.openclawSectionTitle') }}</h2>
          <p class="mt-1.5 text-sm text-zinc-500">
            {{ t('home.openclawSectionHint') }}
          </p>
        </div>
        <NuxtLink class="link-accent shrink-0 text-sm" :to="localePath('/openclaw')">{{ t('home.allSkills') }}</NuxtLink>
      </div>
      <ul class="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in openClawPreview" :key="s.slug">
          <NuxtLink
            :to="localePath(`/openclaw/${s.slug}`)"
            class="glass-panel group block rounded-xl p-4 transition hover:border-violet-500/20 hover:bg-white/[0.03]"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-medium text-white group-hover:text-violet-100">{{ s.name }}</span>
              <span
                class="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                :class="s.official ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-200'"
              >
                {{ s.official ? t('home.official') : t('home.example') }}
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
import type { ClusterSummary, NewsListItem, OpenClawSkill, Tool } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const siteOrigin = useSiteOrigin()

const canonical = computed(() => `${siteOrigin.value}${localePath('/')}`)
const navSearchActionTemplate = computed(
  () => `${siteOrigin.value}${localePath('/nav')}?q={search_term_string}`,
)

useSeoMeta(
  computed(() => ({
    title: t('seo.homeTitle'),
    description: t('seo.homeDescription'),
    ogTitle: t('seo.ogHomeTitle'),
    ogDescription: t('seo.homeDescription'),
    ogType: 'website',
    ogUrl: canonical.value,
    twitterTitle: t('seo.ogHomeTitle'),
    twitterDescription: t('seo.homeDescription'),
  })),
)

const homeJsonLd = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${canonical.value}#website`,
        url: canonical.value,
        name: 'Plunget',
        description: t('seo.siteDescription'),
        inLanguage: locale.value.replace(/_/g, '-'),
        publisher: { '@id': `${siteOrigin.value}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: navSearchActionTemplate.value,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteOrigin.value}/#organization`,
        name: 'Plunget',
        url: siteOrigin.value,
        logo: { '@type': 'ImageObject', url: `${siteOrigin.value}/icon.png` },
      },
    ],
  }),
)

useHead(
  computed(() => ({
    link: [{ rel: 'canonical', href: canonical.value }],
    script: [{ key: 'ldjson-home', type: 'application/ld+json', innerHTML: homeJsonLd.value }],
  })),
)

const { data: toolsRes } = await useAsyncData(
  () => `home-tools-${locale.value}`,
  () =>
    $fetch<{ tools: Tool[] }>('/api/tools', {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale] },
)
const { data: newsRes } = await useAsyncData(
  () => `home-news-${locale.value}`,
  () =>
    $fetch<{ items: NewsListItem[] }>('/api/news', {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale] },
)
const { data: openclawRes } = await useAsyncData(
  () => `home-openclaw-${locale.value}`,
  () =>
    $fetch<{ skills: OpenClawSkill[] }>('/api/openclaw', {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale] },
)
const { data: clustersRes } = await useAsyncData(
  () => `home-clusters-${locale.value}`,
  () =>
    $fetch<{ clusters: ClusterSummary[] }>('/api/clusters', {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale] },
)

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

const clusterPreview = computed(() => (clustersRes.value?.clusters ?? []).slice(0, 4))
</script>
