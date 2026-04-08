<template>
  <div class="flex flex-col gap-12">
    <header class="max-w-3xl">
      <p class="page-eyebrow">{{ t('clusterPage.eyebrow') }}</p>
      <h1 class="page-title mt-4">{{ t('clusterPage.title') }}</h1>
      <p class="mt-4 text-lg leading-relaxed text-zinc-500">
        {{ t('clusterPage.subtitle') }}
      </p>
    </header>

    <ul class="grid gap-5 md:grid-cols-2">
      <li v-for="c in clusters" :key="c.slug">
        <NuxtLink
          :to="localePath(`/cluster/${c.slug}`)"
          class="glass-card group flex h-full flex-col p-6 transition hover:border-violet-500/15 sm:p-8"
        >
          <div class="flex items-start justify-between gap-3">
            <h2 class="text-lg font-semibold tracking-tight text-white group-hover:text-violet-100">{{ c.title }}</h2>
            <span
              v-if="c.updatedAt"
              class="shrink-0 rounded-lg bg-white/[0.04] px-2 py-1 text-[11px] tabular-nums text-zinc-500"
              >{{ c.updatedAt }}</span
            >
          </div>
          <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-500">{{ c.description }}</p>
          <div
            class="mt-5 border-t border-white/[0.06] pt-5 text-xs font-medium text-zinc-600"
          >
            {{ t('clusterPage.toolCount', { count: c.toolCount }) }}
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ClusterSummary } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const siteOrigin = useSiteOrigin()

const canonical = computed(() => `${siteOrigin.value}${localePath('/cluster')}`)

useSeoMeta(
  computed(() => ({
    title: t('clusterPage.title'),
    description: t('clusterPage.subtitle'),
    ogTitle: t('clusterPage.title'),
    ogDescription: t('clusterPage.subtitle'),
    ogType: 'website',
    ogUrl: canonical.value,
  })),
)

useHead(
  computed(() => ({
    link: [{ rel: 'canonical', href: canonical.value }],
  })),
)

const { data } = await useAsyncData(
  () => `clusters-list-${locale.value}`,
  () =>
    $fetch<{ clusters: ClusterSummary[] }>('/api/clusters', {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale] },
)

const clusters = computed(() => data.value?.clusters ?? [])
</script>
