<template>
  <article v-if="article" class="flex flex-col gap-10 lg:max-w-3xl">
    <nav class="flex items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/news')">{{ t('articlePage.breadcrumb') }}</NuxtLink>
      <span class="text-zinc-700" aria-hidden="true">/</span>
      <span class="line-clamp-1 text-zinc-400">{{ article.title }}</span>
    </nav>

    <header class="border-b border-white/[0.06] pb-10">
      <time class="text-sm tabular-nums text-zinc-600">{{ article.date }}</time>
      <h1 class="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-tight">
        {{ article.title }}
      </h1>
      <p class="mt-6 text-pretty text-lg leading-relaxed text-zinc-400">
        {{ article.description }}
      </p>
    </header>

    <div class="article-body pb-16">
      <div v-html="article.html" />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { NewsArticle } from '~~/shared/types/site'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, error } = await useAsyncData(
  () => `news-${slug.value}-${locale.value}`,
  () =>
    $fetch<{ article: NewsArticle }>(`/api/news/${encodeURIComponent(slug.value)}`, {
      query: { locale: locale.value },
    }),
  { watch: [locale, slug] },
)

if (error.value || !data.value?.article) {
  throw createError({ statusCode: 404, statusMessage: t('errors.articleNotFound') })
}

const article = computed(() => data.value!.article)

const siteOrigin = useSiteOrigin()
const canonical = computed(() => `${siteOrigin.value}${localePath(`/news/${article.value.slug}`)}`)

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.value.title,
  description: article.value.description,
  datePublished: article.value.date,
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonical.value },
}))

useSeoMeta(
  computed(() => ({
    title: article.value.title,
    description: article.value.description,
    ogTitle: article.value.title,
    ogDescription: article.value.description,
    ogType: 'article',
    ogUrl: canonical.value,
    twitterTitle: article.value.title,
    twitterDescription: article.value.description,
  })),
)

useHead(
  computed(() => ({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd.value),
      },
    ],
  })),
)
</script>
