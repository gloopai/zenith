import { getRequestContentLocale } from '../../utils/content-locale'
import { readToolsWithCategoryKeys } from '../../utils/tools-store'
import { getCategorySlugByCanonicalKey } from '../../utils/category-entities-store'
import type { NavCategoryListItem } from '~~/shared/types/site'

export default defineEventHandler(async (event) => {
  const locale = getRequestContentLocale(event)
  const rows = await readToolsWithCategoryKeys(locale)
  const countByKey = new Map<string, number>()
  for (const { categoryKey } of rows) {
    countByKey.set(categoryKey, (countByKey.get(categoryKey) ?? 0) + 1)
  }

  const items: NavCategoryListItem[] = []
  for (const [key, count] of countByKey) {
    if (count < 1) continue
    const slug = await getCategorySlugByCanonicalKey(key)
    if (!slug) continue
    const sample = rows.find((r) => r.categoryKey === key)
    items.push({
      slug,
      label: sample?.tool.category ?? key,
      count,
    })
  }

  const collator = locale.replace('_', '-')
  items.sort((a, b) => a.label.localeCompare(b.label, collator))

  return { categories: items }
})
