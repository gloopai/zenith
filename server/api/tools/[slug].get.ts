import { getRequestContentLocale } from '../../utils/content-locale'
import { readToolsWithCategoryKeys } from '../../utils/tools-store'
import { getCategorySlugByCanonicalKey } from '../../utils/category-entities-store'
import { getToolSeoExtra } from '../../utils/tool-seo-extras-store'
import type { ToolDetailResponse } from '~~/shared/types/site'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const locale = getRequestContentLocale(event)
  const rows = await readToolsWithCategoryKeys(locale)
  const hit = rows.find((r) => r.tool.slug === slug)
  if (!hit) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const categorySlug = (await getCategorySlugByCanonicalKey(hit.categoryKey)) ?? null
  const related = rows
    .filter((r) => r.categoryKey === hit.categoryKey && r.tool.slug !== slug)
    .slice(0, 8)
    .map((r) => r.tool)

  const seoExtra = await getToolSeoExtra(slug, locale)

  const body: ToolDetailResponse = {
    tool: hit.tool,
    categorySlug,
    related,
    seoExtra,
  }
  return body
})
