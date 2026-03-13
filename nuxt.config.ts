import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
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
          content: 'Plunget 是基于 AI 驱动的意图导向（Intent-based）跨链资产管理平台。',
        },
        { name: 'theme-color', content: '#020617' },
        { name: 'color-scheme', content: 'dark' },
        { property: 'og:site_name', content: 'Plunget' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:title', content: 'Plunget' },
        {
          property: 'og:description',
          content: 'AI 驱动的意图导向跨链资产管理平台：一语下达投资目标，自动生成最优执行方案。',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Plunget' },
        {
          name: 'twitter:description',
          content: 'AI 驱动的意图导向跨链资产管理平台：一语下达投资目标，自动生成最优执行方案。',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
