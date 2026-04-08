import { getRequestContentLocale } from '../../../utils/content-locale'
import { readToolsWithCategoryKeys } from '../../../utils/tools-store'
import { getCategoryEntityBySlug, resolveCategoryCopy } from '../../../utils/category-entities-store'
import type { CategoryDetailResponse } from '~~/shared/types/site'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const entity = await getCategoryEntityBySlug(slug)
  if (!entity) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const locale = getRequestContentLocale(event)
  const copy = await resolveCategoryCopy(entity, locale)
  const rows = await readToolsWithCategoryKeys(locale)
  const tools = rows.filter((r) => r.categoryKey === entity.canonicalKey).map((r) => r.tool)

  const body: CategoryDetailResponse = {
    slug: entity.slug,
    canonicalKey: entity.canonicalKey,
    updatedAt: entity.updatedAt,
    title: copy.title,
    description: copy.description,
    intro: copy.intro,
    gscBlocks: copy.gscBlocks ?? [],
    tools,
  }

  return body
})
