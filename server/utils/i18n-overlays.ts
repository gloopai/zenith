import { readSiteDataJsonOptional } from './site-assets'

type OverlayMap = Record<string, Record<string, unknown>>

/** Merge overlay JSON files: en base, then locale-specific (except zh-CN only uses its file). */
export async function readMergedJsonOverlays(subdir: 'tool-overlays' | 'openclaw-overlays', locale: string): Promise<OverlayMap> {
  const codes = locale === 'zh-CN' ? ['zh-CN'] : locale === 'en' ? ['en'] : ['en', locale]
  const merged: OverlayMap = {}
  for (const code of codes) {
    const path = `i18n/${subdir}/${code}.json`
    const chunk = await readSiteDataJsonOptional<OverlayMap>(path)
    if (!chunk) continue
    for (const [slug, fields] of Object.entries(chunk)) {
      if (!fields || typeof fields !== 'object') continue
      merged[slug] = { ...merged[slug], ...fields }
    }
  }
  return merged
}
