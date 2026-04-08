<template>
  <div v-if="cluster" class="flex flex-col gap-10 lg:gap-12">
    <nav class="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/cluster')">{{ t('clusterPage.breadcrumb') }}</NuxtLink>
      <span class="text-zinc-700" aria-hidden="true">/</span>
      <span class="line-clamp-1 text-zinc-300">{{ cluster.title }}</span>
    </nav>

    <header class="glass-card overflow-hidden p-8 sm:p-10 lg:p-12">
      <div class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span v-if="cluster.updatedAt" class="rounded-lg bg-white/[0.04] px-2 py-1 tabular-nums">{{ cluster.updatedAt }}</span>
          <span class="rounded-lg bg-white/[0.04] px-2 py-1">{{ t('clusterPage.toolCount', { count: cluster.tools.length }) }}</span>
        </div>
        <h1 class="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{{ cluster.title }}</h1>
        <p class="max-w-3xl text-pretty text-lg leading-relaxed text-zinc-400">{{ cluster.description }}</p>
        <div class="max-w-3xl whitespace-pre-line text-base leading-relaxed text-zinc-500">{{ cluster.intro }}</div>
        <NuxtLink
          v-if="showOpenClawCta"
          class="link-accent mt-2 inline-flex w-fit text-sm font-medium"
          :to="localePath('/openclaw')"
          >{{ t('clusterPage.openclawCta') }} →</NuxtLink
        >
      </div>
    </header>

    <section>
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('clusterPage.toolListTitle') }}</h2>
      <ul class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <li v-for="tool in cluster.tools" :key="tool.slug">
          <NuxtLink
            :to="localePath(`/nav/${tool.slug}`)"
            class="glass-card group flex h-full flex-col p-5 transition hover:border-violet-500/15"
          >
            <div class="font-medium text-white group-hover:text-violet-100">{{ tool.name }}</div>
            <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">{{ tool.description }}</p>
            <div class="mt-4 flex flex-wrap gap-2 border-t border-white/[0.05] pt-4">
              <span class="pill text-[11px]">{{ tool.category }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <p v-if="cluster.tools.length === 0" class="mt-6 text-sm text-zinc-500">{{ t('clusterPage.emptyTools') }}</p>
      <p v-else-if="cluster.tools.length < cluster.toolCount" class="mt-6 text-sm text-zinc-600">{{ t('clusterPage.missingToolsHint') }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ClusterDetail } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const siteOrigin = useSiteOrigin()

const { data, error } = await useAsyncData(
  () => `cluster-${slug.value}-${locale.value}`,
  () =>
    $fetch<{ cluster: ClusterDetail }>(`/api/clusters/${encodeURIComponent(slug.value)}`, {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale, slug] },
)

if (error.value || !data.value?.cluster) {
  throw createError({ statusCode: 404, statusMessage: t('clusterPage.notFound') })
}

const cluster = computed(() => data.value!.cluster)
const showOpenClawCta = computed(() => cluster.value.slug === 'openclaw-workspace-automation')

const canonical = computed(() => `${siteOrigin.value}${localePath(`/cluster/${cluster.value.slug}`)}`)

const jsonLd = computed(() => {
  const items = cluster.value.tools.map((tool, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: tool.name,
    url: `${siteOrigin.value}${localePath(`/nav/${tool.slug}`)}`,
  }))
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cluster.value.title,
    description: cluster.value.description,
    url: canonical.value,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items,
    },
  }
})

useSeoMeta(
  computed(() => ({
    title: cluster.value.title,
    description: cluster.value.description,
    ogTitle: cluster.value.title,
    ogDescription: cluster.value.description,
    ogType: 'article',
    ogUrl: canonical.value,
  })),
)

useHead(
  computed(() => ({
    link: [{ rel: 'canonical', href: canonical.value }],
    script: [
      {
        key: `ldjson-cluster-${cluster.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd.value),
      },
    ],
  })),
)
</script>
