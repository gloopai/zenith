import type { OpenClawSkill } from '~~/shared/types/site'
import { readSiteDataJson } from './site-assets'

interface SkillsFile {
  skills: OpenClawSkill[]
}

export async function readOpenclawSkills(): Promise<OpenClawSkill[]> {
  const parsed = await readSiteDataJson<SkillsFile>('openclaw-skills.json')
  return Array.isArray(parsed.skills) ? parsed.skills : []
}

export function getOpenClawSkillBySlug(skills: OpenClawSkill[], slug: string): OpenClawSkill | undefined {
  return skills.find((s) => s.slug === slug)
}
