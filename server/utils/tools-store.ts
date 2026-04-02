import { readFile } from 'node:fs/promises'
import type { Tool } from '~~/shared/types/site'
import { getToolsJsonPath } from './paths'

interface ToolsFile {
  tools: Tool[]
}

export async function readTools(): Promise<Tool[]> {
  const raw = await readFile(getToolsJsonPath(), 'utf-8')
  const parsed = JSON.parse(raw) as ToolsFile
  return Array.isArray(parsed.tools) ? parsed.tools : []
}

export function getToolBySlug(tools: Tool[], slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
