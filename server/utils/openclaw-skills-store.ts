import { readFile } from 'node:fs/promises'
import type { OpenClawSkill } from '~~/shared/types/site'
import { getOpenclawSkillsJsonPath } from './paths'

interface SkillsFile {
  skills: OpenClawSkill[]
}

export async function readOpenclawSkills(): Promise<OpenClawSkill[]> {
  const raw = await readFile(getOpenclawSkillsJsonPath(), 'utf-8')
  const parsed = JSON.parse(raw) as SkillsFile
  return Array.isArray(parsed.skills) ? parsed.skills : []
}

export function getOpenClawSkillBySlug(skills: OpenClawSkill[], slug: string): OpenClawSkill | undefined {
  return skills.find((s) => s.slug === slug)
}
