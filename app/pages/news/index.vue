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

    <nav
      v-if="totalPages > 1"
      class="flex flex-col items-center gap-6 border-t border-white/[0.06] pt-10 sm:flex-row sm:justify-between"
      :aria-label="t('newsPage.pagination.navLabel')"
    >
      <p class="text-center text-sm tabular-nums text-zinc-500 sm:text-left">
        {{ t('newsPage.pagination.status', { current: page, total: totalPages, count: total }) }}
      </p>
      <div class="flex flex-wrap justify-center gap-3 sm:justify-end">
        <NuxtLink
          v-if="page > 1"
          :to="pageLink(page - 1)"
          class="btn-secondary inline-flex rounded-xl px-5 py-2.5 text-sm"
        >
          {{ t('newsPage.pagination.prev') }}
        </NuxtLink>
        <NuxtLink
          v-if="page < totalPages"
          :to="pageLink(page + 1)"
          class="btn-secondary inline-flex rounded-xl px-5 py-2.5 text-sm"
        >
          {{ t('newsPage.pagination.next') }}
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { NewsListItem, NewsListResponse } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const PAGE_SIZE = 12

const { t, locale } = useI18n()
const localePath = useLocalePath()
const siteOrigin = useSiteOrigin()
const route = useRoute()

const routePage = computed(() => {
  const raw = route.query.page
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN
  return Number.isFinite(n) && n > 0 ? n : 1
})

function pageLink(p: number) {
  if (p <= 1) return localePath('/news')
  return localePath({ path: '/news', query: { page: String(p) } })
}

const { data } = await useAsyncData(
  () => `news-list-${locale.value}-${routePage.value}`,
  () =>
    $fetch<NewsListResponse>('/api/news', {
      query: {
        locale: (locale.value as string) || I18N_DEFAULT_LOCALE,
        page: routePage.value,
        pageSize: PAGE_SIZE,
      },
    }),
  { watch: [locale, routePage] },
)

const items = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)
const totalPages = computed(() => data.value?.totalPages ?? 1)
const page = computed(() => data.value?.page ?? routePage.value)

const canonical = computed(() => {
  const base = `${siteOrigin.value}${localePath('/news')}`
  if (page.value <= 1) return base
  return `${base}?page=${page.value}`
})

useSeoMeta(
  computed(() => ({
    title: t('seo.newsTitle'),
    description: t('seo.newsDescription'),
    ogTitle: t('seo.newsTitle'),
    ogDescription: t('seo.newsDescription'),
    ogType: 'website',
    ogUrl: canonical.value,
  })),
)

useHead(
  computed(() => {
    const p = page.value
    const tp = totalPages.value
    const origin = siteOrigin.value
    const links: { rel: string; href: string }[] = [{ rel: 'canonical', href: canonical.value }]
    if (p > 1) links.push({ rel: 'prev', href: `${origin}${pageLink(p - 1)}` })
    if (p < tp) links.push({ rel: 'next', href: `${origin}${pageLink(p + 1)}` })
    return { link: links }
  }),
)
</script>
