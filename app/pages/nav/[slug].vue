<template>
  <div v-if="tool" class="flex flex-col gap-10 lg:gap-12">
    <nav class="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/')">{{ t('layout.home') }}</NuxtLink>
      <span class="text-zinc-700" aria-hidden="true">/</span>
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/nav')">{{ t('toolPage.breadcrumb') }}</NuxtLink>
      <template v-if="categorySlug">
        <span class="text-zinc-700" aria-hidden="true">/</span>
        <NuxtLink class="transition hover:text-zinc-300" :to="localePath(`/nav/category/${categorySlug}`)">
          {{ tool.category }}
        </NuxtLink>
      </template>
      <span class="text-zinc-700" aria-hidden="true">/</span>
      <span class="text-zinc-300">{{ tool.name }}</span>
    </nav>

    <header class="glass-card overflow-hidden p-8 sm:p-10 lg:p-12">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div class="min-w-0 max-w-3xl">
          <h1 class="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{{ tool.name }}</h1>
          <p class="mt-5 text-pretty text-lg leading-relaxed text-zinc-400">
            {{ tool.description }}
          </p>
          <div class="mt-8 flex flex-wrap gap-2">
            <NuxtLink v-if="categorySlug" :to="localePath(`/nav/category/${categorySlug}`)" class="pill transition hover:border-violet-500/40 hover:text-violet-100">
              {{ tool.category }}
            </NuxtLink>
            <span v-else class="pill">{{ tool.category }}</span>
            <span v-for="tag in tool.tags ?? []" :key="tag" class="pill">{{ tag }}</span>
          </div>
        </div>

        <div class="flex shrink-0 flex-col gap-3 lg:items-end">
          <a
            class="btn-primary inline-flex min-w-[9rem] items-center justify-center rounded-2xl px-6 py-3.5 text-center"
            :href="tool.url"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ t('toolPage.visitSite') }}
          </a>
          <span class="text-center text-xs text-zinc-600 lg:text-right">{{ t('toolPage.opensNewWindow') }}</span>
        </div>
      </div>
    </header>

    <div v-if="seoExtra" class="flex flex-col gap-10">
      <section v-if="seoExtra.suitableFor" class="border-l-2 border-emerald-500/35 pl-6 sm:pl-8">
        <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('toolPage.suitableFor') }}</h2>
        <p class="mt-3 max-w-3xl text-base leading-relaxed text-zinc-400">{{ seoExtra.suitableFor }}</p>
      </section>
      <section v-if="seoExtra.notIdealFor" class="border-l-2 border-amber-500/35 pl-6 sm:pl-8">
        <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('toolPage.notIdealFor') }}</h2>
        <p class="mt-3 max-w-3xl text-base leading-relaxed text-zinc-400">{{ seoExtra.notIdealFor }}</p>
      </section>
      <section v-if="seoExtra.compareHint" class="border-l-2 border-sky-500/35 pl-6 sm:pl-8">
        <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('toolPage.compareHint') }}</h2>
        <p class="mt-3 max-w-3xl text-base leading-relaxed text-zinc-400">{{ seoExtra.compareHint }}</p>
      </section>
      <section v-if="seoExtra.checklistItems?.length" class="border-l-2 border-violet-500/40 pl-6 sm:pl-8">
        <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('toolPage.checklistTitle') }}</h2>
        <ul class="mt-4 list-inside list-disc space-y-2 text-zinc-400">
          <li v-for="(item, i) in seoExtra.checklistItems" :key="i" class="text-sm leading-relaxed">{{ item }}</li>
        </ul>
      </section>
      <section v-if="seoExtra.gscParagraphs?.length" class="border-l-2 border-fuchsia-500/35 pl-6 sm:pl-8">
        <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('toolPage.searchIntentHeading') }}</h2>
        <div class="mt-5 flex max-w-3xl flex-col gap-6">
          <div v-for="(block, i) in seoExtra.gscParagraphs" :key="i">
            <h3 class="text-base font-semibold text-white">{{ block.heading }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-400">{{ block.body }}</p>
          </div>
        </div>
      </section>
    </div>

    <section class="border-l-2 border-violet-500/40 pl-6 sm:pl-8">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('toolPage.useCasesTitle') }}</h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
        {{ t('toolPage.useCasesBody') }}
      </p>
    </section>

    <section v-if="related.length" class="flex flex-col gap-6">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('toolPage.relatedTools') }}</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="r in related"
          :key="r.slug"
          :to="localePath(`/nav/${r.slug}`)"
          class="glass-card flex flex-col p-5 transition hover:border-violet-500/15"
        >
          <span class="font-medium text-white">{{ r.name }}</span>
          <span class="mt-2 line-clamp-2 text-sm text-zinc-500">{{ r.description }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ToolDetailResponse } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, error } = await useAsyncData(
  () => `tool-detail-${slug.value}-${locale.value}`,
  () =>
    $fetch<ToolDetailResponse>(`/api/tools/${encodeURIComponent(slug.value)}`, {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale, slug] },
)

