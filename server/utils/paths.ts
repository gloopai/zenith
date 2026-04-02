import { join } from 'node:path'

/** Project root when running `nuxt dev` or `node .output/server/index.mjs` from repo root. */
export function getProjectRoot() {
  return process.cwd()
}

export function getToolsJsonPath() {
  return join(getProjectRoot(), 'data', 'tools.json')
}

export function getNewsDir() {
  return join(getProjectRoot(), 'content', 'news')
}

export function getOpenclawSkillsJsonPath() {
  return join(getProjectRoot(), 'data', 'openclaw-skills.json')
}
