import type { OpenClawSkill } from '~~/shared/types/site'
import { readSiteDataJson } from './site-assets'
import { readMergedJsonOverlays } from './i18n-overlays'
import { readTaxonomy, localizeCategoryLabel, type TaxonomyFile } from './taxonomy-store'

interface SkillsFile {
  skills: OpenClawSkill[]
}

function applySkillPatches(
  base: OpenClawSkill,
  locale: string,
  overlay: Record<string, Record<string, unknown>>,
  tax: TaxonomyFile,
): OpenClawSkill {
  const patch = overlay[base.slug]
  const name = typeof patch?.name === 'string' && patch.name ? patch.name : base.name
  const description =
    typeof patch?.description === 'string' && patch.description ? patch.description : base.description
  const categoryKey = typeof patch?.category === 'string' && patch.category ? patch.category : base.category
  const tags = Array.isArray(patch?.tags) ? (patch.tags as string[]) : base.tags

  return {
    ...base,
    name,
    description,
    category: localizeCategoryLabel(categoryKey, locale, tax),
    tags,
  }
}

export async function readOpenclawSkillsLocalized(locale: string): Promise<OpenClawSkill[]> {
  const parsed = await readSiteDataJson<SkillsFile>('openclaw-skills.json')
  const list = Array.isArray(parsed.skills) ? parsed.skills : []
  const overlay = await readMergedJsonOverlays('openclaw-overlays', locale)
  const tax = await readTaxonomy()
  return list.map((s) => applySkillPatches(s, locale, overlay, tax))
}

export function getOpenClawSkillBySlug(skills: OpenClawSkill[], slug: string): OpenClawSkill | undefined {
  return skills.find((s) => s.slug === slug)
}
