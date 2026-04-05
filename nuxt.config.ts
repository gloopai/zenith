import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteName: 'Plunget',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      title: 'Plunget',
      titleTemplate: '%s · Plunget',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'AI 工具导航与资讯聚合：发现好用的 AI 产品，阅读行业更新。',
        },
        { name: 'theme-color', content: '#06060a' },
        { name: 'color-scheme', content: 'dark' },
        { property: 'og:site_name', content: 'Plunget' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:title', content: 'Plunget' },
        {
          property: 'og:description',
          content: 'AI 工具导航与资讯聚合：发现好用的 AI 产品，阅读行业更新。',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Plunget' },
        {
          name: 'twitter:description',
          content: 'AI 工具导航与资讯聚合：发现好用的 AI 产品，阅读行业更新。',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
        { rel: 'apple-touch-icon', href: '/icon.png' },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    serverAssets: [
      { baseName: 'site-data', dir: resolve(__dirname, 'data') },
      { baseName: 'site-news', dir: resolve(__dirname, 'content/news') },
    ],
  },
})
