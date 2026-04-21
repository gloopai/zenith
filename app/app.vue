<template>
  <div class="font-sans relative min-h-screen bg-[#06060a] text-zinc-100 antialiased">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute -left-[20%] top-[-30%] h-[70vh] w-[70vh] rounded-full bg-violet-600/[0.12] blur-[120px]"
      />
      <div
        class="absolute -right-[15%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-fuchsia-600/[0.08] blur-[100px]"
      />
      <div
        class="absolute bottom-[-20%] left-[20%] h-[50vh] w-[50vh] rounded-full bg-indigo-600/[0.07] blur-[110px]"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,200,0.12),transparent)]"
      />
    </div>

    <NuxtRouteAnnouncer />

    <header class="sticky top-0 z-50 border-b border-white/[0.06] bg-[#06060a]/75 backdrop-blur-2xl">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <NuxtLink :to="localePath('/')" class="group flex min-w-0 items-center gap-3.5">
          <span
            class="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl transition-opacity group-hover:opacity-90"
          >
            <img
              src="/icon.png"
              alt=""
              width="40"
              height="40"
              class="h-full w-full object-cover"
              decoding="async"
            />
          </span>

          <span class="min-w-0">
            <span class="block text-[15px] font-bold tracking-[0.2em] text-white">PLUNGET</span>
            <span class="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500">
              {{ t('layout.tagline') }}
            </span>
          </span>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
            :class="
              isActiveNav(item.to)
                ? 'bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                : ''
            "
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex shrink-0 items-center gap-2">
          <NuxtLink
            class="hidden rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:from-violet-400 hover:to-fuchsia-500 sm:inline-flex"
            :to="localePath('/nav')"
          >
            {{ t('layout.exploreTools') }}
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08] md:hidden"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-nav"
            @click="mobileOpen = !mobileOpen"
          >
            {{ t('layout.menu') }}
          </button>
        </div>
      </div>

      <div
        v-show="mobileOpen"
        id="mobile-nav"
        class="border-t border-white/[0.06] bg-[#06060a]/95 px-5 py-4 backdrop-blur-xl md:hidden"
      >
        <nav class="flex flex-col gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <NuxtLink
            class="mt-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 py-2.5 text-center text-sm font-semibold text-white"
            :to="localePath('/nav')"
            @click="mobileOpen = false"
          >
            {{ t('layout.exploreTools') }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="relative mx-auto w-full max-w-7xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
      <NuxtPage />
    </main>

    <footer class="relative border-t border-white/[0.06] bg-[#06060a]/50">
      <div
        class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-start sm:justify-between lg:px-8"
      >
        <div class="min-w-0 flex-1">
          <div class="text-sm font-semibold text-white">Plunget</div>
          <p class="mt-1 max-w-sm text-sm leading-relaxed text-zinc-500">{{ t('layout.footerDescription') }}</p>
          <nav
            class="mt-5 flex flex-wrap gap-x-3 gap-y-2 border-t border-white/[0.06] pt-5 text-xs font-medium text-zinc-500"
            :aria-label="t('layout.language')"
          >
            <NuxtLink
              v-for="loc in localeLinks"
              :key="`f-${loc.code}`"
              :to="switchLocalePath(loc.code)"
              :hreflang="hreflangFor(loc)"
              rel="alternate"
              class="transition hover:text-zinc-300 [&[aria-current='page']]:text-violet-300"
              :aria-current="locale === loc.code ? 'page' : undefined"
            >
              {{ loc.name }}
            </NuxtLink>
          </nav>
        </div>
        <div class="flex flex-wrap items-center gap-6 text-sm text-zinc-500 sm:shrink-0 sm:flex-col sm:items-end sm:gap-3">
          <a class="transition hover:text-zinc-300" href="/sitemap.xml">{{ t('layout.sitemap') }}</a>
          <span class="text-zinc-700 sm:hidden">·</span>
          <span>© {{ new Date().getFullYear() }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { LOCALE_NATIVE_LABELS } from '~~/shared/i18n-public'

const route = useRoute()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const i18nHead = useLocaleHead({ dir: true, lang: true, seo: true })

useHead(() => ({
  htmlAttrs: {
    ...i18nHead.value.htmlAttrs,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}))

type LocaleLink = { code: string; name: string; language: string }

const localeLinks = computed((): LocaleLink[] =>
  locales.value.map((l) => {
    const code = typeof l === 'string' ? l : (l.code ?? '')
    const fallback =
      typeof l === 'object' && l !== null && typeof (l as { name?: string }).name === 'string'
        ? (l as { name: string }).name
        : code
    const language =
      typeof l === 'object' && l !== null && typeof (l as { language?: string }).language === 'string'
        ? (l as { language: string }).language
        : code
    const native = LOCALE_NATIVE_LABELS[code as keyof typeof LOCALE_NATIVE_LABELS]
    const name = native ?? fallback
    return { code, name, language }
  }),
)

function hreflangFor(loc: LocaleLink) {
  return loc.language.replace(/_/g, '-')
}

const navItems = computed(() => [
  { label: t('layout.home'), to: localePath('/') },
  { label: t('layout.nav'), to: localePath('/nav') },
  { label: t('layout.cluster'), to: localePath('/cluster') },
  { label: t('layout.mcp'), to: localePath('/mcp') },
  { label: t('layout.openclaw'), to: localePath('/openclaw') },
  { label: t('layout.news'), to: localePath('/news') },
])

const mobileOpen = ref(false)

function isActiveNav(path: string) {
  const p = route.path
  if (p === path) return true
  if (path !== '/' && p.startsWith(`${path}/`)) return true
  return false
}
</script>
