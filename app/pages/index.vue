<template>
  <div class="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-10">
    <div class="pointer-events-none absolute inset-0 opacity-80">
      <div class="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl" />
      <div class="absolute -right-32 top-10 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
      <div class="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950/70 to-transparent" />
      <svg class="absolute inset-0 h-full w-full" viewBox="0 0 1200 420" fill="none" preserveAspectRatio="none">
        <path
          d="M0,290 C180,210 260,340 410,280 C560,220 620,120 780,170 C940,220 980,320 1200,240"
          stroke="rgba(190,242,100,0.35)"
          stroke-width="2"
        />
        <path
          d="M0,320 C180,240 260,370 410,310 C560,250 620,150 780,200 C940,250 980,350 1200,270"
          stroke="rgba(56,189,248,0.18)"
          stroke-width="2"
        />
      </svg>
    </div>

    <div class="relative flex flex-col gap-10">
      <div class="flex flex-col gap-5">
        <p class="text-xs font-semibold tracking-[0.25em] text-slate-300">AI · INTENT-BASED · CROSS-CHAIN</p>
        <h1 class="text-balance text-3xl font-semibold leading-tight sm:text-4xl">将复杂操作压缩成一句话意图</h1>
        <p class="max-w-2xl text-pretty text-sm leading-6 text-slate-200 sm:text-base">
          Plunget 以“你想要什么”为入口：一句话表达投资意图，AI 自动扫描多链协议与 RWA，并在后台完成链抽象与 Gas 代付。
        </p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="submit">
        <div class="glass-panel rounded-3xl p-4 backdrop-blur sm:p-5">
          <div class="flex items-center justify-between gap-3">
            <span class="text-xs font-semibold text-slate-300">The Intent Bar</span>
            <span class="kbd">Enter</span>
          </div>

          <div class="mt-3 flex flex-col gap-3 sm:flex-row">
            <div class="relative w-full flex-1">
              <div class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
                <span class="h-2 w-2 rounded-full bg-lime-300/80 shadow-[0_0_20px_rgba(190,242,100,0.35)]" />
              </div>
              <input
                v-model="intent"
                type="text"
                class="input pl-8"
                placeholder="例如：帮我买点稳健的理财（稳定币 / 美债 / 低风险策略）"
                autocomplete="off"
              />
            </div>

            <button
              type="submit"
              class="btn-primary rounded-2xl px-5"
            >
              生成方案
            </button>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold text-slate-400">Quick Intents</span>
            <button
              v-for="quickIntent in quickIntents"
              :key="quickIntent"
              type="button"
              class="btn-pill"
              @click="intent = quickIntent"
            >
              {{ quickIntent }}
            </button>
          </div>
        </div>
      </form>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="glass-card p-5 lg:col-span-2">
          <div class="flex items-center justify-between gap-3">
            <div class="text-xs font-semibold tracking-wide text-slate-300">Trust Banner</div>
            <div class="text-xs text-slate-400">AI 实时监控 · {{ trustLastUpdated }}</div>
          </div>

          <div class="mt-4 grid gap-3 sm:grid-cols-3">
            <div class="glass-panel p-4">
              <div class="text-xs text-slate-300">实时审计协议总数</div>
              <div class="mt-2 text-2xl font-semibold">{{ trustProtocolsAudited }}</div>
              <div class="mt-1 text-xs text-slate-400">覆盖主流 DeFi 与 RWA（占位）</div>
            </div>
            <div class="glass-panel p-4">
              <div class="text-xs text-slate-300">平均滑点保护率</div>
              <div class="mt-2 text-2xl font-semibold">{{ trustSlippageProtection }}%</div>
              <div class="mt-1 text-xs text-slate-400">路由级保护 + 失败回滚（占位）</div>
            </div>
            <div class="glass-panel p-4">
              <div class="text-xs text-slate-300">风险覆盖（链/协议）</div>
              <div class="mt-2 text-2xl font-semibold">{{ trustRiskCoverage }}</div>
              <div class="mt-1 text-xs text-slate-400">波动率 / 流动性 / 安全等级</div>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="rounded-full bg-lime-300/15 px-3 py-1 text-xs font-semibold text-lime-200">可验证路由</span>
            <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">协议风险分层</span>
            <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">异常监测告警</span>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div class="glass-card p-5">
            <div class="text-xs font-semibold text-slate-300">AI Strategy Copilot</div>
            <div class="mt-2 text-sm text-slate-200">自然语言意图 → 多链最优策略</div>
          </div>
          <div class="glass-card p-5">
            <div class="text-xs font-semibold text-slate-300">RWA 投资门户</div>
            <div class="mt-2 text-sm text-slate-200">代币化美债 / 黄金，一键配置</div>
          </div>
          <div class="glass-card p-5">
            <div class="text-xs font-semibold text-slate-300">无感链抽象</div>
            <div class="mt-2 text-sm text-slate-200">自动跨链 + Gas 代付</div>
          </div>
          <div class="glass-card p-5">
            <div class="text-xs font-semibold text-slate-300">自动化资产看板</div>
            <div class="mt-2 text-sm text-slate-200">实时净值 + AI 每日分析</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const description =
  'Plunget 是基于 AI 驱动的意图导向（Intent-based）跨链资产管理平台：一句话表达投资目标，自动扫描多链协议与 RWA，并在后台完成链抽象与 Gas 代付。'

