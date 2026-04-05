<template>
  <div v-if="tool" class="flex flex-col gap-10 lg:gap-12">
    <nav class="flex items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/nav')">{{ t('toolPage.breadcrumb') }}</NuxtLink>
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
            <span class="pill">{{ tool.category }}</span>
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

    <section class="border-l-2 border-violet-500/40 pl-6 sm:pl-8">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('toolPage.useCasesTitle') }}</h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
        {{ t('toolPage.useCasesBody') }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Tool } from '~~/shared/types/site'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, error } = await useAsyncData(
  () => `tool-${slug.value}-${locale.value}`,
  () =>
    $fetch<{ tool: Tool }>(`/api/tools/${encodeURIComponent(slug.value)}`, {
      query: { locale: locale.value },
    }),
  { watch: [locale, slug] },
)

if (error.value || !data.value?.tool) {
  throw createError({ statusCode: 404, statusMessage: t('errors.toolNotFound') })
}

const tool = computed(() => data.value!.tool)

const siteOrigin = useSiteOrigin()
const canonical = computed(() => `${siteOrigin.value}${localePath(`/nav/${tool.value.slug}`)}`)

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: tool.value.name,
  description: tool.value.description,
  applicationCategory: 'WebApplication',
  operatingSystem: 'Web',
  url: canonical.value,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}))

useSeoMeta(
  computed(() => ({
    title: tool.value.name,
    description: tool.value.description,
    ogTitle: `${tool.value.name} · ${t('toolPage.ogSuffix')}`,
    ogDescription: tool.value.description,
    ogType: 'article',
    ogUrl: canonical.value,
    twitterTitle: `${tool.value.name} · ${t('toolPage.ogSuffix')}`,
    twitterDescription: tool.value.description,
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
