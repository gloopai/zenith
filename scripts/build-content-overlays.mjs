/**
 * Generates tool + OpenClaw + MCP overlay JSON for en, zh-TW, ja, ko, ru, hi, es.
 * zh-CN uses base data/tools.json + openclaw-skills.json + mcp-servers.json (no overlay).
 * Run: node scripts/build-content-overlays.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  OVERLAY_LOCALES,
  openClawDescription,
  localizeOpenClawCategory,
  toolDescription,
  mcpDescription,
} from './lib/content-overlay-locale-data.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

function main() {
  const toolsFile = JSON.parse(fs.readFileSync(path.join(root, 'data/tools.json'), 'utf8'))
  const skillsFile = JSON.parse(fs.readFileSync(path.join(root, 'data/openclaw-skills.json'), 'utf8'))
  const mcpFile = JSON.parse(fs.readFileSync(path.join(root, 'data/mcp-servers.json'), 'utf8'))

  fs.mkdirSync(path.join(root, 'data/i18n/tool-overlays'), { recursive: true })
  fs.mkdirSync(path.join(root, 'data/i18n/openclaw-overlays'), { recursive: true })
  fs.mkdirSync(path.join(root, 'data/i18n/mcp-overlays'), { recursive: true })

  for (const loc of OVERLAY_LOCALES) {
    const toolsOut = {}
    for (const t of toolsFile.tools) {
      toolsOut[t.slug] = { description: toolDescription(t, loc) }
    }
    const skillsOut = {}
    for (const s of skillsFile.skills) {
      skillsOut[s.slug] = {
        description: openClawDescription(s, loc),
        category: localizeOpenClawCategory(s.category, loc),
      }
    }
    const mcpOut = {}
    for (const s of mcpFile.servers) {
      mcpOut[s.slug] = { description: mcpDescription(s, loc) }
    }
    fs.writeFileSync(path.join(root, 'data/i18n/tool-overlays', `${loc}.json`), JSON.stringify(toolsOut, null, 2))
    fs.writeFileSync(
      path.join(root, 'data/i18n/openclaw-overlays', `${loc}.json`),
      JSON.stringify(skillsOut, null, 2),
    )
    fs.writeFileSync(path.join(root, 'data/i18n/mcp-overlays', `${loc}.json`), JSON.stringify(mcpOut, null, 2))
  }

  console.log(`Wrote data/i18n/{tool,openclaw,mcp}-overlays/*.json for: ${OVERLAY_LOCALES.join(', ')}`)
}

main()
