<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold">Smart Dashboard</h2>
      <p v-if="intent" class="text-sm text-slate-300">
        当前意图：<span class="text-slate-100">{{ intent }}</span>
      </p>
      <p v-else class="text-sm text-slate-300">输入意图后，AI 会生成跨链执行计划与资产看板。</p>
    </div>

    <div class="grid gap-4 lg:grid-cols-12">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur lg:col-span-4">
        <div class="flex items-center justify-between gap-4">
          <div class="text-xs font-semibold tracking-wide text-slate-300">Health Score</div>
          <div class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">组合健康</div>
        </div>

        <div class="mt-4 flex items-center justify-between gap-6">
          <div class="flex flex-col gap-1">
            <div class="text-3xl font-semibold">{{ healthScore }}</div>
            <div class="text-sm text-slate-300">波动率 · 安全等级 · 流动性</div>
          </div>

          <div class="relative h-16 w-16">
            <svg viewBox="0 0 36 36" class="h-full w-full -rotate-90">
              <path
                d="M18 2.5 a 15.5 15.5 0 1 1 0 31 a 15.5 15.5 0 1 1 0 -31"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                stroke-width="3.2"
              />
              <path
                d="M18 2.5 a 15.5 15.5 0 1 1 0 31 a 15.5 15.5 0 1 1 0 -31"
                fill="none"
                :stroke="healthStroke"
                stroke-width="3.2"
                stroke-linecap="round"
                :stroke-dasharray="`${healthScore}, 100`"
              />
            </svg>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-2">
          <div class="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <div class="text-xs text-slate-300">波动率</div>
            <div class="mt-1 text-sm font-semibold">{{ volatility }}%</div>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <div class="text-xs text-slate-300">安全</div>
            <div class="mt-1 text-sm font-semibold">{{ protocolSafety }}/100</div>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <div class="text-xs text-slate-300">流动性</div>
            <div class="mt-1 text-sm font-semibold">{{ liquidity }}/100</div>
          </div>
        </div>

        <div class="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div class="text-xs font-semibold text-slate-300">AI 方案对比</div>
          <div class="mt-3 grid gap-2">
            <div class="rounded-xl border border-white/10 bg-white/5 p-3">
              <div class="flex items-center justify-between gap-3">
                <div class="text-sm font-semibold">方案 A：全美债 RWA</div>
                <span class="rounded-full bg-lime-300/15 px-2.5 py-1 text-xs font-semibold text-lime-200">稳健</span>
              </div>
              <div class="mt-1 text-xs text-slate-300">Ondo / Centrifuge 路径（占位）</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/5 p-3">
              <div class="flex items-center justify-between gap-3">
                <div class="text-sm font-semibold">方案 B：蓝筹 DeFi 组合</div>
                <span class="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200">均衡</span>
              </div>
              <div class="mt-1 text-xs text-slate-300">Aave / Lido / Sky（占位）</div>
            </div>
          </div>
        </div>

        <div v-if="healthScore < 70" class="mt-4 rounded-2xl border border-lime-300/20 bg-lime-300/10 p-4">
          <div class="text-sm font-semibold text-lime-200">当前风险偏高，是否一键对冲？</div>
          <div class="mt-3 flex gap-2">
            <button class="rounded-xl bg-lime-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-lime-200">
              一键对冲
            </button>
            <button class="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15">
              查看原因
            </button>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur lg:col-span-5">
        <div class="flex items-center justify-between gap-4">
          <div class="text-xs font-semibold tracking-wide text-slate-300">Visual Asset Matrix</div>
          <div class="flex flex-wrap gap-2">
            <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">DeFi</span>
            <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">RWA</span>
          </div>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <svg class="h-44 w-44" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="16" />
              <g transform="rotate(-90 60 60)">
                <circle
                  v-for="segment in donutSegments"
                  :key="segment.key"
                  cx="60"
                  cy="60"
                  r="44"
                  fill="none"
                  stroke-width="16"
                  stroke-linecap="butt"
                  :stroke="segment.color"
                  :stroke-dasharray="`${segment.length} ${donutCircumference - segment.length}`"
                  :stroke-dashoffset="segment.offset"
                />
              </g>
              <circle cx="60" cy="60" r="31" fill="rgba(2,6,23,0.65)" />
              <text x="60" y="58" text-anchor="middle" class="fill-slate-100 text-[10px] font-semibold">总资产</text>
              <text x="60" y="74" text-anchor="middle" class="fill-slate-100 text-[12px] font-semibold">$128k</text>
            </svg>
          </div>

          <div class="flex flex-col gap-2">
            <div
              v-for="asset in assets"
              :key="asset.symbol"
              class="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3"
            >
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold">{{ asset.symbol }}</span>
                  <span
                    class="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    :class="asset.kind === 'RWA' ? 'bg-sky-400/15 text-sky-200' : asset.kind === 'DeFi' ? 'bg-lime-300/15 text-lime-200' : 'bg-white/5 text-slate-200'"
                  >
                    {{ asset.kind }}
                  </span>
                </div>
                <div class="mt-0.5 text-xs text-slate-400">{{ asset.label }}</div>
              </div>
              <div class="shrink-0 text-sm font-semibold">{{ asset.weight }}%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur lg:col-span-3">
        <div class="flex items-center justify-between gap-4">
          <div class="text-xs font-semibold tracking-wide text-slate-300">AI 收益预测</div>
          <div class="text-xs text-slate-400">未来 7 天（占位）</div>
        </div>
        <div class="mt-4 h-44 overflow-hidden rounded-xl border border-white/10 bg-slate-950/40">
          <div class="h-full w-full bg-[linear-gradient(90deg,rgba(190,242,100,0.18),rgba(56,189,248,0.08),rgba(190,242,100,0.12))]" />
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <div class="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <div class="text-xs text-slate-300">预估 APY</div>
            <div class="mt-1 text-sm font-semibold">6.4%</div>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <div class="text-xs text-slate-300">执行状态</div>
            <div class="mt-1 text-sm font-semibold">实时监控</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <div class="flex items-center justify-between gap-4">
          <div class="text-xs font-semibold tracking-wide text-slate-300">The Execution Log</div>
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.4)]" />
            <span class="text-xs text-slate-400">LIVE</span>
          </div>
        </div>

        <div
          ref="logRef"
          class="mt-4 h-72 overflow-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 font-mono text-xs leading-5 text-slate-200"
        >
          <div v-for="line in executionLines" :key="line.id" class="whitespace-pre-wrap">
            <span class="text-slate-400">[{{ line.time }}]</span>
            <span class="ml-2">{{ line.text }}</span>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <button class="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10">
            暂停滚动
          </button>
          <button class="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10">
            导出日志
          </button>
          <NuxtLink to="/strategies" class="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-lime-200 transition hover:bg-white/10 hover:text-lime-100">
            去策略库
          </NuxtLink>
        </div>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <div class="text-xs font-semibold tracking-wide text-slate-300">AI 每日财务分析</div>
        <div class="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-6 text-slate-200">
          <p>
            今日组合波动率下降，主要来自 RWA 权重提升与稳定币收益策略的再平衡。建议在保持低风险前提下，
            逐步将高成本跨链路径替换为 L2 聚合执行以降低摩擦成本。
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="rounded-full bg-lime-300/15 px-3 py-1 text-xs font-semibold text-lime-200">低风险</span>
            <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">跨链成本优化</span>
            <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">收益稳定</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

