<template>
  <div class="flex flex-col gap-10">
    <header class="max-w-2xl">
      <p class="page-eyebrow">后台</p>
      <h1 class="page-title mt-4">内容管理</h1>
      <p class="mt-4 text-sm leading-relaxed text-zinc-500">
        在服务器环境变量中设置 <span class="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-zinc-300">ADMIN_SECRET</span>
        作为口令。保存后，工具数据写入
        <span class="font-mono text-zinc-400">data/tools.json</span>，资讯写入
        <span class="font-mono text-zinc-400">content/news/</span> 下的 Markdown 文件。
      </p>
    </header>

    <section class="glass-card p-6 sm:p-8">
      <label class="flex flex-col gap-2">
        <span class="text-xs font-medium text-zinc-500">管理口令</span>
        <input v-model="token" type="password" class="input" autocomplete="off" placeholder="输入口令" />
      </label>
      <div class="mt-4 flex flex-wrap gap-2">
        <button type="button" class="btn-secondary rounded-xl px-4 py-2 text-sm" @click="persistToken">在本机记住</button>
        <button type="button" class="btn-pill rounded-xl px-4 py-2 text-sm" @click="clearToken">清除</button>
      </div>
      <p v-if="hint" class="mt-4 text-xs text-zinc-500">{{ hint }}</p>
    </section>

    <section class="glass-card p-6 sm:p-8">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-semibold text-white">工具数据</h2>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn-secondary rounded-xl px-4 py-2 text-sm" @click="loadTools">重新加载</button>
          <button type="button" class="btn-primary rounded-xl px-4 py-2 text-sm" @click="saveTools">保存</button>
        </div>
      </div>
      <textarea v-model="toolsJson" class="mt-4 h-80 w-full rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-4 font-mono text-xs text-zinc-200" />
      <p v-if="toolsMessage" class="mt-4 text-xs text-zinc-500">{{ toolsMessage }}</p>
    </section>

    <section class="glass-card p-6 sm:p-8">
      <h2 class="text-lg font-semibold text-white">资讯稿件</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <label class="flex flex-col gap-2">
          <span class="text-xs font-medium text-zinc-500">slug（文件名）</span>
          <input v-model="newsDraft.slug" type="text" class="input" placeholder="例如：2026-04-02-my-post" />
        </label>
        <label class="flex flex-col gap-2">
          <span class="text-xs font-medium text-zinc-500">日期</span>
          <input v-model="newsDraft.date" type="date" class="input" />
        </label>
        <label class="flex flex-col gap-2 sm:col-span-2">
          <span class="text-xs font-medium text-zinc-500">标题</span>
          <input v-model="newsDraft.title" type="text" class="input" />
        </label>
        <label class="flex flex-col gap-2 sm:col-span-2">
          <span class="text-xs font-medium text-zinc-500">摘要</span>
          <input v-model="newsDraft.description" type="text" class="input" />
        </label>
        <label class="flex flex-col gap-2 sm:col-span-2">
          <span class="text-xs font-medium text-zinc-500">正文</span>
          <textarea v-model="newsDraft.body" class="h-56 w-full rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-4 text-sm text-zinc-200" />
        </label>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <button type="button" class="btn-primary rounded-xl px-4 py-2 text-sm" @click="saveNews">保存资讯</button>
      </div>
      <p v-if="newsMessage" class="mt-4 text-xs text-zinc-500">{{ newsMessage }}</p>
    </section>

    <section class="glass-card p-6 sm:p-8">
      <h2 class="text-lg font-semibold text-white">已有资讯</h2>
      <ul class="mt-4 grid gap-3">
        <li v-for="item in newsItems" :key="item.slug" class="glass-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="min-w-0">
            <div class="text-xs text-zinc-600">{{ item.date }}</div>
            <div class="mt-1 truncate text-sm font-semibold text-white">{{ item.title }}</div>
            <div class="mt-1 font-mono text-xs text-zinc-600">{{ item.slug }}</div>
          </div>
          <div class="flex flex-wrap gap-2">
            <NuxtLink class="btn-secondary rounded-xl px-4 py-2 text-sm" :to="`/news/${item.slug}`" target="_blank">预览</NuxtLink>
            <button type="button" class="btn-pill rounded-xl px-4 py-2 text-sm" @click="fillNews(item)">载入编辑</button>
            <button type="button" class="btn-pill rounded-xl px-4 py-2 text-sm text-rose-200" @click="removeNews(item.slug)">删除</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { NewsListItem, Tool } from '~~/shared/types/site'

