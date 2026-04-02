<template>
  <article v-if="article" class="flex flex-col gap-10 lg:max-w-3xl">
    <nav class="flex items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" to="/news">资讯</NuxtLink>
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

const route = useRoute()
const slug = String(route.params.slug ?? '')

const { data, error } = await useAsyncData(
  `news-${slug}`,
  () => $fetch<{ article: NewsArticle }>(`/api/news/${encodeURIComponent(slug)}`),
)

if (error.value || !data.value?.article) {
  throw createError({ statusCode: 404, statusMessage: '未找到该文章' })
}

const article = data.value.article

const siteOrigin = useSiteOrigin()
const canonical = `${siteOrigin.value}/news/${article.slug}`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  datePublished: article.date,
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
}

useSeoMeta({
  title: article.title,
  description: article.description,
  ogTitle: article.title,
  ogDescription: article.description,
  ogType: 'article',
  ogUrl: canonical,
  twitterTitle: article.title,
  twitterDescription: article.description,
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
