<template>
  <div class="flex flex-col gap-6">
    <div>
      <h2 class="text-2xl font-semibold">Identity Center</h2>
      <p class="mt-2 text-sm text-slate-300">无私钥登录、社交恢复、全链 Gas 池与隐私开关（占位）。</p>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <div class="glass-card p-5 lg:col-span-1">
        <div class="text-xs font-semibold tracking-wide text-slate-300">Passkey Manager</div>

        <div class="mt-4 flex flex-col gap-3">
          <div
            v-for="device in passkeys"
            :key="device.id"
            class="glass-panel p-4"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <div class="truncate text-sm font-semibold">{{ device.name }}</div>
                <div class="mt-1 text-xs text-slate-400">{{ device.type }} · 最近使用：{{ device.lastUsed }}</div>
              </div>
              <span
                class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="device.status === '已绑定' ? 'bg-lime-300/15 text-lime-200' : 'bg-white/5 text-slate-200'"
              >
                {{ device.status }}
              </span>
            </div>
          </div>

          <div class="grid gap-2 sm:grid-cols-2">
            <button class="btn-primary">
              添加设备
            </button>
            <button class="btn-secondary">
              连接钱包
            </button>
          </div>
        </div>

        <div class="glass-panel mt-5 rounded-2xl p-4">
          <div class="flex items-center justify-between gap-3">
            <div class="text-xs font-semibold text-slate-300">Social Recovery</div>
            <div class="text-xs text-slate-400">2026 标配</div>
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <div
              v-for="contact in recoveryContacts"
              :key="contact.id"
              class="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <div class="min-w-0">
                <div class="truncate text-xs font-semibold text-slate-200">{{ contact.name }}</div>
                <div class="truncate text-[11px] text-slate-400">{{ contact.note }}</div>
              </div>
              <span class="rounded-full bg-white/5 px-2 py-1 text-[11px] text-slate-200">已启用</span>
            </div>
          </div>
          <button class="mt-3 w-full rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15">
            添加紧急联系人
          </button>
        </div>
      </div>

      <div class="glass-card p-5 lg:col-span-2">
        <div class="flex items-center justify-between gap-4">
          <div class="text-xs font-semibold tracking-wide text-slate-300">Identity & Security</div>
          <div class="text-xs text-slate-400">链抽象 · Gas 代付 · 隐私</div>
        </div>

        <div class="mt-4 grid gap-3 lg:grid-cols-2">
          <div class="glass-panel p-4">
            <div class="flex items-center justify-between gap-3">
              <div class="text-sm font-semibold">Gas Tank</div>
              <div class="text-xs text-slate-400">全链 Gas 池</div>
            </div>

            <div class="mt-3 flex items-end justify-between gap-4">
              <div>
                <div class="text-2xl font-semibold">{{ gasBalance.toFixed(2) }} USDC</div>
                <div class="mt-1 text-xs text-slate-400">预计可支持约 {{ estimatedTxCount }} 次交易</div>
              </div>
              <button class="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15">
                充值
              </button>
            </div>

            <div class="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div class="h-full rounded-full bg-lime-300/70" :style="{ width: `${gasProgressPercent}%` }" />
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">USDC → 全链 Gas</span>
              <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">自动补足</span>
            </div>
          </div>

          <div class="glass-panel p-4">
            <div class="flex items-center justify-between gap-3">
              <div class="text-sm font-semibold">Privacy Toggle</div>
              <button
                class="rounded-full px-3 py-1.5 text-xs font-semibold transition"
                :class="privacyEnabled ? 'bg-lime-300/15 text-lime-200' : 'bg-white/5 text-slate-200'"
                @click="privacyEnabled = !privacyEnabled"
              >
                {{ privacyEnabled ? '已开启' : '已关闭' }}
              </button>
            </div>
            <div class="mt-3 text-xs text-slate-300">
              集成 ZK 选项：在部分交易中隐藏余额或历史轨迹（占位）。
            </div>

            <div class="mt-4 grid gap-2">
              <button
                v-for="option in privacyOptions"
                :key="option.key"
                class="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left"
                @click="togglePrivacyOption(option.key)"
              >
                <div class="min-w-0">
                  <div class="text-sm font-semibold text-slate-100">{{ option.label }}</div>
                  <div class="mt-0.5 text-xs text-slate-400">{{ option.note }}</div>
                </div>
                <span
                  class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="privacyEnabled && privacySelected.has(option.key) ? 'bg-lime-300/15 text-lime-200' : 'bg-white/5 text-slate-200'"
                >
                  {{ privacyEnabled && privacySelected.has(option.key) ? '启用' : '关闭' }}
                </span>
              </button>
            </div>
          </div>

          <div class="glass-panel p-4">
            <div class="text-sm font-semibold">风险偏好</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="level in riskLevels"
                :key="level"
                class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10"
                :class="risk === level ? 'border-lime-300/40 bg-lime-300/10 text-lime-200' : ''"
                @click="risk = level"
              >
                {{ level }}
              </button>
            </div>
          </div>

          <div class="glass-panel p-4">
            <div class="text-sm font-semibold">跨链执行</div>
            <div class="mt-2 flex items-center justify-between gap-3">
              <div class="text-xs text-slate-300">自动选择最优路径</div>
              <button
                class="rounded-full px-3 py-1.5 text-xs font-semibold transition"
                :class="autoRoute ? 'bg-lime-300/15 text-lime-200' : 'bg-white/5 text-slate-200'"
                @click="autoRoute = !autoRoute"
              >
                {{ autoRoute ? '已开启' : '已关闭' }}
              </button>
            </div>
            <div class="mt-3 text-xs text-slate-400">将来可接入 Enso / Li.Fi 执行器。</div>
          </div>
        </div>

        <div class="glass-panel mt-4 rounded-xl p-4">
          <div class="text-sm font-semibold">Web3 身份凭证</div>
          <div class="mt-2 grid gap-2 sm:grid-cols-3">
            <div class="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200">KYC：未绑定</div>
            <div class="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200">信誉：—</div>
            <div class="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200">合规区域：—</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Identity Center',
  description: 'Passkey 登录与 Web3 身份管理（应用内页面）。',
  robots: 'noindex, nofollow',
})

