<template>
  <div v-if="server" class="flex flex-col gap-10 lg:gap-12">
    <nav class="flex items-center gap-2 text-sm text-zinc-500">
      <NuxtLink class="transition hover:text-zinc-300" :to="localePath('/mcp')">{{
        t('mcpServerPage.breadcrumb')
      }}</NuxtLink>
      <span class="text-zinc-700" aria-hidden="true">/</span>
      <span class="line-clamp-1 text-zinc-300">{{ server.name }}</span>
    </nav>

    <header class="glass-card overflow-hidden p-8 sm:p-10 lg:p-12">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div class="min-w-0 max-w-3xl">
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="rounded-lg px-2.5 py-1 text-xs font-semibold"
              :class="server.official ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'"
            >
              {{ server.official ? t('mcpServerPage.badgeOfficial') : t('mcpServerPage.badgeCommunity') }}
            </span>
            <span v-if="server.featured" class="rounded-lg bg-violet-500/15 px-2.5 py-1 text-xs font-semibold text-violet-200">
              {{ t('mcpServerPage.featured') }}
            </span>
            <span v-if="server.transport" class="rounded-lg bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-200">
              {{ t('mcpServerPage.transport', { transport: server.transport }) }}
            </span>
          </div>
          <h1 class="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{{ server.name }}</h1>
          <p v-if="server.vendor" class="mt-2 text-sm text-zinc-500">
            {{ t('mcpServerPage.vendorBy', { vendor: server.vendor }) }}
          </p>
          <p class="mt-5 text-pretty text-lg leading-relaxed text-zinc-400">
            {{ server.description }}
          </p>
          <div class="mt-8 flex flex-wrap gap-2">
            <span class="pill">{{ server.category }}</span>
            <span v-for="tag in server.tags ?? []" :key="tag" class="pill">{{ tag }}</span>
          </div>
        </div>

        <div class="flex shrink-0 flex-col gap-3 lg:items-end">
          <a
            class="btn-primary inline-flex min-w-[10rem] items-center justify-center rounded-2xl px-6 py-3.5 text-center"
            :href="server.url"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ t('mcpServerPage.viewUpstream') }}
          </a>
          <span class="text-center text-xs text-zinc-600 lg:text-right">{{ t('mcpServerPage.opensNewWindow') }}</span>
        </div>
      </div>
    </header>

    <section v-if="server.install" class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('mcpServerPage.installTitle') }}</h2>
      <pre class="overflow-x-auto rounded-2xl border border-white/[0.06] bg-black/40 p-5 text-sm leading-relaxed text-zinc-200"><code>{{ server.install }}</code></pre>
      <p class="max-w-2xl text-sm leading-relaxed text-zinc-500">{{ t('mcpServerPage.installHint') }}</p>
    </section>

    <section class="border-l-2 border-violet-500/40 pl-6 sm:pl-8">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-500">{{ t('mcpServerPage.notesTitle') }}</h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
        <template v-if="server.official">
          {{ t('mcpServerPage.noteOfficial1') }}
          <strong>{{ server.vendor || t('mcpServerPage.upstreamFallback') }}</strong>
          {{ t('mcpServerPage.noteOfficial2') }}
        </template>
        <template v-else>
          {{ t('mcpServerPage.noteCommunity') }}
        </template>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { McpServer } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, error } = await useAsyncData(
  () => `mcp-server-${slug.value}-${locale.value}`,
  () =>
    $fetch<{ server: McpServer }>(`/api/mcp/${encodeURIComponent(slug.value)}`, {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale, slug] },
)

if (error.value || !data.value?.server) {
  throw createError({ statusCode: 404, statusMessage: t('errors.mcpServerNotFound') })
}

const server = computed(() => data.value!.server)

const siteOrigin = useSiteOrigin()
const canonical = computed(() => `${siteOrigin.value}${localePath(`/mcp/${server.value.slug}`)}`)

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: server.value.name,
  description: server.value.description.slice(0, 500),
  url: canonical.value,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cross-platform',
  offers: { '@type': 'Offer', price: '0' },
}))

useSeoMeta(
  computed(() => ({
    title: server.value.name,
    description: server.value.description.slice(0, 160),
    ogTitle: `${server.value.name} — ${t('mcpServerPage.ogSuffix')}`,
    ogDescription: server.value.description.slice(0, 200),
    ogType: 'article',
    ogUrl: canonical.value,
    twitterTitle: `${server.value.name} — ${t('mcpServerPage.ogSuffix')}`,
    twitterDescription: server.value.description.slice(0, 200),
  })),
)

useHead(
  computed(() => ({
    link: [{ rel: 'canonical', href: canonical.value }],
    script: [
      {
        key: `ldjson-mcp-${server.value.slug}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd.value),
      },
    ],
  })),
)
</script>