useSeoMeta({
  title: '首页 · Intent Hub',
  description,
  ogTitle: 'Plunget',
  ogDescription: description,
  ogType: 'website',
  twitterTitle: 'Plunget',
  twitterDescription: description,
})

const quickIntentsPool = [
  '配置 60% 稳定币 + 40% 美债',
  '帮我寻找 APY > 8% 且风险等级为 A 的策略',
  '将 Arbitrum 上的多余资产归集到 Base 链理财',
  '寻找年化收益率 > 5% 的稳定币理财，风险评级低',
  '配置 60% 美债 RWA + 40% 稳定币收益组合',
  '帮我降低整体波动率，同时保持正收益',
] as const

const quickIntents = ref<string[]>(quickIntentsPool.slice(0, 3))
const intent = ref<string>(quickIntents.value[0] ?? '')

const trustProtocolsAudited = ref(128)
const trustSlippageProtection = ref(98.6)
const trustRiskCoverage = ref('6 链 / 42 协议')
const trustLastUpdated = ref('—')

function rotateQuickIntents() {
  const pool = [...quickIntentsPool]
  const next: string[] = []
  while (next.length < 3 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length)
    next.push(pool.splice(idx, 1)[0]!)
  }
  quickIntents.value = next
}

function pad2(value: number) {
  return String(value).padStart(2, '0')
}

function updateTrustMetrics() {
  trustProtocolsAudited.value = Math.max(60, Math.round(trustProtocolsAudited.value + (Math.random() - 0.35) * 3))
  trustSlippageProtection.value = Number(
    Math.min(99.9, Math.max(92, trustSlippageProtection.value + (Math.random() - 0.45) * 0.25)).toFixed(1),
  )

  const now = new Date()
  trustLastUpdated.value = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`
}

let quickInterval: ReturnType<typeof setInterval> | undefined
let trustInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  rotateQuickIntents()
  updateTrustMetrics()
  quickInterval = setInterval(rotateQuickIntents, 6000)
  trustInterval = setInterval(updateTrustMetrics, 2500)
})

onBeforeUnmount(() => {
  if (quickInterval) clearInterval(quickInterval)
  if (trustInterval) clearInterval(trustInterval)
})

function submit() {
  const value = intent.value.trim()
  if (!value) return
  router.push({ path: '/dashboard', query: { intent: value } })
}
</script>
