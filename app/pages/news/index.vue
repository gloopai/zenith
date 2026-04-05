<template>
  <div class="flex flex-col gap-12">
    <header class="max-w-2xl">
      <p class="page-eyebrow">{{ t('newsPage.eyebrow') }}</p>
      <h1 class="page-title mt-4">{{ t('newsPage.title') }}</h1>
      <p class="mt-4 text-lg leading-relaxed text-zinc-500">{{ t('newsPage.subtitle') }}</p>
    </header>

    <ul class="flex flex-col gap-4">
      <li v-for="item in items" :key="item.slug">
        <NuxtLink
          :to="localePath(`/news/${item.slug}`)"
          class="glass-card group block p-6 transition hover:border-violet-500/15 sm:p-8"
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <time class="shrink-0 text-sm tabular-nums text-zinc-600">{{ item.date }}</time>
            <div class="min-w-0 flex-1">
              <h2 class="text-xl font-semibold tracking-tight text-white group-hover:text-violet-100 sm:text-2xl">
                {{ item.title }}
              </h2>
              <p class="mt-2 text-base leading-relaxed text-zinc-500">{{ item.description }}</p>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <p v-if="items.length === 0" class="text-center text-sm text-zinc-500">{{ t('newsPage.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
import type { NewsListItem } from '~~/shared/types/site'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta(
  computed(() => ({
    title: t('seo.newsTitle'),
    description: t('seo.newsDescription'),
    ogTitle: `${t('seo.newsTitle')} · Plunget`,
    ogDescription: t('seo.newsDescription'),
    ogType: 'website',
  })),
)

const { data } = await useAsyncData(
  () => `news-list-${locale.value}`,
  () => $fetch<{ items: NewsListItem[] }>('/api/news', { query: { locale: locale.value } }),
  { watch: [locale] },
)

const items = computed(() => data.value?.items ?? [])
</script>
