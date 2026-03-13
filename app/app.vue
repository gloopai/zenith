<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 antialiased">
    <NuxtRouteAnnouncer />

    <header class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_24px_rgba(190,242,100,0.45)]" />
          <span class="text-sm font-semibold tracking-wide">Plunget</span>
        </NuxtLink>

        <nav class="hidden items-center gap-2 sm:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-full px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
            :class="isActive(item.to) ? 'bg-white/10 text-white' : ''"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <NuxtLink
            to="/dashboard"
            class="rounded-full bg-lime-300 px-3 py-1.5 text-sm font-semibold text-slate-950 transition hover:bg-lime-200"
          >
            打开仪表盘
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-4 py-10">
      <NuxtPage />
    </main>
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
  { label: '仪表盘', to: '/dashboard' },
  { label: '策略库', to: '/strategies' },
  { label: '个人中心', to: '/identity' },
] as const

function isActive(path: string) {
  return route.path === path
}
</script>
