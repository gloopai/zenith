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
        <NuxtLink to="/" class="group flex min-w-0 items-center gap-3.5">
          <span
            class="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition group-hover:border-violet-500/25"
          >
            <span
              class="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-600/10 opacity-0 transition group-hover:opacity-100"
            />
            <svg class="relative h-5 w-5 text-violet-200" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3v18M8 8l4-4 4 4M8 16l4 4 4-4"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <span class="min-w-0">
            <span class="block text-[15px] font-bold tracking-[0.2em] text-white">PLUNGET</span>
            <span class="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500">
              AI 导航 · 资讯
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
              isActive(item.to)
                ? 'bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                : ''
            "
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <NuxtLink
            class="hidden rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:from-violet-400 hover:to-fuchsia-500 sm:inline-flex"
            to="/nav"
          >
            探索工具
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08] md:hidden"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-nav"
            @click="mobileOpen = !mobileOpen"
          >
            菜单
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
            to="/nav"
            @click="mobileOpen = false"
          >
            探索工具
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="relative mx-auto w-full max-w-7xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
      <NuxtPage />
    </main>

    <footer class="relative border-t border-white/[0.06] bg-[#06060a]/50">
      <div
        class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8"
      >
        <div>
          <div class="text-sm font-semibold text-white">Plunget</div>
          <p class="mt-1 max-w-sm text-sm leading-relaxed text-zinc-500">精选 AI 工具与行业资讯，一站浏览。</p>
        </div>
        <div class="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
          <a class="transition hover:text-zinc-300" href="/sitemap.xml">网站地图</a>
          <span class="text-zinc-700">·</span>
          <span>© {{ new Date().getFullYear() }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const requestUrl = useRequestURL()

const canonicalUrl = computed(() => `${requestUrl.origin}${route.path}`)

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
}))

const navItems = [
  { label: '首页', to: '/' },
  { label: '导航', to: '/nav' },
  { label: 'OpenClaw', to: '/openclaw' },
  { label: '资讯', to: '/news' },
] as const

const mobileOpen = ref(false)

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>
