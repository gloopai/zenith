/**
 * Writes content/news/locales/{en,zh-TW,ja,ko,ru,hi,es}/*.md from scripted translations.
 * Root content/news/*.md remains zh-CN canonical.
 * Run: node scripts/build-news-locales.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ARTICLES as APR } from './lib/news-articles-apr.mjs'
import { ARTICLES as MAR } from './lib/news-articles-mar.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const LOCALES = ['en', 'zh-TW', 'ja', 'ko', 'ru', 'hi', 'es']
const ARTICLES = { ...APR, ...MAR }

function fm({ title, description, date, slug }) {
  return `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
date: ${date}
slug: ${slug}
---

`
}

function main() {
  for (const loc of LOCALES) {
    const dir = path.join(root, 'content/news/locales', loc)
    fs.mkdirSync(dir, { recursive: true })
  }

  for (const [file, meta] of Object.entries(ARTICLES)) {
    const { date, slug } = meta
    for (const loc of LOCALES) {
      const block = meta[loc]
      if (!block) throw new Error(`Missing ${loc} for ${file}`)
      const text = fm({ title: block.title, description: block.description, date, slug }) + block.body.trim() + '\n'
      fs.writeFileSync(path.join(root, 'content/news/locales', loc, file), text)
    }
  }

  console.log(`Wrote localized news for ${Object.keys(ARTICLES).length} articles × ${LOCALES.length} locales`)
}

main()
