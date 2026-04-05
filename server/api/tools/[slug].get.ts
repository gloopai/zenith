import { getRequestContentLocale } from '../../utils/content-locale'
import { getToolBySlug, readToolsLocalized } from '../../utils/tools-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const locale = getRequestContentLocale(event)
  const tools = await readToolsLocalized(locale)
  const tool = getToolBySlug(tools, slug)
  if (!tool) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return { tool }
})
