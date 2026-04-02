import { readFile, writeFile } from 'node:fs/promises'
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

export async function writeTools(tools: Tool[]): Promise<void> {
  const body: ToolsFile = { tools }
  await writeFile(getToolsJsonPath(), `${JSON.stringify(body, null, 2)}\n`, 'utf-8')
}

export function getToolBySlug(tools: Tool[], slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