useSeoMeta({
  title: '内容管理',
  robots: 'noindex, nofollow',
})

const token = ref('')
const hint = ref('')

const toolsJson = ref('{\n  "tools": []\n}')
const toolsMessage = ref('')

const newsItems = ref<NewsListItem[]>([])

const newsDraft = ref({
  slug: '',
  title: '',
  description: '',
  date: '',
  body: '',
})

const newsMessage = ref('')

function authHeaders(): HeadersInit {
  return { Authorization: `Bearer ${token.value.trim()}` }
}

onMounted(() => {
  const saved = sessionStorage.getItem('plunget_admin_token')
  if (saved) token.value = saved
  void loadTools()
  void loadNewsList()
})

async function loadTools() {
  const res = await $fetch<{ tools: Tool[] }>('/api/tools')
  toolsJson.value = JSON.stringify({ tools: res.tools }, null, 2)
  toolsMessage.value = ''
}

async function saveTools() {
  toolsMessage.value = ''
  try {
    const parsed = JSON.parse(toolsJson.value) as { tools: Tool[] }
    if (!parsed.tools) {
      toolsMessage.value = 'JSON 需要包含 tools 数组'
      return
    }
    await $fetch('/api/admin/tools', { method: 'PUT', headers: authHeaders(), body: parsed })
    toolsMessage.value = '已保存'
  } catch (e: unknown) {
    toolsMessage.value = e instanceof Error ? e.message : '保存失败（检查口令与 JSON）'
  }
}

async function loadNewsList() {
  const res = await $fetch<{ items: NewsListItem[] }>('/api/news')
  newsItems.value = res.items
}

async function saveNews() {
  newsMessage.value = ''
  try {
    await $fetch('/api/admin/news', {
      method: 'PUT',
      headers: authHeaders(),
      body: {
        slug: newsDraft.value.slug.trim(),
        title: newsDraft.value.title.trim(),
        description: newsDraft.value.description.trim(),
        date: newsDraft.value.date.trim(),
        body: newsDraft.value.body,
      },
    })
    newsMessage.value = '已保存'
    await loadNewsList()
  } catch (e: unknown) {
    newsMessage.value = e instanceof Error ? e.message : '保存失败（检查口令与字段）'
  }
}

async function fillNews(item: NewsListItem) {
  newsMessage.value = ''
  try {
    const payload = await $fetch<{
      slug: string
      title: string
      description: string
      date: string
      body: string
    }>(`/api/admin/news/${encodeURIComponent(item.slug)}`, { headers: authHeaders() })
    newsDraft.value.slug = payload.slug
    newsDraft.value.title = payload.title
    newsDraft.value.description = payload.description
    newsDraft.value.date = payload.date
    newsDraft.value.body = payload.body
    newsMessage.value = '已载入正文'
  } catch (e: unknown) {
    newsMessage.value = e instanceof Error ? e.message : '载入失败（检查口令）'
  }
}

async function removeNews(slug: string) {
  if (!confirm(`确定删除：${slug} ?`)) return
  newsMessage.value = ''
  try {
    await $fetch(`/api/admin/news?slug=${encodeURIComponent(slug)}`, { method: 'DELETE', headers: authHeaders() })
    newsMessage.value = '已删除'
    await loadNewsList()
  } catch (e: unknown) {
    newsMessage.value = e instanceof Error ? e.message : '删除失败'
  }
}

function persistToken() {
  sessionStorage.setItem('plunget_admin_token', token.value.trim())
  hint.value = '已保存到 sessionStorage'
}

function clearToken() {
  sessionStorage.removeItem('plunget_admin_token')
  token.value = ''
  hint.value = '已清除'
}
</script>
