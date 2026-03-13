<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-2xl font-semibold">Strategy Store / RWA Portal</h2>
        <p class="mt-2 text-sm text-slate-300">像购物一样选择投资方案：筛选资产来源，查看回测曲线，一键部署。</p>
      </div>
      <div class="text-xs text-slate-400">Simulation：1000 USDT · 30 天</div>
    </div>

    <div class="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur lg:grid-cols-12">
      <div class="lg:col-span-5">
        <label class="text-xs font-semibold text-slate-300">资产来源</label>
        <select
          v-model="sourceFilter"
          class="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-lime-300/40 focus:outline-none focus:ring-2 focus:ring-lime-300/20"
        >
          <option value="all">全部</option>
          <option v-for="source in sources" :key="source" :value="source">{{ source }}</option>
        </select>
      </div>

      <div class="lg:col-span-3">
        <label class="text-xs font-semibold text-slate-300">风险等级</label>
        <select
          v-model="riskFilter"
          class="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-lime-300/40 focus:outline-none focus:ring-2 focus:ring-lime-300/20"
        >
          <option value="all">全部</option>
          <option v-for="risk in risks" :key="risk" :value="risk">{{ risk }}</option>
        </select>
      </div>

      <div class="lg:col-span-4">
        <label class="text-xs font-semibold text-slate-300">排序</label>
        <select
          v-model="sortKey"
          class="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-lime-300/40 focus:outline-none focus:ring-2 focus:ring-lime-300/20"
        >
          <option value="apy_desc">收益率（高→低）</option>
          <option value="apy_asc">收益率（低→高）</option>
          <option value="risk_asc">风险（低→高）</option>
        </select>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div
        v-for="strategy in filteredStrategies"
        :key="strategy.id"
        class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
      >
        <div class="absolute inset-0 opacity-0 transition group-hover:opacity-100">
          <div class="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-lime-300/10 blur-3xl" />
          <div class="absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <div class="relative flex flex-col gap-4">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <div class="truncate text-lg font-semibold">{{ strategy.name }}</div>
              <div class="mt-1 text-sm text-slate-300">{{ strategy.description }}</div>
            </div>
            <div class="shrink-0 rounded-full bg-lime-300/15 px-3 py-1 text-xs font-semibold text-lime-200">
              APY {{ formatApy(strategy.apy) }}
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <div class="flex items-center justify-between gap-3">
                <div class="text-xs font-semibold text-slate-300">历史回测曲线</div>
                <div class="text-xs text-slate-400">30D（占位）</div>
              </div>
              <svg class="mt-3 h-12 w-full" viewBox="0 0 160 48" preserveAspectRatio="none">
                <polyline
                  :points="sparklinePoints(strategy.backtest)"
                  fill="none"
                  stroke="rgba(190,242,100,0.75)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline
                  :points="sparklinePoints(strategy.backtest)"
                  fill="none"
                  stroke="rgba(190,242,100,0.2)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">{{ strategy.source }}</span>
                <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">风险：{{ strategy.risk }}</span>
              </div>
            </div>

            <div class="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <div class="flex items-center justify-between gap-3">
                <div class="text-xs font-semibold text-slate-300">协议组合</div>
                <div class="text-xs text-slate-400">{{ strategy.chains.join(' / ') }}</div>
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="protocol in strategy.protocols"
                  :key="protocol"
                  class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                >
                  {{ protocol }}
                </span>
              </div>

              <div class="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
                <div class="flex items-center justify-between gap-3">
                  <div class="text-xs font-semibold text-slate-300">Simulation Mode</div>
                  <button
                    type="button"
                    class="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:bg-white/10 md:hidden"
                    @click="toggleSimulation(strategy.id)"
                  >
                    {{ activeSimulationId === strategy.id ? '收起' : '模拟' }}
                  </button>
                </div>
                <div
                  class="mt-2 text-sm text-slate-200"
                  :class="activeSimulationId === strategy.id ? '' : 'hidden md:block'"
                >
                  投入 <span class="font-semibold text-white">1000 USDT</span>，预计 30 天后：
                  <span class="font-semibold text-lime-200">{{ simulateProfitText(strategy.apy) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between gap-3">
            <NuxtLink
              :to="`/dashboard?intent=${encodeURIComponent(strategy.intent)}`"
              class="text-sm font-semibold text-lime-200 hover:text-lime-100"
            >
              预览执行计划
            </NuxtLink>
            <button class="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15">
              一键部署
            </button>
          </div>
        </div>

        <div class="pointer-events-none absolute right-4 top-4 hidden rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 backdrop-blur md:block md:opacity-0 md:transition md:group-hover:opacity-100">
          <div class="text-xs text-slate-400">Simulation</div>
          <div class="mt-1 font-semibold text-lime-200">{{ simulateProfitText(strategy.apy) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const description = '订阅可复用的 DeFi / RWA 策略：定投、对冲、稳定币收益与美债组合，一键预览执行计划。'

useSeoMeta({
  title: 'Strategy Store',
  description,
  ogTitle: 'Strategy Store · Plunget',
  ogDescription: description,
  ogType: 'website',
  twitterTitle: 'Strategy Store · Plunget',
  twitterDescription: description,
})

type StrategySource = 'U.S. Bonds' | 'Real Estate' | 'Corporate Debt' | 'On-chain Native'
type RiskGrade = 'A' | 'B' | 'C'

type Strategy = {
  id: string
  name: string
  description: string
  apy: number | null
  risk: RiskGrade
  source: StrategySource
  chains: string[]
  protocols: string[]
  backtest: number[]
  intent: string
}

const sources: StrategySource[] = ['U.S. Bonds', 'Real Estate', 'Corporate Debt', 'On-chain Native']
const risks: RiskGrade[] = ['A', 'B', 'C']

const strategies: Strategy[] = [
  {
    id: 'rwa-tbills',
    name: 'U.S. T-Bills · 稳健底仓',
    description: '代币化美债为底仓，追求低波动与稳定现金流。',
    apy: 0.056,
    risk: 'A',
    source: 'U.S. Bonds',
    chains: ['Ethereum', 'L2s'],
    protocols: ['Ondo', 'Centrifuge'],
    backtest: [1, 1.01, 1.015, 1.022, 1.03, 1.036, 1.041, 1.045, 1.05, 1.056],
    intent: '配置 60% 稳定币 + 40% 美债',
  },
  {
    id: 'stable-aa',
    name: 'Stable Yield · 低风险聚合',
    description: '扫描协议收益与风险评级，自动选择最稳健的跨链执行路径。',
    apy: 0.082,
    risk: 'A',
    source: 'On-chain Native',
    chains: ['Arbitrum', 'Base', 'Solana'],
    protocols: ['Aave', 'Sky', 'Kamino'],
    backtest: [1, 1.008, 1.013, 1.021, 1.027, 1.034, 1.041, 1.048, 1.055, 1.062],
    intent: '帮我寻找 APY > 8% 且风险等级为 A 的策略',
  },
  {
    id: 'bridge-sweep',
    name: 'Cross-chain Sweep · 归集到最优理财链',
    description: '自动识别闲置资产并归集到费用更低、收益更优的链上策略。',
    apy: 0.074,
    risk: 'B',
    source: 'On-chain Native',
    chains: ['Arbitrum', 'Base'],
    protocols: ['Li.Fi', 'Enso', 'Aave'],
    backtest: [1, 0.997, 1.006, 1.012, 1.019, 1.027, 1.033, 1.04, 1.046, 1.052],
    intent: '将 Arbitrum 上的多余资产归集到 Base 链理财',
  },
  {
    id: 'defi-bluechip',
    name: 'Bluechip DeFi · 组合增强',
    description: '以蓝筹协议为核心，优化滑点与风险敞口，提升组合稳定性。',
    apy: 0.064,
    risk: 'B',
    source: 'On-chain Native',
    chains: ['Ethereum L2s', 'Arbitrum'],
    protocols: ['Lido', 'Aave', 'Uniswap'],
    backtest: [1, 0.992, 1.01, 1.002, 1.018, 1.022, 1.029, 1.035, 1.032, 1.041],
    intent: '把 1 ETH 分散到低风险的 L2 收益策略',
  },
  {
    id: 'corp-debt',
    name: 'Corporate Debt · 现金流组合',
    description: '企业债 RWA 与链上收益增强的混合策略（占位）。',
    apy: 0.068,
    risk: 'B',
    source: 'Corporate Debt',
    chains: ['Ethereum'],
    protocols: ['Centrifuge', 'Aave'],
    backtest: [1, 1.004, 1.006, 1.012, 1.017, 1.02, 1.026, 1.031, 1.035, 1.038],
    intent: '帮我买点稳健的理财（企业债 + 链上收益增强）',
  },
  {
    id: 'real-estate',
    name: 'Real Estate · 防御型配置',
    description: '房地产 RWA + 稳定币收益的防御型组合（占位）。',
    apy: 0.061,
    risk: 'C',
    source: 'Real Estate',
    chains: ['Ethereum'],
    protocols: ['Centrifuge', 'Sky'],
    backtest: [1, 0.996, 1.0, 1.006, 1.012, 1.014, 1.019, 1.023, 1.028, 1.031],
    intent: '配置防御型组合：RWA 房地产 + 稳定币收益',
  },
]

type SortKey = 'apy_desc' | 'apy_asc' | 'risk_asc'

const sourceFilter = ref<'all' | StrategySource>('all')
const riskFilter = ref<'all' | RiskGrade>('all')
const sortKey = ref<SortKey>('apy_desc')
const activeSimulationId = ref<string | null>(null)

function toggleSimulation(id: string) {
  activeSimulationId.value = activeSimulationId.value === id ? null : id
}

function riskRank(risk: RiskGrade) {
  if (risk === 'A') return 1
  if (risk === 'B') return 2
  return 3
}

const filteredStrategies = computed(() => {
  let result = strategies.slice()
  if (sourceFilter.value !== 'all') result = result.filter((s) => s.source === sourceFilter.value)
  if (riskFilter.value !== 'all') result = result.filter((s) => s.risk === riskFilter.value)

  if (sortKey.value === 'risk_asc') {
    result.sort((a, b) => riskRank(a.risk) - riskRank(b.risk))
  } else if (sortKey.value === 'apy_asc') {
    result.sort((a, b) => (a.apy ?? -1) - (b.apy ?? -1))
  } else {
    result.sort((a, b) => (b.apy ?? -1) - (a.apy ?? -1))
  }

  return result
})

function formatApy(apy: number | null) {
  if (apy == null) return '—'
  return `${(apy * 100).toFixed(1)}%`
}

function simulateProfitText(apy: number | null) {
  if (apy == null) return '—'
  const principal = 1000
  const days = 30
  const finalValue = principal * Math.pow(1 + apy, days / 365)
  const profit = finalValue - principal
  const profitText = profit >= 0 ? `+${profit.toFixed(2)}` : profit.toFixed(2)
  return `${profitText} USDT`
}

function sparklinePoints(values: number[]) {
  if (values.length === 0) return ''
  const width = 160
  const height = 48
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - ((value - min) / range) * (height - 6) - 3
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}
</script>