if (error.value || !data.value?.tool) {
  throw createError({ statusCode: 404, statusMessage: t('errors.toolNotFound') })
}

const tool = computed(() => data.value!.tool)
const categorySlug = computed(() => data.value!.categorySlug)
const related = computed(() => data.value!.related ?? [])
const seoExtra = computed(() => data.value!.seoExtra)

const siteOrigin = useSiteOrigin()
const canonical = computed(() => `${siteOrigin.value}${localePath(`/nav/${tool.value.slug}`)}`)
const categoryUrl = computed(() =>
  categorySlug.value ? `${siteOrigin.value}${localePath(`/nav/category/${categorySlug.value}`)}` : null,
)

const defaultOg = computed(() => `${siteOrigin.value}/og-default.png`)

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: tool.value.name,
  description: tool.value.description,
  applicationCategory: 'WebApplication',
  applicationSubCategory: tool.value.category,
  operatingSystem: 'Web',
  url: canonical.value,
  sameAs: tool.value.url,
}))

const breadcrumbJsonLd = computed(() => {
  const items: Record<string, unknown>[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: t('layout.home'),
      item: `${siteOrigin.value}${localePath('/')}`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: t('toolPage.breadcrumb'),
      item: `${siteOrigin.value}${localePath('/nav')}`,
    },
  ]
  let pos = 3
  if (categorySlug.value && categoryUrl.value) {
    items.push({
      '@type': 'ListItem',
      position: pos++,
      name: tool.value.category,
      item: categoryUrl.value,
    })
  }
  items.push({
    '@type': 'ListItem',
    position: pos,
    name: tool.value.name,
    item: canonical.value,
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
})

const faqJsonLd = computed(() => {
  const paragraphs = seoExtra.value?.gscParagraphs
  if (!paragraphs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: paragraphs.map((p) => ({
      '@type': 'Question',
      name: p.heading,
      acceptedAnswer: { '@type': 'Answer', text: p.body },
    })),
  }
})

useSeoMeta(
  computed(() => ({
    title: `${tool.value.name} · ${t('toolPage.titleSuffix')}`,
    description: tool.value.description,
    ogTitle: `${tool.value.name} · ${t('toolPage.ogSuffix')}`,
    ogDescription: tool.value.description,
    ogType: 'article',
    ogUrl: canonical.value,
    ogImage: defaultOg.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    twitterTitle: `${tool.value.name} · ${t('toolPage.ogSuffix')}`,
    twitterDescription: tool.value.description,
    twitterImage: defaultOg.value,
  })),
)

useHead(
  computed(() => {
    const scripts: { key: string; type: string; innerHTML: string }[] = [
      {
        key: `ldjson-tool-${tool.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd.value),
      },
      {
        key: `ldjson-tool-bc-${tool.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbJsonLd.value),
      },
    ]
    const faq = faqJsonLd.value
    if (faq) {
      scripts.push({
        key: `ldjson-tool-faq-${tool.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(faq),
      })
    }
    return { link: [{ rel: 'canonical', href: canonical.value }], script: scripts }
  }),
)
</script>