useSeoMeta({
  title: 'Smart Dashboard',
  description: '跨链资产与收益看板（应用内页面）。',
  robots: 'noindex, nofollow',
})

const intent = computed(() => {
  const value = route.query.intent
  return typeof value === 'string' ? value : ''
})

type AssetKind = 'DeFi' | 'RWA' | 'NFT'

const assets = [
  { symbol: 'USDC', label: '稳定币收益路径（占位）', weight: 34, kind: 'DeFi' as const, color: 'rgba(190,242,100,0.9)' },
  { symbol: 'T-Bills', label: '代币化美债（占位）', weight: 40, kind: 'RWA' as const, color: 'rgba(56,189,248,0.75)' },
  { symbol: 'ETH', label: 'L2 蓝筹资产（占位）', weight: 18, kind: 'DeFi' as const, color: 'rgba(129,140,248,0.75)' },
  { symbol: 'NFT', label: '地板价估值（占位）', weight: 8, kind: 'NFT' as const, color: 'rgba(255,255,255,0.22)' },
] as const satisfies ReadonlyArray<{
  symbol: string
  label: string
  weight: number
  kind: AssetKind
  color: string
}>

const donutCircumference = 2 * Math.PI * 44

const donutSegments = computed(() => {
  let offset = 0
  return assets.map((asset) => {
    const length = (asset.weight / 100) * donutCircumference
    const segment = {
      key: asset.symbol,
      color: asset.color,
      length,
      offset: -offset,
    }
    offset += length
    return segment
  })
})