const riskLevels = ['低', '中', '高'] as const
const risk = ref<(typeof riskLevels)[number]>('低')
const autoRoute = ref(true)

const passkeys = [
  { id: '1', name: 'iPhone Face ID', type: 'Passkey', lastUsed: '今天', status: '已绑定' },
  { id: '2', name: 'Mac Touch ID', type: 'Passkey', lastUsed: '2 天前', status: '已绑定' },
  { id: '3', name: '备用设备', type: 'Passkey', lastUsed: '—', status: '未绑定' },
] as const

const recoveryContacts = [
  { id: '1', name: 'Alice（紧急联系人）', note: '需要 2/3 同意恢复' },
  { id: '2', name: 'Bob（紧急联系人）', note: '需要 2/3 同意恢复' },
  { id: '3', name: 'Carol（紧急联系人）', note: '需要 2/3 同意恢复' },
] as const

const gasBalance = ref(18.5)
const estimatedTxCount = computed(() => Math.max(0, Math.round(gasBalance.value * 2.7)))
const gasProgressPercent = computed(() => Math.min(100, (estimatedTxCount.value / 50) * 100))

const privacyEnabled = ref(false)
const privacySelected = ref(new Set<string>())

const privacyOptions = [
  { key: 'hide-balance', label: '隐藏余额', note: '对部分交互隐藏真实余额（占位）' },
  { key: 'hide-history', label: '隐藏历史轨迹', note: '对部分交互隐藏历史记录（占位）' },
  { key: 'private-route', label: '隐私路由', note: '跨链路径采用更高隐私等级（占位）' },
] as const

function togglePrivacyOption(key: string) {
  const next = new Set(privacySelected.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  privacySelected.value = next
}
</script>
