<template>
  <div class="flex flex-col gap-12">
    <header class="max-w-3xl">
      <p class="page-eyebrow">{{ t('mcpPage.eyebrow') }}</p>
      <h1 class="page-title mt-4">{{ t('mcpPage.title') }}</h1>
      <p class="mt-4 text-lg leading-relaxed text-zinc-500">
        {{ t('mcpPage.introBeforeSpecLink') }}
        <a class="link-accent" href="https://modelcontextprotocol.io/" rel="noopener noreferrer" target="_blank">modelcontextprotocol.io</a>
        {{ t('mcpPage.introAfterSpecLink') }}
        <a
          class="link-accent"
          href="https://github.com/modelcontextprotocol/servers"
          rel="noopener noreferrer"
          target="_blank"
          >modelcontextprotocol/servers</a
        >
        {{ t('mcpPage.introAfterRefRepo') }}
        <strong>{{ t('mcpPage.introStrong') }}</strong>
        {{ t('mcpPage.introEnd') }}
      </p>
    </header>

    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="btn-pill"
          :class="sourceFilter === 'all' ? 'btn-pill-active' : ''"
          @click="sourceFilter = 'all'"
        >
          {{ t('mcpPage.filterAll') }}
        </button>
        <button
          type="button"
          class="btn-pill"
          :class="sourceFilter === 'official' ? 'btn-pill-active' : ''"
          @click="sourceFilter = 'official'"
        >
          {{ t('mcpPage.filterOfficial') }}
        </button>
        <button
          type="button"
          class="btn-pill"
          :class="sourceFilter === 'community' ? 'btn-pill-active' : ''"
          @click="sourceFilter = 'community'"
        >
          {{ t('mcpPage.filterCommunity') }}
        </button>
      </div>

      <label class="flex w-full flex-col gap-2 lg:max-w-sm">
        <span class="text-xs font-medium text-zinc-500">{{ t('mcpPage.searchLabel') }}</span>
        <input
          v-model="query"
          type="search"
          class="input"
          :placeholder="t('mcpPage.searchPlaceholder')"
          autocomplete="off"
        />
      </label>
    </div>

    <div class="flex flex-wrap gap-2 text-xs text-zinc-600">
      <span class="rounded-lg bg-white/[0.04] px-2 py-1">{{ t('mcpPage.count', { count: filtered.length }) }}</span>
      <span v-if="sourceFilter !== 'all'" class="rounded-lg bg-white/[0.04] px-2 py-1">{{
        t('mcpPage.filterApplied')
      }}</span>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <NuxtLink
        v-for="server in filtered"
        :key="server.slug"
        :to="localePath(`/mcp/${server.slug}`)"
        class="glass-card group flex flex-col p-6 transition hover:border-violet-500/15 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.12)]"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <div class="text-base font-semibold text-white group-hover:text-violet-100">{{ server.name }}</div>
            <div class="mt-2 line-clamp-4 text-sm leading-relaxed text-zinc-500">{{ server.description }}</div>
          </div>
        </div>
        <div class="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.05] pt-5">
          <span
            class="rounded-lg px-2 py-0.5 text-[11px] font-medium"
            :class="server.official ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'"
          >
            {{ server.official ? t('mcpPage.badgeOfficial') : t('mcpPage.badgeCommunity') }}
          </span>
          <span v-if="server.transport" class="rounded-lg bg-sky-500/15 px-2 py-0.5 text-[11px] font-medium text-sky-200">
            {{ server.transport }}
          </span>
          <span class="pill max-w-full truncate text-[11px]">{{ server.category }}</span>
        </div>
      </NuxtLink>
    </div>

    <p v-if="filtered.length === 0" class="text-center text-sm text-zinc-500">{{ t('mcpPage.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
import type { McpServer } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const siteOrigin = useSiteOrigin()

const canonical = computed(() => `${siteOrigin.value}${localePath('/mcp')}`)

useSeoMeta(
  computed(() => ({
    title: t('seo.mcpTitle'),
    description: t('seo.mcpDescription'),
    ogTitle: t('seo.mcpTitle'),
    ogDescription: t('seo.mcpDescription'),
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
  () => `mcp-servers-${locale.value}`,
  () =>
    $fetch<{ servers: McpServer[] }>('/api/mcp', {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale] },
)

const servers = computed(() => data.value?.servers ?? [])

const sourceFilter = ref<'all' | 'official' | 'community'>('all')
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return servers.value.filter((s) => {
    if (sourceFilter.value === 'official' && !s.official) return false
    if (sourceFilter.value === 'community' && s.official) return false
    if (!q) return true
    const blob = `${s.name} ${s.description} ${(s.tags ?? []).join(' ')} ${s.category} ${s.vendor ?? ''}`.toLowerCase()
    return blob.includes(q)
  })
})
</script>