const volatility = ref(22)
const protocolSafety = ref(86)
const liquidity = ref(80)

const healthScore = computed(() => {
  const volatilityScore = Math.max(0, Math.min(100, 100 - volatility.value))
  return Math.round(protocolSafety.value * 0.4 + liquidity.value * 0.3 + volatilityScore * 0.3)
})

const healthStroke = computed(() => {
  if (healthScore.value >= 80) return 'rgba(190,242,100,0.9)'
  if (healthScore.value >= 70) return 'rgba(56,189,248,0.85)'
  return 'rgba(248,113,113,0.9)'
})

type ExecutionLine = { id: string; time: string; text: string }

const executionTemplates = [
  '解析意图：识别为「稳健理财」并拆解约束条件…',
  '扫描多链收益：Arbitrum / Base / Solana…',
  '发现 Ondo U.S. Treasuries 收益率上升，正在准备跨链路由…',
  '计算滑点与失败回滚策略，启用保护阈值…',
  '评估协议安全等级与流动性，生成风险评分…',
  '生成方案 A / B 并等待用户确认执行…',
  '准备账户抽象：Gas 代付与批量签名（占位）…',
  '执行完成：已开启实时风控监控（占位）…',
] as const

const executionLines = ref<ExecutionLine[]>([])
const logRef = ref<HTMLElement | null>(null)

function pad2(value: number) {
  return String(value).padStart(2, '0')
}

function nowTime() {
  const now = new Date()
  return `${pad2(now.getHours())}:${pad2(now.getMinutes())}`
}

function pushLine(text: string) {
  executionLines.value = [
    ...executionLines.value,
    { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, time: nowTime(), text },
  ].slice(-40)
}

let logInterval: ReturnType<typeof setInterval> | undefined
let healthInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  pushLine('Agent 启动：加载资产快照与风控规则…')
  pushLine(intent.value ? `收到用户意图：${intent.value}` : '等待用户输入意图…')

  let idx = 0
  logInterval = setInterval(() => {
    pushLine(executionTemplates[idx % executionTemplates.length]!)
    idx += 1
    nextTick(() => {
      const el = logRef.value
      if (!el) return
      el.scrollTop = el.scrollHeight
    })
  }, 1800)

  healthInterval = setInterval(() => {
    volatility.value = Math.max(8, Math.min(55, Math.round(volatility.value + (Math.random() - 0.45) * 6)))
    protocolSafety.value = Math.max(55, Math.min(95, Math.round(protocolSafety.value + (Math.random() - 0.5) * 4)))
    liquidity.value = Math.max(45, Math.min(95, Math.round(liquidity.value + (Math.random() - 0.5) * 5)))
  }, 2200)
})

onBeforeUnmount(() => {
  if (logInterval) clearInterval(logInterval)
  if (healthInterval) clearInterval(healthInterval)
})
</script>
