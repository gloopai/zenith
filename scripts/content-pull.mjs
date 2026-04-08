/**
 * 一键：跑 RSS 抓取；若产生新批次则打开（或在终端打印）最新 CURSOR-HANDOFF.md。
 *
 *   npm run content:pull
 *
 * 跳过自动打开系统默认编辑器：CONTENT_PULL_OPEN=0 npm run content:pull
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const ingestScript = path.join(root, 'scripts/daily-content-ingest.mjs')
const lastRunPath = path.join(root, 'content/inbox/.last-run.json')

let mtimeBefore = 0
try {
  mtimeBefore = fs.statSync(lastRunPath).mtimeMs
} catch {
  /* no prior run marker */
}

const run = spawnSync(process.execPath, [ingestScript], { cwd: root, stdio: 'inherit' })
if (run.status !== 0 && run.status != null) process.exit(run.status)
if (run.error) throw run.error

let mtimeAfter = 0
try {
  mtimeAfter = fs.statSync(lastRunPath).mtimeMs
} catch {
  // feeds 未配置等情况不会写 .last-run.json
}

if (mtimeAfter <= mtimeBefore) {
  process.exit(0)
}

let handoffRel
try {
  const meta = JSON.parse(fs.readFileSync(lastRunPath, 'utf8'))
  handoffRel = typeof meta.handoff === 'string' ? meta.handoff : ''
} catch {
  process.exit(0)
}

if (!handoffRel) process.exit(0)

const handoffAbs = path.join(root, handoffRel)
if (!fs.existsSync(handoffAbs)) {
  console.error('[content-pull] Missing handoff file:', handoffRel)
  process.exit(1)
}

console.log(`\n[content-pull] 交接: ${handoffRel}`)

if (process.env.CONTENT_PULL_OPEN === '0') process.exit(0)

if (process.platform === 'darwin') {
  spawnSync('open', [handoffAbs], { stdio: 'ignore' })
} else if (process.platform === 'win32') {
  spawnSync('cmd', ['/c', 'start', '', handoffAbs], { stdio: 'ignore' })
} else {
  spawnSync('xdg-open', [handoffAbs], { stdio: 'ignore' })
}
