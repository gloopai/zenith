import type { Tool } from '~~/shared/types/site'
import { readSiteDataJson } from './site-assets'

interface ToolsFile {
  tools: Tool[]
}

export async function readTools(): Promise<Tool[]> {
  const parsed = await readSiteDataJson<ToolsFile>('tools.json')
  return Array.isArray(parsed.tools) ? parsed.tools : []
}

export function getToolBySlug(tools: Tool[], slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
