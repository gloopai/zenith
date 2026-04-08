<template>
  <div class="flex flex-col gap-12">
    <header class="max-w-2xl">
      <p class="page-eyebrow">{{ t('navPage.eyebrow') }}</p>
      <h1 class="page-title mt-4">{{ t('navPage.title') }}</h1>
      <p class="mt-4 text-lg leading-relaxed text-zinc-500">
        {{ t('navPage.subtitle') }}
      </p>
    </header>

    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="btn-pill"
          :class="selectedCategory === '' ? 'btn-pill-active' : ''"
          @click="selectedCategory = ''"
        >
          {{ t('navPage.all') }}
        </button>
        <button
          v-for="c in categories"
          :key="c"
          type="button"
          class="btn-pill"
          :class="selectedCategory === c ? 'btn-pill-active' : ''"
          @click="selectedCategory = c"
        >
          {{ c }}
        </button>
      </div>

      <label class="flex w-full flex-col gap-2 lg:max-w-sm">
        <span class="text-xs font-medium text-zinc-500">{{ t('navPage.searchLabel') }}</span>
        <input
          v-model="query"
          type="search"
          class="input"
          :placeholder="t('navPage.searchPlaceholder')"
          autocomplete="off"
        />
      </label>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <NuxtLink
        v-for="tool in filtered"
        :key="tool.slug"
        :to="localePath(`/nav/${tool.slug}`)"
        class="glass-card group flex flex-col p-6 transition hover:border-violet-500/15 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.12)]"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="text-base font-semibold text-white group-hover:text-violet-100">{{ tool.name }}</div>
            <div class="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">{{ tool.description }}</div>
          </div>
        </div>
        <div class="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.05] pt-5">
          <span class="pill text-[11px]">{{ tool.category }}</span>
          <span
            v-for="tag in tool.tags ?? []"
            :key="tag"
            class="rounded-lg bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-500"
          >
            {{ tag }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <p v-if="filtered.length === 0" class="text-center text-sm text-zinc-500">{{ t('navPage.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Tool } from '~~/shared/types/site'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const siteOrigin = useSiteOrigin()

const canonical = computed(() => `${siteOrigin.value}${localePath('/nav')}`)

useSeoMeta(
  computed(() => ({
    title: t('seo.navTitle'),
    description: t('seo.navDescription'),
    ogTitle: t('seo.navTitle'),
    ogDescription: t('seo.navDescription'),
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
  () => `nav-tools-${locale.value}`,
  () =>
    $fetch<{ tools: Tool[] }>('/api/tools', {
      query: { locale: (locale.value as string) || I18N_DEFAULT_LOCALE },
    }),
  { watch: [locale] },
)

const tools = computed(() => data.value?.tools ?? [])
const categories = computed(() => {
  const s = new Set<string>()
  for (const t of tools.value) s.add(t.category)
  const collator = locale.value.replace('_', '-')
  return [...s].sort((a, b) => a.localeCompare(b, collator))
})

const selectedCategory = ref('')
const query = ref(String(route.query.q ?? ''))

let searchUrlDebounce: ReturnType<typeof setTimeout> | undefined
watch(query, (q) => {
  if (import.meta.server) return
  const next = trimQueryForUrl(q)
  const current = String(route.query.q ?? '').trim()
  if (next === current) return
  if (searchUrlDebounce) clearTimeout(searchUrlDebounce)
  searchUrlDebounce = setTimeout(() => {
    const rq = { ...route.query }
    if (next) rq.q = next
    else delete rq.q
    router.replace({ path: route.path, query: rq })
  }, 350)
})

watch(
  () => route.query.q,
  (q) => {
    const s = String(q ?? '').trim()
    if (s !== query.value.trim()) query.value = s
  },
)

function trimQueryForUrl(q: string) {
  return q.trim().slice(0, 200)
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return tools.value.filter((t) => {
    if (selectedCategory.value && t.category !== selectedCategory.value) return false
    if (!q) return true
    const blob = `${t.name} ${t.description} ${(t.tags ?? []).join(' ')}`.toLowerCase()
    return blob.includes(q)
  })
})
</script>
