<template>
  <div v-if="payload" class="flex flex-col gap-10 lg:gap-12">
    <nav class="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/')">{{ t('layout.home') }}</NuxtLink>
      <span class="text-zinc-700" aria-hidden="true">/</span>
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/nav')">{{ t('categoryPage.breadcrumbNav') }}</NuxtLink>
      <span class="text-zinc-700" aria-hidden="true">/</span>
      <span class="text-zinc-300">{{ payload.title }}</span>
    </nav>

    <header class="glass-card overflow-hidden p-8 sm:p-10 lg:p-12">
      <p class="page-eyebrow">{{ t('categoryPage.eyebrow') }}</p>
      <h1 class="page-title mt-4 text-balance">{{ payload.title }}</h1>
      <p class="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-zinc-400">
        {{ payload.description }}
      </p>
      <p v-if="payload.intro" class="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-zinc-500">
        {{ payload.intro }}
      </p>
    </header>

    <section v-if="payload.gscBlocks?.length" class="border-l-2 border-violet-500/40 pl-6 sm:pl-8">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('categoryPage.searchIntentHeading') }}</h2>
      <div class="mt-5 flex flex-col gap-6">
        <div v-for="(block, i) in payload.gscBlocks" :key="i">
          <h3 class="text-base font-semibold text-white">{{ block.heading }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-zinc-400">{{ block.body }}</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('categoryPage.toolsInCategory') }}</h2>
      <p class="mt-2 text-xs text-zinc-600">{{ t('categoryPage.toolsHint') }}</p>

      <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="tool in payload.tools"
          :key="tool.slug"
          :to="localePath(`/nav/${tool.slug}`)"
          class="glass-card group flex flex-col p-6 transition hover:border-violet-500/15 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.12)]"
        >
          <div class="text-base font-semibold text-white group-hover:text-violet-100">{{ tool.name }}</div>
          <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">{{ tool.description }}</p>
          <div class="mt-5 flex flex-wrap gap-2 border-t border-white/[0.05] pt-5">
            <span class="pill text-[11px]">{{ tool.category }}</span>
          </div>
        </NuxtLink>
      </div>

      <p v-if="payload.tools.length === 0" class="mt-8 text-center text-sm text-zinc-500">{{ t('categoryPage.empty') }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { CategoryDetailResponse } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const siteOrigin = useSiteOrigin()

const { data, error } = await useAsyncData(
  () => `category-${slug.value}-${locale.value}`,
  () =>
    $fetch<CategoryDetailResponse>(`/api/nav/category/${encodeURIComponent(slug.value)}`, {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale, slug] },
)

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: t('categoryPage.notFound') })
}

const payload = computed(() => data.value!)

const canonical = computed(() => `${siteOrigin.value}${localePath(`/nav/category/${payload.value.slug}`)}`)

const breadcrumbJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: t('layout.home'),
      item: `${siteOrigin.value}${localePath('/')}`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: t('categoryPage.breadcrumbNav'),
      item: `${siteOrigin.value}${localePath('/nav')}`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: payload.value.title,
      item: canonical.value,
    },
  ],
}))

const itemListJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: payload.value.title,
  description: payload.value.description,
  numberOfItems: payload.value.tools.length,
  itemListElement: payload.value.tools.map((tool, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: tool.name,
    url: `${siteOrigin.value}${localePath(`/nav/${tool.slug}`)}`,
  })),
}))

const defaultOg = computed(() => `${siteOrigin.value}/og-default.png`)

const faqJsonLd = computed(() => {
  const blocks = payload.value.gscBlocks
  if (!blocks?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: blocks.map((b) => ({
      '@type': 'Question',
      name: b.heading,
      acceptedAnswer: { '@type': 'Answer', text: b.body },
    })),
  }
})

useSeoMeta(
  computed(() => ({
    title: payload.value.title,
    description: payload.value.description,
    ogTitle: `${payload.value.title} · ${t('categoryPage.ogSuffix')}`,
    ogDescription: payload.value.description,
    ogType: 'website',
    ogUrl: canonical.value,
    ogImage: defaultOg.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    twitterTitle: `${payload.value.title} · ${t('categoryPage.ogSuffix')}`,
    twitterDescription: payload.value.description,
    twitterImage: defaultOg.value,
  })),
)

useHead(
  computed(() => {
    const scripts: { key: string; type: string; innerHTML: string }[] = [
      {
        key: `ldjson-category-bc-${payload.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbJsonLd.value),
      },
      {
        key: `ldjson-category-items-${payload.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(itemListJsonLd.value),
      },
    ]
    const faq = faqJsonLd.value
    if (faq) {
      scripts.push({
        key: `ldjson-category-faq-${payload.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(faq),
      })
    }
    return { link: [{ rel: 'canonical', href: canonical.value }], script: scripts }
  }),
)
</script>
