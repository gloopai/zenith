<template>
  <div class="relative min-h-screen bg-slate-950 text-slate-100 antialiased">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(190,242,100,0.08),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.08),transparent_45%),radial-gradient(circle_at_30%_90%,rgba(99,102,241,0.06),transparent_45%)]" />
      <div class="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950 to-transparent" />
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>

    <NuxtRouteAnnouncer />

    <header class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <NuxtLink to="/" class="group flex items-center gap-3">
          <span
            class="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-slate-950/60 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition group-hover:border-white/15 group-hover:bg-slate-950/70"
          >
            <span class="absolute -inset-2 rounded-2xl bg-lime-300/15 blur-xl opacity-0 transition group-hover:opacity-70" />
            <span class="absolute inset-0 rounded-xl bg-gradient-to-br from-lime-300/18 via-sky-400/10 to-transparent opacity-90" />
            <span class="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)] opacity-70" />
            <svg
              class="relative h-5 w-5 text-lime-200 drop-shadow-[0_0_18px_rgba(190,242,100,0.32)]"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 20V4h6.2a5.1 5.1 0 0 1 0 10.2H7.5"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 9.1h2.2a2.1 2.1 0 0 1 0 4.2H12"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                opacity="0.55"
              />
            </svg>
          </span>

          <span class="flex flex-col leading-none">
            <span
              class="text-[13px] font-black tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-lime-200 via-sky-200 to-slate-100 drop-shadow-[0_0_18px_rgba(56,189,248,0.12)] transition group-hover:from-lime-100 group-hover:via-sky-100"
            >
              PLUNGET
            </span>
            <span class="mt-1 text-[10px] font-semibold tracking-[0.22em] text-slate-400/90">INTENT HUB</span>
          </span>
        </NuxtLink>

        <nav class="hidden items-center gap-1.5 sm:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-full px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
            :class="isActive(item.to) ? 'bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)]' : ''"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <NuxtLink
            to="/dashboard"
            class="rounded-full bg-lime-300 px-3 py-1.5 text-sm font-semibold text-slate-950 transition hover:bg-lime-200 shadow-[0_0_18px_rgba(190,242,100,0.18)]"
          >
            打开仪表盘
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="relative mx-auto w-full max-w-6xl px-4 py-10 sm:py-12">
      <NuxtPage />
    </main>

    <footer class="relative border-t border-white/10 bg-slate-950/40 backdrop-blur">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <span class="h-2 w-2 rounded-full bg-lime-300/80 shadow-[0_0_18px_rgba(190,242,100,0.25)]" />
          <div class="text-xs text-slate-400">© {{ new Date().getFullYear() }} Plunget. All rights reserved.</div>
        </div>
        <div class="flex flex-wrap gap-2 text-xs text-slate-400">
          <span class="pill">AI-first</span>
          <span class="pill">Cross-chain</span>
          <span class="pill">RWA</span>
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
  { label: '仪表盘', to: '/dashboard' },
  { label: '策略库', to: '/strategies' },
  { label: '个人中心', to: '/identity' },
] as const

function isActive(path: string) {
  return route.path === path
}
</script>
